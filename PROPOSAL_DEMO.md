# Contractor Proposal Review Demo

A beautifully designed proposal review interface for contractors to preview project proposals before sending them to homeowners.

## Design Philosophy

This interface uses an **editorial luxury aesthetic** that balances professional credibility with visual sophistication:

- **Typography**: Fraunces (display serif) paired with DM Sans (geometric sans-serif)
- **Color Palette**: Charcoal, warm grays, sand tones, and brass accents - conveying craftsmanship and premium service
- **Visual Details**: Subtle blueprint grid overlay, brass accent bars, staggered animations
- **Layout**: Print-first A4-inspired proportions with generous whitespace

## Features

### 1. Title Page
- **Contractor logo** displayed prominently in header (top right)
- Project proposal header with auto-generated proposal number
- Large, impactful project title typography
- Property image with caption
- Organized detail grid showing:
  - Prepared For (homeowner)
  - Property Address
  - Prepared By (contractor + license)
  - Date Prepared
- **Certification/award badges** displayed at bottom (e.g., "Owens Corning Preferred Contractor", "Women's Choice Award")

### 2. Introduction Page
- Section title with accent bar
- Multi-paragraph introduction with proper typography hierarchy
- Signature section for contractor name and title

### 3. Photo Section
- 2-column grid layout (responsive to 1 column on mobile)
- Labeled site photography with captions and timestamps
- Hover effects with subtle elevation
- Staggered fade-in animations

### 4. Estimate Pages
- Support for multiple estimate tiers (good/better/best)
- Detailed line item table with:
  - Description and notes
  - Quantity, unit, unit price, total
  - Hover highlighting on rows
- Professional totals section with brass accent
- Notes section with cream background

### 5. Attachments Page
- Grid layout of document cards for linked attachments
- File type badges and size indicators
- Hover effects with elevation
- **Embedded PDF rendering**: Marketing brochures and other PDFs can be rendered directly in the proposal as full-page images
  - Each PDF page becomes its own proposal page
  - Seamless integration - appears as part of the document flow
  - Perfect for manufacturer brochures, product specs, warranty details
  - Example: Owens Corning 13-page brochure embedded between estimates and linked attachments
- Supports brochures, warranties, terms, and other documents

## Technical Details

### Responsive Design
- Desktop: 900px max width with 80px padding
- Mobile: Adjusts to 40px/30px padding, single-column grids
- Print-friendly with optimized print styles

### Animations
- Page slide-in on load
- Staggered animations for detail groups, photos, and attachments
- Smooth hover transitions throughout
- CSS-only (no JavaScript required for animations)

### Print/PDF Ready
- Blueprint grid removed in print
- Optimized spacing and margins
- Break-inside: avoid for photos and attachments
- All animations disabled for print

## Running the Demo

```bash
npm install
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173)

## Sample Data

The demo includes realistic sample data for a roofing project with:
- 2 estimate options (Premium and Standard)
- 6 site photos with captions
- 4 document attachments
- Complete contractor and homeowner information

## Design Highlights

### What Makes This Different
- **Not generic AI**: Distinctive font pairing (Fraunces + DM Sans) instead of overused Inter/Roboto
- **Sophisticated color**: Warm earth tones with brass accents instead of cliched purple gradients
- **Blueprint overlay**: Subtle grid pattern suggesting construction/architectural precision
- **Editorial typography**: Magazine-quality type scale and spacing
- **Thoughtful animations**: Staggered, purposeful reveals instead of random micro-interactions
- **Print-first mindset**: Designed for PDF generation from the ground up

### Mobile Considerations
While optimized for PDF output, the interface is fully responsive:
- Single-column layouts on small screens
- Touch-friendly sizing
- Readable typography at all sizes
- Fast-loading images

## Future Enhancements

Potential additions for production use:
- Edit mode for inline proposal editing
- Real-time preview updates
- PDF generation button
- Email send functionality
- Template selection
- Approval workflow
- Digital signature capture
- Multiple estimate comparison view
