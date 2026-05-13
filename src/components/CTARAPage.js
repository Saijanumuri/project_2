import { districts, getCTARA } from '../data';

const CTARA_THEMES = [
  { 
    key:'water', 
    icon:'💧', 
    label:'Water & Sanitation', 
    desc:'JJM, groundwater, water quality', 
    color:'#0ea5e9',
    flag: d => d.jj.pct < 40 || d.gw > 7 
  },
  { 
    key:'energy', 
    icon:'⚡', 
    label:'Rural Energy', 
    desc:'Electrification, solar potential', 
    color:'#f59e0b',
    flag: d => d.elec < 80 
  },
  { 
    key:'live', 
    icon:'🌾', 
    label:'Livelihoods & NREGA', 
    desc:'Employment, wages, SHGs', 
    color:'#10b981',
    flag: d => (d.mg.pct||0) < 55 || d.mg.wage < 200 
  },
  { 
    key:'roads', 
    icon:'🛣️', 
    label:'Roads & Connectivity', 
    desc:'PMGSY, habitation access', 
    color:'#8b5cf6',
    flag: d => d.pg.pct < 60 
  },
  { 
    key:'agri', 
    icon:'🌱', 
    label:'Agriculture & Land', 
    desc:'Irrigation, yield, rainfall', 
    color:'#84cc16',
    flag: d => d.agri < 40 || d.irr < 25 
  },
  { 
    key:'housing', 
    icon:'🏠', 
    label:'Rural Housing', 
    desc:'PMAY-G, fund utilisation', 
    color:'#f97316',
    flag: d => d.pm.pct < 55 
  },
];

function CTARAPage({ onSel }) {
  const top12 = [...districts].sort((a,b) => getCTARA(b)-getCTARA(a)).slice(0,12);
  
  return (
    <div className="ctr ct-body" style={{ overflow:'auto' }}>
      <div className="ct-banner">
        <div className="ct-bt">CTARA Research Intelligence</div>
      </div>
      
      <div style={{ marginBottom:12 }}>
        <div className="slbl">Research Themes & Intervention Count</div>
      </div>
      
      <div className="ct-grid">
        {CTARA_THEMES.map(t => {
          const count = districts.filter(t.flag).length;
          return (
            <div className="ct-card" key={t.key}>
              <div className="ct-ic">{t.icon}</div>
              <div className="ct-cn">{t.label}</div>
              <div className="ct-cd">{t.desc}</div>
              <div style={{ 
                fontSize:11, 
                fontWeight:700, 
                color:t.color, 
                marginBottom:6 
              }}>
                {count} districts need intervention
              </div>
              <div className="ct-cb">
                <div className="ct-cf" style={{ 
                  width:`${Math.min(count/districts.length*100*2.5,100)}%`, 
                  background:t.color 
                }} />
              </div>
            </div>
          );
        })}
      </div>
      
      <div style={{ marginBottom:12 }}>
        <div className="slbl">Top 12 Districts — CTARA Development Score</div>
      </div>
      
      <div className="dtgrid">
        {top12.map(d => {
          const cs = getCTARA(d);
          return (
            <div className="dtcard" key={d.id} onClick={() => onSel(d)}>
              <div className="dt-nm">{d.name}</div>
              <div className="dt-st">
                {d.state} · CTARA <strong style={{ color:'#0ea5e9' }}>{cs}</strong>/100
              </div>
              <div className="dt-ig">
                {[
                  {l:'Irrigation',v:`${d.irr}%`,c:'#0ea5e9'},
                  {l:'Electrification',v:`${d.elec}%`,c:'#f59e0b'},
                  {l:'JJM Coverage',v:`${d.jj.pct}%`,c:'#0ea5e9'},
                  {l:'Agri. Yield',v:`${d.agri}/100`,c:'#84cc16'}
                ].map(x => (
                  <div key={x.l} style={{ 
                    background:'#f8fafc', 
                    borderRadius:6, 
                    padding:'5px 7px' 
                  }}>
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

export default CTARAPage;
