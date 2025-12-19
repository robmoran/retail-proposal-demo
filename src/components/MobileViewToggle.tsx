import { useProposal } from '../context/ProposalContext';

export default function MobileViewToggle() {
  const { mobileView, setMobileView } = useProposal();

  return (
    <div className="mobile-view-toggle">
      <button
        className={`mobile-view-button ${mobileView === 'chat' ? 'active' : ''}`}
        onClick={() => setMobileView('chat')}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z"/>
        </svg>
        Chat
      </button>
      <button
        className={`mobile-view-button ${mobileView === 'preview' ? 'active' : ''}`}
        onClick={() => setMobileView('preview')}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M4 4a2 2 0 012-2h8l4 4v8a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V6h-2V4H6z"/>
        </svg>
        Preview
      </button>
    </div>
  );
}
