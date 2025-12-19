import { useState } from 'react';
import ProposalPreview from './components/ProposalPreview';
import SelectionPanel from './components/SelectionPanel';
import MobileSelectionBar from './components/MobileSelectionBar';
import CreatorApp from './CreatorApp';
import { sampleProposal } from './sampleData';
import './ProposalStyles.css';

function App() {
  // Toggle between 'viewer' (homeowner view) and 'creator' (contractor creation view)
  const [mode, setMode] = useState<'viewer' | 'creator'>('creator');

  // For demo purposes, show a mode switcher
  // In production, this would be route-based or user-role based
  if (mode === 'creator') {
    return <CreatorApp />;
  }

  return (
    <div className="app-layout">
      {/* Mode switcher for demo */}
      <button
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 1000,
          padding: '10px 16px',
          background: '#ff6b35',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontFamily: 'Inter, sans-serif',
          fontSize: '13px',
          fontWeight: 600,
        }}
        onClick={() => setMode('creator')}
      >
        Switch to Creator Mode
      </button>

      {/* Desktop: Split layout */}
      <div className="proposal-scroll-area">
        <ProposalPreview proposal={sampleProposal} />
      </div>

      {/* Desktop: Sticky selection panel */}
      <div className="desktop-selection-panel">
        <SelectionPanel
          estimates={sampleProposal.estimates}
          addOns={sampleProposal.addOns}
          contractorName={sampleProposal.titlePage.contractor.name}
        />
      </div>

      {/* Mobile: Sticky bottom bar with modal */}
      <MobileSelectionBar
        estimates={sampleProposal.estimates}
        addOns={sampleProposal.addOns}
        contractorName={sampleProposal.titlePage.contractor.name}
      />
    </div>
  );
}

export default App;
