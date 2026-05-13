import { districts, BENCHMARKS, getConv, getCTARA, getFU, distressInfo } from '../data';

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
                <th>District</th>
                <th>State</th>
                <th>Distress</th>
                {cols.map(c => <th key={c.l}>{c.l}</th>)}
                <th>CTARA</th>
                <th>Fund Util.</th>
                <th>Convergence</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map(d => {
                const conv=getConv(d), cs=getCTARA(d), di=distressInfo(d.distress), fu=getFU(d);
                return (
                  <tr key={d.id} className="tv" onClick={() => onSel(d)}>
                    <td><div className="cv-dn">{d.name}</div></td>
                    <td><div className="cv-ds">{d.state}</div></td>
                    <td>
                      <span className="tg" style={{ 
                        background:di.bg, 
                        color:di.c, 
                        fontSize:8, 
                        padding:'1px 7px' 
                      }}>
                        {di.label}
                      </span>
                    </td>
                    {cols.map(c => {
                      const v=c.fn(d), bad=v<c.b;
                      return (
                        <td key={c.l}>
                          <div className="cv-pc">
                            <div className="cv-mb">
                              <div className="cv-mf" style={{ 
                                width:`${v}%`, 
                                background:bad?'#dc2626':c.c 
                              }} />
                            </div>
                            <span style={{ 
                              fontSize:10, 
                              fontWeight:700, 
                              color:bad?'#dc2626':c.c, 
                              fontFamily:'JetBrains Mono,monospace' 
                            }}>
                              {v}%
                            </span>
                          </div>
                        </td>
                      );
                    })}
                    <td>
                      <span style={{ 
                        fontSize:10, 
                        fontWeight:700, 
                        color:'#0ea5e9', 
                        fontFamily:'JetBrains Mono,monospace' 
                      }}>
                        {cs}
                      </span>
                    </td>
                    <td>
                      <span style={{ 
                        fontSize:10, 
                        fontWeight:700, 
                        color:fu<60?'#dc2626':'#16a34a', 
                        fontFamily:'JetBrains Mono,monospace' 
                      }}>
                        {fu}%
                      </span>
                    </td>
                    <td>
                      <div className="cv-cv">
                        <div className="cv-bar">
                          <div className="cv-fill" style={{ width:`${conv}%` }} />
                        </div>
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

export default Convergence;
