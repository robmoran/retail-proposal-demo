import { useState } from 'react';
import { useProposal } from '../context/ProposalContext';

export default function EditPanel() {
  const { proposal, updateProposal } = useProposal();
  const [expandedSection, setExpandedSection] = useState<string | null>('title');

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

  const sections = [
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
    {
      id: 'estimates',
      title: `Estimates (${proposal.estimates.length})`,
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M4 4a2 2 0 012-2h8l4 4v8a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V6h-2V4H6z"/>
        </svg>
      ),
      content: (
        <div className="edit-form">
          <p className="form-helper-text">
            Estimate editing coming soon. Use the chat to create or modify estimates.
          </p>
        </div>
      ),
    },
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
        {sections.map((section) => (
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
