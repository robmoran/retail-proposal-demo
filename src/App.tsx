import ProposalPreview from './components/ProposalPreview';
import SelectionPanel from './components/SelectionPanel';
import MobileSelectionBar from './components/MobileSelectionBar';
import { sampleProposal } from './sampleData';
import './ProposalStyles.css';

function App() {
  return (
    <div className="app-layout">
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
