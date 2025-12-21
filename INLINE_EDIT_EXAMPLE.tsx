// EXAMPLE: How to use EditableWrapper with existing components
// This shows how to wrap sections of TitlePage to make them editable

import { useState } from 'react';
import EditableWrapper from './components/EditableWrapper';
import { TitlePage as TitlePageType } from './types';

interface EditableTitlePageProps {
  data: TitlePageType;
  onUpdate: (field: string, value: string) => void;
  isEditMode: boolean;
}

export function EditableTitlePage({ data, onUpdate, isEditMode }: EditableTitlePageProps) {
  return (
    <div className="page title-page">
      <div className="property-image-container">
        <img
          src={data.propertyImage}
          alt="Property"
          className="property-image"
        />
      </div>

      <div className="title-content">
        {/* Editable Title */}
        <EditableWrapper
          id="proposal-title"
          type="text"
          value={data.title}
          onSave={(value) => onUpdate('title', value)}
          isEditMode={isEditMode}
          placeholder="Enter proposal title..."
        >
          <h1 className="proposal-title">{data.title}</h1>
        </EditableWrapper>

        {/* Editable Address */}
        <EditableWrapper
          id="property-address"
          type="text"
          value={data.propertyAddress}
          onSave={(value) => onUpdate('propertyAddress', value)}
          isEditMode={isEditMode}
          placeholder="Enter property address..."
        >
          <p className="property-address">{data.propertyAddress}</p>
        </EditableWrapper>

        <div className="title-details">
          <div className="detail-column">
            <div className="detail-section">
              <h3 className="detail-title">Prepared For</h3>
              {/* Editable Homeowner Name */}
              <EditableWrapper
                id="homeowner-name"
                type="text"
                value={data.homeowner.name}
                onSave={(value) => onUpdate('homeowner.name', value)}
                isEditMode={isEditMode}
                placeholder="Homeowner name..."
              >
                <p className="detail-text">{data.homeowner.name}</p>
              </EditableWrapper>
              {/* Editable Homeowner Email */}
              <EditableWrapper
                id="homeowner-email"
                type="text"
                value={data.homeowner.email}
                onSave={(value) => onUpdate('homeowner.email', value)}
                isEditMode={isEditMode}
                placeholder="email@example.com"
              >
                <p className="detail-text secondary">{data.homeowner.email}</p>
              </EditableWrapper>
            </div>
          </div>

          <div className="detail-column">
            <div className="detail-section">
              <h3 className="detail-title">Prepared By</h3>
              {/* Editable Contractor Name */}
              <EditableWrapper
                id="contractor-name"
                type="text"
                value={data.contractor.name}
                onSave={(value) => onUpdate('contractor.name', value)}
                isEditMode={isEditMode}
                placeholder="Your company name..."
              >
                <p className="detail-text">{data.contractor.name}</p>
              </EditableWrapper>
              {/* Editable Contractor Email */}
              <EditableWrapper
                id="contractor-email"
                type="text"
                value={data.contractor.email}
                onSave={(value) => onUpdate('contractor.email', value)}
                isEditMode={isEditMode}
                placeholder="your@email.com"
              >
                <p className="detail-text secondary">{data.contractor.email}</p>
              </EditableWrapper>
              {/* Editable Contractor Phone */}
              <EditableWrapper
                id="contractor-phone"
                type="text"
                value={data.contractor.phone}
                onSave={(value) => onUpdate('contractor.phone', value)}
                isEditMode={isEditMode}
                placeholder="(555) 123-4567"
              >
                <p className="detail-text secondary">{data.contractor.phone}</p>
              </EditableWrapper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// EXAMPLE: Editable Introduction Page
interface EditableIntroPageProps {
  data: {
    title: string;
    letter: string;
  };
  onUpdate: (field: string, value: string) => void;
  isEditMode: boolean;
}

export function EditableIntroPage({ data, onUpdate, isEditMode }: EditableIntroPageProps) {
  return (
    <div className="page intro-page">
      {/* Editable Intro Title */}
      <EditableWrapper
        id="intro-title"
        type="text"
        value={data.title}
        onSave={(value) => onUpdate('title', value)}
        isEditMode={isEditMode}
        placeholder="Section title..."
      >
        <h2 className="section-title">{data.title}</h2>
      </EditableWrapper>

      <div className="accent-bar"></div>

      {/* Editable Letter (Multiline) */}
      <EditableWrapper
        id="intro-letter"
        type="multiline"
        value={data.letter}
        onSave={(value) => onUpdate('letter', value)}
        isEditMode={isEditMode}
        placeholder="Write your introduction letter here..."
      >
        <div className="intro-letter">
          {data.letter.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </EditableWrapper>
    </div>
  );
}

// EXAMPLE: Editable Line Item in Estimate
interface EditableLineItemProps {
  item: {
    description: string;
    notes?: string;
    total: number;
  };
  onUpdate: (updates: Partial<typeof item>) => void;
  onDelete: () => void;
  isEditMode: boolean;
}

export function EditableLineItem({ item, onUpdate, onDelete, isEditMode }: EditableLineItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  if (!isEditMode) {
    return (
      <tr>
        <td className="description-cell">
          <div>{item.description}</div>
          {item.notes && <div className="line-notes">{item.notes}</div>}
        </td>
        <td className="numeric">${item.total.toLocaleString()}</td>
      </tr>
    );
  }

  return (
    <tr className="editable-table-row">
      {/* Row Actions on Hover */}
      <div className="row-actions">
        <button className="row-action-btn" title="Drag to reorder">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            <path d="M10 13a1 1 0 100-2 1 1 0 000 2zm-4 0a1 1 0 100-2 1 1 0 000 2zm1-5a1 1 0 11-2 0 1 1 0 012 0zm3 1a1 1 0 100-2 1 1 0 000 2zm1-5a1 1 0 11-2 0 1 1 0 012 0zM7 4a1 1 0 11-2 0 1 1 0 012 0z"/>
          </svg>
        </button>
        <button className="row-action-btn" onClick={onDelete} title="Delete">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            <path d="M11 1.75V3h2.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H5V1.75C5 .784 5.784 0 6.75 0h2.5C10.216 0 11 .784 11 1.75zM4.496 6.675l.66 6.6a.25.25 0 00.249.225h5.19a.25.25 0 00.249-.225l.66-6.6a.75.75 0 011.492.149l-.66 6.6A1.748 1.748 0 0110.595 15h-5.19a1.75 1.75 0 01-1.741-1.575l-.66-6.6a.75.75 0 111.492-.15zM6.5 1.75V3h3V1.75a.25.25 0 00-.25-.25h-2.5a.25.25 0 00-.25.25z"/>
          </svg>
        </button>
      </div>

      <td className="description-cell">
        <EditableWrapper
          id={`item-description-${item.description}`}
          type="text"
          value={item.description}
          onSave={(value) => onUpdate({ description: value })}
          isEditMode={true}
          placeholder="Item description..."
        >
          <div>{item.description}</div>
        </EditableWrapper>
        {item.notes && (
          <EditableWrapper
            id={`item-notes-${item.description}`}
            type="text"
            value={item.notes}
            onSave={(value) => onUpdate({ notes: value })}
            isEditMode={true}
            placeholder="Add notes..."
          >
            <div className="line-notes">{item.notes}</div>
          </EditableWrapper>
        )}
      </td>

      <td className="numeric">
        <EditableWrapper
          id={`item-total-${item.description}`}
          type="text"
          value={item.total.toString()}
          onSave={(value) => onUpdate({ total: parseFloat(value) || 0 })}
          isEditMode={true}
          placeholder="0.00"
        >
          <span>${item.total.toLocaleString()}</span>
        </EditableWrapper>
      </td>
    </tr>
  );
}

// EXAMPLE: Editable Photo with Image Actions
interface EditablePhotoProps {
  photo: {
    url: string;
    caption: string;
    timestamp?: string;
  };
  onUpdate: (updates: Partial<typeof photo>) => void;
  onDelete: () => void;
  onReplace: () => void;
  isEditMode: boolean;
}

export function EditablePhoto({ photo, onUpdate, onDelete, onReplace, isEditMode }: EditablePhotoProps) {
  if (!isEditMode) {
    return (
      <div className="photo-item-horizontal">
        <div className="photo-image-container">
          <img src={photo.url} alt={photo.caption} />
        </div>
        <div className="photo-details">
          <div className="photo-caption">{photo.caption}</div>
          {photo.timestamp && (
            <div className="photo-timestamp">
              {new Date(photo.timestamp).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="photo-item-horizontal">
      <div className="photo-image-container editable-image">
        <img src={photo.url} alt={photo.caption} />
        {/* Image Overlay with Actions */}
        <div className="image-overlay">
          <button className="image-action-btn" onClick={onReplace}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M2.75 14A1.75 1.75 0 011 12.25v-2.5a.75.75 0 011.5 0v2.5c0 .138.112.25.25.25h10.5a.25.25 0 00.25-.25v-2.5a.75.75 0 011.5 0v2.5A1.75 1.75 0 0113.25 14H2.75z"/>
              <path d="M11.78 4.72a.75.75 0 000-1.06L8.53.47a.75.75 0 00-1.06 0L4.22 3.72a.75.75 0 001.06 1.06L7 3.06v7.19a.75.75 0 001.5 0V3.06l1.72 1.72a.75.75 0 001.06 0z"/>
            </svg>
            Replace
          </button>
          <button className="image-action-btn" onClick={onDelete}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M11 1.75V3h2.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H5V1.75C5 .784 5.784 0 6.75 0h2.5C10.216 0 11 .784 11 1.75zM4.496 6.675l.66 6.6a.25.25 0 00.249.225h5.19a.25.25 0 00.249-.225l.66-6.6a.75.75 0 011.492.149l-.66 6.6A1.748 1.748 0 0110.595 15h-5.19a1.75 1.75 0 01-1.741-1.575l-.66-6.6a.75.75 0 111.492-.15z"/>
            </svg>
            Delete
          </button>
        </div>
      </div>
      <div className="photo-details">
        {/* Editable Caption */}
        <EditableWrapper
          id={`photo-caption-${photo.url}`}
          type="text"
          value={photo.caption}
          onSave={(value) => onUpdate({ caption: value })}
          isEditMode={true}
          placeholder="Add photo caption..."
        >
          <div className="photo-caption">{photo.caption}</div>
        </EditableWrapper>
        {photo.timestamp && (
          <div className="photo-timestamp">
            {new Date(photo.timestamp).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// INTEGRATION EXAMPLE: How to use in CreatorApp
/*
import { EditableTitlePage, EditableIntroPage } from './INLINE_EDIT_EXAMPLE';

function CreatorApp() {
  const [proposal, setProposal] = useState(sampleProposal);
  const [isEditMode, setIsEditMode] = useState(true);

  const handleTitleUpdate = (field: string, value: string) => {
    // Handle nested field updates (e.g., "homeowner.name")
    const fields = field.split('.');
    if (fields.length === 1) {
      setProposal(prev => ({
        ...prev,
        titlePage: {
          ...prev.titlePage,
          [field]: value
        }
      }));
    } else {
      setProposal(prev => ({
        ...prev,
        titlePage: {
          ...prev.titlePage,
          [fields[0]]: {
            ...prev.titlePage[fields[0]],
            [fields[1]]: value
          }
        }
      }));
    }
  };

  return (
    <div className="creator-layout">
      <CreatorHeader
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
        // ... other props
      />
      <div className="creator-main">
        <div className="creator-left-panel">
          <ChatPanel />
        </div>
        <div className="creator-right-panel">
          <EditableTitlePage
            data={proposal.titlePage}
            onUpdate={handleTitleUpdate}
            isEditMode={isEditMode}
          />
          <EditableIntroPage
            data={proposal.introPage}
            onUpdate={(field, value) => {
              setProposal(prev => ({
                ...prev,
                introPage: {
                  ...prev.introPage,
                  [field]: value
                }
              }));
            }}
            isEditMode={isEditMode}
          />
          {/* More sections... }
        </div>
      </div>
    </div>
  );
}
*/
