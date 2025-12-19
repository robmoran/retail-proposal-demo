import { PhotoSection as PhotoSectionType } from '../types';

interface PhotoSectionProps {
  data: PhotoSectionType;
}

export default function PhotoSection({ data }: PhotoSectionProps) {
  const { title, photos } = data;

  return (
    <div className="page photo-section">
      <h2 className="section-title">{title}</h2>
      <div className="accent-bar"></div>

      <div className="photo-list" style={{ marginTop: '50px' }}>
        {photos.map((photo, index) => (
          <div key={index} className="photo-item-horizontal">
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
        ))}
      </div>
    </div>
  );
}
