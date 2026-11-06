// Renders the WezTerm Pro Setup card image (1920×1200, same framing as the ClamKeep one): a wallpaper
// with floating windows — the terminal with the config's tab bar, split panes and status bar, the leader-key
// cheat sheet and the macOS installer. Everything shown is taken from the project README.
// Needs "JetBrainsMono Nerd Font" installed. Usage: CHROME_PATH=/path/to/chrome node scripts/wezterm-shot.mjs
import { chromium } from 'playwright-core';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));

// Catppuccin Mocha
const c = {
  base: '#1e1e2e', mantle: '#181825', crust: '#11111b', surface0: '#313244', surface1: '#45475a',
  overlay0: '#6c7086', text: '#cdd6f4', subtext: '#a6adc8', mauve: '#cba6f7', blue: '#89b4fa',
  sapphire: '#74c7ec', teal: '#94e2d5', green: '#a6e3a1', yellow: '#f9e2af', peach: '#fab387',
  red: '#f38ba8', pink: '#f5c2e7', lavender: '#b4befe',
};

const g = {
  folder: '', branch: '', apple: '', docker: '', node: '', python: '',
  lua: '', md: '', term: '', file: '', battery: '', chip: '',
  lcap: '', rcap: '', vim: '', gear: '', law: '',
};

const prompt = (dir, cmd) => `
<div class="pl"><span class="dir">${g.folder} ~/projects/<b>${dir}</b></span><span class="git">${g.branch} main <i class="y">!2</i> <i class="b">?1</i></span></div>
<div class="cmd"><span class="ok">❯</span> ${cmd}</div>`;

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
* { margin: 0; padding: 0; box-sizing: border-box; }
html { width: 1920px; height: 1200px; background: #1b1f5e; }
body { width: 1920px; height: 1200px; overflow: hidden; position: relative;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  background:
    radial-gradient(1200px 900px at 85% 110%, #f5c2e7 0%, transparent 60%),
    radial-gradient(1000px 800px at 10% -10%, #1e3a8a 0%, transparent 65%),
    linear-gradient(135deg, #1b1f5e 0%, #4c3bb8 38%, #8b5cf6 62%, #d98ad6 85%, #f3b3c6 100%); }
.menubar { position: absolute; inset: 0 0 auto; height: 42px; background: rgb(10 10 30 / 0.35);
  backdrop-filter: blur(20px); }
.win { position: absolute; border-radius: 22px; overflow: hidden;
  box-shadow: 0 0 0 1px rgb(255 255 255 / 0.08), 0 30px 80px -20px rgb(8 6 40 / 0.75), 0 10px 30px rgb(8 6 40 / 0.35); }
.mono { font-family: 'JetBrainsMono Nerd Font', 'JetBrains Mono', Menlo, monospace; }

/* ---------- terminal ---------- */
.term { left: 96px; top: 118px; width: 1190px; height: 790px; background: ${c.base}; color: ${c.text};
  display: flex; flex-direction: column; font-size: 23px; line-height: 1.55; }
.tabs { display: flex; align-items: center; gap: 10px; height: 64px; padding: 0 22px; background: ${c.crust}; }
.lights { display: flex; gap: 10px; margin-right: 14px; }
.lights i { width: 15px; height: 15px; border-radius: 50%; }
.tab { display: flex; align-items: center; font-size: 20px; }
.tab .cap { font-size: 30px; line-height: 1; }
.tab .in { padding: 4px 14px; }
.tab.on .cap { color: ${c.mauve}; } .tab.on .in { background: ${c.mauve}; color: ${c.crust}; font-weight: 700; }
.tab.off .cap { color: ${c.surface0}; } .tab.off .in { background: ${c.surface0}; color: ${c.subtext}; }
.tabs .ws { margin-left: auto; color: ${c.overlay0}; font-size: 19px; }
.panes { flex: 1; display: grid; grid-template-columns: 1fr 1fr; min-height: 0; }
.pane { padding: 22px 26px; overflow: hidden; }
.pane + .pane { border-left: 2px solid ${c.surface0}; background: ${c.mantle}; }
.pane.dim { opacity: 0.92; }
.pl { display: flex; gap: 14px; white-space: nowrap; }
.dir { color: ${c.blue}; } .dir b { color: ${c.sapphire}; }
.git { color: ${c.green}; } .git .y { color: ${c.yellow}; font-style: normal; } .git .b { color: ${c.sapphire}; font-style: normal; }
.cmd { white-space: nowrap; margin-bottom: 6px; } .ok { color: ${c.green}; font-weight: 700; }
.ls { display: grid; grid-template-columns: repeat(3, auto); justify-content: start; gap: 2px 30px; margin-bottom: 22px; white-space: nowrap; }
.d { color: ${c.blue}; font-weight: 700; } .lua { color: ${c.blue}; } .sh { color: ${c.green}; } .mdf { color: ${c.yellow}; } .lic { color: ${c.subtext}; }
.cur { display: inline-block; width: 13px; height: 27px; vertical-align: -5px; background: ${c.text}; }
.code { white-space: pre; font-size: 19.5px; line-height: 1.6; }
.k { color: ${c.mauve}; } .s { color: ${c.green}; } .f { color: ${c.blue}; } .cm { color: ${c.overlay0}; font-style: italic; } .v { color: ${c.peach}; }
.ln { display: inline-block; width: 2ch; margin-right: 18px; color: ${c.surface1}; text-align: right; }
.vimbar { margin-top: 12px; display: flex; font-size: 18px; }
.vimbar span { padding: 2px 12px; }
.status { display: flex; align-items: center; gap: 8px; height: 56px; padding: 0 18px; background: ${c.crust}; font-size: 19px; white-space: nowrap; }
.seg { display: inline-flex; align-items: center; }
.seg .cap { font-size: 27px; line-height: 1; }
.seg .in { padding: 3px 12px; color: ${c.crust}; font-weight: 700; }
.status .left { margin-right: auto; color: ${c.mauve}; font-weight: 700; }

/* ---------- leader cheat sheet ---------- */
.keys { left: 1360px; top: 92px; width: 470px; padding: 30px 34px 32px; background: rgb(24 24 37 / 0.92);
  color: ${c.text}; backdrop-filter: blur(24px); }
.keys h3 { display: flex; align-items: center; gap: 14px; font-size: 24px; font-weight: 600; }
.kbd { display: inline-flex; align-items: center; justify-content: center; min-width: 40px; height: 40px; padding: 0 12px;
  border-radius: 9px; background: ${c.surface0}; box-shadow: inset 0 -3px 0 rgb(0 0 0 / 0.35); font-size: 19px; font-weight: 700; color: ${c.text}; }
.kbd.acc { background: ${c.mauve}; color: ${c.crust}; }
.keys ul { list-style: none; margin-top: 22px; display: grid; gap: 14px; }
.keys li { display: grid; grid-template-columns: 200px 1fr; align-items: center; font-size: 21px; color: ${c.subtext}; }
.keys li span:first-child { display: flex; gap: 6px; }
.keys .note { margin-top: 22px; font-size: 17px; color: ${c.overlay0}; }

/* ---------- macOS installer ---------- */
.inst { left: 1150px; top: 590px; width: 690px; height: 440px; background: #f6f6f7; color: #1d1d1f; display: flex; flex-direction: column; }
.inst .bar { position: relative; height: 54px; display: flex; align-items: center; justify-content: center; font-size: 19px; font-weight: 600; color: #3a3a3c; border-bottom: 1px solid #e3e3e6; }
.inst .bar .lights { position: absolute; left: 20px; }
.inst .main { flex: 1; display: grid; grid-template-columns: 200px 1fr; }
.side { padding: 26px 0 0 26px; background: #ececef; display: grid; align-content: start; gap: 14px; font-size: 18px; color: #8e8e93; }
.side span { display: flex; align-items: center; gap: 10px; }
.side span::before { content: ''; width: 11px; height: 11px; border-radius: 50%; background: #c7c7cc; }
.side .now { color: #1d1d1f; font-weight: 600; } .side .now::before { background: #0a84ff; }
.body { padding: 34px 34px 28px; display: flex; flex-direction: column; }
.done { display: flex; align-items: center; gap: 16px; font-size: 24px; font-weight: 600; letter-spacing: -0.01em; }
.tick { width: 46px; height: 46px; border-radius: 50%; background: #30d158; display: grid; place-items: center; flex: none; }
.body p { margin-top: 10px; font-size: 18px; color: #6e6e73; }
.items { margin-top: 24px; display: grid; gap: 12px; list-style: none; font-size: 18px; }
.items li { display: grid; grid-template-columns: 26px 1fr auto; gap: 10px; align-items: center; }
.items .p { color: #8e8e93; font-family: 'JetBrainsMono Nerd Font', Menlo, monospace; font-size: 16px; }
.btns { margin-top: auto; display: flex; justify-content: flex-end; gap: 12px; }
.btns span { padding: 9px 22px; border-radius: 10px; background: #e5e5ea; font-size: 18px; font-weight: 500; }
.btns .pri { background: #0a84ff; color: #fff; }
</style></head><body>
<div class="menubar"></div>

<div class="win term mono">
  <div class="tabs">
    <span class="lights"><i style="background:#ff5f57"></i><i style="background:#febc2e"></i><i style="background:#28c840"></i></span>
    <span class="tab on"><span class="cap">${g.lcap}</span><span class="in">1 ${g.term} zsh</span><span class="cap">${g.rcap}</span></span>
    <span class="tab off"><span class="cap">${g.lcap}</span><span class="in">2 ${g.vim} nvim</span><span class="cap">${g.rcap}</span></span>
    <span class="tab off"><span class="cap">${g.lcap}</span><span class="in">3 ${g.docker} docker</span><span class="cap">${g.rcap}</span></span>
    <span class="ws">${g.gear} workspace: dev</span>
  </div>
  <div class="panes">
    <div class="pane">
      ${prompt('wezterm', 'ls')}
      <div class="ls">
        <span class="d">${g.folder} config</span><span class="d">${g.folder} shell</span><span class="lua">${g.lua} wezterm.lua</span>
        <span class="d">${g.folder} installer</span><span class="d">${g.folder} themes</span><span class="sh">${g.term} install.sh</span>
        <span class="d">${g.folder} ui</span><span class="d">${g.folder} utils</span><span class="mdf">${g.md} README.md</span>
      </div>
      ${prompt('wezterm', '<span class="f">./build.sh</span> 2.0.1 macos')}
      <div style="color:${c.subtext}">→ installer/macos/build.sh</div>
      <div><span style="color:${c.green}">✓</span> dist/WezTerm-Pro-Setup-2.0.1.pkg</div>
      <div style="margin-bottom:22px"><span style="color:${c.green}">✓</span> dist/WezTerm-Pro-Setup-2.0.1.dmg</div>
      <div class="cmd"><span class="ok">❯</span> <span class="cur"></span></div>
    </div>
    <div class="pane dim">
      <div class="code"><span class="ln">1</span><span class="k">local</span> wezterm <span class="k">=</span> <span class="f">require</span>(<span class="s">'wezterm'</span>)
<span class="ln">2</span><span class="k">local</span> config <span class="k">=</span> wezterm.<span class="f">config_builder</span>()
<span class="ln">3</span>
<span class="ln">4</span><span class="cm">-- each module mutates config</span>
<span class="ln">5</span><span class="f">require</span>(<span class="s">'config.appearance'</span>).<span class="f">apply</span>(config)
<span class="ln">6</span><span class="f">require</span>(<span class="s">'config.fonts'</span>).<span class="f">apply</span>(config)
<span class="ln">7</span><span class="f">require</span>(<span class="s">'config.keys'</span>).<span class="f">apply</span>(config)
<span class="ln">8</span>
<span class="ln">9</span><span class="cm">-- UI is event-driven</span>
<span class="ln">10</span><span class="f">require</span>(<span class="s">'ui.tabbar'</span>).<span class="f">setup</span>()
<span class="ln">11</span><span class="f">require</span>(<span class="s">'ui.statusbar'</span>).<span class="f">setup</span>()
<span class="ln">12</span>
<span class="ln">13</span><span class="k">return</span> config</div>
      <div class="vimbar"><span style="background:${c.green};color:${c.crust};font-weight:700">NORMAL</span><span style="background:${c.surface0}">${g.lua} wezterm.lua</span></div>
    </div>
  </div>
  <div class="status">
    <span class="left">${g.apple} dev</span>
    <span class="seg"><span class="cap" style="color:${c.green}">${g.lcap}</span><span class="in" style="background:${c.green}">${g.branch} main ●</span><span class="cap" style="color:${c.green}">${g.rcap}</span></span>
    <span class="seg"><span class="cap" style="color:${c.yellow}">${g.lcap}</span><span class="in" style="background:${c.yellow}">${g.python} 3.12</span><span class="cap" style="color:${c.yellow}">${g.rcap}</span></span>
    <span class="seg"><span class="cap" style="color:${c.teal}">${g.lcap}</span><span class="in" style="background:${c.teal}">${g.node} 22.11</span><span class="cap" style="color:${c.teal}">${g.rcap}</span></span>
    <span class="seg"><span class="cap" style="color:${c.blue}">${g.lcap}</span><span class="in" style="background:${c.blue}">${g.docker} desktop</span><span class="cap" style="color:${c.blue}">${g.rcap}</span></span>
    <span class="seg"><span class="cap" style="color:${c.lavender}">${g.lcap}</span><span class="in" style="background:${c.lavender}">CPU 14% · RAM 62%</span><span class="cap" style="color:${c.lavender}">${g.rcap}</span></span>
    <span class="seg"><span class="cap" style="color:${c.peach}">${g.lcap}</span><span class="in" style="background:${c.peach}">${g.battery} 88%</span><span class="cap" style="color:${c.peach}">${g.rcap}</span></span>
  </div>
</div>

<div class="win keys">
  <h3><span class="kbd acc mono">Ctrl</span><span class="kbd acc mono">A</span> Leader</h3>
  <ul>
    <li><span><span class="kbd mono">v</span><span class="kbd mono">s</span></span><span>Split pane</span></li>
    <li><span><span class="kbd mono">h</span><span class="kbd mono">j</span><span class="kbd mono">k</span><span class="kbd mono">l</span></span><span>Move between panes</span></li>
    <li><span><span class="kbd mono">z</span></span><span>Zoom pane</span></li>
    <li><span><span class="kbd mono">w</span></span><span>Switch workspace</span></li>
    <li><span><span class="kbd mono">/</span></span><span>Search</span></li>
  </ul>
</div>

<div class="win inst">
  <div class="bar"><span class="lights"><i style="background:#ff5f57"></i><i style="background:#febc2e"></i><i style="background:#28c840"></i></span>Install WezTerm Pro Setup</div>
  <div class="main">
    <div class="side"><span>Introduction</span><span>Destination</span><span>Installation</span><span class="now">Summary</span></div>
    <div class="body">
      <div class="done"><span class="tick"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>Installed — no prerequisites</div>
      <p>Version 2.0.1 · one click, nothing else to set up.</p>
      <ul class="items">
        <li><span><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#30d158" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M7.5 12.5l3 3 6-6.5"/></svg></span><span>WezTerm.app</span><span class="p">/Applications</span></li>
        <li><span><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#30d158" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M7.5 12.5l3 3 6-6.5"/></svg></span><span>Nerd Fonts</span><span class="p">~/Library/Fonts</span></li>
        <li><span><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#30d158" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M7.5 12.5l3 3 6-6.5"/></svg></span><span>Config</span><span class="p">~/.config/wezterm</span></li>
      </ul>
      <div class="btns"><span>Show Config</span><span class="pri">Open WezTerm</span></div>
    </div>
  </div>
</div>
</body></html>`;

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH });
const page = await browser.newPage({ viewport: { width: 1920, height: 1200 } });
await page.setContent(html, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: root + 'src/assets/projects/wezterm.png' });
await browser.close();
console.log('src/assets/projects/wezterm.png');
