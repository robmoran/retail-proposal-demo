import { Estimate, AddOn } from '../types';

interface SelectionsSectionProps {
  estimates: Estimate[];
  addOns: AddOn[];
  selectedEstimate: Estimate | null;
  selectedAddOns: AddOn[];
  onEstimateSelect: (estimate: Estimate) => void;
  onAddOnToggle: (addOn: AddOn) => void;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function SelectionsSection({
  estimates,
  addOns,
  selectedEstimate,
  selectedAddOns,
  onEstimateSelect,
  onAddOnToggle,
}: SelectionsSectionProps) {
  return (
    <div className="page selections-section">
      <div className="selections-container">
        <h2 className="section-title">Choose Your Package</h2>
        <div className="accent-bar" style={{ margin: '0 auto var(--space-xl)' }}></div>

        {/* Estimate package cards */}
        <div className="package-cards">
          {estimates.map((estimate) => {
            const isSelected = selectedEstimate?.id === estimate.id;
            return (
              <div
                key={estimate.id}
                className={`package-card ${isSelected ? 'selected' : ''}`}
                onClick={() => onEstimateSelect(estimate)}
              >
                <div className="package-card-header">
                  <h3 className="package-card-title">{estimate.title}</h3>
                  <div className="package-card-price">{formatCurrency(estimate.total)}</div>
                </div>

                {estimate.description && (
                  <p className="package-card-description">{estimate.description}</p>
                )}

                <div className="package-card-features">
                  {estimate.lineItems.slice(0, 5).map((item, index) => (
                    <div key={index} className="package-feature">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/>
                      </svg>
                      <span>{item.description}</span>
                    </div>
                  ))}
                  {estimate.lineItems.length > 5 && (
                    <div className="package-feature-more">
                      + {estimate.lineItems.length - 5} more items
                    </div>
                  )}
                </div>

                <button
                  className={`package-card-button ${isSelected ? 'selected' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEstimateSelect(estimate);
                  }}
                >
                  {isSelected ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/>
                      </svg>
                      Selected
                    </>
                  ) : (
                    'Select Package'
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Add-ons section */}
        {addOns.length > 0 && (
          <div className="addons-section">
            <h3 className="addons-title">Optional Add-Ons</h3>
            <p className="addons-subtitle">Enhance your project with these additional services</p>

            <div className="addon-cards">
              {addOns.map((addOn) => {
                const isSelected = selectedAddOns.some(a => a.id === addOn.id);
                return (
                  <div
                    key={addOn.id}
                    className={`addon-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => onAddOnToggle(addOn)}
                  >
                    <div className="addon-card-header">
                      <div className="addon-checkbox">
                        {isSelected && (
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/>
                          </svg>
                        )}
                      </div>
                      <div className="addon-card-content">
                        <h4 className="addon-card-title">{addOn.name}</h4>
                        <p className="addon-card-description">{addOn.description}</p>
                      </div>
                      <div className="addon-card-price">{formatCurrency(addOn.price)}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
