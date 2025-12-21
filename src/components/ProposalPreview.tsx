import { Proposal } from '../types';
import TitlePageEditable from './TitlePageEditable';
import IntroPageEditable from './IntroPageEditable';
import PhotoSection from './PhotoSection';
import EstimatePage from './EstimatePage';
import AttachmentsPage from './AttachmentsPage';
import '../ProposalStyles.css';

interface ProposalPreviewProps {
  proposal: Proposal;
}

export default function ProposalPreview({ proposal }: ProposalPreviewProps) {
  return (
    <div className="proposal-container">
      <TitlePageEditable data={proposal.titlePage} />
      <IntroPageEditable data={proposal.introPage} />

      {proposal.photoSections.map((section, index) => (
        <PhotoSection key={index} data={section} />
      ))}

      {proposal.estimates.map((estimate, index) => (
        <EstimatePage key={index} data={estimate} />
      ))}

      {proposal.attachments && proposal.attachments.length > 0 && (
        <AttachmentsPage attachments={proposal.attachments} />
      )}
    </div>
  );
}
