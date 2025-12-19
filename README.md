# Contractor Proposal Demo

A demo application showing how to display project proposal data to contractors for review before sending to homeowners.

## Features

- **Title Page**: Contractor info, homeowner details, property image, project title
- **Intro Page**: Personalized message to the homeowner
- **Photo Section**: Site photography with captions and timestamps
- **Estimates**: Detailed line items with multiple pricing options (Good/Better/Best)
- **File Attachments**: Marketing brochures, warranty info, terms, etc.

## Design Approach

The demo is built with responsive design principles to work well on both:
- **Desktop/Tablet**: Full page layout suitable for PDF generation
- **Mobile**: Optimized for contractor review on-the-go

All components are designed with print/PDF rendering in mind, using a consistent page-based layout that translates cleanly to PDF output.

## Running the Demo

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── types.ts                    # TypeScript interfaces for all data models
├── sampleData.ts              # Demo data for roofing proposal
├── ProposalStyles.css         # Unified styles for all components
├── components/
│   ├── ProposalPreview.tsx    # Main container component
│   ├── TitlePage.tsx          # Title page with contractor/homeowner info
│   ├── IntroPage.tsx          # Introduction letter
│   ├── PhotoSection.tsx       # Photo grid with captions
│   ├── EstimatePage.tsx       # Detailed estimate with line items
│   └── AttachmentsPage.tsx    # File attachments list
├── App.tsx                    # Root application component
└── main.tsx                   # Application entry point
```

## Data Model

The proposal data is strongly typed using TypeScript interfaces. Key types include:

- `Proposal`: Top-level container for all proposal data
- `TitlePage`: Contractor and homeowner information
- `IntroPage`: Introduction content and signature
- `PhotoSection`: Collection of photos with metadata
- `Estimate`: Line items, pricing, and totals
- `FileAttachment`: Document references

## Customization

To use with your own data:

1. Import the types from `src/types.ts`
2. Create your proposal object matching the `Proposal` interface
3. Pass it to the `ProposalPreview` component

Example:

```typescript
import { Proposal } from './types';
import ProposalPreview from './components/ProposalPreview';

const myProposal: Proposal = {
  // Your proposal data
};

<ProposalPreview proposal={myProposal} />
```

## PDF Generation

The layout is print-friendly and can be converted to PDF using:
- Browser print to PDF (Ctrl/Cmd + P)
- PDF generation libraries (e.g., Puppeteer, html2pdf.js)
- Server-side rendering with tools like wkhtmltopdf

The CSS includes print-specific styles to ensure clean PDF output.

## Technologies

- React 18
- TypeScript 5
- Vite (build tool)
- CSS (no framework dependencies)
