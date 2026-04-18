import { useState, useEffect, useRef, useCallback } from 'react';
import {
districts, BENCHMARKS, getConv, getCTARA, getFU,
distressInfo, pctColor, fmtL, stateList,
} from './data';

// ── tiny helpers ──────────────────────────────────────────────────────────────
const fmtPD = n => !n ? '—' : n >= 1e6 ? `${(n/1e6).toFixed(1)}M` : `${(n/1e3).toFixed(0)}K`;

const SCHEMES = [
{ id:'conv', label:'Convergence', color:'#ff5c28' },
{ id:'ctara', label:'CTARA Score', color:'#0ea5e9' },
{ id:'mg', label:'MGNREGA', color:'#f59e0b' },
{ id:'pm', label:'PMAY-G', color:'#f97316' },
{ id:'pg', label:'PMGSY', color:'#8b5cf6' },
{ id:'jj', label:'JJM', color:'#0ea5e9' },
{ id:'nl', label:'DAY-NRLM', color:'#ec4899' },
];

const KPIS = [
{ label:'MGNREGA Active HH', val:'5.5 Cr', delta:'+8% YoY', color:'#f59e0b' },
{ label:'PMAY-G Completed', val:'3.20 Cr', delta:'+12% YoY', color:'#f97316' },
{ label:'PMGSY Roads', val:'7.28L km', delta:'+5% YoY', color:'#8b5cf6' },
{ label:'JJM Tap HH', val:'14.6 Cr', delta:'+22% YoY', color:'#0ea5e9' },
{ label:'SHG Members', val:'10+ Cr', delta:'+9% YoY', color:'#ec4899' },
];

const CTARA_THEMES = [
{ key:'water', icon:'💧', label:'Water & Sanitation', desc:'JJM, groundwater, water quality', color:'#0ea5e9',
flag: d => d.jj.pct < 40 || d.gw > 7 },
{ key:'energy', icon:'⚡', label:'Rural Energy', desc:'Electrification, solar potential', color:'#f59e0b',
flag: d => d.elec < 80 },
{ key:'live', icon:'🌾', label:'Livelihoods & NREGA', desc:'Employment, wages, SHGs', color:'#10b981',
flag: d => (d.mg.pct||0) < 55 || d.mg.wage < 200 },
{ key:'roads', icon:'🛣️', label:'Roads & Connectivity', desc:'PMGSY, habitation access', color:'#8b5cf6',
flag: d => d.pg.pct < 60 },
{ key:'agri', icon:'🌱', label:'Agriculture & Land', desc:'Irrigation, yield, rainfall', color:'#84cc16',
flag: d => d.agri < 40 || d.irr < 25 },
{ key:'housing', icon:'🏠', label:'Rural Housing', desc:'PMAY-G, fund utilisation', color:'#f97316',
flag: d => d.pm.pct < 55 },
];

function getSchemeVal(d, id) {
if (id === 'conv') return getConv(d);
if (id === 'ctara') return getCTARA(d);
if (id === 'mg') return d.mg.pct || 0;
if (id === 'pm') return d.pm.pct;
if (id === 'pg') return d.pg.pct;
if (id === 'jj') return d.jj.pct;
if (id === 'nl') return d.nl.blPct;
return 0;
}

function Dot({ delay = 0 }) {
return <span style={{ display:'inline-block', width:5, height:5, borderRadius:'50%', background:'#ff5c28', margin:'0 2px', animation:'tbd 1s infinite', animationDelay:`${delay}s` }} />;
}

function Typing() {
return <span><Dot /><Dot delay={0.15} /><Dot delay={0.3} /></span>;
}

// ══════════════════════════════════════════════════════════════════════════════
// CSS injected once
// ══════════════════════════════════════════════════════════════════════════════
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{-webkit-text-size-adjust:100%}
body{font-family:'Sora',system-ui,sans-serif;background:#f8fafc;color:#0f172a;-webkit-font-smoothing:antialiased}
button,input,select{font-family:'Sora',sans-serif}
::-webkit-scrollbar{width:4px;height:4px}
::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:4px}
@keyframes tbd{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-5px)}}
@keyframes fadeIn{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}
.fadeIn{animation:fadeIn .2s ease}

/* ── Shell ── */
.shell{display:flex;flex-direction:column;height:100vh;overflow:hidden}
.body{display:flex;flex:1;overflow:hidden}

/* ── Header ── */
.hdr{background:#0a0f1e;height:56px;padding:0 20px;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-shrink:0;border-bottom:1px solid rgba(255,255,255,.05)}
.hdr-l{display:flex;align-items:center;gap:11px;min-width:0}
.logo{background:#ff5c28;color:#fff;font-size:9px;font-weight:800;letter-spacing:1.5px;padding:4px 9px;border-radius:5px;white-space:nowrap;flex-shrink:0}
.brand-t{color:#f1f5f9;font-size:14px;font-weight:700;white-space:nowrap}
.brand-s{color:#64748b;font-size:10px;white-space:nowrap}
.hdr-r{display:flex;align-items:center;gap:7px;flex-shrink:0}
.srch{position:relative}
.srch-ic{position:absolute;left:9px;top:50%;transform:translateY(-50%);color:#64748b;font-size:12px;pointer-events:none}
.srch input{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);border-radius:9px;padding:6px 11px 6px 28px;color:#e2e8f0;font-size:11px;width:188px;outline:none;transition:all .15s}
.srch input::placeholder{color:#64748b}
.srch input:focus{border-color:#ff5c28;background:rgba(255,255,255,.1)}
.npill{height:32px;padding:0 13px;border-radius:9px;border:1px solid rgba(255,255,255,.1);background:transparent;color:#94a3b8;font-size:11px;font-weight:500;transition:all .15s;white-space:nowrap}
.npill:hover{background:rgba(255,255,255,.07);color:#e2e8f0}
.npill.on{background:#ff5c28;border-color:#ff5c28;color:#fff;font-weight:700}

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
.lrow{display:flex;align-items:center;gap:7px;padding:6px 7px;border-radius:8px;font-size:11px;color:#475569;cursor:pointer;transition:all .12s;border:1px solid transparent;margin-bottom:2px}
.lrow:hover{background:#f8fafc;border-color:#e2e8f0}
.lrow.on{background:#fff7ed;border-color:#fed7aa;color:#0f172a;font-weight:600}
.ldot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
.lchk{margin-left:auto;color:#ff5c28;font-size:11px}
.drow{display:flex;align-items:center;gap:7px;padding:8px 12px;cursor:pointer;border-bottom:1px solid #f8fafc;transition:background .1s}
.drow:hover{background:#f8fafc}
.drow.sel{background:#fff7ed;border-left:3px solid #ff5c28;padding-left:9px}
.dn{font-size:11px;font-weight:600;color:#0f172a;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.dst{font-size:9px;color:#94a3b8}
.dsco{font-size:11px;font-weight:700;font-family:'JetBrains Mono',monospace}

/* ── Center ── */
.ctr{flex:1;position:relative;overflow:hidden;background:#e4eef6}
.mapw{width:100%;height:100%}
.mtop{position:absolute;top:11px;left:50%;transform:translateX(-50%);z-index:500;display:flex;gap:4px;background:rgba(255,255,255,.97);border:1px solid #e2e8f0;border-radius:13px;padding:4px;box-shadow:0 4px 16px rgba(0,0,0,.08);backdrop-filter:blur(10px)}
.mbtn{padding:5px 11px;border-radius:9px;font-size:10px;font-weight:500;background:transparent;color:#475569;transition:all .15s;white-space:nowrap}
.mbtn:hover{background:#f8fafc;color:#0f172a}
.mbtn.on{color:#fff;font-weight:700}
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
.chip{font-size:9px;padding:3px 8px;border-radius:20px;border:1px solid #e2e8f0;background:#fff;color:#475569;cursor:pointer;transition:all .12s;white-space:nowrap}
.chip:hover{border-color:#ff5c28;color:#ff5c28}
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
@media(max-width:1200px){.sb{width:184px}.rp{width:264px}}
@media(max-width:960px){.sb{width:164px}.rp{width:248px}.brand-s{display:none}.an-body{grid-template-columns:1fr}.ct-grid{grid-template-columns:repeat(2,1fr)}.dtgrid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:780px){.sb{display:none}.rp{width:100%;border-left:none;border-top:1px solid #e2e8f0}.body{flex-direction:column;overflow:auto}.ctr{height:52vw;min-height:230px;max-height:340px}.an-body{padding:12px;gap:10px}.ct-grid{grid-template-columns:1fr}.dtgrid{grid-template-columns:1fr 1fr}}
@media(max-width:540px){.hdr{padding:0 12px}.brand-t{font-size:12px}.npill{font-size:9px;padding:0 9px}.srch input{width:128px}.kval{font-size:13px}.mtop{padding:3px;gap:3px}.mbtn{padding:4px 8px;font-size:9px}}
`;

// ══════════════════════════════════════════════════════════════════════════════
// Components
//BHARAT NITI
// ══════════════════════════════════════════════════════════════════════════════

function Header({ view, setView, search, setSearch, onSearch }) {
return (
<header className="hdr">
<div className="hdr-l">
<div className="logo">Project_2</div> 
<div><div className="brand-t">Rural Intelligence Platform</div>
<div className="brand-s">CTARA IIT Bombay × Ministry of Rural Development</div>
</div>
</div>
<div className="hdr-r">
<div className="srch">
<span className="srch-ic">⌕</span>
<input placeholder="Search district or state…" value={search}
onChange={e => setSearch(e.target.value)}
onKeyDown={e => e.key === 'Enter' && onSearch()} />
</div>
{['Map','Analytics','Convergence','CTARA'].map(v => (
<button key={v} className={`npill ${view === v ? 'on' : ''}`} onClick={() => setView(v)}>{v}</button>
))}
</div>
</header>
);
}

function KPIBand() {
return (
<div className="kband">
{KPIS.map((k, i) => (
<div key={k.label} style={{ display:'flex', alignItems:'center' }}>
{i > 0 && <div className="ksep" />}
<div className="kcell">
<div className="kdot" style={{ background: k.color }} />
<div>
<div className="klbl">{k.label}</div>
<div style={{ display:'flex', alignItems:'baseline', gap:5 }}>
<span className="kval">{k.val}</span>
<span className="kdlt">{k.delta}</span>
</div>
</div>
</div>
</div>
))}
</div>
);
}

function Sidebar({ layer, setLayer, state, setState, sort, setSort, sel, onSel }) {
const list = [...districts].filter(d => !state || d.state === state)
.sort((a, b) => {
if (sort === 'distress') return b.distress - a.distress;
if (sort === 'conv') return getConv(a) - getConv(b);
if (sort === 'jjm') return a.jj.pct - b.jj.pct;
if (sort === 'ctara') return getCTARA(a) - getCTARA(b);
return a.name.localeCompare(b.name);
});

return (
<aside className="sb">
<div className="sb-scr">
<div className="sb-blk">
<div className="sb-lbl">Filters</div>
<select className="sb-sel" value={state} onChange={e => setState(e.target.value)}>
<option value="">All States ({districts.length})</option>
{stateList.map(s => <option key={s} value={s}>{s} ({districts.filter(d => d.state === s).length})</option>)}
</select>
<select className="sb-sel" value={sort} onChange={e => setSort(e.target.value)}>
<option value="distress">↓ Most distressed</option>
<option value="conv">↑ Low convergence</option>
<option value="jjm">↑ Low JJM</option>
<option value="ctara">↑ Low CTARA score</option>
<option value="name">A–Z</option>
</select>
</div>
<div className="sb-blk">
<div className="sb-lbl">Map Layer</div>
{SCHEMES.map(s => (
<div key={s.id} className={`lrow ${layer === s.id ? 'on' : ''}`} onClick={() => setLayer(s.id)}>
<div className="ldot" style={{ background: s.color }} />
{s.label}
{layer === s.id && <span className="lchk">✓</span>}
</div>
))}
</div>
<div style={{ padding:'9px 12px 4px' }}>
<div className="sb-lbl">Districts ({list.length})</div>
</div>
{list.map(d => {
const conv = getConv(d), di = distressInfo(d.distress);
return (
<div key={d.id} className={`drow ${sel?.id === d.id ? 'sel' : ''}`} onClick={() => onSel(d)}>
<div style={{ flex:1, minWidth:0 }}>
<div className="dn">{d.name}</div>
<div className="dst">{d.state}</div>
</div>
<div style={{ textAlign:'right' }}>
<div className="dsco" style={{ color: pctColor(conv) }}>{conv}</div>
<div style={{ fontSize:8, color: di.c, fontWeight:700 }}>{di.label}</div>
</div>
</div>
);
})}
</div>
</aside>
);
}

function MapPanel({ sel, onSel, layer, setLayer, stateFilter }) {
const mapRef = useRef(null);
const instRef = useRef(null);
const mkrRef = useRef({});
const vis = stateFilter ? districts.filter(d => d.state === stateFilter) : districts;

useEffect(() => {
if (instRef.current || !window.L) return;
const map = window.L.map(mapRef.current, { center:[22,80], zoom:5 });
window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution:'© OSM', opacity:0.3 }).addTo(map);
instRef.current = map;
}, []);

useEffect(() => {
if (!instRef.current || !window.L) return;
const L = window.L;
Object.values(mkrRef.current).forEach(m => m.remove());
mkrRef.current = {};
vis.forEach(d => {
const val = getSchemeVal(d, layer), col = pctColor(val), isSel = sel?.id === d.id;
const di = distressInfo(d.distress), conv = getConv(d), cs = getCTARA(d), fu = getFU(d);
const m = L.circleMarker([d.lat, d.lng], {
radius: isSel ? 15 : 10, fillColor: col,
color: isSel ? '#0a0f1e' : '#fff', weight: isSel ? 3 : 1.5, opacity:1, fillOpacity:.9,
}).addTo(instRef.current);
m.bindTooltip(`
<div style="font-family:'Sora',system-ui,sans-serif;min-width:220px;padding:3px">
<div style="margin-bottom:5px"><b style="font-size:13px;color:#0a0f1e">${d.name}</b> <span style="font-size:11px;color:#64748b">${d.state}</span></div>
<div style="background:${di.bg};border:1px solid ${di.ring};border-radius:6px;padding:4px 8px;margin-bottom:6px;display:flex;justify-content:space-between">
<span style="font-size:11px;font-weight:700;color:${di.c}">${di.label} (${d.distress}/10)</span>
<span style="font-size:11px;font-weight:700;color:#ff5c28">Conv: ${conv}/100</span>
</div>
<table style="font-size:10px;width:100%;border-spacing:0">
<tr style="background:#f8fafc"><td style="padding:2px 5px;color:#64748b">CTARA Score</td><td style="text-align:right;font-weight:700;color:#0ea5e9;font-family:monospace;padding:2px 5px">${cs}/100</td></tr>
<tr><td style="padding:2px 5px;color:#64748b">MGNREGA</td><td style="text-align:right;font-weight:700;color:#f59e0b;font-family:monospace;padding:2px 5px">${d.mg.pct||0}% · ₹${d.mg.wage||0}/day</td></tr>
<tr style="background:#f8fafc"><td style="padding:2px 5px;color:#64748b">PMAY-G</td><td style="text-align:right;font-weight:700;color:#f97316;font-family:monospace;padding:2px 5px">${d.pm.pct}% · util ${fu}%</td></tr>
<tr><td style="padding:2px 5px;color:#64748b">PMGSY</td><td style="text-align:right;font-weight:700;color:#8b5cf6;font-family:monospace;padding:2px 5px">${d.pg.pct}% habitations</td></tr>
<tr style="background:#f8fafc"><td style="padding:2px 5px;color:#64748b">JJM</td><td style="text-align:right;font-weight:700;color:#0ea5e9;font-family:monospace;padding:2px 5px">${d.jj.pct}% HH tap water</td></tr>
<tr><td style="padding:2px 5px;color:#64748b">DAY-NRLM</td><td style="text-align:right;font-weight:700;color:#ec4899;font-family:monospace;padding:2px 5px">${d.nl.blPct}% bank-linked</td></tr>
<tr style="background:#f8fafc"><td style="padding:2px 5px;color:#64748b">Population</td><td style="text-align:right;color:#475569;padding:2px 5px">${fmtL(d.pop)}</td></tr>
</table>
<div style="font-size:9px;color:#94a3b8;margin-top:5px;text-align:center">Click for full analysis →</div>
</div>`, { className:'', sticky:false, maxWidth:290 });
m.on('click', () => onSel(d));
mkrRef.current[d.id] = m;
});
}, [layer, stateFilter, sel]);

useEffect(() => {
if (sel && instRef.current) instRef.current.flyTo([sel.lat, sel.lng], 9, { duration:1 });
}, [sel]);

return (
<div className="ctr">
<div ref={mapRef} className="mapw" />
<div className="mtop">
{SCHEMES.map(s => (
<button key={s.id} className={`mbtn ${layer === s.id ? 'on' : ''}`}
style={layer === s.id ? { background: s.color } : {}}
onClick={() => setLayer(s.id)}>{s.label}</button>
))}
</div>
<div className="mleg">
<div className="mlegt">Implementation Level</div>
{[['#16a34a','≥ 80% — High'],['#65a30d','65–79% — Good'],['#ca8a04','50–64% — Medium'],['#ea580c','35–49% — Low'],['#dc2626','< 35% — Critical']].map(([c,l]) => (
<div className="mlegr" key={l}><div className="mlegdot" style={{ background:c }} />{l}</div>
))}
</div>
</div>
);
}

function RightPanel({ d, onClose }) {
const [msgs, setMsgs] = useState([]);
const [input, setInput] = useState('');
const [loading, setLoading] = useState(false);
const msgsRef = useRef(null);

useEffect(() => { setMsgs([]); setInput(''); }, [d?.id]);
useEffect(() => { if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight; }, [msgs]);

const CHIPS = ['Why is JJM coverage low?','What MoRD + CTARA interventions fit?','Analyse fund underutilisation','Write a policy brief','CTARA solar irrigation opportunity?'];

const ask = useCallback(async (q) => {
if (!q.trim() || loading) return;
setMsgs(p => [...p, { r:'u', t:q }]);
setInput(''); setLoading(true);
const key = process.env.REACT_APP_CLAUDE_KEY;
if (!key) { setMsgs(p => [...p, { r:'a', t:'⚠️ Add REACT_APP_CLAUDE_KEY to .env and restart. See setup guide below.' }]); setLoading(false); return; }
const ctx = d
? `District: ${d.name}, ${d.state}. Region: ${d.region}. Pop: ${fmtL(d.pop)}. Distress: ${d.distress}/10. Convergence: ${getConv(d)}/100. CTARA: ${getCTARA(d)}/100.\n` +
`CTARA indicators: Literacy ${d.lit}%, SexRatio ${d.sexRatio}/1000, Elec ${d.elec}%, GW_stress ${d.gw}/10, RainDep ${d.rainDep}%, Irrigation ${d.irr}%, AgriYield ${d.agri}/100.\n` +
`MGNREGA: ${d.mg.pct||0}% completion, ₹${d.mg.wage||0}/day, ${fmtPD(d.mg.pd)} person-days.\n` +
`PMAY-G: ${d.pm.pct}% done, fund util ${getFU(d)}%, ₹${(d.pm.rel-d.pm.util).toFixed(1)}Cr unspent.\n` +
`PMGSY: ${d.pg.pct}% connected, ${d.pg.tgt-d.pg.conn} habitations unconnected.\n` +
`JJM: ${d.jj.pct}% coverage, ${fmtL(d.jj.hh-d.jj.tap)} HH without tap, water quality ${d.jj.safe}% safe.\n` +
`DAY-NRLM: ${d.nl.blPct}% bank-linked, ₹${d.nl.loan}Cr loans, ${d.nl.shg.toLocaleString('en-IN')} SHGs.`
: 'National MoRD rural development overview.';
try {
const res = await fetch('https://api.anthropic.com/v1/messages', {
method:'POST',
headers:{ 'Content-Type':'application/json', 'x-api-key':key, 'anthropic-version':'2023-06-01', 'anthropic-dangerous-direct-browser-access':'true' },
body: JSON.stringify({ model:'claude-sonnet-4-20250514', max_tokens:700,
messages:[{ role:'user', content:`You are a dual expert: a senior MoRD policy analyst AND a CTARA IIT Bombay research associate. Bridge scheme implementation + appropriate technology. Give 4-6 precise data-driven sentences with specific numbers, scheme names, CTARA research themes (water, energy, livelihoods, roads, agriculture), and actionable interventions.\n\nContext: ${ctx}\n\nQuestion: ${q}` }] }),
});
if (!res.ok) { const e = await res.json(); throw new Error(e.error?.message||`HTTP ${res.status}`); }
const data = await res.json();
setMsgs(p => [...p, { r:'a', t: data.content?.[0]?.text||'No response.' }]);
} catch(e) { setMsgs(p => [...p, { r:'a', t:`Error: ${e.message}` }]); }
setLoading(false);
}, [d, loading]);

const brief = () => {
if (!d) return;
const conv = getConv(d), cs = getCTARA(d), di = distressInfo(d.distress), fu = getFU(d);
const lines = [
'═══════════════════════════════════════════════════════════════════════',
` BHARAT NITI — DISTRICT POLICY BRIEF`,
` ${d.name.toUpperCase()}, ${d.state.toUpperCase()} | ${d.region} Region`,
` CTARA IIT Bombay × MoRD, GoI | ${new Date().toLocaleDateString('en-IN',{day:'2-digit',month:'long',year:'numeric'})}`,
'═══════════════════════════════════════════════════════════════════════',
'',
` HEADLINE`,
` Distress Level : ${di.label} (${d.distress}/10)`,
` Convergence Score : ${conv}/100`,
` CTARA Score : ${cs}/100`,
` Population : ${fmtL(d.pop)}`,
'',
` CTARA INDICATORS`,
` Literacy : ${d.lit}% [National: ${BENCHMARKS.literacy}%]`,
` Sex Ratio : ${d.sexRatio}/1000`,
` Electrification : ${d.elec}% [Target: ${BENCHMARKS.electrification}%]`,
` Groundwater Stress : ${d.gw}/10`,
` Rainfall Dependency: ${d.rainDep}%`,
` Irrigation : ${d.irr}% [National avg: ${BENCHMARKS.irrigation}%]`,
` Agriculture Yield : ${d.agri}/100`,
` Water Quality Safe : ${d.jj.safe}%`,
'',
` SCHEME 1 — MGNREGA`,
` HH demanding work : ${fmtL(d.mg.demand)}`,
` Person-days : ${fmtPD(d.mg.pd)}`,
` Average wage : Rs.${d.mg.wage}/day [National: Rs.247/day]`,
` Completion : ${d.mg.pct||0}% [Benchmark: ${BENCHMARKS.mgnrega}%]`,
` Status : ${(d.mg.pct||0) >= BENCHMARKS.mgnrega ? 'ON TRACK' : 'BELOW BENCHMARK'}`,
'',
` SCHEME 2 — PMAY-G`,
` Sanctioned : ${fmtL(d.pm.sanc)}`,
` Completed : ${d.pm.pct}% [Benchmark: ${BENCHMARKS.pmay}%]`,
` Funds released : Rs.${d.pm.rel}Cr`,
` Funds utilised : Rs.${d.pm.util}Cr (${fu}%) [Benchmark: ${BENCHMARKS.fundUtil}%]`,
` Unspent : Rs.${(d.pm.rel-d.pm.util).toFixed(1)}Cr`,
` Status : ${fu >= BENCHMARKS.fundUtil ? 'ON TRACK' : 'FUND UNDERUTILISATION'}`,
'',
` SCHEME 3 — PMGSY`,
` Target habitations : ${d.pg.tgt}`,
` Connected : ${d.pg.conn} (${d.pg.pct}%) [Benchmark: ${BENCHMARKS.pmgsy}%]`,
` Unconnected : ${d.pg.tgt - d.pg.conn}`,
` Roads built : ${d.pg.kmD}km of ${d.pg.kmS}km`,
'',
` SCHEME 4 — JAL JEEVAN MISSION`,
` Total rural HH : ${fmtL(d.jj.hh)}`,
` Tap connections : ${fmtL(d.jj.tap)} (${d.jj.pct}%) [Benchmark: ${BENCHMARKS.jjm}%]`,
` Without tap water : ${fmtL(d.jj.hh - d.jj.tap)}`,
` Water quality safe : ${d.jj.safe}%`,
` Status : ${d.jj.pct >= BENCHMARKS.jjm ? 'ON TRACK' : 'CRITICAL GAP'}`,
'',
` SCHEME 5 — DAY-NRLM`,
` Total SHGs : ${d.nl.shg.toLocaleString('en-IN')}`,
` Members : ${fmtL(d.nl.mem)}`,
` Bank-linked : ${d.nl.bl.toLocaleString('en-IN')} (${d.nl.blPct}%) [Benchmark: ${BENCHMARKS.nrlm}%]`,
` Loans disbursed : Rs.${d.nl.loan}Cr`,
'',
` PRIORITY INTERVENTIONS`,
d.jj.pct < BENCHMARKS.jjm ? ` 1. JJM CRITICAL: ${fmtL(d.jj.hh-d.jj.tap)} HH without tap. Activate district JJM task force. Priority: villages with GW stress >=7.` : ` 1. JJM on track at ${d.jj.pct}%. Focus on source sustainability and quality testing.`,
fu < BENCHMARKS.fundUtil ? ` 2. PMAY FUND BLOCK: Rs.${(d.pm.rel-d.pm.util).toFixed(1)}Cr unspent. Review DPC capacity, beneficiary lists, procurement.` : ` 2. PMAY fund utilisation healthy. Maintain completion pace.`,
d.pg.pct < BENCHMARKS.pmgsy? ` 3. PMGSY: ${d.pg.tgt-d.pg.conn} habitations isolated. Prioritise by population and health facility distance.` : ` 3. PMGSY connectivity achieved. Focus on all-weather upgrade.`,
(d.mg.wage||0) < 230 ? ` 4. MGNREGA WAGE: Rs.${d.mg.wage}/day below national avg Rs.247. Initiate wage revision with SEGC.` : ` 4. MGNREGA wage adequate. Focus on asset quality and demand fulfilment.`,
d.rainDep > 70 && d.irr < 25 ? ` 5. CTARA SOLAR IRRIGATION: ${d.rainDep}% rain-dependent farmland + ${d.irr}% irrigation = high PM-KUSUM solar pump potential.` : ` 5. CTARA: Irrigation at ${d.irr}%. Focus on water use efficiency programmes.`,
'',
'═══════════════════════════════════════════════════════════════════════',
' DATA: MGNREGA MIS | PMAY-G AWAAS+ | PMGSY OMMS | JJM eJalShakti | NRLM MIS',
' Census 2011 | NFHS-5 | Agriculture Census 2022 | FY 2023-24',
' Bharat Niti v1.0 — CTARA IIT Bombay × MoRD, Government of India',
'═══════════════════════════════════════════════════════════════════════',
].filter(Boolean);
const b = new Blob([lines.join('\n')], { type:'text/plain;charset=utf-8' });
const u = URL.createObjectURL(b);
const a = document.createElement('a');
a.href=u; a.download=`BharatNiti_${d.name}_${d.state}.txt`; a.click(); URL.revokeObjectURL(u);
};

if (!d) return (
<div className="rp">
<div className="rp-empty">
<div style={{ fontSize:36, opacity:.4 }}>🗺️</div>
<div style={{ fontSize:13, fontWeight:700, color:'#475569' }}>Select a district</div>
<div style={{ fontSize:11, lineHeight:1.6 }}>Click any dot on the map or a row in the sidebar to load scheme analysis and AI insights.</div>
</div>
</div>
);

const conv = getConv(d), cs = getCTARA(d), di = distressInfo(d.distress), fu = getFU(d);

const schemes = [
{ full:'Mahatma Gandhi NREGA', color:'#f59e0b', pct:d.mg.pct||0, v1:`${d.mg.pct||0}%`, l1:'Completion', v2:`₹${d.mg.wage||0}`, l2:'Avg wage/day' },
{ full:'PM Awaas Yojana (G)', color:'#f97316', pct:d.pm.pct, v1:`${d.pm.pct}%`, l1:'Houses done', v2:`${fu}%`, l2:'Fund utilised' },
{ full:'PM Gram Sadak Yojana', color:'#8b5cf6', pct:d.pg.pct, v1:`${d.pg.pct}%`, l1:'Connected', v2:`${d.pg.kmD}km`, l2:'Roads built' },
{ full:'Jal Jeevan Mission', color:'#0ea5e9', pct:d.jj.pct, v1:`${d.jj.pct}%`, l1:'HH covered', v2:fmtL(d.jj.tap), l2:'Tap connections' },
{ full:'DAY-NRLM', color:'#ec4899', pct:d.nl.blPct, v1:`${d.nl.blPct}%`, l1:'Bank-linked', v2:`₹${d.nl.loan}Cr`, l2:'Loans disbursed' },
];

const gaps = [
d.jj.pct < BENCHMARKS.jjm && { icon:'💧', sg:'Critical', sc:'#fef2f2', tc:'#dc2626', tx:`JJM: ${fmtL(d.jj.hh-d.jj.tap)} HH without tap — ${d.jj.pct}% vs ${BENCHMARKS.jjm}% national` },
fu < BENCHMARKS.fundUtil && { icon:'💰', sg:'High', sc:'#fff7ed', tc:'#ea580c', tx:`PMAY funds: ₹${(d.pm.rel-d.pm.util).toFixed(1)}Cr unspent — util ${fu}% vs ${BENCHMARKS.fundUtil}% benchmark` },
d.pg.pct < BENCHMARKS.pmgsy && { icon:'🛣️', sg:'High', sc:'#fff7ed', tc:'#ea580c', tx:`PMGSY: ${d.pg.tgt-d.pg.conn} habitations unconnected` },
(d.mg.pct||0) < BENCHMARKS.mgnrega && { icon:'👷', sg:'Medium', sc:'#fefce8', tc:'#ca8a04', tx:`MGNREGA: ${d.mg.pct||0}% vs ${BENCHMARKS.mgnrega}% — wage ₹${d.mg.wage||0}/day` },
d.nl.blPct < BENCHMARKS.nrlm && { icon:'👩', sg:'Medium', sc:'#fefce8', tc:'#ca8a04', tx:`NRLM: ${d.nl.blPct}% bank-linked vs ${BENCHMARKS.nrlm}% benchmark` },
d.rainDep > 70 && d.irr < 25 && { icon:'🌱', sg:'CTARA', sc:'#eff6ff', tc:'#2563eb', tx:`Rain dependency ${d.rainDep}% + irrigation ${d.irr}% = PM-KUSUM solar pump opportunity` },
].filter(Boolean).slice(0,5);

const ctaraInds = [
{ l:'Irrigation', v:d.irr, c:'#0ea5e9' },
{ l:'Agriculture yield',v:d.agri, c:'#84cc16' },
{ l:'GW safety', v:Math.max(0,(10-d.gw)*10), c:'#10b981' },
{ l:'Electrification', v:d.elec, c:'#f59e0b' },
{ l:'Water quality', v:d.jj.safe, c:'#0ea5e9' },
{ l:'Rain independence',v:100-d.rainDep, c:'#84cc16' },
];

return (
<div className="rp fadeIn">
<div className="rph">
<div className="rpd">{d.name}</div>
<div className="rps">{d.state} · {d.region} · Pop: {fmtL(d.pop)}</div>
<div className="tags">
<span className="tg" style={{ background:di.bg, color:di.c }}>{di.label} Distress</span>
<span className="tg" style={{ background:'#fff7ed', color:'#c2410c' }}>Conv {conv}/100</span>
<span className="tg" style={{ background:'#eff6ff', color:'#1d4ed8' }}>CTARA {cs}/100</span>
</div>
</div>
<div className="rp-scr">
<div className="rpb">
{/* Hero */}
<div className="hero">
<div className="hero-top">
<div>
<div className="hero-n">{conv}</div>
<div className="hero-l">SCHEME CONVERGENCE SCORE</div>
</div>
<div className="hero-r">
<div className="hero-d" style={{ color:di.c }}>{d.distress}<span style={{ fontSize:12, color:'#4b5563' }}>/10</span></div>
<div className="hero-dl">DISTRESS INDEX</div>
</div>
</div>
<div className="hero-bar"><div className="hero-fill" style={{ width:`${conv}%` }} /></div>
<div className="hero-ft"><span>0 — No convergence</span><span>100 — Full convergence</span></div>
</div>

{/* CTARA */}
<div className="cblock">
<div className="cs-row">
<div><div className="cs-num">{cs}</div><div className="cs-lbl">CTARA DEVELOPMENT SCORE</div></div>
<span className="tg" style={{ background: cs>55?'#f0fdf4':cs>40?'#fefce8':'#fef2f2', color: cs>55?'#16a34a':cs>40?'#ca8a04':'#dc2626' }}>
{cs>55?'Above avg':cs>40?'Near avg':'Below avg'}
</span>
</div>
{ctaraInds.map(ci => (
<div className="ci" key={ci.l}>
<div className="ci-r"><span className="ci-n">{ci.l}</span><span className="ci-v">{ci.v}%</span></div>
<div className="ci-bg"><div className="ci-fill" style={{ width:`${ci.v}%`, background:ci.c }} /></div>
</div>
))}
</div>

{/* Schemes */}
<div>
<div className="slbl">MoRD Scheme Implementation</div>
{schemes.map((s, i) => (
<div className="sc" key={i}>
<div className="sc-h">
<div className="sc-n">{s.full}</div>
<span className="sc-badge" style={{ background:s.pct<50?'#fef2f2':'#f0fdf4', color:s.pct<50?'#dc2626':'#16a34a' }}>
{s.pct<50?'⚠ Below':'✓ On track'}
</span>
</div>
<div className="sc-g">
<div><div className="sc-v" style={{ color:s.color }}>{s.v1}</div><div className="sc-vl">{s.l1}</div></div>
<div><div className="sc-v">{s.v2}</div><div className="sc-vl">{s.l2}</div></div>
</div>
<div className="sc-bt"><div className="sc-bf" style={{ width:`${s.pct}%`, background:s.color }} /></div>
</div>
))}
</div>

{/* Gaps */}
{gaps.length > 0 && (
<div>
<div className="slbl">Implementation Gaps</div>
<div className="glist">
{gaps.map((g, i) => (
<div key={i} className="grow" style={{ background:g.sc, borderColor:g.sc }}>
<div className="gic">{g.icon}</div>
<div className="gtx">{g.tx}</div>
<div className="gsg" style={{ background:'rgba(255,255,255,.7)', color:g.tc }}>{g.sg}</div>
</div>
))}
</div>
</div>
)}

<button className="bbtn" onClick={brief}>📄 Download Policy Brief (TXT)</button>
</div>

{/* AI */}
<div className="ai-sec">
<div className="ai-h">
<div className="ai-badge">✦ AI</div>
<div className="ai-title">MoRD × CTARA Policy Analyst</div>
</div>
<div className="chat">
{msgs.length === 0 && <div className="chips">{CHIPS.map(c => <button key={c} className="chip" onClick={() => ask(c)}>{c}</button>)}</div>}
{msgs.length > 0 && (
<div className="msgs" ref={msgsRef}>
{msgs.map((m, i) => m.r==='u'
? <div key={i} className="mu">{m.t}</div>
: <div key={i} className="ma"><div className="ma-n">✦ CLAUDE · MoRD × CTARA</div>{m.t}</div>)}
{loading && <div className="ma"><div className="ma-n">✦ CLAUDE</div><Typing /></div>}
</div>
)}
<div className="cbar">
<input className="cin" value={input} onChange={e => setInput(e.target.value)}
onKeyDown={e => e.key==='Enter' && !loading && ask(input)}
placeholder={loading?'Analysing…':'Ask about schemes, gaps, CTARA…'} disabled={loading} />
<button className="cgo" onClick={() => ask(input)} disabled={loading||!input.trim()}>→</button>
</div>
</div>
{!process.env.REACT_APP_CLAUDE_KEY && (
<div className="apig">
{/* <div className="apig-t">🔑 Enable AI Analysis</div>
{[['1','Visit','console.anthropic.com','→ sign up free'],['2','Click API Keys →','Create Key','→ copy'],['3','Create','.env','in project root'],['4','Paste:','REACT_APP_CLAUDE_KEY=sk-ant-xxx',''],['5','Stop server → run','npm start','again']].map(([n,a,b,c]) => (
<div className="astep" key={n}><div className="anum">{n}</div><span>{a} <strong>{b}</strong> {c}</span></div>
))} */}
</div>
)}
</div>
</div>
</div>
);
}

function Analytics({ onSel }) {
const cards = [
{ t:'🚨 Most Distressed', data:[...districts].sort((a,b)=>b.distress-a.distress).slice(0,8), vFn:d=>d.distress, max:10, unit:'/10', cFn:d=>distressInfo(d.distress).c, bFn:d=>distressInfo(d.distress).bg },
{ t:'💧 Lowest JJM Coverage', data:[...districts].sort((a,b)=>a.jj.pct-b.jj.pct).slice(0,8), vFn:d=>d.jj.pct, max:100, unit:'%', cFn:()=>'#0ea5e9', bFn:()=>'#eff6ff' },
{ t:'💰 Lowest PMAY Fund Util.', data:[...districts].sort((a,b)=>getFU(a)-getFU(b)).slice(0,8), vFn:getFU, max:100, unit:'%', cFn:d=>getFU(d)<50?'#dc2626':'#ea580c', bFn:d=>getFU(d)<50?'#fef2f2':'#fff7ed' },
{ t:'📊 Lowest Convergence', data:[...districts].sort((a,b)=>getConv(a)-getConv(b)).slice(0,8), vFn:getConv, max:100, unit:'', cFn:()=>'#ff5c28', bFn:()=>'#fff7ed' },
{ t:'🌱 Lowest CTARA Score', data:[...districts].sort((a,b)=>getCTARA(a)-getCTARA(b)).slice(0,8), vFn:getCTARA, max:100, unit:'', cFn:()=>'#0ea5e9', bFn:()=>'#eff6ff' },
{ t:'🛣️ Lowest Road Connectivity', data:[...districts].sort((a,b)=>a.pg.pct-b.pg.pct).slice(0,8), vFn:d=>d.pg.pct, max:100, unit:'%', cFn:()=>'#8b5cf6', bFn:()=>'#f5f3ff' },
];
return (
<div className="ctr an-body" style={{ overflow:'auto', display:'grid' }}>
{cards.map(card => (
<div className="ac" key={card.t}>
<div className="ac-t">{card.t}</div>
{card.data.map((d, i) => {
const v = card.vFn(d), pct = (v/card.max)*100, col = card.cFn(d), bg = card.bFn(d);
return (
<div className="arow" key={d.id} onClick={() => onSel(d)}>
<div className="ark" style={{ background:bg, color:col }}>{i+1}</div>
<div className="ainf"><div className="anm">{d.name}</div><div className="ast">{d.state}</div></div>
<div className="abar"><div className="abt"><div className="abf" style={{ width:`${pct}%`, background:col }} /></div></div>
<div className="avl" style={{ color:col }}>{v}{card.unit}</div>
</div>
);
})}
</div>
))}
</div>
);
}

function Convergence({ onSel }) {
const sorted = [...districts].sort((a, b) => getConv(a) - getConv(b));
const cols = [
{ l:'MGNREGA', fn:d=>d.mg.pct||0, b:BENCHMARKS.mgnrega, c:'#f59e0b' },
{ l:'PMAY-G', fn:d=>d.pm.pct, b:BENCHMARKS.pmay, c:'#f97316' },
{ l:'PMGSY', fn:d=>d.pg.pct, b:BENCHMARKS.pmgsy, c:'#8b5cf6' },
{ l:'JJM', fn:d=>d.jj.pct, b:BENCHMARKS.jjm, c:'#0ea5e9' },
{ l:'NRLM', fn:d=>d.nl.blPct, b:BENCHMARKS.nrlm, c:'#ec4899' },
];
return (
<div className="ctr cv-b" style={{ overflow:'auto' }}>
<div className="cv-shell">
<div className="cv-h">
<div className="cv-ht">Scheme Convergence — All Districts ({sorted.length})</div>
<div className="cv-hs">Red = below national benchmark · Click row for full analysis</div>
</div>
<div style={{ overflowX:'auto' }}>
<table>
<thead>
<tr>
<th>District</th><th>State</th><th>Distress</th>
{cols.map(c => <th key={c.l}>{c.l}</th>)}
<th>CTARA</th><th>Fund Util.</th><th>Convergence</th>
</tr>
</thead>
<tbody>
{sorted.map(d => {
const conv=getConv(d), cs=getCTARA(d), di=distressInfo(d.distress), fu=getFU(d);
return (
<tr key={d.id} className="tv" onClick={() => onSel(d)}>
<td><div className="cv-dn">{d.name}</div></td>
<td><div className="cv-ds">{d.state}</div></td>
<td><span className="tg" style={{ background:di.bg, color:di.c, fontSize:8, padding:'1px 7px' }}>{di.label}</span></td>
{cols.map(c => {
const v=c.fn(d), bad=v<c.b;
return (
<td key={c.l}>
<div className="cv-pc">
<div className="cv-mb"><div className="cv-mf" style={{ width:`${v}%`, background:bad?'#dc2626':c.c }} /></div>
<span style={{ fontSize:10, fontWeight:700, color:bad?'#dc2626':c.c, fontFamily:'JetBrains Mono,monospace' }}>{v}%</span>
</div>
</td>
);
})}
<td><span style={{ fontSize:10, fontWeight:700, color:'#0ea5e9', fontFamily:'JetBrains Mono,monospace' }}>{cs}</span></td>
<td><span style={{ fontSize:10, fontWeight:700, color:fu<60?'#dc2626':'#16a34a', fontFamily:'JetBrains Mono,monospace' }}>{fu}%</span></td>
<td>
<div className="cv-cv">
<div className="cv-bar"><div className="cv-fill" style={{ width:`${conv}%` }} /></div>
<span className="cv-n">{conv}</span>
</div>
</td>
</tr>
);
})}
</tbody>
</table>
</div>
</div>
</div>
);
}

function CTARAPage({ onSel }) {
const top12 = [...districts].sort((a,b) => getCTARA(b)-getCTARA(a)).slice(0,12);
return (
<div className="ctr ct-body" style={{ overflow:'auto' }}>
<div className="ct-banner">
<div className="ct-bt">CTARA Research Intelligence</div>
<div className="ct-bs">Centre for Technology Alternatives for Rural Areas, IIT Bombay — technology solutions for rural communities. This view maps 65 districts to six core CTARA research themes and surfaces intervention priorities.</div>
</div>
<div style={{ marginBottom:12 }}><div className="slbl">Research Themes & Intervention Count</div></div>
<div className="ct-grid">
{CTARA_THEMES.map(t => {
const count = districts.filter(t.flag).length;
return (
<div className="ct-card" key={t.key}>
<div className="ct-ic">{t.icon}</div>
<div className="ct-cn">{t.label}</div>
<div className="ct-cd">{t.desc}</div>
<div style={{ fontSize:11, fontWeight:700, color:t.color, marginBottom:6 }}>{count} districts need intervention</div>
<div className="ct-cb"><div className="ct-cf" style={{ width:`${Math.min(count/districts.length*100*2.5,100)}%`, background:t.color }} /></div>
</div>
);
})}
</div>
<div style={{ marginBottom:12 }}><div className="slbl">Top 12 Districts — CTARA Development Score</div></div>
<div className="dtgrid">
{top12.map(d => {
const cs = getCTARA(d);
return (
<div className="dtcard" key={d.id} onClick={() => onSel(d)}>
<div className="dt-nm">{d.name}</div>
<div className="dt-st">{d.state} · CTARA <strong style={{ color:'#0ea5e9' }}>{cs}</strong>/100</div>
<div className="dt-ig">
{[{l:'Irrigation',v:`${d.irr}%`,c:'#0ea5e9'},{l:'Electrification',v:`${d.elec}%`,c:'#f59e0b'},{l:'JJM Coverage',v:`${d.jj.pct}%`,c:'#0ea5e9'},{l:'Agri. Yield',v:`${d.agri}/100`,c:'#84cc16'}].map(x => (
<div key={x.l} style={{ background:'#f8fafc', borderRadius:6, padding:'5px 7px' }}>
<div className="dt-iv" style={{ color:x.c }}>{x.v}</div>
<div className="dt-il">{x.l}</div>
</div>
))}
</div>
</div>
);
})}
</div>
</div>
);
}

// ══════════════════════════════════════════════════════════════════════════════
// Root
// ══════════════════════════════════════════════════════════════════════════════
export default function App() {
const [view, setView] = useState('Map');
const [sel, setSel] = useState(null);
const [layer, setLayer] = useState('conv');
const [state, setState] = useState('');
const [sort, setSort] = useState('distress');
const [search, setSearch] = useState('');
const [mapOK, setMapOK] = useState(false);

useEffect(() => {
const style = document.createElement('style');
style.textContent = CSS;
document.head.appendChild(style);
const css = document.createElement('link');
css.rel='stylesheet'; css.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
document.head.appendChild(css);
const js = document.createElement('script');
js.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
js.onload=()=>setMapOK(true);
document.head.appendChild(js);
}, []);

const onSearch = () => {
const q = search.trim().toLowerCase();
if (!q) return;
const m = districts.find(d => d.name.toLowerCase().includes(q) || d.state.toLowerCase().includes(q));
if (m) { setSel(m); setState(m.state); setView('Map'); }
};

const onSel = d => { setSel(d); setView('Map'); };

return (
<div className="shell">
<Header view={view} setView={setView} search={search} setSearch={setSearch} onSearch={onSearch} />
<KPIBand />
<div className="body">
<Sidebar layer={layer} setLayer={setLayer} state={state} setState={setState} sort={sort} setSort={setSort} sel={sel} onSel={onSel} />
{view==='Map' && (mapOK
? <MapPanel sel={sel} onSel={onSel} layer={layer} setLayer={setLayer} stateFilter={state} />
: <div className="ctr" style={{ display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:12, color:'#94a3b8' }}>
<div style={{ fontSize:34 }}>🗺️</div>
<div style={{ fontSize:13, fontWeight:600, color:'#64748b' }}>Loading map…</div>
</div>)}
{view==='Analytics' && <Analytics onSel={onSel} />}
{view==='Convergence' && <Convergence onSel={onSel} />}
{view==='CTARA' && <CTARAPage onSel={onSel} />}
<RightPanel d={sel} />
</div>
</div>
);
}
