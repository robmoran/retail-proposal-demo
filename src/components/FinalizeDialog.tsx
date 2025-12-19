import { useState } from 'react';
import { useProposal } from '../context/ProposalContext';

export default function FinalizeDialog() {
  const { proposal, showFinalizeDialog, setShowFinalizeDialog } = useProposal();
  const [message, setMessage] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'email' | 'sms' | 'link'>('email');
  const [emailAddress, setEmailAddress] = useState(proposal.titlePage.homeowner.email || '');
  const [phoneNumber, setPhoneNumber] = useState(proposal.titlePage.homeowner.phone || '');

  if (!showFinalizeDialog) return null;

  const handleSend = () => {
    // Simulate sending
    alert(`Proposal would be sent via ${deliveryMethod}\nMessage: ${message || '(none)'}`);
    setShowFinalizeDialog(false);
  };

  const handleCopyLink = () => {
    const link = `https://example.com/proposal/${proposal.id}`;
    navigator.clipboard.writeText(link);
    alert('Link copied to clipboard!');
  };

  const totalAmount = proposal.estimates[0]?.total || 0;

  return (
    <div className="finalize-dialog-overlay" onClick={() => setShowFinalizeDialog(false)}>
      <div className="finalize-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="finalize-dialog-header">
          <h2 className="finalize-dialog-title">Finalize & Send Proposal</h2>
          <button
            className="finalize-dialog-close"
            onClick={() => setShowFinalizeDialog(false)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>

        <div className="finalize-dialog-content">
          <div className="proposal-summary">
            <div className="summary-row">
              <span className="summary-label">Project</span>
              <span className="summary-value">{proposal.titlePage.projectTitle}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Homeowner</span>
              <span className="summary-value">{proposal.titlePage.homeowner.name}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Property</span>
              <span className="summary-value">{proposal.titlePage.homeowner.address}</span>
            </div>
            <div className="summary-row highlight">
              <span className="summary-label">Starting at</span>
              <span className="summary-value">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                }).format(totalAmount)}
              </span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Message to Homeowner (Optional)</label>
            <textarea
              className="form-textarea"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a personal message..."
            />
          </div>

          <div className="form-group">
            <label className="form-label">Delivery Method</label>
            <div className="delivery-methods">
              <button
                className={`delivery-method-button ${deliveryMethod === 'email' ? 'active' : ''}`}
                onClick={() => setDeliveryMethod('email')}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                Email
              </button>
              <button
                className={`delivery-method-button ${deliveryMethod === 'sms' ? 'active' : ''}`}
                onClick={() => setDeliveryMethod('sms')}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414z"/>
                </svg>
                SMS
              </button>
              <button
                className={`delivery-method-button ${deliveryMethod === 'link' ? 'active' : ''}`}
                onClick={() => setDeliveryMethod('link')}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"/>
                </svg>
                Copy Link
              </button>
            </div>
          </div>

          {deliveryMethod === 'email' && (
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                placeholder="homeowner@example.com"
              />
            </div>
          )}

          {deliveryMethod === 'sms' && (
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                className="form-input"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="(555) 123-4567"
              />
            </div>
          )}

          {deliveryMethod === 'link' && (
            <div className="copy-link-section">
              <p className="copy-link-description">
                Share this link with your homeowner to view the proposal online.
              </p>
              <button className="copy-link-button" onClick={handleCopyLink}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
                  <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"/>
                </svg>
                Copy Link to Clipboard
              </button>
            </div>
          )}
        </div>

        <div className="finalize-dialog-footer">
          <button
            className="finalize-dialog-cancel"
            onClick={() => setShowFinalizeDialog(false)}
          >
            Cancel
          </button>
          {deliveryMethod !== 'link' && (
            <button className="finalize-dialog-send" onClick={handleSend}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.01 2.01L2 8.5l12 1.5L2 11.5l.01 6.49L20 10 2.01 2.01z"/>
              </svg>
              Send Proposal
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
