import { useState } from 'react';
import { useProposal } from '../context/ProposalContext';
import { Estimate, LineItem } from '../types';

export default function EditPanel() {
  const { proposal, updateProposal } = useProposal();
  const [expandedSection, setExpandedSection] = useState<string | null>('title');
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const updateTitlePage = (field: string, value: any) => {
    updateProposal({
      titlePage: {
        ...proposal.titlePage,
        [field]: value,
      },
    });
  };

  const updateContractor = (field: string, value: any) => {
    updateProposal({
      titlePage: {
        ...proposal.titlePage,
        contractor: {
          ...proposal.titlePage.contractor,
          [field]: value,
        },
      },
    });
  };

  const updateHomeowner = (field: string, value: any) => {
    updateProposal({
      titlePage: {
        ...proposal.titlePage,
        homeowner: {
          ...proposal.titlePage.homeowner,
          [field]: value,
        },
      },
    });
  };

  const updateIntroPage = (content: string) => {
    updateProposal({
      introPage: {
        ...proposal.introPage,
        content,
      },
    });
  };

  // Estimate management functions
  const calculateLineItemTotal = (lineItem: LineItem): number => {
    if (lineItem.quantity && lineItem.unitPrice) {
      return lineItem.quantity * lineItem.unitPrice;
    }
    return lineItem.total || 0;
  };

  const calculateEstimateTotals = (lineItems: LineItem[], tax?: number): { subtotal: number; total: number } => {
    const subtotal = lineItems.reduce((sum, item) => sum + calculateLineItemTotal(item), 0);
    const total = subtotal + (tax || 0);
    return { subtotal, total };
  };

  const updateEstimate = (estimateId: string, field: keyof Estimate, value: any) => {
    const updatedEstimates = proposal.estimates.map((est) => {
      if (est.id === estimateId) {
        const updated = { ...est, [field]: value };
        // Recalculate totals if lineItems changed
        if (field === 'lineItems') {
          const { subtotal, total } = calculateEstimateTotals(value as LineItem[], est.tax);
          updated.subtotal = subtotal;
          updated.total = total;
        }
        if (field === 'tax') {
          const { total } = calculateEstimateTotals(est.lineItems, value as number);
          updated.total = total;
        }
        return updated;
      }
      return est;
    });
    updateProposal({ estimates: updatedEstimates });
  };

  const updateLineItem = (estimateId: string, lineItemIndex: number, field: keyof LineItem, value: any) => {
    const estimate = proposal.estimates.find((e) => e.id === estimateId);
    if (!estimate) return;

    const updatedLineItems = estimate.lineItems.map((item, idx) => {
      if (idx === lineItemIndex) {
        const updatedItem = { ...item, [field]: value };
        // Auto-calculate total if quantity or unitPrice changed
        if (field === 'quantity' || field === 'unitPrice') {
          const qty = field === 'quantity' ? parseFloat(value) || 0 : item.quantity || 0;
          const price = field === 'unitPrice' ? parseFloat(value) || 0 : item.unitPrice || 0;
          updatedItem.total = qty * price;
        }
        return updatedItem;
      }
      return item;
    });

    updateEstimate(estimateId, 'lineItems', updatedLineItems);
  };

  const addLineItem = (estimateId: string) => {
    const estimate = proposal.estimates.find((e) => e.id === estimateId);
    if (!estimate) return;

    const newLineItem: LineItem = {
      description: '',
      quantity: 1,
      unit: 'ea',
      unitPrice: 0,
      total: 0,
    };

    updateEstimate(estimateId, 'lineItems', [...estimate.lineItems, newLineItem]);
  };

  const removeLineItem = (estimateId: string, lineItemIndex: number) => {
    const estimate = proposal.estimates.find((e) => e.id === estimateId);
    if (!estimate) return;

    const updatedLineItems = estimate.lineItems.filter((_, idx) => idx !== lineItemIndex);
    updateEstimate(estimateId, 'lineItems', updatedLineItems);
  };

  const addEstimate = () => {
    const newEstimate: Estimate = {
      id: `estimate-${Date.now()}`,
      title: 'New Estimate',
      description: '',
      lineItems: [
        {
          description: '',
          quantity: 1,
          unit: 'ea',
          unitPrice: 0,
          total: 0,
        },
      ],
      subtotal: 0,
      tax: 0,
      total: 0,
    };

    updateProposal({ estimates: [...proposal.estimates, newEstimate] });
    setExpandedSection(newEstimate.id);
  };

  const removeEstimate = (estimateId: string) => {
    const updatedEstimates = proposal.estimates.filter((e) => e.id !== estimateId);
    updateProposal({ estimates: updatedEstimates });
    if (expandedSection === estimateId) {
      setExpandedSection(null);
    }
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const newEstimates = [...proposal.estimates];
    const [draggedItem] = newEstimates.splice(draggedIndex, 1);
    newEstimates.splice(dropIndex, 0, draggedItem);

    updateProposal({ estimates: newEstimates });
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // Render estimate section content
  const renderEstimateContent = (estimate: Estimate) => (
    <div className="edit-form">
      <div className="form-group">
        <label className="form-label">Estimate Title</label>
        <input
          type="text"
          className="form-input"
          value={estimate.title}
          onChange={(e) => updateEstimate(estimate.id, 'title', e.target.value)}
          placeholder="e.g., Premium Package"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Description (Optional)</label>
        <textarea
          className="form-textarea"
          rows={2}
          value={estimate.description || ''}
          onChange={(e) => updateEstimate(estimate.id, 'description', e.target.value)}
          placeholder="Brief description of this estimate option..."
        />
      </div>

      <div className="line-items-section">
        <div className="line-items-header">
          <label className="form-label">Line Items</label>
          <button
            className="add-line-item-btn"
            onClick={() => addLineItem(estimate.id)}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
              <path d="M7 0a.75.75 0 01.75.75v5.5h5.5a.75.75 0 010 1.5h-5.5v5.5a.75.75 0 01-1.5 0v-5.5h-5.5a.75.75 0 010-1.5h5.5v-5.5A.75.75 0 017 0z"/>
            </svg>
            Add Line Item
          </button>
        </div>

        {estimate.lineItems.map((lineItem, itemIndex) => (
          <div key={itemIndex} className="line-item-row">
            <div className="line-item-fields">
              <div className="form-group line-item-description">
                <input
                  type="text"
                  className="form-input"
                  value={lineItem.description}
                  onChange={(e) => updateLineItem(estimate.id, itemIndex, 'description', e.target.value)}
                  placeholder="Item description"
                />
              </div>
              <div className="form-group line-item-quantity">
                <input
                  type="number"
                  className="form-input"
                  value={lineItem.quantity || ''}
                  onChange={(e) => updateLineItem(estimate.id, itemIndex, 'quantity', e.target.value)}
                  placeholder="Qty"
                  min="0"
                  step="any"
                />
              </div>
              <div className="form-group line-item-unit">
                <input
                  type="text"
                  className="form-input"
                  value={lineItem.unit || ''}
                  onChange={(e) => updateLineItem(estimate.id, itemIndex, 'unit', e.target.value)}
                  placeholder="Unit"
                />
              </div>
              <div className="form-group line-item-price">
                <input
                  type="number"
                  className="form-input"
                  value={lineItem.unitPrice || ''}
                  onChange={(e) => updateLineItem(estimate.id, itemIndex, 'unitPrice', e.target.value)}
                  placeholder="Price"
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="line-item-total">
                ${calculateLineItemTotal(lineItem).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
            <button
              className="line-item-delete-btn"
              onClick={() => removeLineItem(estimate.id, itemIndex)}
              title="Remove line item"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                <path d="M4.293 4.293a1 1 0 011.414 0L7 5.586l1.293-1.293a1 1 0 111.414 1.414L8.414 7l1.293 1.293a1 1 0 01-1.414 1.414L7 8.414l-1.293 1.293a1 1 0 01-1.414-1.414L5.586 7 4.293 5.707a1 1 0 010-1.414z"/>
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="estimate-totals">
        <div className="estimate-total-row">
          <span>Subtotal</span>
          <span>${estimate.subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
        <div className="estimate-total-row">
          <span>Tax</span>
          <input
            type="number"
            className="form-input estimate-tax-input"
            value={estimate.tax || 0}
            onChange={(e) => updateEstimate(estimate.id, 'tax', parseFloat(e.target.value) || 0)}
            min="0"
            step="0.01"
          />
        </div>
        <div className="estimate-total-row estimate-final-total">
          <span>Total</span>
          <span>${estimate.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Notes (Optional)</label>
        <textarea
          className="form-textarea"
          rows={3}
          value={estimate.notes || ''}
          onChange={(e) => updateEstimate(estimate.id, 'notes', e.target.value)}
          placeholder="Additional notes or terms for this estimate..."
        />
      </div>

      <button
        className="delete-estimate-btn"
        onClick={() => removeEstimate(estimate.id)}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"/>
          <path fillRule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </svg>
        Delete Estimate
      </button>
    </div>
  );

  const staticSections = [
    {
      id: 'title',
      title: 'Title & Basic Info',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 10a2 2 0 114 0 2 2 0 01-4 0zm2 6c-2.67 0-8 1.34-8 4v1h16v-1c0-2.66-5.33-4-8-4z"/>
        </svg>
      ),
      content: (
        <div className="edit-form">
          <div className="form-group">
            <label className="form-label">Project Title</label>
            <input
              type="text"
              className="form-input"
              value={proposal.titlePage.projectTitle || ''}
              onChange={(e) => updateTitlePage('projectTitle', e.target.value)}
              placeholder="e.g., Complete Roof Replacement"
            />
          </div>

          <div className="form-section-title">Contractor Information</div>
          <div className="form-group">
            <label className="form-label">Business Name</label>
            <input
              type="text"
              className="form-input"
              value={proposal.titlePage.contractor.name}
              onChange={(e) => updateContractor('name', e.target.value)}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input
                type="tel"
                className="form-input"
                value={proposal.titlePage.contractor.phone || ''}
                onChange={(e) => updateContractor('phone', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                value={proposal.titlePage.contractor.email || ''}
                onChange={(e) => updateContractor('email', e.target.value)}
              />
            </div>
          </div>

          <div className="form-section-title">Homeowner Information</div>
          <div className="form-group">
            <label className="form-label">Homeowner Name</label>
            <input
              type="text"
              className="form-input"
              value={proposal.titlePage.homeowner.name}
              onChange={(e) => updateHomeowner('name', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Property Address</label>
            <input
              type="text"
              className="form-input"
              value={proposal.titlePage.homeowner.address}
              onChange={(e) => updateHomeowner('address', e.target.value)}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input
                type="tel"
                className="form-input"
                value={proposal.titlePage.homeowner.phone || ''}
                onChange={(e) => updateHomeowner('phone', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                value={proposal.titlePage.homeowner.email || ''}
                onChange={(e) => updateHomeowner('email', e.target.value)}
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'intro',
      title: 'Introduction Letter',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm0 2h12v2H4V5zm0 4h12v2H4V9zm0 4h7v2H4v-2z"/>
        </svg>
      ),
      content: (
        <div className="edit-form">
          <div className="form-group">
            <label className="form-label">Welcome Message</label>
            <textarea
              className="form-textarea"
              rows={12}
              value={proposal.introPage.content}
              onChange={(e) => updateIntroPage(e.target.value)}
              placeholder="Write a personalized introduction for the homeowner..."
            />
          </div>
        </div>
      ),
    },
    {
      id: 'photos',
      title: `Site Photography (${proposal.photoSections[0]?.photos.length || 0})`,
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm12 4l-3.5 4.5-2.5-3L6 14h12V8z"/>
        </svg>
      ),
      content: (
        <div className="edit-form">
          <p className="form-helper-text">
            Photo management coming soon. Use the chat to add or modify photos.
          </p>
        </div>
      ),
    },
  ];

  const bottomSections = [
    {
      id: 'addons',
      title: `Add-ons (${proposal.addOns?.length || 0})`,
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 2a1 1 0 011 1v6h6a1 1 0 110 2h-6v6a1 1 0 11-2 0v-6H3a1 1 0 110-2h6V3a1 1 0 011-1z"/>
        </svg>
      ),
      content: (
        <div className="edit-form">
          <p className="form-helper-text">
            Add-ons management coming soon. Use the chat to add optional items.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="edit-panel">
      <div className="edit-sections">
        {/* Static top sections */}
        {staticSections.map((section) => (
          <div key={section.id} className="edit-section">
            <button
              className="edit-section-header"
              onClick={() => toggleSection(section.id)}
            >
              <div className="edit-section-header-left">
                <span className="edit-section-icon">{section.icon}</span>
                <span className="edit-section-title">{section.title}</span>
              </div>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="currentColor"
                className={`edit-section-chevron ${expandedSection === section.id ? 'expanded' : ''}`}
              >
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
              </svg>
            </button>
            {expandedSection === section.id && (
              <div className="edit-section-content">{section.content}</div>
            )}
          </div>
        ))}

        {/* Draggable estimate sections */}
        {proposal.estimates.map((estimate, index) => (
          <div
            key={estimate.id}
            className={`edit-section draggable ${draggedIndex === index ? 'dragging' : ''} ${dragOverIndex === index ? 'drag-over' : ''}`}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
          >
            <button
              className="edit-section-header"
              onClick={() => toggleSection(estimate.id)}
            >
              <div className="edit-section-header-left">
                <span className="drag-handle" title="Drag to reorder">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M2 4a1 1 0 011-1h10a1 1 0 110 2H3a1 1 0 01-1-1zm0 4a1 1 0 011-1h10a1 1 0 110 2H3a1 1 0 01-1-1zm0 4a1 1 0 011-1h10a1 1 0 110 2H3a1 1 0 01-1-1z"/>
                  </svg>
                </span>
                <span className="edit-section-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M4 4a2 2 0 012-2h8l4 4v8a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V6h-2V4H6z"/>
                  </svg>
                </span>
                <span className="edit-section-title">{estimate.title || 'Untitled Estimate'}</span>
                <span className="estimate-section-total">${estimate.total.toLocaleString()}</span>
              </div>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="currentColor"
                className={`edit-section-chevron ${expandedSection === estimate.id ? 'expanded' : ''}`}
              >
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
              </svg>
            </button>
            {expandedSection === estimate.id && (
              <div className="edit-section-content">{renderEstimateContent(estimate)}</div>
            )}
          </div>
        ))}

        {/* Add estimate button */}
        <button className="add-estimate-section-btn" onClick={addEstimate}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0a.75.75 0 01.75.75v6.5h6.5a.75.75 0 010 1.5h-6.5v6.5a.75.75 0 01-1.5 0v-6.5h-6.5a.75.75 0 010-1.5h6.5v-6.5A.75.75 0 018 0z"/>
          </svg>
          Add Estimate
        </button>

        {/* Static bottom sections */}
        {bottomSections.map((section) => (
          <div key={section.id} className="edit-section">
            <button
              className="edit-section-header"
              onClick={() => toggleSection(section.id)}
            >
              <div className="edit-section-header-left">
                <span className="edit-section-icon">{section.icon}</span>
                <span className="edit-section-title">{section.title}</span>
              </div>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="currentColor"
                className={`edit-section-chevron ${expandedSection === section.id ? 'expanded' : ''}`}
              >
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
              </svg>
            </button>
            {expandedSection === section.id && (
              <div className="edit-section-content">{section.content}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
