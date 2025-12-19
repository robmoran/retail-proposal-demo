import { IntroPage as IntroPageType } from '../types';

interface IntroPageProps {
  data: IntroPageType;
}

export default function IntroPage({ data }: IntroPageProps) {
  const { content, signature, contractorName } = data;

  const paragraphs = content.split('\n\n').filter(p => p.trim());

  return (
    <div className="page intro-page">
      <h2 className="section-title">Introduction</h2>
      <div className="accent-bar"></div>

      <div style={{ marginTop: '50px' }}>
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
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
