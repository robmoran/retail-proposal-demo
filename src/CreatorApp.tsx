import { ProposalProvider, useProposal } from './context/ProposalContext';
import CreatorHeader from './components/CreatorHeader';
import ChatPanel from './components/ChatPanel';
import EditPanel from './components/EditPanel';
import ProposalPreview from './components/ProposalPreview';
import FinalizeDialog from './components/FinalizeDialog';
import MobileViewToggle from './components/MobileViewToggle';
import './CreatorStyles.css';

function CreatorContent() {
  const { proposal, isEditMode, isMobile, mobileView } = useProposal();

  return (
    <div className="creator-layout">
      <CreatorHeader />

      <div className="creator-main">
        {/* Desktop: Always show left panel and preview side-by-side */}
        {!isMobile && (
          <div className="creator-left-panel">
            {isEditMode ? <EditPanel /> : <ChatPanel />}
          </div>
        )}

        {/* Desktop: Always show preview */}
        {!isMobile && (
          <div className="creator-right-panel">
            <ProposalPreview proposal={proposal} />
          </div>
        )}

        {/* Mobile: Show edit form when in edit mode */}
        {isMobile && isEditMode && (
          <div className="mobile-edit-panel">
            <EditPanel />
          </div>
        )}

        {/* Mobile: Show chat when not editing and mobileView is 'chat' */}
        {isMobile && !isEditMode && mobileView === 'chat' && (
          <div className="mobile-chat-panel">
            <ChatPanel />
          </div>
        )}

        {/* Mobile: Show preview when not editing and mobileView is 'preview' */}
        {isMobile && !isEditMode && mobileView === 'preview' && (
          <div className="creator-right-panel">
            <ProposalPreview proposal={proposal} />
          </div>
        )}
      </div>

      {/* Mobile: Show view toggle only when not in edit mode */}
      {isMobile && !isEditMode && <MobileViewToggle />}

      <FinalizeDialog />
    </div>
  );
}

export default function CreatorApp() {
  return (
    <ProposalProvider>
      <CreatorContent />
    </ProposalProvider>
  );
}
