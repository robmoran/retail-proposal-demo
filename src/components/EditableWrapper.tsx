import { useState, useRef, useEffect, ReactNode } from 'react';

interface EditableWrapperProps {
  id?: string;
  type: 'text' | 'multiline';
  value: string;
  onSave: (value: string) => void;
  children: ReactNode;
  placeholder?: string;
  isEditMode: boolean;
}

export default function EditableWrapper({
  type,
  value,
  onSave,
  children,
  placeholder = 'Click to edit...',
  isEditMode,
}: EditableWrapperProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle focus and scrolling for mobile
  useEffect(() => {
    if (isEditing && inputRef.current) {
      // Small delay to ensure keyboard is ready
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();

        // On mobile, scroll element into view above keyboard
        if (isMobile && inputRef.current) {
          inputRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      }, 100);
    }
  }, [isEditing, isMobile]);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  const handleClick = () => {
    if (isEditMode && !isEditing) {
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    if (editValue.trim() !== value) {
      onSave(editValue.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && type !== 'multiline') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    } else if (e.key === 'Enter' && e.metaKey && type === 'multiline') {
      e.preventDefault();
      handleSave();
    }
  };

  const handleBlur = () => {
    // Small delay to allow clicking save button
    setTimeout(() => {
      if (isEditing) {
        handleSave();
      }
    }, 150);
  };

  if (!isEditMode) {
    return <>{children}</>;
  }

  if (isEditing) {
    return (
      <>
        <div className="edit-backdrop" onClick={handleCancel} />
        <div className="edit-container" ref={wrapperRef}>
          {type === 'multiline' ? (
            <textarea
              ref={inputRef as React.RefObject<HTMLTextAreaElement>}
              className="edit-input multiline"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              placeholder={placeholder}
              rows={6}
            />
          ) : (
            <input
              ref={inputRef as React.RefObject<HTMLInputElement>}
              className="edit-input"
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              placeholder={placeholder}
            />
          )}
          <div className="edit-toolbar">
            <button
              className="edit-save-btn"
              onClick={handleSave}
              onMouseDown={(e) => e.preventDefault()}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/>
              </svg>
              Save
            </button>
            <button
              className="edit-cancel-btn"
              onClick={handleCancel}
              onMouseDown={(e) => e.preventDefault()}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                <path d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"/>
              </svg>
              Cancel
            </button>
            <div className="edit-hint">
              {type === 'multiline' ? '⌘ Enter to save • Esc to cancel' : 'Enter to save • Esc to cancel'}
            </div>
          </div>
        </div>
      </>
    );
  }

  // On mobile, show edit indicator without hover
  const showIndicator = isMobile ? true : isHovering;

  return (
    <div
      className={`editable-wrapper ${isHovering || isMobile ? 'hovering' : ''}`}
      onClick={handleClick}
      onMouseEnter={() => !isMobile && setIsHovering(true)}
      onMouseLeave={() => !isMobile && setIsHovering(false)}
    >
      {children}
      {showIndicator && (
        <div className="edit-indicator">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
            <path d="M11.013 2.513a1.75 1.75 0 012.475 0l.499.5a1.75 1.75 0 010 2.474l-7.5 7.5a1.75 1.75 0 01-.757.438l-2.5.5a.75.75 0 01-.884-.884l.5-2.5a1.75 1.75 0 01.438-.757l7.5-7.5zm1.768.707a.25.25 0 00-.354 0L5.25 10.397a.25.25 0 00-.063.108l-.34 1.701 1.701-.34a.25.25 0 00.108-.063l7.177-7.177a.25.25 0 000-.354l-.5-.5z"/>
          </svg>
          <span>{isMobile ? 'Tap' : 'Click'} to edit</span>
        </div>
      )}
    </div>
  );
}
