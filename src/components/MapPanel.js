import { useEffect, useRef } from 'react';
import { districts, getConv, getCTARA, getFU, distressInfo, pctColor, fmtL } from '../data';

const SCHEMES = [
  { id:'conv', label:'Convergence', color:'#ff5c28' },
  { id:'ctara', label:'CTARA Score', color:'#0ea5e9' },
  { id:'mg', label:'MGNREGA', color:'#f59e0b' },
  { id:'pm', label:'PMAY-G', color:'#f97316' },
  { id:'pg', label:'PMGSY', color:'#8b5cf6' },
  { id:'jj', label:'JJM', color:'#0ea5e9' },
  { id:'nl', label:'DAY-NRLM', color:'#ec4899' },
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

function MapPanel({ sel, onSel, layer, setLayer, stateFilter }) {
  const mapRef = useRef(null);
  const instRef = useRef(null);
  const mkrRef = useRef({});
  const vis = stateFilter ? districts.filter(d => d.state === stateFilter) : districts;

  useEffect(() => {
    if (instRef.current || !window.L) return;
    const map = window.L.map(mapRef.current, { center:[22,80], zoom:5 });
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { 
      attribution:'© OSM', 
      opacity:0.3 
    }).addTo(map);
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
        radius: isSel ? 15 : 10, 
        fillColor: col,
        color: isSel ? '#0a0f1e' : '#fff', 
        weight: isSel ? 3 : 1.5, 
        opacity:1, 
        fillOpacity:.9,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layer, stateFilter, sel]);

  useEffect(() => {
    if (sel && instRef.current) instRef.current.flyTo([sel.lat, sel.lng], 9, { duration:1 });
  }, [sel]);

  return (
    <div className="ctr">
      <div ref={mapRef} className="mapw" />
      <div className="mtop">
        {SCHEMES.map(s => (
          <button 
            key={s.id} 
            className={`mbtn ${layer === s.id ? 'on' : ''}`}
            style={layer === s.id ? { background: s.color } : {}}
            onClick={() => setLayer(s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div className="mleg">
        <div className="mlegt">Implementation Level</div>
        {[
          ['#16a34a','≥ 80% — High'],
          ['#65a30d','65–79% — Good'],
          ['#ca8a04','50–64% — Medium'],
          ['#ea580c','35–49% — Low'],
          ['#dc2626','< 35% — Critical']
        ].map(([c,l]) => (
          <div className="mlegr" key={l}>
            <div className="mlegdot" style={{ background:c }} />
            {l}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MapPanel;
