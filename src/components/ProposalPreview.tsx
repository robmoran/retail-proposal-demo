import { Proposal } from '../types';
import TitlePage from './TitlePage';
import IntroPage from './IntroPage';
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
      <TitlePage data={proposal.titlePage} />
      <IntroPage data={proposal.introPage} />

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
