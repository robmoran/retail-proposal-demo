import { IntroPage as IntroPageType } from '../types';
import EditableWrapper from './EditableWrapper';
import { useProposal } from '../context/ProposalContext';

interface IntroPageProps {
  data: IntroPageType;
}

export default function IntroPageEditable({ data }: IntroPageProps) {
  const { content, signature, contractorName } = data;
  const { isEditMode, updateIntroPage } = useProposal();

  const paragraphs = content.split('\n\n').filter(p => p.trim());

  return (
    <div className="page intro-page">
      <h2 className="section-title">Introduction</h2>
      <div className="accent-bar"></div>

      <div style={{ marginTop: '50px' }}>
        <EditableWrapper
          id="intro-content"
          type="multiline"
          value={content}
          onSave={(value) => updateIntroPage('content', value)}
          isEditMode={isEditMode}
          placeholder="Write your introduction letter here..."
        >
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </EditableWrapper>
      </div>

      {(signature || contractorName) && (
        <div className="signature-section">
          {signature && (
            <img src={signature} alt="Signature" className="signature-image" />
          )}
          {contractorName && (
            <>
              <div className="signature-name">{contractorName}</div>
              <div className="signature-title">Project Manager</div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
