import { useState } from 'react';
import { Estimate, AddOn } from '../types';

interface SelectionPanelProps {
  estimates: Estimate[];
  addOns?: AddOn[];
  contractorName: string;
}

export default function SelectionPanel({ estimates, addOns = [], contractorName }: SelectionPanelProps) {
  const [selectedEstimateId, setSelectedEstimateId] = useState<string | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<Set<string>>(new Set());
  const [signature, setSignature] = useState('');

  const selectedEstimate = estimates.find(e => e.id === selectedEstimateId);

  const addOnsTotal = Array.from(selectedAddOns).reduce((sum, addOnId) => {
    const addOn = addOns.find(a => a.id === addOnId);
    return sum + (addOn?.price || 0);
  }, 0);

  const grandTotal = (selectedEstimate?.total || 0) + addOnsTotal;

  const toggleAddOn = (addOnId: string) => {
    const newSelected = new Set(selectedAddOns);
    if (newSelected.has(addOnId)) {
      newSelected.delete(addOnId);
    } else {
      newSelected.add(addOnId);
    }
    setSelectedAddOns(newSelected);
  };

  const handleProceedToPayment = () => {
    if (!selectedEstimateId) {
      alert('Please select a package first');
      return;
    }
    if (!signature.trim()) {
      alert('Please sign to authorize');
      return;
    }
    alert('Proceeding to Stripe checkout...');
  };

  const handleDownloadPDF = () => {
    alert('Downloading PDF...');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="selection-panel">
      <div className="selection-panel-content">
        <h3 className="selection-title">Select Your Package</h3>

        {/* Package Selection */}
        <div className="package-options">
          {estimates.map((estimate) => (
            <label
              key={estimate.id}
              className={`package-option ${selectedEstimateId === estimate.id ? 'selected' : ''}`}
            >
              <input
                type="radio"
                name="package"
                value={estimate.id}
                checked={selectedEstimateId === estimate.id}
                onChange={() => setSelectedEstimateId(estimate.id)}
              />
              <div className="package-info">
                <div className="package-name">{estimate.title}</div>
                <div className="package-price">{formatCurrency(estimate.total)}</div>
              </div>
            </label>
          ))}
        </div>

        {/* Add-ons */}
        {addOns.length > 0 && (
          <>
            <h4 className="selection-subtitle">Add-Ons</h4>
            <div className="addon-options">
              {addOns.map((addOn) => (
                <label
                  key={addOn.id}
                  className={`addon-option ${selectedAddOns.has(addOn.id) ? 'selected' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={selectedAddOns.has(addOn.id)}
                    onChange={() => toggleAddOn(addOn.id)}
                  />
                  <div className="addon-info">
                    <div className="addon-name">{addOn.name}</div>
                    <div className="addon-description">{addOn.description}</div>
                  </div>
                  <div className="addon-price">+{formatCurrency(addOn.price)}</div>
                </label>
              ))}
            </div>
          </>
        )}

        {/* Total */}
        {selectedEstimateId && (
          <div className="selection-total">
            <div className="total-row">
              <span>Package</span>
              <span>{formatCurrency(selectedEstimate?.total || 0)}</span>
            </div>
            {addOnsTotal > 0 && (
              <div className="total-row">
                <span>Add-ons</span>
                <span>{formatCurrency(addOnsTotal)}</span>
              </div>
            )}
            <div className="total-row grand-total">
              <span>Total</span>
              <span>{formatCurrency(grandTotal)}</span>
            </div>
          </div>
        )}

        {/* Signature */}
        <div className="signature-section">
          <h4 className="selection-subtitle">Authorization</h4>
          <p className="signature-instructions">
            By signing below, you authorize {contractorName} to proceed with the selected work.
          </p>
          <input
            type="text"
            className="signature-input"
            placeholder="Type your full name to sign"
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
          />
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button
            className="download-pdf-button"
            onClick={handleDownloadPDF}
          >
            Download PDF
          </button>
          <button
            className="proceed-button"
            onClick={handleProceedToPayment}
            disabled={!selectedEstimateId || !signature.trim()}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}
