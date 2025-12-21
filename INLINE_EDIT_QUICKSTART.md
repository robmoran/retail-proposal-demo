# Inline Editing - Quick Start Implementation

## Overview

This guide shows you how to transform your current form-based EditPanel into an inline editing system where users click directly on preview elements to edit them.

## What We're Building

**Before (Current)**:
- EditPanel sidebar with forms
- ProposalPreview is read-only
- Have to switch between editing and viewing

**After (Inline Editing)**:
- No separate EditPanel
- Click any element in preview to edit in place
- Editing happens where you see the content
- Chat/AI panel remains for assistance

## Step-by-Step Implementation

### Step 1: Import EditableWrapper

Add to your component files:

```tsx
import EditableWrapper from './components/EditableWrapper';
import '../EditableStyles.css';
```

### Step 2: Wrap Editable Elements

Transform your existing components by wrapping text elements:

**Before**:
```tsx
<h1 className="proposal-title">{data.title}</h1>
```

**After**:
```tsx
<EditableWrapper
  id="proposal-title"
  type="text"
  value={data.title}
  onSave={(value) => handleUpdate('title', value)}
  isEditMode={isEditMode}
>
  <h1 className="proposal-title">{data.title}</h1>
</EditableWrapper>
```

### Step 3: Add Update Handler

In your component or context, create an update handler:

```tsx
const handleUpdate = (field: string, value: string) => {
  updateProposal({
    titlePage: {
      ...proposal.titlePage,
      [field]: value
    }
  });
};
```

### Step 4: Pass isEditMode from Context

Use your existing ProposalContext:

```tsx
const { isEditMode } = useProposalContext();
```

### Step 5: Update Header Toggle

Your existing Edit Mode toggle in CreatorHeader already works! When users toggle Edit Mode:
- `isEditMode = true` → Hover shows edit indicators
- `isEditMode = false` → Normal preview, no editing

## Converting Each Component Type

### Title Page (Simple Text Fields)

```tsx
export function TitlePage({ data, onUpdate, isEditMode }) {
  return (
    <div className="page title-page">
      {/* Editable title */}
      <EditableWrapper
        id="title"
        type="text"
        value={data.title}
        onSave={(value) => onUpdate('title', value)}
        isEditMode={isEditMode}
      >
        <h1 className="proposal-title">{data.title}</h1>
      </EditableWrapper>

      {/* Editable address */}
      <EditableWrapper
        id="address"
        type="text"
        value={data.propertyAddress}
        onSave={(value) => onUpdate('propertyAddress', value)}
        isEditMode={isEditMode}
      >
        <p className="property-address">{data.propertyAddress}</p>
      </EditableWrapper>

      {/* More fields... */}
    </div>
  );
}
```

### Intro Page (Multiline Text)

```tsx
export function IntroPage({ data, onUpdate, isEditMode }) {
  return (
    <div className="page intro-page">
      <h2 className="section-title">{data.title}</h2>

      {/* Multiline text editor */}
      <EditableWrapper
        id="intro-letter"
        type="multiline"
        value={data.letter}
        onSave={(value) => onUpdate('letter', value)}
        isEditMode={isEditMode}
      >
        <div className="intro-letter">
          {data.letter.split('\n\n').map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </EditableWrapper>
    </div>
  );
}
```

### Photo Section (Images + Captions)

For images, we need a custom approach since EditableWrapper is text-focused:

```tsx
export function PhotoItem({ photo, onUpdate, onReplace, onDelete, isEditMode }) {
  if (!isEditMode) {
    return (
      <div className="photo-item-horizontal">
        <div className="photo-image-container">
          <img src={photo.url} alt={photo.caption} />
        </div>
        <div className="photo-details">
          <div className="photo-caption">{photo.caption}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="photo-item-horizontal">
      {/* Image with overlay actions */}
      <div className="photo-image-container editable-image">
        <img src={photo.url} alt={photo.caption} />
        <div className="image-overlay">
          <button className="image-action-btn" onClick={onReplace}>
            <svg>...</svg>
            Replace
          </button>
          <button className="image-action-btn" onClick={onDelete}>
            <svg>...</svg>
            Delete
          </button>
        </div>
      </div>

      {/* Editable caption */}
      <div className="photo-details">
        <EditableWrapper
          id={`caption-${photo.id}`}
          type="text"
          value={photo.caption}
          onSave={(value) => onUpdate({ caption: value })}
          isEditMode={true}
        >
          <div className="photo-caption">{photo.caption}</div>
        </EditableWrapper>
      </div>
    </div>
  );
}
```

### Estimate Tables (Line Items)

For tables, edit individual cells:

```tsx
export function EstimateRow({ item, onUpdate, onDelete, isEditMode }) {
  if (!isEditMode) {
    return (
      <tr>
        <td>{item.description}</td>
        <td>${item.total.toLocaleString()}</td>
      </tr>
    );
  }

  return (
    <tr className="editable-table-row">
      {/* Row actions on hover */}
      <div className="row-actions">
        <button className="row-action-btn" title="Drag">
          <svg>...</svg>
        </button>
        <button className="row-action-btn" onClick={onDelete}>
          <svg>...</svg>
        </button>
      </div>

      {/* Editable description */}
      <td>
        <EditableWrapper
          id={`desc-${item.id}`}
          type="text"
          value={item.description}
          onSave={(value) => onUpdate({ description: value })}
          isEditMode={true}
        >
          <span>{item.description}</span>
        </EditableWrapper>
      </td>

      {/* Editable total */}
      <td>
        <EditableWrapper
          id={`total-${item.id}`}
          type="text"
          value={item.total.toString()}
          onSave={(value) => onUpdate({ total: parseFloat(value) || 0 })}
          isEditMode={true}
        >
          <span>${item.total.toLocaleString()}</span>
        </EditableWrapper>
      </td>
    </tr>
  );
}
```

## Updating Your Context

Extend ProposalContext to handle updates:

```tsx
interface ProposalContextType {
  proposal: Proposal;
  updateProposal: (updates: Partial<Proposal>) => void;
  updateTitlePage: (field: string, value: string) => void;
  updateIntroPage: (field: string, value: string) => void;
  addPhoto: (photo: Photo) => void;
  updatePhoto: (photoId: string, updates: Partial<Photo>) => void;
  deletePhoto: (photoId: string) => void;
  // ... more helpers
  isEditMode: boolean;
  setIsEditMode: (mode: boolean) => void;
}

export function ProposalProvider({ children }) {
  const [proposal, setProposal] = useState(sampleProposal);
  const [isEditMode, setIsEditMode] = useState(true);

  const updateTitlePage = (field: string, value: string) => {
    setProposal(prev => ({
      ...prev,
      titlePage: {
        ...prev.titlePage,
        [field]: value
      }
    }));
  };

  const updateIntroPage = (field: string, value: string) => {
    setProposal(prev => ({
      ...prev,
      introPage: {
        ...prev.introPage,
        [field]: value
      }
    }));
  };

  const updatePhoto = (photoId: string, updates: Partial<Photo>) => {
    setProposal(prev => ({
      ...prev,
      photoSections: prev.photoSections.map(section => ({
        ...section,
        photos: section.photos.map(photo =>
          photo.id === photoId ? { ...photo, ...updates } : photo
        )
      }))
    }));
  };

  // ... more helpers

  return (
    <ProposalContext.Provider value={{
      proposal,
      updateTitlePage,
      updateIntroPage,
      updatePhoto,
      isEditMode,
      setIsEditMode,
      // ...
    }}>
      {children}
    </ProposalContext.Provider>
  );
}
```

## Removing the Old EditPanel

Once inline editing is working:

1. **Keep ChatPanel** - Still useful for AI assistance
2. **Remove EditPanel** - No longer needed
3. **Keep CreatorHeader** - Edit mode toggle stays
4. **Update CreatorApp layout**:

```tsx
export default function CreatorApp() {
  return (
    <ProposalProvider>
      <div className="creator-layout">
        <CreatorHeader />
        <div className="creator-main">
          {/* Chat panel stays */}
          <div className="creator-left-panel">
            <ChatPanel />
          </div>

          {/* Preview becomes editable */}
          <div className="creator-right-panel">
            <ProposalPreview proposal={proposal} />
          </div>
        </div>
      </div>
    </ProposalProvider>
  );
}
```

## Testing the Flow

### Test 1: Simple Text Edit
1. Toggle "Edit Mode" ON in header
2. Hover over company name
3. See orange dashed outline + pencil icon
4. Click on text
5. Input appears with cursor
6. Type new name
7. Press Enter or click Save
8. Text updates smoothly

### Test 2: Multiline Edit
1. Click on introduction letter
2. Textarea appears
3. Edit multiple paragraphs
4. Press Cmd+Enter to save
5. Formatted text displays

### Test 3: Image Actions
1. Hover over photo
2. Dark overlay appears
3. See [Replace] and [Delete] buttons
4. Click Replace → file picker opens
5. Select new image → uploads and replaces

### Test 4: Table Row Edit
1. Hover over estimate line item
2. Row highlights, actions appear on left
3. Click description cell
4. Edit text inline
5. Tab to price field
6. Edit price
7. Click outside or press Enter
8. Row updates

## Common Issues & Fixes

### Issue: Clicking doesn't start edit
**Fix**: Check that `isEditMode={true}` is being passed to EditableWrapper

### Issue: Can't save edits
**Fix**: Verify your `onSave` handler is correctly updating state

### Issue: Edits don't persist
**Fix**: Make sure you're updating the proposal in context/state, not just local state

### Issue: Multiple elements editing at once
**Fix**: Add a global "activeEditId" to context to ensure only one element edits at a time

### Issue: Styling looks wrong
**Fix**: Import EditableStyles.css in your App.tsx or main entry

## Next Steps

1. **Add auto-save**: Debounce updates and save to backend
2. **Add undo/redo**: Track edit history in context
3. **Add validation**: Prevent saving invalid data
4. **Add optimistic UI**: Show changes immediately, handle errors
5. **Add collaboration**: Show who's editing what in real-time

## Resources

- Full design spec: `INLINE_EDIT_DESIGN.md`
- Visual guide: `INLINE_EDIT_VISUAL_GUIDE.md`
- Code examples: `INLINE_EDIT_EXAMPLE.tsx`
- Base component: `src/components/EditableWrapper.tsx`
- Styles: `src/EditableStyles.css`

## Summary

The inline editing system gives you:
- ✅ Direct manipulation of content
- ✅ No context switching between edit/view
- ✅ Clear visual affordances
- ✅ Smooth, polished interactions
- ✅ Works with existing components
- ✅ AI chat still available for help
- ✅ Mobile-friendly with touch support

Start by converting your Title Page, then gradually update other sections. The EditableWrapper component handles all the heavy lifting!
