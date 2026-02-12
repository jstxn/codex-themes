#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

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

function sanitizeForComment(str) {
  return str.replace(/\*\//g, '').replace(/[\r\n]/g, ' ');
}

function buildThemeCss(theme) {
  const safeName = sanitizeForComment(theme.name);
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

  return `/* Theme: ${safeName} */
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

function isValidHex(str) {
  return /^#[0-9a-fA-F]{3}$|^#[0-9a-fA-F]{6}$/.test(str);
}

function validateTheme(theme, filePath) {
  if (!theme.name || typeof theme.name !== 'string') {
    throw new Error(`Invalid theme: missing or invalid name`);
  }
  if (!isValidHex(theme.background)) {
    throw new Error(`Invalid theme: background must be a valid hex color`);
  }
  if (!isValidHex(theme.foreground)) {
    throw new Error(`Invalid theme: foreground must be a valid hex color`);
  }
  if (!Array.isArray(theme.palette) || theme.palette.length !== 16) {
    throw new Error(`Invalid theme: palette must be an array of 16 colors`);
  }
  for (let i = 0; i < theme.palette.length; i++) {
    if (!isValidHex(theme.palette[i])) {
      throw new Error(`Invalid theme: palette[${i}] must be a valid hex color`);
    }
  }
}

function loadTheme(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const theme = JSON.parse(content);
  validateTheme(theme, filePath);
  return {
    name: theme.name,
    background: theme.background,
    foreground: theme.foreground,
    cursor: isValidHex(theme.cursor) ? theme.cursor : theme.foreground,
    selectionBg: isValidHex(theme.selectionBg) ? theme.selectionBg : theme.background,
    selectionFg: isValidHex(theme.selectionFg) ? theme.selectionFg : theme.foreground,
    palette: theme.palette,
  };
}

function listThemes(dir) {
  const themes = [];
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json') && !f.endsWith('.template.json'));
  for (const file of files) {
    try {
      const theme = loadTheme(path.join(dir, file));
      themes.push({ name: theme.name, file });
    } catch (err) {
      console.error(`Error loading ${file}: ${err.message}`);
    }
  }
  return themes;
}

function usage() {
  console.log(`
Usage:
  codex-theme-generator.mjs --list <themes-dir>
  codex-theme-generator.mjs --generate <theme.json> --output <output.css>
  codex-theme-generator.mjs --generate <theme.json>

Options:
  --list       List available themes in a directory
  --generate   Generate CSS from a theme JSON file
  --output     Output file path (defaults to stdout)

Examples:
  codex-theme-generator.mjs --list ./themes
  codex-theme-generator.mjs --generate ./themes/Dracula.json --output theme.css
  codex-theme-generator.mjs --generate ./themes/Dracula.json
`);
}

const args = process.argv.slice(2);

if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
  usage();
  process.exit(0);
}

if (args[0] === '--list') {
  const dir = args[1] || './themes';
  const absDir = path.resolve(dir);
  if (!fs.existsSync(absDir)) {
    console.error(`Directory not found: ${absDir}`);
    process.exit(1);
  }
  const themes = listThemes(absDir);
  for (const t of themes) {
    console.log(t.name);
  }
  process.exit(0);
}

if (args[0] === '--generate') {
  const themePath = args[1];
  if (!themePath) {
    console.error('Missing theme file path');
    usage();
    process.exit(1);
  }
  
  const absPath = path.resolve(themePath);
  if (!fs.existsSync(absPath)) {
    console.error(`Theme file not found: ${absPath}`);
    process.exit(1);
  }
  
  const theme = loadTheme(absPath);
  const css = buildThemeCss(theme);
  
  const outputIdx = args.indexOf('--output');
  if (outputIdx !== -1 && args[outputIdx + 1]) {
    fs.writeFileSync(args[outputIdx + 1], css);
    console.log(`Generated: ${args[outputIdx + 1]}`);
  } else {
    console.log(css);
  }
  process.exit(0);
}

console.error(`Unknown command: ${args[0]}`);
usage();
process.exit(1);
