import { districts, getConv, getCTARA, getFU, distressInfo } from '../data';

function Analytics({ onSel }) {
  const cards = [
    { 
      t:'🚨 Most Distressed', 
      data:[...districts].sort((a,b)=>b.distress-a.distress).slice(0,8), 
      vFn:d=>d.distress, 
      max:10, 
      unit:'/10', 
      cFn:d=>distressInfo(d.distress).c, 
      bFn:d=>distressInfo(d.distress).bg 
    },
    { 
      t:'💧 Lowest JJM Coverage', 
      data:[...districts].sort((a,b)=>a.jj.pct-b.jj.pct).slice(0,8), 
      vFn:d=>d.jj.pct, 
      max:100, 
      unit:'%', 
      cFn:()=>'#0ea5e9', 
      bFn:()=>'#eff6ff' 
    },
    { 
      t:'💰 Lowest PMAY Fund Util.', 
      data:[...districts].sort((a,b)=>getFU(a)-getFU(b)).slice(0,8), 
      vFn:getFU, 
      max:100, 
      unit:'%', 
      cFn:d=>getFU(d)<50?'#dc2626':'#ea580c', 
      bFn:d=>getFU(d)<50?'#fef2f2':'#fff7ed' 
    },
    { 
      t:'📊 Lowest Convergence', 
      data:[...districts].sort((a,b)=>getConv(a)-getConv(b)).slice(0,8), 
      vFn:getConv, 
      max:100, 
      unit:'', 
      cFn:()=>'#ff5c28', 
      bFn:()=>'#fff7ed' 
    },
    { 
      t:'🌱 Lowest CTARA Score', 
      data:[...districts].sort((a,b)=>getCTARA(a)-getCTARA(b)).slice(0,8), 
      vFn:getCTARA, 
      max:100, 
      unit:'', 
      cFn:()=>'#0ea5e9', 
      bFn:()=>'#eff6ff' 
    },
    { 
      t:'🛣️ Lowest Road Connectivity', 
      data:[...districts].sort((a,b)=>a.pg.pct-b.pg.pct).slice(0,8), 
      vFn:d=>d.pg.pct, 
      max:100, 
      unit:'%', 
      cFn:()=>'#8b5cf6', 
      bFn:()=>'#f5f3ff' 
    },
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
                <div className="ainf">
                  <div className="anm">{d.name}</div>
                  <div className="ast">{d.state}</div>
                </div>
                <div className="abar">
                  <div className="abt">
                    <div className="abf" style={{ width:`${pct}%`, background:col }} />
                  </div>
                </div>
                <div className="avl" style={{ color:col }}>{v}{card.unit}</div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Analytics;
