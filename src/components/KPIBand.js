import React from 'react';

const KPIS = [
  { label:'MGNREGA Active HH', val:'5.5 Cr', delta:'+8% YoY', color:'#f59e0b' },
  { label:'PMAY-G Completed', val:'3.20 Cr', delta:'+12% YoY', color:'#f97316' },
  { label:'PMGSY Roads', val:'7.28L km', delta:'+5% YoY', color:'#8b5cf6' },
  { label:'JJM Tap HH', val:'14.6 Cr', delta:'+22% YoY', color:'#0ea5e9' },
  { label:'SHG Members', val:'10+ Cr', delta:'+9% YoY', color:'#ec4899' },
];

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

export default KPIBand;
