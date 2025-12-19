import { FileAttachment } from '../types';

interface AttachmentsPageProps {
  attachments: FileAttachment[];
}

function getFileExtension(filename: string): string {
  const parts = filename.split('.');
  return parts.length > 1 ? parts[parts.length - 1].toUpperCase() : 'FILE';
}

export default function AttachmentsPage({ attachments }: AttachmentsPageProps) {
  if (!attachments || attachments.length === 0) {
    return null;
  }

  const embeddedAttachments = attachments.filter(a => a.embedContent && a.pdfPages);
  const linkedAttachments = attachments.filter(a => !a.embedContent);

  return (
    <>
      {/* Linked attachments overview */}
      {linkedAttachments.length > 0 && (
        <div className="page attachments-page">
          <h2 className="section-title">Additional Documentation</h2>
          <div className="accent-bar"></div>

          <ul className="attachments-list" style={{ marginTop: '50px' }}>
            {linkedAttachments.map((attachment, index) => (
              <li key={index} className="attachment-item">
                <div className="attachment-icon">
                  {getFileExtension(attachment.name)}
                </div>
                <div className="attachment-info">
                  <div className="attachment-name">{attachment.name}</div>
                  <div className="attachment-meta">
                    <span className="attachment-type">
                      {attachment.type}
                    </span>
                    {attachment.size && <span>{attachment.size}</span>}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Embedded PDF pages */}
      {embeddedAttachments.map((attachment, attachmentIndex) => (
        <div key={`embedded-${attachmentIndex}`}>
          {attachment.pdfPages?.map((pageUrl, pageIndex) => (
            <div key={`page-${pageIndex}`} className="page embedded-pdf-page">
              <img
                src={pageUrl}
                alt={`${attachment.name} - Page ${pageIndex + 1}`}
                className="embedded-pdf-image"
              />
            </div>
          ))}
        </div>
      ))}
    </>
  );
}
