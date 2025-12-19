import { TitlePage as TitlePageType } from '../types';

interface TitlePageProps {
  data: TitlePageType;
}

export default function TitlePage({ data }: TitlePageProps) {
  const { contractor, homeowner, date, propertyImage, projectTitle } = data;

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
        <h1 className="project-title">
          {projectTitle || 'Project Proposal'}
        </h1>
        <div className="accent-bar"></div>
      </div>

      {propertyImage && (
        <div className="property-image-container">
          <img src={propertyImage} alt="Property" className="property-image" />
          <div className="image-caption">{homeowner.address}</div>
        </div>
      )}

      <div className="title-details">
        <div className="detail-group">
          <div className="detail-label">Prepared For</div>
          <div className="detail-value">{homeowner.name}</div>
        </div>

        <div className="detail-group">
          <div className="detail-label">Property Address</div>
          <div className="detail-value">{homeowner.address}</div>
        </div>

        <div className="detail-group">
          <div className="detail-label">Prepared By</div>
          <div className="detail-value">
            {contractor.name}
            {contractor.license && (
              <>
                <br />
                {contractor.license}
              </>
            )}
          </div>
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
