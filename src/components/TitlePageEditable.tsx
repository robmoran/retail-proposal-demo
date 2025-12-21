import { TitlePage as TitlePageType } from '../types';
import EditableWrapper from './EditableWrapper';
import { useProposal } from '../context/ProposalContext';

interface TitlePageProps {
  data: TitlePageType;
}

export default function TitlePageEditable({ data }: TitlePageProps) {
  const { contractor, homeowner, date, propertyImage, projectTitle } = data;
  const { isEditMode, updateTitlePage } = useProposal();

  return (
    <div className="page title-page">
      <div className="title-page-header">
        <div className="header-left">
          <div className="proposal-label">Project Proposal</div>
          <div className="proposal-number">
            {new Date(date).getFullYear()}-{String(Math.floor(Math.random() * 9000) + 1000)}
          </div>
        </div>
        {contractor.logo && (
          <div className="contractor-logo-container">
            <img src={contractor.logo} alt={contractor.name} className="contractor-logo" />
          </div>
        )}
      </div>

      <div className="title-main">
        <EditableWrapper
          id="projectTitle"
          type="text"
          value={projectTitle || 'Project Proposal'}
          onSave={(value) => updateTitlePage('projectTitle', value)}
          isEditMode={isEditMode}
          placeholder="Enter project title..."
        >
          <h1 className="project-title">
            {projectTitle || 'Project Proposal'}
          </h1>
        </EditableWrapper>
        <div className="accent-bar"></div>
      </div>

      {propertyImage && (
        <div className="property-image-container">
          <img src={propertyImage} alt="Property" className="property-image" />
          <EditableWrapper
            id="homeowner-address"
            type="text"
            value={homeowner.address}
            onSave={(value) => updateTitlePage('homeowner.address', value)}
            isEditMode={isEditMode}
            placeholder="Property address..."
          >
            <div className="image-caption">{homeowner.address}</div>
          </EditableWrapper>
        </div>
      )}

      <div className="title-details">
        <div className="detail-group">
          <div className="detail-label">Prepared For</div>
          <EditableWrapper
            id="homeowner-name"
            type="text"
            value={homeowner.name}
            onSave={(value) => updateTitlePage('homeowner.name', value)}
            isEditMode={isEditMode}
            placeholder="Homeowner name..."
          >
            <div className="detail-value">{homeowner.name}</div>
          </EditableWrapper>
        </div>

        <div className="detail-group">
          <div className="detail-label">Property Address</div>
          <EditableWrapper
            id="homeowner-address-2"
            type="text"
            value={homeowner.address}
            onSave={(value) => updateTitlePage('homeowner.address', value)}
            isEditMode={isEditMode}
            placeholder="Property address..."
          >
            <div className="detail-value">{homeowner.address}</div>
          </EditableWrapper>
        </div>

        <div className="detail-group">
          <div className="detail-label">Prepared By</div>
          <EditableWrapper
            id="contractor-name"
            type="text"
            value={contractor.name}
            onSave={(value) => updateTitlePage('contractor.name', value)}
            isEditMode={isEditMode}
            placeholder="Your company name..."
          >
            <div className="detail-value">
              {contractor.name}
              {contractor.license && (
                <>
                  <br />
                  {contractor.license}
                </>
              )}
            </div>
          </EditableWrapper>
        </div>

        <div className="detail-group">
          <div className="detail-label">Date Prepared</div>
          <div className="detail-value">
            {new Date(date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>
      </div>

      {contractor.badges && contractor.badges.length > 0 && (
        <div className="contractor-badges">
          {contractor.badges.map((badge, index) => (
            <div key={index} className="badge-item">
              <img src={badge.imageUrl} alt={badge.name} className="badge-image" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
