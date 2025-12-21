# Inline Editing Visual Guide

## Design Aesthetic: "Confident Precision"

**Philosophy**: Editing should feel like sculpting, not filling out forms. Every interaction should be immediate, obvious, and delightful.

## Visual States

### 1. Normal View (Edit Mode OFF)
```
┌────────────────────────────────────────┐
│  [Regular proposal preview]            │
│  Clean, minimal, PDF-like              │
│  No edit affordances visible           │
└────────────────────────────────────────┘
```

### 2. Hover State (Edit Mode ON)
```
┌────────────────────────────────────────┐
│  ╔══════════════════════════════╗      │ <- Dashed orange outline
│  ║ Springfield Roofing LLC   [✏️]║      │ <- Pencil icon appears
│  ║ ~~~~~~~~~~~~~~~~~~~~~~~~~~~ ║      │
│  ║ Subtle orange tint          ║      │
│  ╚══════════════════════════════╝      │
│                                        │
│  Cursor: text ┃                        │
└────────────────────────────────────────┘
```

**Visual Details**:
- 2px dashed border in rgba(249, 115, 22, 0.3)
- Background tint: rgba(249, 115, 22, 0.02)
- Pencil icon: top-right, orange badge
- Cursor changes to text cursor

### 3. Active Editing State
```
┌────────────────────────────────────────┐
│  ╔════════════════════════════════════╗│
│  ║ ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  ║│ <- Solid orange border
│  ║ ┃ Springfield Roofing LLC│     ┃  ║│ <- Input field
│  ║ ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  ║│
│  ║                                    ║│
│  ║ ┌──────────────────────────────┐  ║│ <- Floating toolbar
│  ║ │ [✓ Save] [✕ Cancel]          │  ║│
│  ║ │      Enter to save • Esc     │  ║│
│  ║ └──────────────────────────────┘  ║│
│  ╚════════════════════════════════════╝│
│                                        │
│  [Semi-transparent backdrop]           │ <- Rest of page dimmed
└────────────────────────────────────────┘
```

**Visual Details**:
- Input has 2px solid orange border
- White background with elevation
- Blue glow shadow: 0 0 0 3px rgba(249, 115, 22, 0.1)
- Toolbar slides in from below (200ms ease)
- Backdrop: rgba(0, 0, 0, 0.05)

## Interaction Patterns by Type

### Simple Text Editing
```
Normal → Hover → Click → Edit → Save
  │       │        │       │       │
  │       │        │       │       └→ Smooth fade back
  │       │        │       └→ Type inline
  │       │        └→ Input appears in place
  │       └→ Orange outline + icon
  └→ Clean text
```

**Timing**:
- Hover: 0ms (instant)
- Edit transition: 200ms cubic-bezier(0.4, 0, 0.2, 1)
- Save animation: 150ms ease-out

### Rich Text Editing
```
Click → Toolbar appears → Edit → Save
  │           │             │      │
  │           │             │      └→ Content updates
  │           │             └→ Type with formatting
  │           └→ [B] [I] [•] [🔗]
  └→ Multiline input
```

**Toolbar Buttons**:
- Bold, Italic, Bullet List, Link
- Small, icon-based
- Hover: scale(1.05) + color change

### Table Row Editing
```
Hover Row → Actions appear → Click → Edit
    │            │              │      │
    │            │              │      └→ Cell becomes input
    │            │              └→ Focus cell
    │            └→ [⋮⋮] [✏️] [🗑️]
    └→ Highlight row
```

**Visual Flow**:
```
┌─────────────────────────────────────────┐
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ [⋮⋮] Remove old shingles  $2,400│ ← Row hover
│  │ [✏️]                              │
│  │ [🗑️]                              │
│  └─────────────────────────────────┘   │
│                                         │
│  ↓ Click on cell                        │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ ┏━━━━━━━━━━━━━━━━━┓  ┏━━━━━━┓  │   │
│  │ ┃Remove old shingles┃  ┃ 2400 ┃  │ ← Inputs
│  │ ┗━━━━━━━━━━━━━━━━━┛  ┗━━━━━━┛  │   │
│  └─────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

### Image Editing
```
Hover Image → Dark overlay → Action buttons
     │             │              │
     │             │              └→ [Replace] [Delete]
     │             └→ 60% black overlay
     └→ Normal state
```

**Overlay Animation**:
```
┌────────────────────┐
│                    │
│   ░░░░░░░░░░░░░    │ <- Dark gradient overlay
│   ░░░░░░░░░░░░░    │    rgba(0, 0, 0, 0.6)
│   ░░░░░░░░░░░░░    │
│   ░░ [Replace] ░   │ <- White buttons
│   ░░ [Delete]  ░   │    Hover: orange + lift
│   ░░░░░░░░░░░░░    │
└────────────────────┘
```

## Color Palette

### Primary Edit Colors
```css
Orange Primary:  #f97316  ███████  Used for: borders, buttons, icons
Orange Light:    rgba(249, 115, 22, 0.1)  ░░░░░░░  Glow shadows
Orange Tint:     rgba(249, 115, 22, 0.02) ░░░░░░░  Hover background
Orange Outline:  rgba(249, 115, 22, 0.3)  ▓▓▓▓▓▓▓  Dashed borders
```

### Neutral Colors
```css
White:       #ffffff  ███████  Input backgrounds, toolbars
Gray 50:     #f9fafb  ░░░░░░░  Section headers
Gray 100:    #f3f4f6  ░░░░░░░  Cancel button
Gray 200:    #e5e7eb  ▒▒▒▒▒▒▒  Borders
Gray 400:    #9ca3af  ▓▓▓▓▓▓▓  Placeholder text
Gray 600:    #4b5563  ███████  Secondary text
Charcoal:    #27272a  ███████  Primary text
```

### Semantic Colors
```css
Success:  #22c55e  ███████  Save states
Error:    #ef4444  ███████  Delete buttons, warnings
Warning:  #f59e0b  ███████  Unsaved changes
```

## Typography in Edit Mode

### Edit Labels
```
Font: System font (Inter, SF Pro, Segoe UI)
Size: 11-12px
Weight: 600 (Semi-bold)
Transform: UPPERCASE
Letter-spacing: 0.5px
Color: Gray 500
```

### Button Text
```
Font: System font
Size: 13px
Weight: 600 (Semi-bold)
Color: White (primary) / Gray 700 (secondary)
```

### Hint Text
```
Font: System font
Size: 11px
Weight: 500 (Medium)
Color: Gray 400
Style: Italic optional
```

### Input Text
```
Font: Inherit from parent element
Size: Inherit
Weight: Inherit
Color: Inherit
Line-height: 1.6 (for multiline)
```

## Spacing & Sizing

### Touch Targets
```
Minimum: 44x44px (mobile)
Comfortable: 32x32px (desktop)
Icon buttons: 28x28px (desktop hover actions)
```

### Padding
```
Input fields:     12px 16px
Buttons:         8px 14px
Toolbar:         8px
Icon buttons:    6px 10px (compact)
Section headers: 12px 16px
```

### Margins & Gaps
```
Between toolbar buttons: 8px
Toolbar top margin:     8px
Edit indicator offset:  -8px (top/right)
Row action offset:      -40px (left)
```

## Animation Timing

### Micro-interactions
```
Hover:           0ms (instant)
Button press:    100ms
Tooltip appear:  150ms
Icon rotate:     200ms
```

### Transitions
```
Edit mode enter: 200ms cubic-bezier(0.4, 0, 0.2, 1)
Edit mode exit:  200ms cubic-bezier(0.4, 0, 0.2, 1)
Toolbar slide:   150ms ease-out
Backdrop fade:   200ms ease
```

### Sequences
```
Edit Click:
  0ms:   Backdrop fades in
  0ms:   Input border appears
  50ms:  Toolbar slides up
  200ms: Input focuses and selects text

Save Click:
  0ms:   Backdrop fades out
  0ms:   Input border shrinks
  50ms:  Toolbar slides down
  150ms: Content updates with pulse
```

## Layout Recommendations

### Option A: Split View (Recommended)
```
┌──────────────────────────────────────────────┐
│ [💬 Chat] [Edit Mode ●] [Preview] [Finalize] │ <- Header
├──────────────────┬───────────────────────────┤
│                  │                           │
│  Chat/AI Panel   │   Editable Preview       │
│  (40%)           │   (60%)                  │
│                  │                           │
│  "Add a photo    │   ┌─────────────────┐    │
│   section"       │   │ Title Page      │    │
│                  │   └─────────────────┘    │
│  [Suggestions]   │   ┌─────────────────┐    │
│  • Add estimate  │   │ Introduction    │    │
│  • Upload photos │   └─────────────────┘    │
│  • Edit intro    │   ┌─────────────────┐    │
│                  │   │ Photos [+]      │    │
│                  │   └─────────────────┘    │
│                  │                           │
└──────────────────┴───────────────────────────┘
```

**Pros**:
- AI assistant always visible
- Quick prompts without context switch
- Chat can suggest specific edits
- Clear separation of tools

### Option B: Full-Width Preview
```
┌──────────────────────────────────────────────┐
│ [💬] [Edit Mode ●] [Preview] [Finalize]      │
├──────────────────────────────────────────────┤
│                                              │
│     Full-Width Editable Preview             │
│     (click any element to edit)             │
│                                              │
│     ┌──────────────────────────────┐        │
│     │ Title Page                   │        │
│     └──────────────────────────────┘        │
│     ┌──────────────────────────────┐        │
│     │ Introduction                 │        │
│     └──────────────────────────────┘        │
│                                              │
└──────────────────────────────────────────────┘
│                                              │
└──────────────┐                               │
               │  [Chat Modal]                 │ <- Floating
               │  "How can I help?"            │
               └───────────────────────────────┘
```

**Pros**:
- Maximum preview space
- More immersive editing
- Chat as overlay when needed
- Better for tablets

### Mobile Layout
```
┌──────────────────┐
│ [≡] Proposal     │ <- Collapsed header
├──────────────────┤
│                  │
│  Preview         │
│  (full width)    │
│                  │
│  [Tap to edit]   │
│                  │
│                  │
│                  │
├──────────────────┤
│ [💬] [✏️] [👁]   │ <- Bottom tabs
└──────────────────┘
     │   │    │
     │   │    └─ Preview mode (view only)
     │   └────── Edit mode (tap elements)
     └────────── Chat (slide up modal)
```

## Keyboard Shortcuts

```
Cmd/Ctrl + Click → Edit element directly
Enter            → Save (single-line text)
Cmd + Enter      → Save (multi-line text)
Escape           → Cancel editing
Tab              → Move to next field
Shift + Tab      → Move to previous field
Cmd/Ctrl + Z     → Undo
Cmd/Ctrl + S     → Save all changes
Cmd/Ctrl + K     → Open command palette
```

## Accessibility Features

### Keyboard Navigation
- Full Tab order through editable elements
- Focus rings visible and high-contrast
- Skip links to jump sections
- Arrow keys for list/table navigation

### Screen Readers
```
"Company name. Editable. Click to edit."
"Editing company name. Enter to save. Escape to cancel."
"Saved. Springfield Roofing LLC."
```

### High Contrast Mode
- Edit indicators remain visible
- Focus states use native outlines
- Color is not sole indicator
- Icons + text labels

### Reduced Motion
- All animations can be disabled
- State changes remain clear
- Instant transitions fallback

## Best Practices

### DO ✓
- Show edit affordances on hover
- Provide clear save/cancel actions
- Give keyboard shortcuts
- Auto-save with indicator
- Undo/redo support
- Preserve formatting
- Handle long content gracefully
- Mobile-friendly touch targets

### DON'T ✗
- Require double-click (confusing)
- Hide save button (anxiety-inducing)
- Auto-save without feedback
- Lose data on accidental clicks
- Use tiny touch targets
- Surprise users with auto-edits
- Block the entire UI during edit
- Make people hunt for edit mode

## Implementation Priority

### Phase 1: Foundation
1. EditableWrapper component
2. Text and multiline editing
3. Save/cancel functionality
4. Basic styling and animations

### Phase 2: Enhanced UX
5. Hover indicators and transitions
6. Keyboard shortcuts
7. Auto-save with debounce
8. Undo/redo

### Phase 3: Advanced Features
9. Table row editing
10. Image upload/replace
11. Drag and drop reordering
12. Rich text toolbar

### Phase 4: Polish
13. Mobile touch gestures
14. Loading states
15. Error handling
16. Accessibility audit

## Inspiration Sources

### Notion
- Slash commands
- Block-based editing
- Smooth transitions
- Drag handles always visible

### Figma
- Direct manipulation
- Context-aware toolbars
- Keyboard-first design
- Real-time collaboration

### Linear
- Command palette
- Fast keyboard nav
- Minimal chrome
- Polished micro-interactions

### Canva
- Visual template system
- Smart suggestions
- Drag and drop everything
- Beginner-friendly

## Final Recommendation

**Start with Split View + Inline Editing**:

1. Keep the 40/60 split (chat/preview)
2. Toggle Edit Mode via header button
3. When Edit Mode ON:
   - Hover shows orange outlines
   - Click to edit inline
   - Floating toolbars for actions
   - Auto-save with indicator
4. Chat can still suggest changes
5. Preview button shows homeowner view

This gives contractors the best of both worlds: AI assistance for content generation + direct manipulation for precise control.

The design is **confident** (clear affordances), **precise** (pixel-perfect alignment), and **delightful** (smooth animations). It feels professional, not gimmicky.
