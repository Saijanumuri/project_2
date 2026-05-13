import { useState, useEffect, useRef, useCallback } from 'react';
import { BENCHMARKS, getConv, getCTARA, getFU, distressInfo, fmtL } from '../data';

const fmtPD = n => !n ? '—' : n >= 1e6 ? `${(n/1e6).toFixed(1)}M` : `${(n/1e3).toFixed(0)}K`;

function Dot({ delay = 0 }) {
  return (
    <span style={{ 
      display:'inline-block', 
      width:5, 
      height:5, 
      borderRadius:'50%', 
      background:'#ff5c28', 
      margin:'0 2px', 
      animation:'tbd 1s infinite', 
      animationDelay:`${delay}s` 
    }} />
  );
}

function Typing() {
  return <span><Dot /><Dot delay={0.15} /><Dot delay={0.3} /></span>;
}

function RightPanel({ d, onClose }) {
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const msgsRef = useRef(null);

  useEffect(() => { setMsgs([]); setInput(''); }, [d?.id]);
  useEffect(() => { 
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight; 
  }, [msgs]);

  const CHIPS = [
    'Why is JJM coverage low?',
    'What MoRD + CTARA interventions fit?',
    'Analyse fund underutilisation',
    'Write a policy brief',
    'CTARA solar irrigation opportunity?'
  ];

  const ask = useCallback(async (q) => {
    if (!q.trim() || loading) return;
    setMsgs(p => [...p, { r:'u', t:q }]);
    setInput(''); 
    setLoading(true);
    const key = process.env.REACT_APP_CLAUDE_KEY;
    if (!key) { 
      setMsgs(p => [...p, { r:'a', t:'⚠️ Add REACT_APP_CLAUDE_KEY to .env and restart. See setup guide below.' }]); 
      setLoading(false); 
      return; 
    }
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
        headers:{ 
          'Content-Type':'application/json', 
          'x-api-key':key, 
          'anthropic-version':'2023-06-01', 
          'anthropic-dangerous-direct-browser-access':'true' 
        },
        body: JSON.stringify({ 
          model:'claude-3-5-sonnet-20241022', 
          max_tokens:700,
          messages:[{ 
            role:'user', 
            content:`You are a dual expert: a senior MoRD policy analyst AND a CTARA IIT Bombay research associate. Bridge scheme implementation + appropriate technology. Give 4-6 precise data-driven sentences with specific numbers, scheme names, CTARA research themes (water, energy, livelihoods, roads, agriculture), and actionable interventions.\n\nContext: ${ctx}\n\nQuestion: ${q}` 
          }] 
        }),
      });
      if (!res.ok) { 
        const e = await res.json(); 
        throw new Error(e.error?.message||`HTTP ${res.status}`); 
      }
      const data = await res.json();
      setMsgs(p => [...p, { r:'a', t: data.content?.[0]?.text||'No response.' }]);
    } catch(e) { 
      setMsgs(p => [...p, { r:'a', t:`Error: ${e.message}` }]); 
    }
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
        <div style={{ fontSize:11, lineHeight:1.6 }}>
          Click any dot on the map or a row in the sidebar to load scheme analysis and AI insights.
        </div>
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
                <div className="hero-d" style={{ color:di.c }}>
                  {d.distress}<span style={{ fontSize:12, color:'#4b5563' }}>/10</span>
                </div>
                <div className="hero-dl">DISTRESS INDEX</div>
              </div>
            </div>
            <div className="hero-bar">
              <div className="hero-fill" style={{ width:`${conv}%` }} />
            </div>
            <div className="hero-ft">
              <span>0 — No convergence</span>
              <span>100 — Full convergence</span>
            </div>
          </div>

          {/* CTARA */}
          <div className="cblock">
            <div className="cs-row">
              <div>
                <div className="cs-num">{cs}</div>
                <div className="cs-lbl">CTARA DEVELOPMENT SCORE</div>
              </div>
              <span className="tg" style={{ 
                background: cs>55?'#f0fdf4':cs>40?'#fefce8':'#fef2f2', 
                color: cs>55?'#16a34a':cs>40?'#ca8a04':'#dc2626' 
              }}>
                {cs>55?'Above avg':cs>40?'Near avg':'Below avg'}
              </span>
            </div>
            {ctaraInds.map(ci => (
              <div className="ci" key={ci.l}>
                <div className="ci-r">
                  <span className="ci-n">{ci.l}</span>
                  <span className="ci-v">{ci.v}%</span>
                </div>
                <div className="ci-bg">
                  <div className="ci-fill" style={{ width:`${ci.v}%`, background:ci.c }} />
                </div>
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
                  <span className="sc-badge" style={{ 
                    background:s.pct<50?'#fef2f2':'#f0fdf4', 
                    color:s.pct<50?'#dc2626':'#16a34a' 
                  }}>
                    {s.pct<50?'⚠ Below':'✓ On track'}
                  </span>
                </div>
                <div className="sc-g">
                  <div>
                    <div className="sc-v" style={{ color:s.color }}>{s.v1}</div>
                    <div className="sc-vl">{s.l1}</div>
                  </div>
                  <div>
                    <div className="sc-v">{s.v2}</div>
                    <div className="sc-vl">{s.l2}</div>
                  </div>
                </div>
                <div className="sc-bt">
                  <div className="sc-bf" style={{ width:`${s.pct}%`, background:s.color }} />
                </div>
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
                    <div className="gsg" style={{ background:'rgba(255,255,255,.7)', color:g.tc }}>
                      {g.sg}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button className="bbtn" onClick={brief}>
            📄 Download Policy Brief (TXT)
          </button>
        </div>

        {/* AI */}
        <div className="ai-sec">
          <div className="ai-h">
            <div className="ai-badge">✦ AI</div>
            <div className="ai-title">MoRD × CTARA Policy Analyst</div>
          </div>
          <div className="chat">
            {msgs.length === 0 && (
              <div className="chips">
                {CHIPS.map(c => (
                  <button key={c} className="chip" onClick={() => ask(c)}>
                    {c}
                  </button>
                ))}
              </div>
            )}
            {msgs.length > 0 && (
              <div className="msgs" ref={msgsRef}>
                {msgs.map((m, i) => m.r==='u'
                  ? <div key={i} className="mu">{m.t}</div>
                  : <div key={i} className="ma">
                      <div className="ma-n">✦ CLAUDE · MoRD × CTARA</div>
                      {m.t}
                    </div>
                )}
                {loading && (
                  <div className="ma">
                    <div className="ma-n">✦ CLAUDE</div>
                    <Typing />
                  </div>
                )}
              </div>
            )}
            <div className="cbar">
              <input 
                className="cin" 
                value={input} 
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key==='Enter' && !loading && ask(input)}
                placeholder={loading?'Analysing…':'Ask about schemes, gaps, CTARA…'} 
                disabled={loading} 
              />
              <button 
                className="cgo" 
                onClick={() => ask(input)} 
                disabled={loading||!input.trim()}
              >
                →
              </button>
            </div>
          </div>
          {!process.env.REACT_APP_CLAUDE_KEY && (
            <div className="apig">
              {/* API setup guide removed for brevity */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RightPanel;
