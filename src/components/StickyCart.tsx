import { useState, useEffect } from 'react';
import { Estimate, AddOn } from '../types';

interface StickyCartProps {
  selectedEstimate: Estimate | null;
  selectedAddOns: AddOn[];
  signature: string;
  onSignatureChange: (signature: string) => void;
  total: number;
  onCheckout: () => void;
  contractorName: string;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export default function StickyCart({
  selectedEstimate,
  selectedAddOns,
  signature,
  onSignatureChange,
  total,
  onCheckout,
  contractorName,
}: StickyCartProps) {
  const isEmpty = !selectedEstimate && selectedAddOns.length === 0;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleToggle = () => {
    if (isMobile) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className={`sticky-cart ${isExpanded ? 'expanded' : ''}`}>
      {/* Mobile compact bar */}
      {isMobile && !isExpanded && (
        <div className="sticky-cart-compact" onClick={handleToggle}>
          <div className="compact-left">
            <div className="compact-label">Your Selection</div>
            {!isEmpty && (
              <div className="compact-items">
                {selectedEstimate && <span>{selectedEstimate.title}</span>}
                {selectedAddOns.length > 0 && (
                  <span className="compact-addons">+{selectedAddOns.length} add-on{selectedAddOns.length > 1 ? 's' : ''}</span>
                )}
              </div>
            )}
          </div>
          <div className="compact-right">
            <div className="compact-total">{formatCurrency(total)}</div>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="compact-chevron">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
          </div>
        </div>
      )}

      {/* Full cart content */}
      <div className={`sticky-cart-content ${isMobile && !isExpanded ? 'hidden' : ''}`}>
        {isMobile && (
          <div className="sticky-cart-handle" onClick={handleToggle}>
            <div className="handle-bar"></div>
          </div>
        )}
        <h3 className="sticky-cart-title">Your Selection</h3>

        {isEmpty ? (
          <div className="sticky-cart-empty">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p>Select a package to get started</p>
          </div>
        ) : (
          <>
            <div className="sticky-cart-items">
              {/* Selected package */}
              {selectedEstimate && (
                <div className="cart-item cart-item-package">
                  <div className="cart-item-info">
                    <div className="cart-item-name">{selectedEstimate.title}</div>
                    <div className="cart-item-description">Base Package</div>
                  </div>
                  <div className="cart-item-price">{formatCurrency(selectedEstimate.total)}</div>
                </div>
              )}

              {/* Selected add-ons */}
              {selectedAddOns.map((addOn) => (
                <div key={addOn.id} className="cart-item">
                  <div className="cart-item-info">
                    <div className="cart-item-name">{addOn.name}</div>
                    <div className="cart-item-description">Add-on</div>
                  </div>
                  <div className="cart-item-price">{formatCurrency(addOn.price)}</div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="cart-total">
              <span className="cart-total-label">Total Investment</span>
              <span className="cart-total-amount">{formatCurrency(total)}</span>
            </div>

            {/* Signature section */}
            <div className="cart-signature">
              <label htmlFor="signature" className="cart-signature-label">
                Your Signature
              </label>
              <input
                id="signature"
                type="text"
                className="cart-signature-input"
                placeholder="Type your full name"
                value={signature}
                onChange={(e) => onSignatureChange(e.target.value)}
              />
              <p className="cart-signature-hint">
                By signing, you agree to proceed with the selected package and accept the terms outlined by {contractorName}.
              </p>
            </div>

            {/* Checkout button */}
            <button
              className="cart-checkout-button"
              onClick={onCheckout}
              disabled={!selectedEstimate || !signature.trim()}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                <line x1="1" y1="10" x2="23" y2="10"/>
              </svg>
              Proceed to Payment
            </button>

            <div className="cart-secure-badge">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0a.75.75 0 01.65.375l5.5 9.5A.75.75 0 0113.5 11h-11a.75.75 0 01-.65-1.125l5.5-9.5A.75.75 0 018 0z"/>
                <path d="M8 14a1 1 0 100-2 1 1 0 000 2z"/>
              </svg>
              Secured by Stripe
            </div>
          </>
        )}
      </div>

      {/* Overlay for mobile expanded state */}
      {isMobile && isExpanded && (
        <div className="cart-overlay" onClick={handleToggle}></div>
      )}
    </div>
  );
}
