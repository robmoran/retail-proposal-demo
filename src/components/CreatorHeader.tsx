import { useProposal } from '../context/ProposalContext';

export default function CreatorHeader() {
  const { isEditMode, setIsEditMode, setShowFinalizeDialog, isMobile } = useProposal();

  const handleSave = () => {
    // On mobile in edit mode, just show a toast/feedback
    // In a real app, this would save to a database
    alert('Changes saved!');
    // Switch back to preview mode on mobile
    if (isMobile) {
      setIsEditMode(false);
    }
  };

  // On mobile in edit mode, show Save button instead of Finalize
  const showSaveButton = isMobile && isEditMode;

  return (
    <div className="creator-header">
      <div className="creator-header-left">
        <div className="creator-logo">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="6" fill="#ff6b35"/>
            <path d="M8 16L14 10L20 16L26 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 22L14 16L20 22L26 16" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="creator-logo-text">Proposal Builder</span>
        </div>
      </div>

      <div className="creator-header-center">
        <div className="mode-toggle">
          <button
            className={`mode-toggle-button ${!isEditMode ? 'active' : ''}`}
            onClick={() => setIsEditMode(false)}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 2a.75.75 0 01.75.75v4.5h4.5a.75.75 0 010 1.5h-4.5v4.5a.75.75 0 01-1.5 0v-4.5h-4.5a.75.75 0 010-1.5h4.5v-4.5A.75.75 0 018 2z"/>
            </svg>
            AI
          </button>
          <button
            className={`mode-toggle-button ${isEditMode ? 'active' : ''}`}
            onClick={() => setIsEditMode(true)}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M11.013 2.513a1.75 1.75 0 012.475 0l.499.5a1.75 1.75 0 010 2.474l-7.5 7.5a1.75 1.75 0 01-.757.438l-2.5.5a.75.75 0 01-.884-.884l.5-2.5a1.75 1.75 0 01.438-.757l7.5-7.5zm1.768.707a.25.25 0 00-.354 0L5.25 10.397a.25.25 0 00-.063.108l-.34 1.701 1.701-.34a.25.25 0 00.108-.063l7.177-7.177a.25.25 0 000-.354l-.5-.5z"/>
            </svg>
            Edit
          </button>
        </div>
      </div>

      <div className="creator-header-right">
        {showSaveButton ? (
          <button
            className="finalize-button save-button"
            onClick={handleSave}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/>
            </svg>
            Save
          </button>
        ) : (
          <button
            className="finalize-button"
            onClick={() => setShowFinalizeDialog(true)}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/>
            </svg>
            Finalize Proposal
          </button>
        )}
      </div>
    </div>
  );
}
