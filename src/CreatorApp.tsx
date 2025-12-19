import { ProposalProvider, useProposal } from './context/ProposalContext';
import CreatorHeader from './components/CreatorHeader';
import ChatPanel from './components/ChatPanel';
import EditPanel from './components/EditPanel';
import ProposalPreview from './components/ProposalPreview';
import FinalizeDialog from './components/FinalizeDialog';
import MobileChatBar from './components/MobileChatBar';
import './CreatorStyles.css';

function CreatorContent() {
  const { proposal, isEditMode, isMobile } = useProposal();

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

        {/* Mobile: Show edit panel OR preview (not both) */}
        {isMobile && isEditMode && (
          <div className="mobile-edit-panel">
            <EditPanel />
          </div>
        )}

        {/* Mobile: Show preview only in AI mode */}
        {isMobile && !isEditMode && (
          <div className="creator-right-panel">
            <ProposalPreview proposal={proposal} />
          </div>
        )}
      </div>

      {/* Mobile: Show chat bar only in AI mode */}
      {isMobile && !isEditMode && <MobileChatBar />}

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
