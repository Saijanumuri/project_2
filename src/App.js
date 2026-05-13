import { useState, useEffect } from 'react';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import { districts } from './data';
import { CSS } from './styles';
import Header from './components/Header';
import KPIBand from './components/KPIBand';
import Sidebar from './components/Sidebar';
import MapPanel from './components/MapPanel';
import RightPanel from './components/RightPanel';
import Analytics from './components/Analytics';
import Convergence from './components/Convergence';
import CTARAPage from './components/CTARAPage';

export default function App() {
  const [view, setView] = useState('Map');
  const [sel, setSel] = useState(null);
  const [layer, setLayer] = useState('conv');
  const [state, setState] = useState('');
  const [sort, setSort] = useState('distress');
  const [search, setSearch] = useState('');
  const [mapOK, setMapOK] = useState(false);

  useEffect(() => {
    // Inject CSS only once
    if (!document.getElementById('bharat-niti-styles')) {
      const style = document.createElement('style');
      style.id = 'bharat-niti-styles';
      style.textContent = CSS;
      document.head.appendChild(style);
    }
    // If Leaflet already loaded (StrictMode double-invoke), just set flag
    if (window.L) { setMapOK(true); return; }
    // If script tag already injected, wait for it
    if (document.getElementById('leaflet-js')) {
      const existing = document.getElementById('leaflet-js');
      existing.addEventListener('load', () => setMapOK(true));
      return;
    }
    if (!document.getElementById('leaflet-css')) {
      const css = document.createElement('link');
      css.id = 'leaflet-css';
      css.rel = 'stylesheet';
      css.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(css);
    }
    const js = document.createElement('script');
    js.id = 'leaflet-js';
    js.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    js.crossOrigin = 'anonymous';
    js.onload = () => setMapOK(true);
    js.onerror = () => console.error('Failed to load Leaflet');
    document.head.appendChild(js);
  }, []);

  const onSearch = () => {
    const q = search.trim().toLowerCase();
    if (!q) return;
    const m = districts.find(d => 
      d.name.toLowerCase().includes(q) || d.state.toLowerCase().includes(q)
    );
    if (m) { 
      setSel(m); 
      setState(m.state); 
      setView('Map'); 
    }
  };

  const onSel = d => { 
    setSel(d); 
    setView('Map'); 
  };

  return (
    <div className="shell">
      <VercelAnalytics />
      <Header 
        view={view} 
        setView={setView} 
        search={search} 
        setSearch={setSearch} 
        onSearch={onSearch} 
      />
      <KPIBand />
      <div className="body">
        <Sidebar 
          layer={layer} 
          setLayer={setLayer} 
          state={state} 
          setState={setState} 
          sort={sort} 
          setSort={setSort} 
          sel={sel} 
          onSel={onSel} 
        />
        {view==='Map' && (mapOK
          ? <MapPanel 
              sel={sel} 
              onSel={onSel} 
              layer={layer} 
              setLayer={setLayer} 
              stateFilter={state} 
            />
          : <div className="ctr" style={{ 
              display:'flex', 
              alignItems:'center', 
              justifyContent:'center', 
              flexDirection:'column', 
              gap:12, 
              color:'#94a3b8' 
            }}>
              <div style={{ fontSize:34 }}>🗺️</div>
              <div style={{ fontSize:13, fontWeight:600, color:'#64748b' }}>
                Loading map…
              </div>
            </div>
        )}
        {view==='Analytics' && <Analytics onSel={onSel} />}
        {view==='Convergence' && <Convergence onSel={onSel} />}
        {view==='CTARA' && <CTARAPage onSel={onSel} />}
        <RightPanel d={sel} />
      </div>
    </div>
  );
}
