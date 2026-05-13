import React from 'react';
import { districts, getConv, getCTARA, distressInfo, pctColor, stateList } from '../data';

const SCHEMES = [
  { id:'conv', label:'Convergence', color:'#ff5c28' },
  { id:'ctara', label:'CTARA Score', color:'#0ea5e9' },
  { id:'mg', label:'MGNREGA', color:'#f59e0b' },
  { id:'pm', label:'PMAY-G', color:'#f97316' },
  { id:'pg', label:'PMGSY', color:'#8b5cf6' },
  { id:'jj', label:'JJM', color:'#0ea5e9' },
  { id:'nl', label:'DAY-NRLM', color:'#ec4899' },
];

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
            {stateList.map(s => (
              <option key={s} value={s}>
                {s} ({districts.filter(d => d.state === s).length})
              </option>
            ))}
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
            <div 
              key={s.id} 
              className={`lrow ${layer === s.id ? 'on' : ''}`} 
              onClick={() => setLayer(s.id)}
            >
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
            <div 
              key={d.id} 
              className={`drow ${sel?.id === d.id ? 'sel' : ''}`} 
              onClick={() => onSel(d)}
            >
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

export default Sidebar;
