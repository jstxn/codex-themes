(() => {
  const ROOT_ID = '__codex_theme_switcher_root';
  const BACKDROP_ID = '__codex_theme_switcher_backdrop';
  const PANEL_ID = '__codex_theme_switcher_panel';
  const THEME_LIST_ID = '__codex_theme_switcher_list';
  const PREVIEW_NAME_ID = '__codex_theme_preview_name';
  const PREVIEW_PALETTE_ID = '__codex_theme_preview_palette';
  const UI_STYLE_ID = '__codex_theme_switcher_ui_style';
  const THEME_STYLE_ID = '__codex_theme_runtime_style';
  const STORAGE_KEY = '__codex_theme_name';
  const DIFF_FIX_STYLE_ID = '__codex_diff_contrast_fix';
  const DIFF_FIX_OBSERVER_KEY = '__codex_diff_fix_observer';
  const DIFF_FIX_HOST_SIG_ATTR = 'data-codex-diff-fix-sig';
  const DIFF_FIX_VERSION = '2';
  const ESC_HANDLER_KEY = '__codex_theme_esc_handler';

  const DEFAULT_THEMES = {
    'Gruber Darker': {
      background: '#181818',
      foreground: '#e4e4e4',
      cursor: '#ffdb00',
      selectionBg: '#ffffff',
      selectionFg: '#54494e',
      palette: ['#181818', '#ff0a36', '#42dc00', '#ffdb00', '#92a7cb', '#a095cb', '#90aa9e', '#e4e4e4', '#54494e', '#ff3851', '#42dc00', '#ffdb00', '#92a7cb', '#afafda', '#90aa9e', '#f5f5f5'],
    },
    'Catppuccin Mocha': {
      background: '#1e1e2e',
      foreground: '#cdd6f4',
      cursor: '#f5e0dc',
      selectionBg: '#585b70',
      selectionFg: '#cdd6f4',
      palette: ['#45475a', '#f38ba8', '#a6e3a1', '#f9e2af', '#89b4fa', '#f5c2e7', '#94e2d5', '#a6adc8', '#585b70', '#f37799', '#89d88b', '#ebd391', '#74a8fc', '#f2aede', '#6bd7ca', '#bac2de'],
    },
    Dracula: {
      background: '#282a36',
      foreground: '#f8f8f2',
      cursor: '#f8f8f2',
      selectionBg: '#44475a',
      selectionFg: '#ffffff',
      palette: ['#21222c', '#ff5555', '#50fa7b', '#f1fa8c', '#bd93f9', '#ff79c6', '#8be9fd', '#f8f8f2', '#6272a4', '#ff6e6e', '#69ff94', '#ffffa5', '#d6acff', '#ff92df', '#a4ffff', '#ffffff'],
    },
    'Ayu Mirage': {
      background: '#1f2430',
      foreground: '#cccac2',
      cursor: '#ffcc66',
      selectionBg: '#409fff',
      selectionFg: '#1f2430',
      palette: ['#171b24', '#ed8274', '#87d96c', '#facc6e', '#6dcbfa', '#dabafa', '#90e1c6', '#c7c7c7', '#686868', '#f28779', '#d5ff80', '#ffd173', '#73d0ff', '#dfbfff', '#95e6cb', '#ffffff'],
    },
    'Everforest Dark Hard': {
      background: '#1e2326',
      foreground: '#d3c6aa',
      cursor: '#e69875',
      selectionBg: '#4c3743',
      selectionFg: '#d3c6aa',
      palette: ['#7a8478', '#e67e80', '#a7c080', '#dbbc7f', '#7fbbb3', '#d699b6', '#83c092', '#f2efdf', '#a6b0a0', '#f85552', '#8da101', '#dfa000', '#3a94c5', '#df69ba', '#35a77c', '#fffbef'],
    },
    'Flexoki Dark': {
      background: '#100f0f',
      foreground: '#cecdc3',
      cursor: '#cecdc3',
      selectionBg: '#403e3c',
      selectionFg: '#cecdc3',
      palette: ['#100f0f', '#d14d41', '#879a39', '#d0a215', '#4385be', '#ce5d97', '#3aa99f', '#878580', '#575653', '#af3029', '#66800b', '#ad8301', '#205ea6', '#a02f6f', '#24837b', '#cecdc3'],
    },
    'GitHub Dark': {
      background: '#101216',
      foreground: '#8b949e',
      cursor: '#c9d1d9',
      selectionBg: '#3b5070',
      selectionFg: '#ffffff',
      palette: ['#000000', '#f78166', '#56d364', '#e3b341', '#6ca4f8', '#db61a2', '#2b7489', '#ffffff', '#4d4d4d', '#f78166', '#56d364', '#e3b341', '#6ca4f8', '#db61a2', '#2b7489', '#ffffff'],
    },
    'Gruvbox Dark': {
      background: '#282828',
      foreground: '#ebdbb2',
      cursor: '#ebdbb2',
      selectionBg: '#665c54',
      selectionFg: '#ebdbb2',
      palette: ['#282828', '#cc241d', '#98971a', '#d79921', '#458588', '#b16286', '#689d6a', '#a89984', '#928374', '#fb4934', '#b8bb26', '#fabd2f', '#83a598', '#d3869b', '#8ec07c', '#ebdbb2'],
    },
    Nightfox: {
      background: '#192330',
      foreground: '#cdcecf',
      cursor: '#cdcecf',
      selectionBg: '#2b3b51',
      selectionFg: '#cdcecf',
      palette: ['#393b44', '#c94f6d', '#81b29a', '#dbc074', '#719cd6', '#9d79d6', '#63cdcf', '#dfdfe0', '#575860', '#d16983', '#8ebaa4', '#e0c989', '#86abdc', '#baa1e2', '#7ad5d6', '#e4e4e5'],
    },
    Nord: {
      background: '#2e3440',
      foreground: '#d8dee9',
      cursor: '#eceff4',
      selectionBg: '#eceff4',
      selectionFg: '#4c566a',
      palette: ['#3b4252', '#bf616a', '#a3be8c', '#ebcb8b', '#81a1c1', '#b48ead', '#88c0d0', '#e5e9f0', '#596377', '#bf616a', '#a3be8c', '#ebcb8b', '#81a1c1', '#b48ead', '#8fbcbb', '#eceff4'],
    },
    'One Half Dark': {
      background: '#282c34',
      foreground: '#dcdfe4',
      cursor: '#a3b3cc',
      selectionBg: '#474e5d',
      selectionFg: '#dcdfe4',
      palette: ['#282c34', '#e06c75', '#98c379', '#e5c07b', '#61afef', '#c678dd', '#56b6c2', '#dcdfe4', '#5d677a', '#e06c75', '#98c379', '#e5c07b', '#61afef', '#c678dd', '#56b6c2', '#dcdfe4'],
    },
    'TokyoNight Storm': {
      background: '#24283b',
      foreground: '#c0caf5',
      cursor: '#c0caf5',
      selectionBg: '#364a82',
      selectionFg: '#c0caf5',
      palette: ['#1d202f', '#f7768e', '#9ece6a', '#e0af68', '#7aa2f7', '#bb9af7', '#7dcfff', '#a9b1d6', '#4e5575', '#f7768e', '#9ece6a', '#e0af68', '#7aa2f7', '#bb9af7', '#7dcfff', '#c0caf5'],
    },
    'Monokai Pro': {
      background: '#2d2a2e',
      foreground: '#fcfcfa',
      cursor: '#c1c0c0',
      selectionBg: '#5b595c',
      selectionFg: '#fcfcfa',
      palette: ['#2d2a2e', '#ff6188', '#a9dc76', '#ffd866', '#fc9867', '#ab9df2', '#78dce8', '#fcfcfa', '#727072', '#ff6188', '#a9dc76', '#ffd866', '#fc9867', '#ab9df2', '#78dce8', '#fcfcfa'],
    },
    Sonokai: {
      background: '#2c2e34',
      foreground: '#e2e2e3',
      cursor: '#e2e2e3',
      selectionBg: '#414550',
      selectionFg: '#e2e2e3',
      palette: ['#181819', '#fc5d7c', '#9ed072', '#e7c664', '#76cce0', '#b39df3', '#f39660', '#e2e2e3', '#7f8490', '#fc5d7c', '#9ed072', '#e7c664', '#76cce0', '#b39df3', '#f39660', '#e2e2e3'],
    },
    'Catppuccin Macchiato': {
      background: '#24273a',
      foreground: '#cad3f5',
      cursor: '#f4dbd6',
      selectionBg: '#5b6078',
      selectionFg: '#cad3f5',
      palette: ['#494d64', '#ed8796', '#a6da95', '#eed49f', '#8aadf4', '#f5bde6', '#8bd5ca', '#a5adcb', '#5b6078', '#ec7486', '#8ccf7f', '#e1c682', '#78a1f6', '#f2a9dd', '#63cbc0', '#b8c0e0'],
    },
    Material: {
      background: '#eaeaea',
      foreground: '#232322',
      cursor: '#16afca',
      selectionBg: '#c2c2c2',
      selectionFg: '#4e4e4e',
      palette: ['#212121', '#b7141f', '#457b24', '#f6981e', '#134eb2', '#560088', '#0e717c', '#afafaf', '#424242', '#e83b3f', '#7aba3a', '#bfaa00', '#54a4f3', '#aa4dbc', '#26bbd1', '#d9d9d9'],
    },
  };

  const THEMES = window.__CODEX_THEMES__ || DEFAULT_THEMES;
  const ORDER = Object.keys(THEMES).sort((a, b) => {
    const aIdx = Object.keys(DEFAULT_THEMES).indexOf(a);
    const bIdx = Object.keys(DEFAULT_THEMES).indexOf(b);
    if (aIdx === -1 && bIdx === -1) return a.localeCompare(b);
    if (aIdx === -1) return 1;
    if (bIdx === -1) return -1;
    return aIdx - bIdx;
  });

  function hexToRgb(hex) {
    const cleaned = hex.replace('#', '');
    const full = cleaned.length === 3 ? cleaned.split('').map((c) => c + c).join('') : cleaned;
    const n = Number.parseInt(full, 16);
    return {
      r: (n >> 16) & 255,
      g: (n >> 8) & 255,
      b: n & 255,
    };
  }

  function mix(hexA, hexB, ratio) {
    const a = hexToRgb(hexA);
    const b = hexToRgb(hexB);
    const m = (x, y) => Math.round(x * (1 - ratio) + y * ratio);
    const toHex = (v) => v.toString(16).padStart(2, '0');
    return `#${toHex(m(a.r, b.r))}${toHex(m(a.g, b.g))}${toHex(m(a.b, b.b))}`;
  }

  function channelToLinear(value) {
    const normalized = value / 255;
    if (normalized <= 0.04045) {
      return normalized / 12.92;
    }
    return ((normalized + 0.055) / 1.055) ** 2.4;
  }

  function relativeLuminance(hex) {
    const rgb = hexToRgb(hex);
    const r = channelToLinear(rgb.r);
    const g = channelToLinear(rgb.g);
    const b = channelToLinear(rgb.b);
    return (0.2126 * r) + (0.7152 * g) + (0.0722 * b);
  }

  function parseRgb(color) {
    const match = String(color || '').match(/rgba?\\(([^)]+)\\)/i);
    if (!match) {
      return null;
    }
    const parts = match[1].split(',').map((x) => Number.parseFloat(x.trim()));
    if (parts.length < 3) {
      return null;
    }
    return {
      r: parts[0],
      g: parts[1],
      b: parts[2],
      a: Number.isFinite(parts[3]) ? parts[3] : 1,
    };
  }

  function isTooDark(rgb) {
    return Boolean(rgb && rgb.a > 0.05 && rgb.r < 70 && rgb.g < 70 && rgb.b < 70);
  }

  function resolveDiffHost(node) {
    let cur = node;
    if (!cur) {
      return null;
    }

    if (cur.nodeType === Node.DOCUMENT_FRAGMENT_NODE && cur.host) {
      cur = cur.host;
    }

    if (cur.nodeType !== Node.ELEMENT_NODE) {
      cur = cur.parentElement || null;
    }

    while (cur) {
      if (cur.tagName === 'DIFFS-CONTAINER') {
        return cur;
      }
      const root = cur.getRootNode ? cur.getRootNode() : null;
      if (root && root.host) {
        cur = root.host;
        continue;
      }
      cur = cur.parentElement;
    }

    return null;
  }

  function collectDiffHostsFromNode(node, hosts) {
    if (!node || !hosts) {
      return;
    }

    const host = resolveDiffHost(node);
    if (host) {
      hosts.add(host);
    }

    if (node.nodeType !== Node.ELEMENT_NODE) {
      return;
    }

    if (node.tagName === 'DIFFS-CONTAINER') {
      hosts.add(node);
    }

    const descendants = node.querySelectorAll ? node.querySelectorAll('diffs-container') : [];
    for (const diff of descendants) {
      hosts.add(diff);
    }
  }

  function applyDiffShadowContrastFix(options = {}) {
    const { hosts = null, force = false } = options;
    const root = getComputedStyle(document.documentElement);
    const editorFg = root.getPropertyValue('--vscode-editor-foreground').trim() || '#d8dee9';
    const lineFg = root.getPropertyValue('--vscode-editorLineNumber-foreground').trim() || editorFg;
    const secondaryFg = root.getPropertyValue('--color-token-foreground-secondary').trim() || editorFg;
    const tertiaryFg = root.getPropertyValue('--color-token-foreground-tertiary').trim() || secondaryFg;
    const sig = `${DIFF_FIX_VERSION}|${editorFg}|${lineFg}|${secondaryFg}|${tertiaryFg}`;
    const targetHosts = Array.isArray(hosts) && hosts.length > 0
      ? hosts
      : Array.from(document.querySelectorAll('diffs-container'));
    const fromMutation = Array.isArray(hosts);

    for (const host of targetHosts) {
      if (!host || host.tagName !== 'DIFFS-CONTAINER') {
        continue;
      }
      const shadow = host.shadowRoot;
      if (!shadow) {
        continue;
      }

      const shouldProcess = force || fromMutation || host.getAttribute(DIFF_FIX_HOST_SIG_ATTR) !== sig;
      if (!shouldProcess) {
        continue;
      }

      let styleEl = shadow.getElementById(DIFF_FIX_STYLE_ID);
      if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = DIFF_FIX_STYLE_ID;
        shadow.appendChild(styleEl);
      }

      styleEl.textContent = `
:host {
  --diffs-fg: ${editorFg} !important;
  --diffs-fg-number: ${lineFg} !important;
  --diffs-light: ${editorFg} !important;
  --diffs-dark-bg: transparent !important;
  --color-text-foreground: ${editorFg} !important;
  --color-text-foreground-secondary: ${secondaryFg} !important;
  --color-text-foreground-tertiary: ${tertiaryFg} !important;
  --gray-1000: ${editorFg} !important;
}
pre, code {
  color: ${editorFg} !important;
}
pre span:not([class]):not([style]),
code span:not([class]):not([style]) {
  color: ${editorFg} !important;
}
`;

      // Ensure plaintext pre/code is readable; syntax tokens with explicit colors are preserved.
      for (const el of Array.from(shadow.querySelectorAll('pre, code'))) {
        el.style.setProperty('color', editorFg, 'important');
      }

      // Keep syntax colors intact, only lift near-black plaintext/readability failures.
      for (const el of Array.from(shadow.querySelectorAll('pre span, code span, pre div, code div'))) {
        const rgb = parseRgb(getComputedStyle(el).color);
        if (!isTooDark(rgb)) {
          continue;
        }
        el.style.setProperty('color', editorFg, 'important');
      }

      host.setAttribute(DIFF_FIX_HOST_SIG_ATTR, sig);
    }
  }

  const scheduleDiffShadowContrastFix = (() => {
    let timer = null;
    const pendingHosts = new Set();
    let forceAll = false;

    return (input = null) => {
      if (input === 'all') {
        forceAll = true;
      } else if (Array.isArray(input)) {
        for (const host of input) {
          if (host) {
            pendingHosts.add(host);
          }
        }
      } else if (input && input.tagName === 'DIFFS-CONTAINER') {
        pendingHosts.add(input);
      }

      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        timer = null;
        const hosts = forceAll ? null : Array.from(pendingHosts);
        pendingHosts.clear();
        const force = forceAll;
        forceAll = false;
        applyDiffShadowContrastFix({ hosts, force });
      }, 30);
    };
  })();

  function ensureDiffFixObserver() {
    const existing = window[DIFF_FIX_OBSERVER_KEY];
    if (existing) {
      existing.disconnect();
    }
    const observer = new MutationObserver((records) => {
      const hosts = new Set();
      for (const record of records) {
        collectDiffHostsFromNode(record.target, hosts);
        if (record.addedNodes) {
          for (const node of record.addedNodes) {
            collectDiffHostsFromNode(node, hosts);
          }
        }
      }
      if (hosts.size > 0) {
        scheduleDiffShadowContrastFix(Array.from(hosts));
      }
    });
    observer.observe(document.documentElement, { subtree: true, childList: true });
    window[DIFF_FIX_OBSERVER_KEY] = observer;
  }

  function buildThemeCss(name, theme) {
    const bg2 = mix(theme.background, theme.palette[8] || theme.foreground, 0.3);
    const bg3 = mix(theme.background, theme.foreground, 0.12);
    const text2 = mix(theme.foreground, theme.background, 0.28);
    const text3 = mix(theme.foreground, theme.background, 0.45);
    const mutedText = mix(theme.foreground, theme.background, 0.38);
    const disabledText = mix(theme.foreground, theme.background, 0.56);
    const placeholderText = mix(theme.foreground, theme.background, 0.34);
    const iconText = mix(theme.foreground, theme.background, 0.22);
    const lineNumberText = mix(theme.foreground, theme.background, 0.5);
    const border = mix(theme.selectionBg, theme.background, 0.5);
    const mutedBorder = mix(border, theme.background, 0.4);
    const panelBg = mix(theme.background, bg2, 0.35);
    const elevatedBg = mix(bg2, theme.foreground, 0.08);
    const inputBg = mix(theme.background, bg2, 0.52);
    const hoverBg = mix(bg2, theme.foreground, 0.14);
    const activeBg = mix(bg2, theme.palette[4] || theme.cursor, 0.22);
    const tabActive = mix(bg2, theme.foreground, 0.05);
    const tabInactive = mix(theme.background, bg2, 0.44);
    const terminalBg = mix(theme.background, '#000000', 0.18);
    const accent = theme.palette[4] || theme.cursor;
    const p = theme.palette;
    const ansiBlack = mix(p[0] || theme.background, theme.foreground, 0.34);
    const ansiBrightBlack = p[8] || text3;
    const diffAddFg = mix(p[2] || accent, theme.foreground, 0.45);
    const diffRemoveFg = mix(p[1] || accent, theme.foreground, 0.45);
    const diffAddBg = mix(p[2] || bg2, theme.background, 0.84);
    const diffRemoveBg = mix(p[1] || bg2, theme.background, 0.84);
    const diffNeutralFg = text2;

    return `
:root {
  --token-bg-primary: ${theme.background} !important;
  --token-bg-secondary: ${bg2} !important;
  --token-bg-tertiary: ${bg3} !important;
  --token-text-primary: ${theme.foreground} !important;
  --token-text-secondary: ${text2} !important;
  --token-text-tertiary: ${text3} !important;
  --token-border: ${border} !important;
  --token-focus: ${theme.cursor} !important;

  --color-token-bg-primary: ${theme.background} !important;
  --color-token-bg-secondary: ${bg2} !important;
  --color-token-bg-tertiary: ${bg3} !important;
  --color-token-main-surface-primary: ${theme.background} !important;
  --color-token-main-surface-secondary: ${panelBg} !important;
  --color-token-main-surface-tertiary: ${elevatedBg} !important;
  --color-token-side-bar-background: ${panelBg} !important;
  --color-token-input-background: ${inputBg} !important;
  --color-token-input-foreground: ${theme.foreground} !important;
  --color-token-input-border: ${mutedBorder} !important;
  --color-token-terminal-background: ${terminalBg} !important;
  --color-token-border-subtle: ${mutedBorder} !important;
  --color-token-border-strong: ${border} !important;
  --color-token-foreground-primary: ${theme.foreground} !important;
  --color-token-foreground-secondary: ${text2} !important;
  --color-token-foreground-tertiary: ${text3} !important;
  --color-token-foreground-muted: ${mutedText} !important;
  --color-token-foreground-disabled: ${disabledText} !important;
  --color-token-accent: ${accent} !important;

  --vscode-foreground: ${theme.foreground} !important;
  --vscode-descriptionForeground: ${text2} !important;
  --vscode-disabledForeground: ${disabledText} !important;
  --vscode-icon-foreground: ${iconText} !important;
  --vscode-focusBorder: ${theme.cursor} !important;
  --vscode-widget-border: ${mutedBorder} !important;
  --vscode-widget-shadow: rgba(0,0,0,.45) !important;

  --vscode-editor-background: ${theme.background} !important;
  --vscode-editor-foreground: ${theme.foreground} !important;
  --vscode-editorLineNumber-foreground: ${lineNumberText} !important;
  --vscode-editorLineNumber-activeForeground: ${text2} !important;
  --vscode-editorWhitespace-foreground: ${lineNumberText} !important;
  --vscode-minimap-foregroundOpacity: ${lineNumberText} !important;
  --vscode-editorCursor-foreground: ${theme.cursor} !important;
  --vscode-editorWidget-background: ${panelBg} !important;
  --vscode-editorWidget-border: ${mutedBorder} !important;

  --vscode-sideBar-background: ${panelBg} !important;
  --vscode-sideBar-foreground: ${theme.foreground} !important;
  --vscode-sideBarSectionHeader-background: ${elevatedBg} !important;
  --vscode-sideBarSectionHeader-foreground: ${text2} !important;
  --vscode-activityBar-background: ${panelBg} !important;
  --vscode-activityBar-foreground: ${theme.foreground} !important;

  --vscode-panel-background: ${theme.background} !important;
  --vscode-panel-border: ${mutedBorder} !important;
  --vscode-terminal-background: ${terminalBg} !important;
  --vscode-terminal-foreground: ${theme.foreground} !important;
  --vscode-terminal-ansiBlack: ${ansiBlack} !important;
  --vscode-terminal-ansiRed: ${p[1] || accent} !important;
  --vscode-terminal-ansiGreen: ${p[2] || accent} !important;
  --vscode-terminal-ansiYellow: ${p[3] || accent} !important;
  --vscode-terminal-ansiBlue: ${p[4] || accent} !important;
  --vscode-terminal-ansiMagenta: ${p[5] || accent} !important;
  --vscode-terminal-ansiCyan: ${p[6] || accent} !important;
  --vscode-terminal-ansiWhite: ${p[7] || theme.foreground} !important;
  --vscode-terminal-ansiBrightBlack: ${ansiBrightBlack} !important;
  --vscode-terminal-ansiBrightRed: ${p[9] || accent} !important;
  --vscode-terminal-ansiBrightGreen: ${p[10] || accent} !important;
  --vscode-terminal-ansiBrightYellow: ${p[11] || accent} !important;
  --vscode-terminal-ansiBrightBlue: ${p[12] || accent} !important;
  --vscode-terminal-ansiBrightMagenta: ${p[13] || accent} !important;
  --vscode-terminal-ansiBrightCyan: ${p[14] || accent} !important;
  --vscode-terminal-ansiBrightWhite: ${p[15] || theme.foreground} !important;

  --vscode-input-background: ${inputBg} !important;
  --vscode-input-foreground: ${theme.foreground} !important;
  --vscode-input-border: ${mutedBorder} !important;
  --vscode-input-placeholderForeground: ${placeholderText} !important;
  --vscode-dropdown-background: ${inputBg} !important;
  --vscode-dropdown-foreground: ${theme.foreground} !important;
  --vscode-dropdown-border: ${mutedBorder} !important;

  --vscode-tab-activeBackground: ${tabActive} !important;
  --vscode-tab-activeForeground: ${theme.foreground} !important;
  --vscode-tab-inactiveBackground: ${tabInactive} !important;
  --vscode-tab-inactiveForeground: ${text2} !important;
  --vscode-tab-border: ${mutedBorder} !important;

  --vscode-list-hoverBackground: ${hoverBg} !important;
  --vscode-list-activeSelectionBackground: ${activeBg} !important;
  --vscode-list-activeSelectionForeground: ${theme.foreground} !important;
  --vscode-list-inactiveSelectionBackground: ${hoverBg} !important;

  --vscode-statusBar-background: ${panelBg} !important;
  --vscode-statusBar-foreground: ${theme.foreground} !important;
  --vscode-textLink-foreground: ${accent} !important;
  --vscode-textPreformat-foreground: ${theme.foreground} !important;

  --vscode-diffEditor-insertedTextForeground: ${diffAddFg} !important;
  --vscode-diffEditor-insertedTextBackground: ${diffAddBg} !important;
  --vscode-diffEditor-insertedLineBackground: ${diffAddBg} !important;
  --vscode-diffEditor-removedTextForeground: ${diffRemoveFg} !important;
  --vscode-diffEditor-removedTextBackground: ${diffRemoveBg} !important;
  --vscode-diffEditor-removedLineBackground: ${diffRemoveBg} !important;
  --vscode-diffEditor-unchangedRegionForeground: ${diffNeutralFg} !important;
  --vscode-diffEditor-unchangedRegionBackground: ${panelBg} !important;
}

[data-codex-window-type="electron"] {
  background: radial-gradient(1200px 600px at 10% -20%, ${mix(theme.palette[4] || theme.cursor, theme.background, 0.8)} 0%, transparent 55%),
              radial-gradient(1000px 500px at 95% 0%, ${mix(theme.palette[5] || theme.cursor, theme.background, 0.78)} 0%, transparent 50%),
              ${theme.background} !important;
}

[data-codex-window-type="electron"],
[data-codex-window-type="electron"] body,
[data-codex-window-type="electron"] .main-surface {
  background-color: var(--color-token-main-surface-primary) !important;
  color: var(--color-token-foreground-primary) !important;
}

[data-codex-window-type="electron"] .bg-token-input-background,
[data-codex-window-type="electron"] input,
[data-codex-window-type="electron"] textarea,
[data-codex-window-type="electron"] select {
  background-color: var(--color-token-input-background) !important;
  color: var(--color-token-input-foreground) !important;
  border-color: var(--color-token-input-border) !important;
}

[data-codex-window-type="electron"] input::placeholder,
[data-codex-window-type="electron"] textarea::placeholder {
  color: var(--vscode-input-placeholderForeground) !important;
  opacity: 0.96 !important;
}

[data-codex-window-type="electron"] button svg,
[data-codex-window-type="electron"] [role="button"] svg,
[data-codex-window-type="electron"] [aria-haspopup] svg {
  color: var(--vscode-icon-foreground) !important;
  fill: currentColor !important;
  stroke: currentColor !important;
}

[data-codex-window-type="electron"] [class*="text-token-foreground-tertiary"],
[data-codex-window-type="electron"] [class*="text-token-text-tertiary"] {
  color: var(--color-token-foreground-tertiary) !important;
  opacity: 0.95 !important;
}

[data-codex-window-type="electron"] [class*="text-token-foreground-secondary"],
[data-codex-window-type="electron"] [class*="text-token-text-secondary"] {
  color: var(--color-token-foreground-secondary) !important;
}

[data-codex-window-type="electron"] .bg-token-terminal-background {
  background-color: var(--color-token-terminal-background) !important;
  color: var(--vscode-terminal-foreground) !important;
}

[data-codex-window-type="electron"] .xterm span[style*="color: rgb(0, 0, 0)"],
[data-codex-window-type="electron"] .xterm span[style*="color: rgba(0, 0, 0"] {
  color: var(--vscode-terminal-ansiBlack) !important;
}

[data-codex-window-type="electron"] pre,
[data-codex-window-type="electron"] code,
[data-codex-window-type="electron"] [class*="line-number"],
[data-codex-window-type="electron"] [class*="lineNumber"] {
  color: var(--vscode-editor-foreground) !important;
}

[data-codex-window-type="electron"] pre span[style*="color"],
[data-codex-window-type="electron"] code span[style*="color"] {
  color: color-mix(in oklab, var(--vscode-editor-foreground) 70%, currentColor 30%) !important;
}

[data-codex-window-type="electron"] [class*="diff"] pre,
[data-codex-window-type="electron"] [class*="diff"] code,
[data-codex-window-type="electron"] [class*="viewer"] pre,
[data-codex-window-type="electron"] [class*="viewer"] code {
  color: var(--vscode-textPreformat-foreground) !important;
}

[data-codex-window-type="electron"] [class*="diff"],
[data-codex-window-type="electron"] [data-testid*="diff"],
[data-codex-window-type="electron"] [class*="file-view"],
[data-codex-window-type="electron"] [class*="viewer"] {
  color: var(--vscode-editor-foreground) !important;
}

[data-codex-window-type="electron"] diffs-container,
[data-codex-window-type="electron"] [class*="file-diff"] {
  --diffs-fg: var(--vscode-editor-foreground) !important;
  --diffs-fg-number: var(--vscode-editorLineNumber-foreground) !important;
  --diffs-light: var(--vscode-editor-foreground) !important;
  --diffs-dark-bg: var(--color-token-main-surface-primary) !important;
  --color-text-foreground: var(--vscode-editor-foreground) !important;
  --color-text-foreground-secondary: var(--color-token-foreground-secondary) !important;
  --color-text-foreground-tertiary: var(--color-token-foreground-tertiary) !important;
  --gray-1000: var(--vscode-editor-foreground) !important;
  color: var(--vscode-editor-foreground) !important;
}

[data-codex-window-type="electron"] [class*="diff"] [class*="font-mono"],
[data-codex-window-type="electron"] [data-testid*="diff"] [class*="font-mono"],
[data-codex-window-type="electron"] [class*="file-view"] [class*="font-mono"],
[data-codex-window-type="electron"] [class*="viewer"] [class*="font-mono"] {
  color: color-mix(in oklab, var(--vscode-editor-foreground) 84%, currentColor 16%) !important;
}

[data-codex-window-type="electron"] [class*="font-mono"] {
  color: color-mix(in oklab, var(--vscode-editor-foreground) 88%, currentColor 12%) !important;
}

[data-codex-window-type="electron"] [class*="font-mono"] span,
[data-codex-window-type="electron"] [class*="font-mono"] div {
  color: color-mix(in oklab, var(--vscode-editor-foreground) 86%, currentColor 14%) !important;
}

[data-codex-window-type="electron"] [class*="diff"] [style*="color:#000"],
[data-codex-window-type="electron"] [class*="diff"] [style*="color: #000"],
[data-codex-window-type="electron"] [class*="diff"] [style*="color:#111"],
[data-codex-window-type="electron"] [class*="diff"] [style*="color: #111"],
[data-codex-window-type="electron"] [class*="diff"] [style*="color:#24292e"],
[data-codex-window-type="electron"] [class*="diff"] [style*="color: #24292e"],
[data-codex-window-type="electron"] [class*="diff"] [style*="color: rgb(0, 0, 0)"],
[data-codex-window-type="electron"] [class*="diff"] [style*="color: rgba(0, 0, 0"],
[data-codex-window-type="electron"] [data-testid*="diff"] [style*="color:#000"],
[data-codex-window-type="electron"] [data-testid*="diff"] [style*="color: #000"],
[data-codex-window-type="electron"] [data-testid*="diff"] [style*="color:#111"],
[data-codex-window-type="electron"] [data-testid*="diff"] [style*="color: #111"],
[data-codex-window-type="electron"] [data-testid*="diff"] [style*="color:#24292e"],
[data-codex-window-type="electron"] [data-testid*="diff"] [style*="color: #24292e"],
[data-codex-window-type="electron"] [data-testid*="diff"] [style*="color: rgb(0, 0, 0)"],
[data-codex-window-type="electron"] [data-testid*="diff"] [style*="color: rgba(0, 0, 0"],
[data-codex-window-type="electron"] [class*="file-view"] [style*="color:#000"],
[data-codex-window-type="electron"] [class*="file-view"] [style*="color: #000"],
[data-codex-window-type="electron"] [class*="file-view"] [style*="color:#111"],
[data-codex-window-type="electron"] [class*="file-view"] [style*="color: #111"],
[data-codex-window-type="electron"] [class*="file-view"] [style*="color:#24292e"],
[data-codex-window-type="electron"] [class*="file-view"] [style*="color: #24292e"],
[data-codex-window-type="electron"] [class*="file-view"] [style*="color: rgb(0, 0, 0)"],
[data-codex-window-type="electron"] [class*="file-view"] [style*="color: rgba(0, 0, 0"],
[data-codex-window-type="electron"] [class*="viewer"] [style*="color:#000"],
[data-codex-window-type="electron"] [class*="viewer"] [style*="color: #000"],
[data-codex-window-type="electron"] [class*="viewer"] [style*="color:#111"],
[data-codex-window-type="electron"] [class*="viewer"] [style*="color: #111"],
[data-codex-window-type="electron"] [class*="viewer"] [style*="color:#24292e"],
[data-codex-window-type="electron"] [class*="viewer"] [style*="color: #24292e"],
[data-codex-window-type="electron"] [class*="viewer"] [style*="color: rgb(0, 0, 0)"],
[data-codex-window-type="electron"] [class*="viewer"] [style*="color: rgba(0, 0, 0"] {
  color: var(--vscode-editor-foreground) !important;
}

[data-codex-window-type="electron"] pre .hljs,
[data-codex-window-type="electron"] pre .hljs *,
[data-codex-window-type="electron"] code .hljs,
[data-codex-window-type="electron"] code .hljs *,
[data-codex-window-type="electron"] pre .token,
[data-codex-window-type="electron"] pre .token *,
[data-codex-window-type="electron"] code .token,
[data-codex-window-type="electron"] code .token * {
  color: color-mix(in oklab, var(--vscode-editor-foreground) 72%, currentColor 28%) !important;
}

[data-codex-window-type="electron"] pre span[style*="color:#000"],
[data-codex-window-type="electron"] pre span[style*="color: #000"],
[data-codex-window-type="electron"] pre span[style*="color:#111"],
[data-codex-window-type="electron"] pre span[style*="color: #111"],
[data-codex-window-type="electron"] pre span[style*="color:#24292e"],
[data-codex-window-type="electron"] pre span[style*="color: #24292e"],
[data-codex-window-type="electron"] pre span[style*="color: rgb(0, 0, 0)"],
[data-codex-window-type="electron"] pre span[style*="color: rgba(0, 0, 0"],
[data-codex-window-type="electron"] code span[style*="color:#000"],
[data-codex-window-type="electron"] code span[style*="color: #000"],
[data-codex-window-type="electron"] code span[style*="color:#111"],
[data-codex-window-type="electron"] code span[style*="color: #111"],
[data-codex-window-type="electron"] code span[style*="color:#24292e"],
[data-codex-window-type="electron"] code span[style*="color: #24292e"],
[data-codex-window-type="electron"] code span[style*="color: rgb(0, 0, 0)"],
[data-codex-window-type="electron"] code span[style*="color: rgba(0, 0, 0"] {
  color: var(--vscode-editor-foreground) !important;
}

::selection {
  background: ${theme.selectionBg} !important;
  color: ${theme.selectionFg} !important;
}

[data-codex-window-type="electron"] button,
[data-codex-window-type="electron"] [role="button"] {
  border-radius: 10px !important;
}

[data-codex-window-type="electron"] pre,
[data-codex-window-type="electron"] code {
  caret-color: ${theme.cursor} !important;
}

[data-codex-window-type="electron"] {
  --ghostty-palette-0: ${theme.palette[0]};
  --ghostty-palette-1: ${theme.palette[1]};
  --ghostty-palette-2: ${theme.palette[2]};
  --ghostty-palette-3: ${theme.palette[3]};
  --ghostty-palette-4: ${theme.palette[4]};
  --ghostty-palette-5: ${theme.palette[5]};
  --ghostty-palette-6: ${theme.palette[6]};
  --ghostty-palette-7: ${theme.palette[7]};
  --ghostty-palette-8: ${theme.palette[8]};
  --ghostty-palette-9: ${theme.palette[9]};
  --ghostty-palette-10: ${theme.palette[10]};
  --ghostty-palette-11: ${theme.palette[11]};
  --ghostty-palette-12: ${theme.palette[12]};
  --ghostty-palette-13: ${theme.palette[13]};
  --ghostty-palette-14: ${theme.palette[14]};
  --ghostty-palette-15: ${theme.palette[15]};
}
`;
  }

  function ensureStyleEl(id) {
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement('style');
      el.id = id;
      (document.head || document.documentElement).appendChild(el);
    }
    return el;
  }

  function applyTheme(name, options = {}) {
    const {
      persist = true,
      updateCurrent = true,
      updateSelect = true,
    } = options;

    const theme = THEMES[name];
    if (!theme) {
      return;
    }
    const styleEl = ensureStyleEl(THEME_STYLE_ID);
    styleEl.textContent = buildThemeCss(name, theme);

    if (persist) {
      localStorage.setItem(STORAGE_KEY, name);
    }

    const current = document.getElementById('__codex_theme_switcher_current');
    if (current && updateCurrent) {
      current.textContent = name;
    }

    const select = document.getElementById('__codex_theme_switcher_select');
    if (select && updateSelect) {
      select.value = name;
    }

    scheduleDiffShadowContrastFix();
  }

  function ensureUiCss() {
    const styleEl = ensureStyleEl(UI_STYLE_ID);
    styleEl.textContent = `
#${ROOT_ID} {
  position: fixed;
  right: 14px;
  bottom: 14px;
  z-index: 2147483645;
  font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
}
#${ROOT_ID} #__codex_theme_switcher_toggle {
  border: 1px solid var(--color-token-border-subtle, rgba(255,255,255,.16));
  background: color-mix(in oklab, var(--color-token-main-surface-secondary, rgba(10,12,16,.88)) 70%, var(--color-token-accent, #8aadf4) 10%);
  color: transparent;
  background-clip: padding-box;
  border-radius: 10px;
  padding: 7px 10px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  backdrop-filter: blur(8px);
  position: relative;
}
#${ROOT_ID} #__codex_theme_switcher_toggle::before {
  content: 'Theme';
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(90deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3, #54a0ff, #5f27cd, #00d2d3, #1dd1a1);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: __codex_rainbow_shift 4s linear infinite;
}
@keyframes __codex_rainbow_shift {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}
#${ROOT_ID} #__codex_theme_switcher_toggle:hover {
  background: color-mix(in oklab, var(--color-token-main-surface-secondary, rgba(28,33,44,.92)) 60%, var(--color-token-accent, #8aadf4) 25%);
}
#${BACKDROP_ID} {
  position: fixed;
  inset: 0;
  z-index: 2147483646;
  display: none;
  align-items: center;
  justify-content: center;
  background: color-mix(in oklab, var(--color-token-main-surface-primary, #0b0f14) 38%, #000 62%);
  backdrop-filter: blur(4px);
}
#${BACKDROP_ID}.open {
  display: flex;
}
#${PANEL_ID} {
  position: relative;
  border: 1px solid var(--color-token-border-strong, rgba(255,255,255,.15));
  background: color-mix(in oklab, var(--color-token-main-surface-primary, #10141c) 92%, var(--color-token-main-surface-secondary, #1a2230) 8%);
  color: var(--color-token-foreground-primary, #d5deea);
  border-radius: 14px;
  width: min(1120px, calc(100vw - 24px));
  height: min(78vh, calc(100vh - 24px));
  min-height: 520px;
  box-shadow: 0 18px 55px color-mix(in oklab, var(--color-token-main-surface-primary, #0d1117) 24%, #000 76%);
  backdrop-filter: blur(10px);
  overflow: hidden;
}
#${PANEL_ID}.hidden { display: none; }
#${PANEL_ID} .modal-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;
  min-height: 0;
}
#${PANEL_ID} .left-pane {
  border-right: 1px solid var(--color-token-border-subtle, rgba(255,255,255,.12));
  padding: 14px;
  min-height: 0;
  display: flex;
  flex-direction: column;
}
#${PANEL_ID} .right-pane {
  padding: 14px;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
#${PANEL_ID} .pane-title {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.02em;
}
#${PANEL_ID} .pane-subtitle {
  font-size: 11px;
  color: var(--color-token-foreground-secondary, #b2bdc8);
  margin-top: 2px;
}
#${THEME_LIST_ID} {
  margin-top: 10px;
  flex: 1;
  min-height: 0;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-right: 4px;
}
#${THEME_LIST_ID}:focus-visible {
  outline: none;
}
#${PANEL_ID} .theme-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  border: 1px solid var(--color-token-border-subtle, rgba(255,255,255,.1));
  border-radius: 9px;
  background: color-mix(in oklab, var(--color-token-main-surface-secondary, #1f2430) 88%, var(--color-token-main-surface-primary, #12161f) 12%);
  color: var(--color-token-foreground-primary, #d5deea);
  padding: 8px 10px;
  font-size: 12px;
  text-align: left;
  cursor: pointer;
}
#${PANEL_ID} .theme-item:hover {
  background: var(--vscode-list-hoverBackground, rgba(255,255,255,.08));
}
#${PANEL_ID} .theme-item.is-preview {
  border-color: var(--vscode-focusBorder, #8aadf4);
  background: color-mix(in oklab, var(--vscode-focusBorder, #8aadf4) 24%, var(--color-token-main-surface-secondary, #1f2430));
}
#${PANEL_ID} .theme-item:focus-visible {
  outline: 1px solid var(--vscode-focusBorder, #8aadf4);
  outline-offset: 1px;
}
#${PANEL_ID} .theme-meta {
  font-size: 10px;
  color: var(--color-token-foreground-tertiary, #95a4b2);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
#${PANEL_ID} .theme-item.is-committed .theme-meta {
  opacity: 1;
  color: var(--color-token-accent, #8aadf4);
}
#${PANEL_ID} .current-row {
  margin-top: 10px;
  font-size: 11px;
  color: var(--color-token-foreground-secondary, #b2bdc8);
}
#${PANEL_ID} .current-label {
  color: var(--color-token-foreground-tertiary, #95a4b2);
}
#${PANEL_ID} .current-value {
  margin-left: 4px;
  font-weight: 600;
}
#${PANEL_ID} .preview-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 8px;
}
#${PANEL_ID} .preview-name {
  font-size: 12px;
  color: var(--color-token-foreground-secondary, #b2bdc8);
}
#${PREVIEW_PALETTE_ID} {
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  gap: 6px;
}
#${PANEL_ID} .swatch {
  height: 22px;
  border-radius: 6px;
  border: 1px solid color-mix(in oklab, var(--sw, #000) 36%, var(--color-token-border-subtle, rgba(255,255,255,.12)) 64%);
  background: var(--sw);
  position: relative;
}
#${PANEL_ID} .swatch-label {
  position: absolute;
  bottom: 2px;
  right: 4px;
  font-size: 9px;
  color: var(--sw-label, rgba(255,255,255,.86));
  text-shadow: 0 1px 2px var(--sw-shadow, rgba(0,0,0,.65));
}
#${PANEL_ID} .preview-cards {
  flex: 1;
  min-height: 0;
  overflow: auto;
  display: grid;
  align-content: start;
  gap: 10px;
}
#${PANEL_ID} .preview-card {
  border: 1px solid var(--color-token-border-subtle, rgba(255,255,255,.14));
  border-radius: 10px;
  background: color-mix(in oklab, var(--color-token-main-surface-secondary, #1f2430) 90%, transparent);
  padding: 10px;
}
#${PANEL_ID} .preview-card-title {
  font-size: 11px;
  color: var(--color-token-foreground-secondary, #b2bdc8);
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
#${PANEL_ID} .sample-primary {
  margin: 0;
  color: var(--color-token-foreground-primary, #e6edf3);
}
#${PANEL_ID} .sample-secondary {
  margin: 6px 0 0;
  color: var(--color-token-foreground-secondary, #b2bdc8);
}
#${PANEL_ID} .sample-tertiary {
  margin: 6px 0 0;
  color: var(--color-token-foreground-tertiary, #95a4b2);
}
#${PANEL_ID} .inline-pill {
  margin-top: 8px;
  display: inline-block;
  border: 1px solid var(--color-token-input-border, rgba(255,255,255,.2));
  border-radius: 999px;
  padding: 2px 8px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 11px;
  color: var(--color-token-foreground-primary, #e6edf3);
}
#${PANEL_ID} .preview-label {
  display: block;
  font-size: 11px;
  color: var(--color-token-foreground-secondary, #b2bdc8);
  margin-bottom: 4px;
}
#${PANEL_ID} .preview-input {
  width: 100%;
  border-radius: 8px;
  border: 1px solid var(--color-token-input-border, rgba(255,255,255,.2));
  background: var(--color-token-input-background, rgba(255,255,255,.06));
  color: var(--color-token-input-foreground, #d5deea);
  padding: 7px 8px;
  font-size: 12px;
}
#${PANEL_ID} .preview-controls {
  margin-top: 8px;
  display: flex;
  gap: 8px;
  align-items: center;
}
#${PANEL_ID} .preview-btn {
  border: 1px solid var(--color-token-input-border, rgba(255,255,255,.16));
  border-radius: 8px;
  padding: 5px 8px;
  font-size: 11px;
  color: var(--color-token-input-foreground, #d5deea);
  background: var(--color-token-input-background, rgba(255,255,255,.06));
}
#${PANEL_ID} .preview-btn.primary {
  border-color: color-mix(in oklab, var(--color-token-accent, #8aadf4) 45%, var(--color-token-input-border, rgba(255,255,255,.2)));
  background: color-mix(in oklab, var(--color-token-accent, #8aadf4) 26%, var(--color-token-input-background, rgba(255,255,255,.06)));
}
#${PANEL_ID} .preview-badge {
  margin-left: auto;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  border-radius: 999px;
  padding: 2px 7px;
  border: 1px solid var(--color-token-border-subtle, rgba(255,255,255,.2));
  color: var(--color-token-foreground-secondary, #b2bdc8);
}
#${PANEL_ID} .preview-diff {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 11px;
  border: 1px solid var(--color-token-border-subtle, rgba(255,255,255,.16));
  border-radius: 8px;
  overflow: hidden;
}
#${PANEL_ID} .preview-diff-line {
  display: grid;
  grid-template-columns: 24px 16px 1fr;
  gap: 6px;
  padding: 3px 8px;
}
#${PANEL_ID} .preview-diff-line.add {
  background: var(--vscode-diffEditor-insertedTextBackground, rgba(0,162,64,.15));
  color: var(--vscode-diffEditor-insertedTextForeground, #b7d0a9);
}
#${PANEL_ID} .preview-diff-line.remove {
  background: var(--vscode-diffEditor-removedTextBackground, rgba(224,46,42,.15));
  color: var(--vscode-diffEditor-removedTextForeground, #dea0a7);
}
#${PANEL_ID} .preview-diff-line.plain {
  background: color-mix(in oklab, var(--color-token-main-surface-primary, #1f2430) 84%, transparent);
  color: var(--vscode-editor-foreground, #d8dee9);
}
#${PANEL_ID} .preview-diff-line .ln {
  color: var(--vscode-editorLineNumber-foreground, #8f9bad);
}
#${PANEL_ID} .preview-terminal {
  margin: 0;
  border: 1px solid var(--color-token-border-subtle, rgba(255,255,255,.16));
  border-radius: 8px;
  background: var(--vscode-terminal-background, #141414);
  color: var(--vscode-terminal-foreground, #d8dee9);
  padding: 8px;
  font-size: 11px;
  line-height: 1.45;
  overflow: auto;
}
#${PANEL_ID} .preview-terminal .prompt {
  color: var(--vscode-terminal-ansiGreen, #8ccf7f);
}
#${PANEL_ID} .preview-terminal .ok {
  color: var(--vscode-terminal-ansiCyan, #63cbc0);
}
#${PANEL_ID} .actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  padding-top: 8px;
  border-top: 1px solid var(--color-token-border-subtle, rgba(255,255,255,.1));
}
#${PANEL_ID} button {
  border: 1px solid var(--color-token-input-border, rgba(255,255,255,.16));
  background: var(--color-token-input-background, rgba(10,12,16,.88));
  color: var(--color-token-foreground-primary, #d5deea);
  border-radius: 10px;
  padding: 7px 10px;
  font-size: 12px;
  cursor: pointer;
}
#${PANEL_ID} button:hover {
  background: var(--vscode-list-hoverBackground, rgba(28,33,44,.92));
}
@media (max-width: 980px) {
  #${PANEL_ID} {
    height: min(86vh, calc(100vh - 16px));
  }
  #${PANEL_ID} .modal-layout {
    grid-template-columns: 1fr;
    grid-template-rows: minmax(220px, 42%) 1fr;
  }
  #${PANEL_ID} .left-pane {
    border-right: none;
    border-bottom: 1px solid var(--color-token-border-subtle, rgba(255,255,255,.12));
  }
}
`;
  }

  function mountUi() {
    let root = document.getElementById(ROOT_ID);
    if (!root) {
      root = document.createElement('div');
      root.id = ROOT_ID;
      document.documentElement.appendChild(root);
    }

    root.innerHTML = `
      <button id="__codex_theme_switcher_toggle" type="button">Theme</button>
      <div id="${BACKDROP_ID}">
        <div id="${PANEL_ID}" class="hidden" role="dialog" aria-modal="true" aria-label="Theme switcher">
          <div class="modal-layout">
            <section class="left-pane">
              <div class="pane-title">Theme Presets</div>
              <div class="pane-subtitle">Arrow keys preview instantly. Enter applies.</div>
              <div id="${THEME_LIST_ID}" role="listbox" aria-label="Theme presets" tabindex="0"></div>
              <div class="current-row">
                <span class="current-label">Committed:</span>
                <span class="current-value" id="__codex_theme_switcher_current">-</span>
              </div>
            </section>
            <section class="right-pane">
              <div class="preview-head">
                <div class="pane-title">Live Preview</div>
                <div class="preview-name" id="${PREVIEW_NAME_ID}"></div>
              </div>
              <div id="${PREVIEW_PALETTE_ID}"></div>
              <div class="preview-cards">
                <article class="preview-card">
                  <div class="preview-card-title">Typography</div>
                  <p class="sample-primary">Primary text for long-form responses and code comments.</p>
                  <p class="sample-secondary">Secondary text for metadata, labels, and helper copy.</p>
                  <p class="sample-tertiary">Tertiary text for low-emphasis hints and timestamps.</p>
                  <div class="inline-pill">theme: catppuccin-mocha</div>
                </article>
                <article class="preview-card">
                  <div class="preview-card-title">Controls</div>
                  <label class="preview-label">Composer</label>
                  <input class="preview-input" value="Ask follow-up changes..." readonly>
                  <div class="preview-controls">
                    <button type="button" class="preview-btn primary" tabindex="-1">Primary</button>
                    <button type="button" class="preview-btn" tabindex="-1">Secondary</button>
                    <span class="preview-badge">beta</span>
                  </div>
                </article>
                <article class="preview-card">
                  <div class="preview-card-title">Diff</div>
                  <div class="preview-diff">
                    <div class="preview-diff-line add"><span class="ln">1</span><span>+</span><span>const greeting = "Hello, world!"</span></div>
                    <div class="preview-diff-line plain"><span class="ln">2</span><span> </span><span>console.log(greeting)</span></div>
                    <div class="preview-diff-line remove"><span class="ln">3</span><span>-</span><span>// old code here</span></div>
                  </div>
                </article>
                <article class="preview-card">
                  <div class="preview-card-title">Terminal</div>
                  <pre class="preview-terminal"><span class="prompt">$</span> npm run build
<span class="ok">success:</span> compiled 42 files in 1.2s</pre>
                </article>
              </div>
              <div class="actions">
                <button id="__codex_theme_switcher_apply" type="button">Apply</button>
                <button id="__codex_theme_switcher_close" type="button">Cancel</button>
              </div>
            </section>
          </div>
        </div>
      </div>
    `;

    const backdrop = document.getElementById(BACKDROP_ID);
    const panel = document.getElementById(PANEL_ID);
    const toggle = document.getElementById('__codex_theme_switcher_toggle');
    const list = document.getElementById(THEME_LIST_ID);
    const previewName = document.getElementById(PREVIEW_NAME_ID);
    const previewPalette = document.getElementById(PREVIEW_PALETTE_ID);
    const applyBtn = document.getElementById('__codex_theme_switcher_apply');
    const closeBtn = document.getElementById('__codex_theme_switcher_close');
    const currentTheme = document.getElementById('__codex_theme_switcher_current');

    if (!backdrop || !panel || !toggle || !list || !previewName || !previewPalette || !applyBtn || !closeBtn || !currentTheme) {
      return;
    }

    const saved = localStorage.getItem(STORAGE_KEY);
    const initial = saved && THEMES[saved] ? saved : ORDER[0];
    let committedTheme = initial;
    let previewTheme = committedTheme;
    let optionButtons = [];

    const renderPalette = (name) => {
      const theme = THEMES[name];
      if (!theme) {
        return;
      }
      previewPalette.innerHTML = '';
      theme.palette.forEach((color, idx) => {
        const isLightSwatch = relativeLuminance(color) >= 0.55;
        const swatch = document.createElement('div');
        swatch.className = 'swatch';
        swatch.style.setProperty('--sw', color);
        swatch.style.setProperty('--sw-label', isLightSwatch ? 'rgba(18,22,28,.92)' : 'rgba(248,251,255,.95)');
        swatch.style.setProperty('--sw-shadow', isLightSwatch ? 'rgba(255,255,255,.7)' : 'rgba(0,0,0,.72)');
        swatch.innerHTML = `<span class="swatch-label">${idx}</span>`;
        previewPalette.appendChild(swatch);
      });
    };

    const syncThemeButtons = () => {
      for (const button of optionButtons) {
        const name = button.dataset.theme;
        const isPreview = name === previewTheme;
        const isCommitted = name === committedTheme;
        button.classList.toggle('is-preview', isPreview);
        button.classList.toggle('is-committed', isCommitted);
        button.setAttribute('aria-selected', String(isPreview));
        const meta = button.querySelector('.theme-meta');
        if (meta) {
          meta.textContent = isCommitted ? 'saved' : '';
        }
      }
      currentTheme.textContent = committedTheme;
      previewName.textContent = previewTheme;
    };

    const setPreviewTheme = (name, options = {}) => {
      const { focus = false } = options;
      if (!THEMES[name]) {
        return;
      }
      previewTheme = name;
      applyTheme(previewTheme, { persist: false, updateCurrent: false, updateSelect: false });
      renderPalette(previewTheme);
      syncThemeButtons();
      if (focus) {
        const target = optionButtons.find((button) => button.dataset.theme === name);
        if (target) {
          target.focus();
        }
      }
    };

    const moveFocus = (delta) => {
      if (optionButtons.length === 0) {
        return;
      }
      let index = ORDER.indexOf(previewTheme);
      if (index < 0) {
        index = 0;
      }
      index = (index + delta + ORDER.length) % ORDER.length;
      setPreviewTheme(ORDER[index], { focus: true });
    };

    const jumpFocus = (index) => {
      if (optionButtons.length === 0) {
        return;
      }
      const clamped = Math.max(0, Math.min(optionButtons.length - 1, index));
      setPreviewTheme(ORDER[clamped], { focus: true });
    };

    const buildThemeList = () => {
      list.innerHTML = '';
      optionButtons = [];
      ORDER.forEach((name, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'theme-item';
        button.dataset.theme = name;
        button.dataset.index = String(index);
        button.setAttribute('role', 'option');
        button.setAttribute('aria-selected', 'false');
        button.innerHTML = `<span class="theme-name">${name}</span><span class="theme-meta"></span>`;
        button.addEventListener('click', () => {
          setPreviewTheme(name, { focus: true });
        });
        button.addEventListener('focus', () => {
          setPreviewTheme(name, { focus: false });
        });
        optionButtons.push(button);
        list.appendChild(button);
      });
    };

    buildThemeList();
    applyTheme(committedTheme, { persist: true, updateCurrent: true, updateSelect: false });
    setPreviewTheme(committedTheme, { focus: false });

    const openModal = () => {
      backdrop.classList.add('open');
      panel.classList.remove('hidden');
      setPreviewTheme(committedTheme, { focus: true });
    };

    const closeModal = () => {
      panel.classList.add('hidden');
      backdrop.classList.remove('open');
    };

    const cancelModal = () => {
      previewTheme = committedTheme;
      applyTheme(committedTheme, { persist: false, updateCurrent: true, updateSelect: false });
      renderPalette(committedTheme);
      syncThemeButtons();
      closeModal();
    };

    toggle.onclick = openModal;

    backdrop.onclick = (event) => {
      if (event.target === backdrop) {
        cancelModal();
      }
    };

    closeBtn.onclick = cancelModal;

    list.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        moveFocus(1);
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        moveFocus(-1);
      } else if (event.key === 'PageDown') {
        event.preventDefault();
        moveFocus(6);
      } else if (event.key === 'PageUp') {
        event.preventDefault();
        moveFocus(-6);
      } else if (event.key === 'Home') {
        event.preventDefault();
        jumpFocus(0);
      } else if (event.key === 'End') {
        event.preventDefault();
        jumpFocus(ORDER.length - 1);
      } else if (event.key === 'Enter') {
        event.preventDefault();
        committedTheme = previewTheme;
        applyTheme(committedTheme, { persist: true, updateCurrent: true, updateSelect: false });
        renderPalette(committedTheme);
        syncThemeButtons();
        closeModal();
      } else if (event.key === 'Escape') {
        event.preventDefault();
        cancelModal();
      }
    });

    applyBtn.onclick = () => {
      committedTheme = previewTheme;
      applyTheme(committedTheme, { persist: true, updateCurrent: true, updateSelect: false });
      renderPalette(committedTheme);
      syncThemeButtons();
      closeModal();
    };

    if (window[ESC_HANDLER_KEY]) {
      document.removeEventListener('keydown', window[ESC_HANDLER_KEY], true);
    }
    const escHandler = (event) => {
      if (event.key === 'Escape' && backdrop.classList.contains('open')) {
        cancelModal();
      }
    };
    window[ESC_HANDLER_KEY] = escHandler;
    document.addEventListener('keydown', escHandler, true);
  }

  function init() {
    ensureUiCss();
    mountUi();
    ensureDiffFixObserver();
    scheduleDiffShadowContrastFix();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
