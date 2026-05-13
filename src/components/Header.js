import React from 'react';

function Header({ view, setView, search, setSearch, onSearch }) {
  return (
    <header className="hdr">
      <div className="hdr-l">
        <div className="logo">BHARAT NITI</div> 
        <div>
          <div className="brand-t">Rural Intelligence Platform</div>
        </div>
      </div>
      <div className="hdr-r">
        <div className="srch">
          <span className="srch-ic">⌕</span>
          <input 
            placeholder="Search district or state…" 
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && onSearch()} 
          />
        </div>
        {['Map','Analytics','Convergence','CTARA'].map(v => (
          <button 
            key={v} 
            className={`npill ${view === v ? 'on' : ''}`} 
            onClick={() => setView(v)}
          >
            {v}
          </button>
        ))}
      </div>
    </header>
  );
}

export default Header;
