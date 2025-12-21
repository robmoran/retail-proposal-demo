# Inline Editing Design System

## 1. Visual Affordances

### Edit Mode Indicators
- **Hover State**: Subtle outline (2px dashed, color: rgba(249, 115, 22, 0.3))
- **Edit Icon**: Small pencil icon appears in top-right corner of editable regions
- **Cursor**: Changes to text cursor on text fields, pointer on clickable elements
- **Background Tint**: Very subtle orange tint (rgba(249, 115, 22, 0.02)) on hover

### Active Editing State
- **Focus Ring**: 2px solid orange border (var(--color-primary))
- **Background**: White background with subtle elevation (shadow increase)
- **Toolbar**: Contextual floating toolbar appears above/beside element
- **Backdrop**: Semi-transparent overlay dims rest of page (rgba(0, 0, 0, 0.05))

## 2. Interaction Patterns by Content Type

### Simple Text (Headlines, Names, Labels)
- **Trigger**: Single click
- **Behavior**: Text becomes contenteditable inline
- **Actions**: Type to edit, Enter to save, Esc to cancel
- **Visual**: Minimal - just cursor and subtle background
- **Example**: Company name, homeowner name, property address

### Rich Text (Introduction, Notes)
- **Trigger**: Single click
- **Behavior**: Opens inline rich text editor
- **Toolbar**: Floating toolbar with: Bold, Italic, Bullets, Links
- **Actions**: Click outside or Save button to commit
- **Visual**: Toolbar slides in from top, 300ms ease

### Images (Photos)
- **Trigger**: Hover shows overlay with actions
- **Actions**:
  - Replace (opens file picker)
  - Edit caption (inline text edit)
  - Reorder (drag handle appears)
  - Delete (trash icon)
- **Visual**: Dark overlay (rgba(0, 0, 0, 0.6)) on hover with centered action buttons

### Tables (Line Items in Estimates)
- **Trigger**: Click on any cell
- **Behavior**: Cell becomes editable
- **Row Actions**: Hover on row shows: Edit, Duplicate, Delete icons on left
- **Add Row**: Prominent "+ Add Line Item" button at bottom
- **Visual**: Table gets subtle border, active cell has focus ring

### Lists (Features, Add-ons)
- **Trigger**: Hover on list shows edit icons
- **Actions**:
  - Edit text inline
  - Reorder with drag handles
  - Delete with trash icon
  - Add new with "+ Add item" at bottom
- **Visual**: Drag handle (⋮⋮) appears on left, trash on right

### File Uploads (Attachments)
- **Trigger**: Click on attachment area
- **Behavior**: File picker opens
- **Display**: Show file cards with: name, size, preview, remove button
- **Visual**: Dashed border dropzone, drag-and-drop active state

## 3. Layout Approach

### Recommended: Split View with Inline Editing
```
┌─────────────────────────────────────────────┐
│ Header: [AI Chat] [Edit Mode] [Preview]    │
├──────────────┬──────────────────────────────┤
│              │                              │
│   Chat/AI    │   Editable Preview          │
│   Panel      │   (cards with hover states) │
│   (40%)      │   (60%)                     │
│              │                              │
│   - Prompts  │   [Click to edit elements]  │
│   - History  │   [Floating toolbars]       │
│   - Suggest  │   [Inline forms]            │
│              │                              │
└──────────────┴──────────────────────────────┘
```

**Benefits**:
- Keep AI assistant visible for quick prompts
- Preview remains primary focus
- Chat can suggest edits that apply to preview
- Clean separation of concerns

### Alternative: Full-Width Editable Preview
```
┌─────────────────────────────────────────────┐
│ Header: [💬 Chat] [Edit Mode] [Preview]    │
├─────────────────────────────────────────────┤
│                                             │
│   Full-Width Editable Preview              │
│   (click any element to edit)              │
│                                             │
│   [💬] - Floating chat bubble (bottom-right)
│                                             │
└─────────────────────────────────────────────┘
```

**Benefits**:
- Maximum space for preview
- Chat as modal/sidebar when needed
- More immersive editing experience

## 4. Interaction Flow Examples

### Example 1: Edit Company Name
1. Hover over company name in title page
2. Subtle orange outline appears with pencil icon
3. Click on text
4. Text becomes contenteditable with cursor
5. Type new name
6. Press Enter or click outside to save
7. Smooth transition back to display state

### Example 2: Edit Line Item in Estimate
1. Hover over estimate table
2. Row shows edit controls on left
3. Click on description cell
4. Inline text editor appears
5. Edit text
6. Tab to move to price cell
7. Edit price (with currency formatting)
8. Click "✓ Save" button or press Enter
9. Row updates with animation

### Example 3: Add Photo
1. Hover over photo section
2. "+ Add Photo" button appears at bottom
3. Click button
4. File picker opens OR drag-and-drop zone appears
5. Select/drop image
6. Image uploads with progress indicator
7. Caption field auto-focuses for input
8. Image animates into grid position

### Example 4: Reorder Photos
1. Enter edit mode
2. Hover over photos shows drag handles (⋮⋮)
3. Click and drag handle
4. Other photos shift with spring animation
5. Drop in new position
6. Grid reflows smoothly
7. Order saved automatically

## 5. Mobile Considerations

### Touch-Friendly Interactions
- **Tap to Edit**: Single tap on element enters edit mode
- **Larger Touch Targets**: Minimum 44x44px for all interactive elements
- **Floating Toolbar**: Positioned above keyboard, not behind it
- **Gesture Support**:
  - Swipe left on list items to delete
  - Long press for drag reordering
  - Pinch to zoom images

### Mobile Layout
```
┌─────────────────────┐
│ Header (collapsed)  │
├─────────────────────┤
│                     │
│  Full Preview       │
│  (tap to edit)      │
│                     │
│  [Active section    │
│   expanded with     │
│   edit controls]    │
│                     │
├─────────────────────┤
│ Bottom Bar:         │
│ [💬] [Edit] [Save]  │
└─────────────────────┘
```

## 6. Innovative UI Patterns (Inspired by Best-in-Class)

### From Notion
- **Slash Commands**: Type "/" in text fields to open quick-insert menu
- **Drag Handles**: Always visible on hover, smooth reordering
- **Block-Based**: Each section is a "block" that can be edited independently

### From Figma
- **Context Toolbar**: Floating toolbar appears near selection
- **Quick Actions**: Right-click context menu for power users
- **Keyboard Shortcuts**: Full keyboard navigation (Tab, Arrow keys)

### From Canva
- **Template Suggestions**: AI suggests improvements while editing
- **Smart Defaults**: Auto-format currency, dates, addresses
- **Magic Replace**: Click image, paste URL or search stock photos

### From Linear
- **Command Palette**: Cmd+K to open quick actions
- **Inline Creation**: Create new items without leaving context
- **Smooth Transitions**: 200ms ease for all state changes

## 7. Visual Design Tokens

### Colors (Edit Mode)
```css
--edit-hover-outline: rgba(249, 115, 22, 0.3);
--edit-hover-bg: rgba(249, 115, 22, 0.02);
--edit-active-border: #f97316;
--edit-active-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
--edit-backdrop: rgba(0, 0, 0, 0.05);
--edit-toolbar-bg: #ffffff;
--edit-toolbar-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
```

### Transitions
```css
--edit-transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
--edit-toolbar-transition: opacity 150ms ease, transform 150ms ease;
```

### Z-Index Stack
```css
--z-edit-backdrop: 100;
--z-edit-toolbar: 200;
--z-edit-modal: 300;
--z-edit-tooltip: 400;
```

## 8. Technical Implementation Notes

### State Management
- Use `isEditMode` global state (via ProposalContext)
- Track `activeEditElement` with ID
- `editHistory` for undo/redo functionality
- `isDirty` flag for unsaved changes warning

### Component Structure
```tsx
<EditableSection id="intro" type="rich-text">
  <IntroPage data={proposal.introPage} />
</EditableSection>

<EditableSection id="photos" type="gallery">
  <PhotoSection data={proposal.photoSections[0]} />
</EditableSection>

<EditableTable id="estimate-1" type="line-items">
  <EstimatePage data={proposal.estimates[0]} />
</EditableTable>
```

### Edit Wrapper Component
```tsx
interface EditableProps {
  id: string;
  type: 'text' | 'rich-text' | 'image' | 'table' | 'list';
  onSave: (data: any) => void;
  children: ReactNode;
}
```

### Auto-save Strategy
- Debounce edits by 1000ms
- Show "Saving..." indicator during save
- Optimistic UI updates
- Retry on failure with user notification

## 9. Accessibility

- **Keyboard Navigation**: Full keyboard support (Tab, Enter, Esc, Arrow keys)
- **Screen Readers**: Announce edit mode, changes, and save status
- **Focus Management**: Trap focus in active edit area
- **ARIA Labels**: Proper labels for all edit controls
- **High Contrast**: Ensure edit indicators visible in high contrast mode

## 10. Progressive Enhancement

### Level 1: Basic Editing
- Click to edit text fields
- Simple form inputs
- Save/Cancel buttons

### Level 2: Enhanced UX
- Hover indicators
- Floating toolbars
- Keyboard shortcuts
- Drag and drop

### Level 3: Advanced Features
- Slash commands
- Real-time collaboration indicators
- AI suggestions inline
- Version history

## Recommendation

**Start with Split View + Inline Editing**:
- Keep chat panel for AI assistance (40% width)
- Make preview fully editable (60% width)
- Click any element to edit in place
- Floating toolbars for context actions
- Mobile: Full-width preview with bottom chat bar

This gives you the best of both worlds: AI assistance + direct manipulation.
