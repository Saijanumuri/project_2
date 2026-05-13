export const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:transparent}
body{font-family:'Sora',system-ui,sans-serif;background:#f8fafc;color:#0f172a;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;overflow-x:hidden}
button,input,select{font-family:'Sora',sans-serif}
button{cursor:pointer;-webkit-tap-highlight-color:transparent}
::-webkit-scrollbar{width:4px;height:4px}
::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:4px}
@keyframes tbd{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-5px)}}
@keyframes fadeIn{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}
.fadeIn{animation:fadeIn .2s ease}

/* ── Shell ── */
.shell{display:flex;flex-direction:column;height:100vh;overflow:hidden;position:relative}
.body{display:flex;flex:1;overflow:hidden;position:relative}

/* ── Header ── */
.hdr{background:#0a0f1e;min-height:56px;padding:12px 20px;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-shrink:0;border-bottom:1px solid rgba(255,255,255,.05);flex-wrap:nowrap}
.hdr-l{display:flex;align-items:center;gap:11px;min-width:0;flex-shrink:0}
.logo{background:#ff5c28;color:#fff;font-size:9px;font-weight:800;letter-spacing:1.5px;padding:4px 9px;border-radius:5px;white-space:nowrap;flex-shrink:0}
.brand-t{color:#f1f5f9;font-size:14px;font-weight:700;white-space:nowrap;line-height:1.3}
.brand-s{color:#64748b;font-size:10px;white-space:nowrap;line-height:1.3}
.hdr-r{display:flex;align-items:center;gap:7px;flex-shrink:0;flex-wrap:wrap}
.srch{position:relative;flex-shrink:0}
.srch-ic{position:absolute;left:9px;top:50%;transform:translateY(-50%);color:#64748b;font-size:12px;pointer-events:none;z-index:1}
.srch input{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);border-radius:9px;padding:6px 11px 6px 28px;color:#e2e8f0;font-size:11px;width:188px;outline:none;transition:all .15s;height:32px}
.srch input::placeholder{color:#64748b}
.srch input:focus{border-color:#ff5c28;background:rgba(255,255,255,.1)}
.npill{min-height:32px;padding:6px 13px;border-radius:9px;border:1px solid rgba(255,255,255,.1);background:transparent;color:#94a3b8;font-size:11px;font-weight:500;transition:all .15s;white-space:nowrap;display:inline-flex;align-items:center;justify-content:center}
.npill:hover{background:rgba(255,255,255,.07);color:#e2e8f0}
.npill.on{background:#ff5c28;border-color:#ff5c28;color:#fff;font-weight:700}
.npill:active{transform:scale(0.98)}

/* ── KPI ribbon ── */
.kband{background:#1e2d4a;height:46px;padding:0 20px;display:flex;align-items:center;flex-shrink:0;overflow-x:auto;border-bottom:1px solid rgba(255,255,255,.04)}
.kband::-webkit-scrollbar{height:0}
.ksep{width:1px;height:24px;background:rgba(255,255,255,.07);flex-shrink:0}
.kcell{display:flex;align-items:center;gap:9px;padding:0 18px;flex-shrink:0}
.kdot{width:6px;height:6px;border-radius:50%;flex-shrink:0}
.klbl{font-size:9px;color:#64748b;white-space:nowrap}
.kval{font-size:15px;font-weight:700;color:#f1f5f9;font-family:'JetBrains Mono',monospace;line-height:1}
.kdlt{font-size:9px;color:#4ade80;font-weight:600;white-space:nowrap}

/* ── Sidebar ── */
.sb{width:208px;background:#fff;border-right:1px solid #e2e8f0;display:flex;flex-direction:column;flex-shrink:0;overflow:hidden}
.sb-scr{overflow-y:auto;flex:1}
.sb-blk{padding:12px 12px 10px;border-bottom:1px solid #e2e8f0}
.sb-lbl{font-size:9px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px}
.sb-sel{width:100%;border:1px solid #e2e8f0;border-radius:8px;padding:6px 8px;font-size:11px;color:#0f172a;background:#f8fafc;outline:none;margin-bottom:5px;transition:border-color .15s}
.sb-sel:focus{border-color:#ff5c28}
.lrow{display:flex;align-items:center;gap:7px;padding:6px 7px;border-radius:8px;font-size:11px;color:#475569;cursor:pointer;transition:all .12s;border:1px solid transparent;margin-bottom:2px;min-height:44px}
.lrow:hover{background:#f8fafc;border-color:#e2e8f0}
.lrow.on{background:#fff7ed;border-color:#fed7aa;color:#0f172a;font-weight:600}
.lrow:active{transform:scale(0.98)}
.ldot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
.lchk{margin-left:auto;color:#ff5c28;font-size:11px}
.drow{display:flex;align-items:center;gap:7px;padding:8px 12px;cursor:pointer;border-bottom:1px solid #f8fafc;transition:background .1s;min-height:44px}
.drow:hover{background:#f8fafc}
.drow.sel{background:#fff7ed;border-left:3px solid #ff5c28;padding-left:9px}
.drow:active{transform:scale(0.99)}
.dn{font-size:11px;font-weight:600;color:#0f172a;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.dst{font-size:9px;color:#94a3b8}
.dsco{font-size:11px;font-weight:700;font-family:'JetBrains Mono',monospace}

/* ── Center ── */
.ctr{flex:1;position:relative;overflow:hidden;background:#e4eef6}
.mapw{width:100%;height:100%}
.mtop{position:absolute;top:11px;left:50%;transform:translateX(-50%);z-index:500;display:flex;gap:4px;background:rgba(255,255,255,.97);border:1px solid #e2e8f0;border-radius:13px;padding:4px;box-shadow:0 4px 16px rgba(0,0,0,.08);backdrop-filter:blur(10px)}
.mbtn{padding:5px 11px;border-radius:9px;font-size:10px;font-weight:500;background:transparent;color:#475569;transition:all .15s;white-space:nowrap;min-height:44px;display:flex;align-items:center;justify-content:center;border:none}
.mbtn:hover{background:#f8fafc;color:#0f172a}
.mbtn.on{color:#fff;font-weight:700}
.mbtn:active{transform:scale(0.98)}
.mleg{position:absolute;bottom:13px;left:13px;z-index:500;background:rgba(255,255,255,.97);border:1px solid #e2e8f0;border-radius:9px;padding:9px 11px;box-shadow:0 2px 8px rgba(0,0,0,.07);backdrop-filter:blur(8px)}
.mlegt{font-size:8px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.8px;margin-bottom:5px}
.mlegr{display:flex;align-items:center;gap:5px;margin-bottom:3px;font-size:10px;color:#475569}
.mlegdot{width:8px;height:8px;border-radius:50%;flex-shrink:0}

/* ── Right panel ── */
.rp{width:288px;background:#fff;border-left:1px solid #e2e8f0;display:flex;flex-direction:column;flex-shrink:0;overflow:hidden}
.rp-scr{overflow-y:auto;flex:1}
.rp-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;text-align:center;padding:28px;gap:12px;color:#94a3b8}
.rph{padding:13px 15px 11px;border-bottom:1px solid #e2e8f0;flex-shrink:0}
.rpd{font-size:17px;font-weight:700;color:#0f172a;line-height:1.2}
.rps{font-size:10px;color:#94a3b8;margin-top:2px}
.tags{display:flex;gap:5px;margin-top:7px;flex-wrap:wrap}
.tg{font-size:9px;font-weight:700;padding:2px 8px;border-radius:20px;white-space:nowrap}
.rpb{padding:13px 15px;display:flex;flex-direction:column;gap:12px}
.slbl{font-size:9px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.9px;margin-bottom:7px}

/* hero */
.hero{background:#0a0f1e;border-radius:13px;padding:14px 15px;color:#fff;position:relative;overflow:hidden}
.hero::after{content:'';position:absolute;top:-30px;right:-30px;width:130px;height:130px;border-radius:50%;background:radial-gradient(circle,rgba(255,92,40,.14),transparent 70%);pointer-events:none}
.hero-top{display:flex;justify-content:space-between;align-items:flex-start;position:relative;z-index:1}
.hero-n{font-size:40px;font-weight:800;color:#ff5c28;font-family:'JetBrains Mono',monospace;line-height:1}
.hero-l{font-size:9px;color:#64748b;margin-top:3px}
.hero-r{text-align:right;position:relative;z-index:1}
.hero-d{font-size:22px;font-weight:700;font-family:'JetBrains Mono',monospace;line-height:1}
.hero-dl{font-size:9px;color:#64748b;text-align:right;margin-top:2px}
.hero-bar{height:3px;background:rgba(255,255,255,.1);border-radius:3px;margin-top:11px;position:relative;z-index:1}
.hero-fill{height:3px;background:#ff5c28;border-radius:3px;transition:width .7s cubic-bezier(.4,0,.2,1)}
.hero-ft{display:flex;justify-content:space-between;font-size:8px;color:#4b5563;margin-top:3px;position:relative;z-index:1}

/* CTARA block */
.cblock{background:#f8fafc;border:1px solid #e2e8f0;border-radius:13px;padding:13px}
.cs-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:9px}
.cs-num{font-size:30px;font-weight:800;color:#0ea5e9;font-family:'JetBrains Mono',monospace;line-height:1}
.cs-lbl{font-size:9px;color:#94a3b8;margin-top:2px}
.ci{margin-bottom:6px}
.ci-r{display:flex;align-items:center;justify-content:space-between;margin-bottom:3px}
.ci-n{font-size:9px;font-weight:600;color:#0f172a}
.ci-v{font-size:9px;font-weight:700;color:#0ea5e9;font-family:'JetBrains Mono',monospace}
.ci-bg{height:3px;background:#e2e8f0;border-radius:3px}
.ci-fill{height:3px;border-radius:3px;transition:width .5s}

/* scheme cards */
.sc{background:#f8fafc;border:1px solid #e2e8f0;border-radius:9px;padding:9px 11px;margin-bottom:7px;transition:border-color .15s}
.sc:hover{border-color:#cbd5e1}
.sc-h{display:flex;align-items:center;justify-content:space-between;margin-bottom:6px}
.sc-n{font-size:10px;font-weight:700;color:#0f172a}
.sc-badge{font-size:8px;font-weight:700;padding:2px 7px;border-radius:20px;white-space:nowrap}
.sc-g{display:grid;grid-template-columns:1fr 1fr;gap:5px;margin-bottom:6px}
.sc-v{font-size:14px;font-weight:700;color:#0f172a;font-family:'JetBrains Mono',monospace;line-height:1}
.sc-vl{font-size:8px;color:#94a3b8;margin-top:1px}
.sc-bt{height:3px;background:#e2e8f0;border-radius:3px}
.sc-bf{height:3px;border-radius:3px;transition:width .5s}

/* gaps */
.glist{display:flex;flex-direction:column;gap:2px}
.grow{display:flex;align-items:flex-start;gap:7px;padding:7px 9px;border-radius:6px;font-size:10px;color:#475569;line-height:1.45;border:1px solid transparent}
.gic{font-size:13px;flex-shrink:0;margin-top:1px}
.gtx{flex:1}
.gsg{font-size:8px;font-weight:700;padding:2px 6px;border-radius:20px;flex-shrink:0;margin-top:1px;white-space:nowrap}

/* brief btn */
.bbtn{width:100%;height:38px;border-radius:9px;background:#0a0f1e;color:#f1f5f9;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;gap:6px;transition:background .15s;cursor:pointer;border:none}
.bbtn:hover{background:#1e3a5f}

/* AI */
.ai-sec{border-top:1px solid #e2e8f0;padding:13px 15px;flex-shrink:0}
.ai-h{display:flex;align-items:center;gap:7px;margin-bottom:9px}
.ai-badge{background:#0a0f1e;color:#ff5c28;font-size:8px;font-weight:800;padding:3px 8px;border-radius:5px;letter-spacing:.8px}
.ai-title{font-size:11px;font-weight:700;color:#0f172a}
.chat{background:#f8fafc;border:1px solid #e2e8f0;border-radius:9px;overflow:hidden}
.msgs{padding:8px;max-height:164px;overflow-y:auto;display:flex;flex-direction:column;gap:5px}
.mu{align-self:flex-end;background:#0a0f1e;color:#e2e8f0;font-size:10px;padding:5px 9px;border-radius:10px 10px 2px 10px;max-width:92%;line-height:1.45}
.ma{align-self:flex-start;background:#fff;border:1px solid #e2e8f0;color:#0f172a;font-size:10px;padding:6px 9px;border-radius:10px 10px 10px 2px;max-width:96%;line-height:1.55}
.ma-n{font-size:8px;font-weight:800;color:#ff5c28;margin-bottom:2px;letter-spacing:.5px}
.chips{padding:6px 8px 4px;display:flex;flex-wrap:wrap;gap:3px}
.chip{font-size:9px;padding:3px 8px;border-radius:20px;border:1px solid #e2e8f0;background:#fff;color:#475569;cursor:pointer;transition:all .12s;white-space:nowrap;min-height:32px;display:inline-flex;align-items:center;justify-content:center}
.chip:hover{border-color:#ff5c28;color:#ff5c28}
.chip:active{transform:scale(0.95)}
.cbar{border-top:1px solid #e2e8f0;padding:5px 7px;display:flex;gap:5px}
.cin{flex:1;font-size:10px;border:1px solid #e2e8f0;border-radius:6px;padding:5px 8px;background:#fff;outline:none;color:#0f172a;transition:border-color .15s}
.cin:focus{border-color:#ff5c28}
.cin:disabled{opacity:.5}
.cgo{width:28px;height:28px;border-radius:6px;background:#ff5c28;color:#fff;font-size:14px;display:flex;align-items:center;justify-content:center;transition:background .15s;flex-shrink:0;cursor:pointer;border:none}
.cgo:hover:not(:disabled){background:#e84e20}
.cgo:disabled{opacity:.45;cursor:not-allowed}

/* API guide */
.apig{background:#fff7ed;border:1px solid #fed7aa;border-radius:9px;padding:11px;margin-top:7px}
.apig-t{font-size:10px;font-weight:700;color:#9a3412;margin-bottom:7px}
.astep{display:flex;align-items:flex-start;gap:7px;margin-bottom:5px;font-size:9px;color:#7c2d12;line-height:1.45}
.anum{width:16px;height:16px;border-radius:50%;background:#ff5c28;color:#fff;font-size:8px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px}
.astep code{font-family:'JetBrains Mono',monospace;font-size:8px;background:#fff;padding:1px 4px;border-radius:3px;border:1px solid #fed7aa;word-break:break-all}

/* Analytics */
.an-body{flex:1;overflow-y:auto;padding:18px;display:grid;grid-template-columns:1fr 1fr;gap:13px;align-content:start}
.ac{background:#fff;border:1px solid #e2e8f0;border-radius:13px;padding:15px}
.ac-t{font-size:12px;font-weight:700;color:#0f172a;margin-bottom:11px;display:flex;align-items:center;gap:6px}
.arow{display:flex;align-items:center;gap:9px;padding:6px 0;border-bottom:1px solid #f8fafc;cursor:pointer;transition:all .1s;border-radius:6px}
.arow:last-child{border-bottom:none}
.arow:hover{background:#f8fafc;margin:0 -4px;padding:6px 4px}
.ark{width:20px;height:20px;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;flex-shrink:0}
.ainf{flex:1;min-width:0}
.anm{font-size:11px;font-weight:500;color:#0f172a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ast{font-size:9px;color:#94a3b8}
.abar{width:72px}
.abt{height:3px;background:#e2e8f0;border-radius:3px}
.abf{height:3px;border-radius:3px;transition:width .4s}
.avl{font-size:10px;font-weight:700;font-family:'JetBrains Mono',monospace;min-width:28px;text-align:right}

/* Convergence table */
.cv-b{flex:1;overflow:auto;padding:18px}
.cv-shell{background:#fff;border:1px solid #e2e8f0;border-radius:13px;overflow:hidden}
.cv-h{padding:13px 17px;border-bottom:1px solid #e2e8f0;display:flex;align-items:center;justify-content:space-between}
.cv-ht{font-size:13px;font-weight:700;color:#0f172a}
.cv-hs{font-size:10px;color:#94a3b8}
table{width:100%;border-collapse:collapse;font-size:11px}
th{padding:9px 11px;text-align:left;font-size:8px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.7px;background:#f8fafc;border-bottom:1px solid #e2e8f0;white-space:nowrap}
td{padding:9px 11px;border-bottom:1px solid #f8fafc;white-space:nowrap}
tr.tv{cursor:pointer;transition:background .1s}
tr.tv:hover{background:#fff7ed}
tr.tv:last-child td{border-bottom:none}
.cv-dn{font-weight:600;color:#0f172a}
.cv-ds{font-size:9px;color:#94a3b8;margin-top:1px}
.cv-pc{display:flex;align-items:center;gap:4px}
.cv-mb{width:32px;height:3px;background:#e2e8f0;border-radius:3px;flex-shrink:0}
.cv-mf{height:3px;border-radius:3px}
.cv-cv{display:flex;align-items:center;gap:5px}
.cv-bar{flex:1;height:4px;background:#e2e8f0;border-radius:3px;min-width:36px}
.cv-fill{height:4px;background:#ff5c28;border-radius:3px}
.cv-n{font-weight:700;color:#ff5c28;font-family:'JetBrains Mono',monospace;min-width:20px;text-align:right;font-size:11px}

/* CTARA page */
.ct-body{flex:1;overflow-y:auto;padding:18px}
.ct-banner{background:#0a0f1e;border-radius:18px;padding:26px;color:#fff;margin-bottom:18px;position:relative;overflow:hidden}
.ct-banner::before{content:'CTARA';position:absolute;right:-15px;top:-15px;font-size:140px;font-weight:900;color:rgba(255,255,255,.03);pointer-events:none;font-family:'JetBrains Mono',monospace;line-height:1}
.ct-bt{font-size:20px;font-weight:800;color:#fff;margin-bottom:5px}
.ct-bs{font-size:12px;color:#94a3b8;max-width:540px;line-height:1.6}
.ct-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:18px}
.ct-card{background:#fff;border:1px solid #e2e8f0;border-radius:13px;padding:14px;transition:all .15s;cursor:pointer}
.ct-card:hover{border-color:#cbd5e1;box-shadow:0 2px 8px rgba(0,0,0,.06)}
.ct-ic{font-size:22px;margin-bottom:7px}
.ct-cn{font-size:11px;font-weight:700;color:#0f172a;margin-bottom:3px}
.ct-cd{font-size:9px;color:#94a3b8;line-height:1.5;margin-bottom:8px}
.ct-cb{height:3px;background:#e2e8f0;border-radius:3px}
.ct-cf{height:3px;border-radius:3px}
.dtgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:9px}
.dtcard{background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:12px;cursor:pointer;transition:all .15s}
.dtcard:hover{border-color:#ff5c28;box-shadow:0 2px 8px rgba(0,0,0,.06);transform:translateY(-1px)}
.dt-nm{font-size:12px;font-weight:700;color:#0f172a;margin-bottom:1px}
.dt-st{font-size:9px;color:#94a3b8;margin-bottom:8px}
.dt-ig{display:grid;grid-template-columns:1fr 1fr;gap:4px}
.dt-iv{font-size:13px;font-weight:700;font-family:'JetBrains Mono',monospace;line-height:1}
.dt-il{font-size:8px;color:#94a3b8;margin-top:1px}

/* Responsive */
@media(max-width:1200px){
  .sb{width:184px}
  .rp{width:264px}
}

@media(max-width:960px){
  .sb{width:164px}
  .rp{width:248px}
  .brand-s{display:none}
  .an-body{grid-template-columns:1fr}
  .ct-grid{grid-template-columns:repeat(2,1fr)}
  .dtgrid{grid-template-columns:repeat(2,1fr)}
}

@media(max-width:780px){
  .sb{display:none}
  .rp{width:100%;border-left:none;border-top:1px solid #e2e8f0}
  .body{flex-direction:column;overflow:auto}
  .ctr{height:52vw;min-height:230px;max-height:340px}
  .an-body{padding:12px;gap:10px}
  .ct-grid{grid-template-columns:1fr}
  .dtgrid{grid-template-columns:1fr 1fr}
  .cv-shell{overflow-x:auto}
  table{font-size:10px}
  th,td{padding:6px 8px}
}

@media(max-width:540px){
  .hdr{padding:8px 12px;min-height:auto;flex-wrap:wrap}
  .hdr-l{gap:8px;flex:1;min-width:0}
  .logo{font-size:8px;padding:3px 7px}
  .brand-t{font-size:12px}
  .brand-s{font-size:9px}
  .hdr-r{gap:5px;width:100%;justify-content:flex-start;margin-top:8px}
  .npill{font-size:9px;padding:5px 9px;min-height:28px}
  .srch{flex:1;min-width:0}
  .srch input{width:100%;font-size:10px;height:28px;padding:4px 8px 4px 24px}
  .srch-ic{font-size:10px;left:7px}
  .kval{font-size:13px}
  .kband{padding:8px 12px;min-height:auto}
  .kcell{padding:6px 12px}
  .mtop{padding:3px;gap:3px;flex-wrap:wrap}
  .mbtn{padding:4px 8px;font-size:9px}
  .mleg{font-size:9px;padding:7px 9px}
  .rp{width:100%}
  .rpd{font-size:15px}
  .hero-n{font-size:32px}
  .hero-d{font-size:18px}
  .cs-num{font-size:24px}
  .sc-v{font-size:12px}
  .dtgrid{grid-template-columns:1fr}
  .ct-banner{padding:18px}
  .ct-bt{font-size:16px}
  .ct-bs{font-size:11px}
}

@media(max-width:400px){
  .logo{font-size:7px;padding:3px 6px}
  .brand-t{font-size:10px}
  .hdr-l{gap:6px}
  .hdr-r{gap:4px;margin-top:6px}
  .srch{flex:1;min-width:0}
  .srch input{font-size:9px;height:26px;padding:3px 6px 3px 22px}
  .srch-ic{font-size:9px;left:6px}
  .npill{font-size:8px;padding:4px 7px;min-height:26px}
  .kband{flex-direction:column;align-items:flex-start;height:auto;padding:8px 12px}
  .kcell{padding:4px 0}
  .ksep{display:none}
  .rph{padding:10px 12px}
  .rpb{padding:10px 12px}
  .hero{padding:12px}
  .hero-n{font-size:28px}
  .hero-d{font-size:16px}
  .ai-sec{padding:10px 12px}
  .msgs{max-height:120px}
}
`;

