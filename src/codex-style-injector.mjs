#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { createHash } from 'node:crypto';

function usage() {
  console.log(`
Usage:
  codex-style-injector.mjs --css /absolute/path/theme.css [options]
  codex-style-injector.mjs --css-text "body { ... }" [options]

Options:
  --host <host>                 CDP host (default: 127.0.0.1)
  --port <port>                 CDP port (default: 9333)
  --css <path>                  CSS file to inject
  --css-text <string>           Inline CSS to inject
  --js <path>                   Optional JS file to execute after CSS injection
  --themes-dir <path>           Directory containing theme JSON files to embed
  --target-url-prefix <prefix>  Target URL prefix filter (default: app://)
  --interval-ms <ms>            Poll interval in watch mode (default: 2000)
  --once                        Inject once and exit
  --no-hot-reload               Disable file watching for --css/--js inputs
  --quiet, -q                   Suppress output

Examples:
  codex-style-injector.mjs --css ~/Development/codex-themes/src/codex-theme.css --port 9333
  codex-style-injector.mjs --css ~/Development/codex-themes/src/codex-theme.css --once --port 9333
  codex-style-injector.mjs --css theme.css --js ui.js --themes-dir ./themes --port 9333
`);
}

function parseArgs(argv) {
  const opts = {
    host: '127.0.0.1',
    port: 9333,
    targetUrlPrefix: 'app://',
    intervalMs: 2000,
    once: false,
    hotReload: true,
    quiet: false,
    cssPath: null,
    cssText: null,
    jsPath: null,
    themesDir: null,
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    const next = argv[i + 1];
    switch (arg) {
      case '--host':
        opts.host = next;
        i++;
        break;
      case '--port':
        opts.port = Number(next);
        i++;
        break;
      case '--css':
        opts.cssPath = next;
        i++;
        break;
      case '--css-text':
        opts.cssText = next;
        i++;
        break;
      case '--js':
        opts.jsPath = next;
        i++;
        break;
      case '--themes-dir':
        opts.themesDir = next;
        i++;
        break;
      case '--target-url-prefix':
        opts.targetUrlPrefix = next;
        i++;
        break;
      case '--interval-ms':
        opts.intervalMs = Number(next);
        i++;
        break;
      case '--once':
        opts.once = true;
        break;
      case '--no-hot-reload':
        opts.hotReload = false;
        break;
      case '--quiet':
      case '-q':
        opts.quiet = true;
        break;
      case '--help':
      case '-h':
        usage();
        process.exit(0);
      default:
        console.error(`Unknown argument: ${arg}`);
        usage();
        process.exit(1);
    }
  }

  if (!opts.cssPath && !opts.cssText && !opts.jsPath) {
    console.error('Missing style/script input. Provide --css, --css-text, or --js.');
    usage();
    process.exit(1);
  }

  if (!Number.isFinite(opts.port) || opts.port <= 0) {
    throw new Error(`Invalid --port: ${opts.port}`);
  }

  if (!Number.isFinite(opts.intervalMs) || opts.intervalMs < 250) {
    throw new Error(`Invalid --interval-ms: ${opts.intervalMs}`);
  }

  return opts;
}

class CdpClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.ws = null;
    this.nextId = 1;
    this.pending = new Map();
  }

  async connect() {
    if (typeof WebSocket === 'undefined') {
      throw new Error('Global WebSocket is unavailable. Use Node.js 18+ (22+ recommended).');
    }

    this.ws = new WebSocket(this.wsUrl);

    await new Promise((resolve, reject) => {
      const onOpen = () => {
        cleanup();
        resolve();
      };
      const onError = (err) => {
        cleanup();
        reject(err instanceof Error ? err : new Error(String(err)));
      };
      const cleanup = () => {
        this.ws?.removeEventListener('open', onOpen);
        this.ws?.removeEventListener('error', onError);
      };

      this.ws.addEventListener('open', onOpen, { once: true });
      this.ws.addEventListener('error', onError, { once: true });
    });

    this.ws.addEventListener('message', (event) => {
      let msg;
      try {
        msg = JSON.parse(String(event.data));
      } catch {
        return;
      }

      if (!msg || typeof msg.id !== 'number') {
        return;
      }

      const pending = this.pending.get(msg.id);
      if (!pending) {
        return;
      }

      this.pending.delete(msg.id);
      clearTimeout(pending.timer);

      if (msg.error) {
        pending.reject(new Error(JSON.stringify(msg.error)));
      } else {
        pending.resolve(msg.result ?? {});
      }
    });

    this.ws.addEventListener('close', () => {
      for (const [, pending] of this.pending) {
        clearTimeout(pending.timer);
        pending.reject(new Error('CDP socket closed'));
      }
      this.pending.clear();
    });
  }

  send(method, params = {}, timeoutMs = 10_000) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      return Promise.reject(new Error('CDP socket is not open'));
    }

    const id = this.nextId++;
    const payload = { id, method, params };

    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error(`CDP timeout: ${method}`));
      }, timeoutMs);

      this.pending.set(id, { resolve, reject, timer });
      this.ws.send(JSON.stringify(payload));
    });
  }

  close() {
    if (!this.ws) {
      return;
    }
    try {
      this.ws.close();
    } catch {
      // ignore
    }
  }
}

async function getTargets(host, port) {
  const res = await fetch(`http://${host}:${port}/json/list`);
  if (!res.ok) {
    throw new Error(`Failed to list CDP targets: HTTP ${res.status}`);
  }
  const data = await res.json();
  if (!Array.isArray(data)) {
    throw new Error('Invalid /json/list response');
  }
  return data;
}

const HEX_REGEX = /^#[0-9a-fA-F]{3}$|^#[0-9a-fA-F]{6}$/;

function isValidHex(str) {
  return typeof str === 'string' && HEX_REGEX.test(str);
}

function validateThemeColors(theme) {
  if (!isValidHex(theme.background) || !isValidHex(theme.foreground)) {
    return false;
  }
  if (!Array.isArray(theme.palette) || theme.palette.length !== 16) {
    return false;
  }
  return theme.palette.every(isValidHex);
}

function loadThemesFromDir(themesDir, log = () => {}, logError = () => {}) {
  if (!themesDir) {
    return null;
  }

  const absDir = path.resolve(themesDir);
  if (!fs.existsSync(absDir)) {
    return null;
  }

  const themes = {};
  const files = fs.readdirSync(absDir).filter(f => f.endsWith('.json') && !f.endsWith('.template.json'));

  for (const file of files) {
    const filePath = path.join(absDir, file);
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const theme = JSON.parse(content);
      if (theme.name && typeof theme.name === 'string' && validateThemeColors(theme)) {
        themes[theme.name] = {
          background: theme.background,
          foreground: theme.foreground,
          cursor: isValidHex(theme.cursor) ? theme.cursor : theme.foreground,
          selectionBg: isValidHex(theme.selectionBg) ? theme.selectionBg : theme.background,
          selectionFg: isValidHex(theme.selectionFg) ? theme.selectionFg : theme.foreground,
          palette: theme.palette,
        };
      } else {
        logError(`[themes] Invalid theme (missing required fields or invalid colors): ${file}`);
      }
    } catch (err) {
      logError(`[themes] Failed to parse ${file}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  return Object.keys(themes).length > 0 ? themes : null;
}

function buildInjectionSource(cssText, jsText, themesObj) {
  const themesJson = themesObj ? JSON.stringify(themesObj) : '';

  return `(() => {
    const STYLE_ID = '__codex_custom_style';
    const META_KEY = '__codexStyleInjectorMeta';
    const css = ${JSON.stringify(cssText)};
    const js = ${JSON.stringify(jsText)};
    const themesJson = ${JSON.stringify(themesJson)};

    if (themesJson && themesJson.length > 0) {
      try {
        window.__CODEX_THEMES__ = JSON.parse(themesJson);
      } catch (err) {
        console.error('[codex-style-injector] themes parse error', err);
      }
    }

    if (css && css.length > 0) {
      let style = document.getElementById(STYLE_ID);
      if (!style) {
        style = document.createElement('style');
        style.id = STYLE_ID;
        (document.head || document.documentElement).appendChild(style);
      }
      style.textContent = css;
    }

    if (js && js.length > 0) {
      try {
        const fn = new Function(js);
        fn();
      } catch (err) {
        console.error('[codex-style-injector] custom JS error', err);
      }
    }

    window[META_KEY] = {
      appliedAt: new Date().toISOString(),
      cssBytes: css ? css.length : 0,
      jsBytes: js ? js.length : 0,
      themesCount: ${themesObj ? Object.keys(themesObj).length : 0},
      href: location.href,
    };

    return window[META_KEY];
  })();`;
}

function buildSourceBundle(opts, log = () => {}, logError = () => {}) {
  const cssPath = opts.cssPath ? path.resolve(opts.cssPath) : null;
  const jsPath = opts.jsPath ? path.resolve(opts.jsPath) : null;

  const cssText = cssPath
    ? fs.readFileSync(cssPath, 'utf8')
    : (opts.cssText ?? '');

  const jsText = jsPath
    ? fs.readFileSync(jsPath, 'utf8')
    : '';

  const themesObj = loadThemesFromDir(opts.themesDir, log, logError);

  const source = buildInjectionSource(cssText, jsText, themesObj);
  const hash = createHash('sha256')
    .update(cssText)
    .update('\0')
    .update(jsText)
    .update('\0')
    .update(themesObj ? JSON.stringify(themesObj) : '')
    .digest('hex')
    .slice(0, 12);

  return {
    cssPath,
    jsPath,
    themesDir: opts.themesDir ? path.resolve(opts.themesDir) : null,
    cssText,
    jsText,
    themesObj,
    source,
    hash,
  };
}

function getMatchingPages(targets, targetUrlPrefix) {
  return targets.filter((t) => {
    if (t.type !== 'page') {
      return false;
    }
    if (!t.webSocketDebuggerUrl) {
      return false;
    }
    const url = String(t.url ?? '');
    return url.startsWith(targetUrlPrefix);
  });
}

async function injectTarget(target, source) {
  const client = new CdpClient(target.webSocketDebuggerUrl);
  await client.connect();
  try {
    await client.send('Runtime.enable');
    await client.send('Page.enable');
    await client.send('Page.addScriptToEvaluateOnNewDocument', { source });
    const now = await client.send('Runtime.evaluate', {
      expression: source,
      awaitPromise: true,
      returnByValue: true,
    });
    const value = now?.result?.value ?? null;
    return value;
  } finally {
    client.close();
  }
}

function createFileWatchers(filePaths, onChange) {
  const watchers = [];

  for (const absPath of filePaths) {
    const dir = path.dirname(absPath);
    const base = path.basename(absPath);

    let watcher;
    try {
      watcher = fs.watch(dir, { persistent: true }, (eventType, changedName) => {
        if (changedName == null) {
          onChange(absPath, eventType);
          return;
        }

        const changed = String(changedName);
        if (changed === '' || changed === base) {
          onChange(absPath, eventType);
        }
      });
    } catch {
      continue;
    }

    watcher.on('error', () => {});

    watchers.push(watcher);
  }

  return watchers;
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const log = (...args) => { if (!opts.quiet) console.log(...args); };

  let bundle = buildSourceBundle(opts, log, console.error);
  let noTargetsWarned = false;
  let tickRunning = false;
  let queuedTickReason = null;
  let stopRequested = false;
  let reloadTimer = null;

  const injectedHashByTargetId = new Map();
  const watchedPaths = [bundle.cssPath, bundle.jsPath, bundle.themesDir].filter(Boolean);
  const watchers = [];

  const tick = async (reason = 'poll') => {
    if (tickRunning) {
      queuedTickReason = reason;
      return;
    }

    tickRunning = true;
    try {
      const targets = await getTargets(opts.host, opts.port);
      const pages = getMatchingPages(targets, opts.targetUrlPrefix);
      const liveTargetIds = new Set(pages.map((p) => p.id));

      for (const targetId of injectedHashByTargetId.keys()) {
        if (!liveTargetIds.has(targetId)) {
          injectedHashByTargetId.delete(targetId);
        }
      }

      for (const target of pages) {
        const lastInjectedHash = injectedHashByTargetId.get(target.id);
        if (lastInjectedHash === bundle.hash) {
          continue;
        }

        try {
          await injectTarget(target, bundle.source);
          injectedHashByTargetId.set(target.id, bundle.hash);
        } catch {
          // ignore injection errors in quiet mode
        }
      }

      if (pages.length === 0) {
        if (!noTargetsWarned) {
          log('[watch] waiting for Codex...');
          noTargetsWarned = true;
        }
      } else {
        noTargetsWarned = false;
      }
    } finally {
      tickRunning = false;
      if (queuedTickReason && !stopRequested) {
        const nextReason = queuedTickReason;
        queuedTickReason = null;
        await tick(nextReason);
      }
    }
  };

  const reloadBundleFromDisk = async (triggerPath) => {
    let nextBundle;
    try {
      nextBundle = buildSourceBundle(opts, log, console.error);
    } catch {
      return;
    }

    if (nextBundle.hash === bundle.hash) {
      return;
    }

    bundle = nextBundle;
    log('[hot-reload] source updated');

    await tick('hot-reload');
  };

  const scheduleReload = (triggerPath) => {
    if (reloadTimer) {
      clearTimeout(reloadTimer);
    }
    reloadTimer = setTimeout(() => {
      reloadBundleFromDisk(triggerPath).catch(() => {});
    }, 150);
  };

  if (opts.once) {
    await tick('once');
    return;
  }

  if (opts.hotReload && watchedPaths.length > 0) {
    watchers.push(...createFileWatchers(watchedPaths, (absPath, eventType) => {
      scheduleReload(absPath);
    }));
  }

  await tick('startup');

  const interval = setInterval(() => {
    tick('poll').catch(() => {});
  }, opts.intervalMs);

  const stop = () => {
    stopRequested = true;
    clearInterval(interval);
    if (reloadTimer) {
      clearTimeout(reloadTimer);
      reloadTimer = null;
    }
    for (const watcher of watchers) {
      try {
        watcher.close();
      } catch {
        // ignore
      }
    }
    process.exit(0);
  };

  process.on('SIGINT', stop);
  process.on('SIGTERM', stop);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.stack : String(err));
  process.exit(1);
});
