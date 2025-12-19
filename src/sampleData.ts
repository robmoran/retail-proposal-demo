import { Proposal } from './types';

export const sampleProposal: Proposal = {
  id: 'proposal-001',
  titlePage: {
    contractor: {
      name: 'Summit Roofing & Construction',
      phone: '(555) 123-4567',
      email: 'info@summitroofing.com',
      address: '123 Contractor Ave, Builder City, ST 12345',
      license: 'Licensed CCB #198472',
      logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=400&h=200&fit=crop',
      badges: [
        {
          name: 'Owens Corning Preferred Contractor',
          imageUrl: 'https://images.unsplash.com/photo-1618498082410-b4aa22193b38?w=200&h=200&fit=crop'
        },
        {
          name: 'Women\'s Choice Award',
          imageUrl: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=200&h=200&fit=crop'
        }
      ]
    },
    homeowner: {
      name: 'John & Sarah Smith',
      address: '456 Homeowner Lane, Neighborhood, ST 12345',
      phone: '(555) 987-6543',
      email: 'smithfamily@email.com',
    },
    date: '2025-12-19',
    projectTitle: 'Complete Roof Replacement',
    propertyImage: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop',
  },
  introPage: {
    content: `Dear John & Sarah,

Thank you for the opportunity to provide you with this comprehensive proposal for your roofing project. At Premium Roofing & Construction, we pride ourselves on delivering exceptional quality and customer service that has made us a trusted name in the community for over 25 years.

We understand that your home is one of your most valuable investments, and choosing the right contractor for your roofing needs is an important decision. This proposal outlines our recommended approach to replacing your roof with premium materials and expert craftsmanship.

Our team has carefully inspected your property and identified the scope of work needed to provide you with a beautiful, durable roof that will protect your home for decades to come. We've included multiple options in this proposal to give you flexibility in choosing the solution that best fits your needs and budget.

We're committed to completing your project on time, within budget, and with minimal disruption to your daily life. All work will be performed by our experienced, licensed, and insured professionals, and we stand behind our work with comprehensive warranties.

If you have any questions about this proposal or would like to discuss any aspect of the project, please don't hesitate to reach out. We look forward to the opportunity to work with you.`,
    contractorName: 'Michael Johnson, Owner',
  },
  photoSections: [
    {
      title: 'Site Photography',
      photos: [
        {
          url: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=600&h=400&fit=crop',
          caption: 'Front elevation showing existing shingle condition',
          timestamp: '2025-12-15',
        },
        {
          url: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=400&fit=crop',
          caption: 'Close-up of damaged shingles and granule loss',
          timestamp: '2025-12-15',
        },
        {
          url: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=600&h=400&fit=crop',
          caption: 'Rear roof section with visible wear',
          timestamp: '2025-12-15',
        },
        {
          url: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=600&h=400&fit=crop',
          caption: 'Chimney flashing requiring replacement',
          timestamp: '2025-12-15',
        },
        {
          url: 'https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=600&h=400&fit=crop',
          caption: 'Gutter system assessment',
          timestamp: '2025-12-15',
        },
        {
          url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop',
          caption: 'Attic ventilation inspection',
          timestamp: '2025-12-15',
        },
      ],
    },
  ],
  estimates: [
    {
      title: 'Premium Option - Architectural Shingles',
      description: 'High-quality architectural shingles with enhanced warranty and superior aesthetics',
      lineItems: [
        {
          description: 'Remove existing roofing materials down to deck',
          quantity: 2400,
          unit: 'sq ft',
          unitPrice: 1.50,
          total: 3600,
          notes: 'Including proper disposal and site cleanup',
        },
        {
          description: 'Inspect and repair roof decking as needed',
          quantity: 1,
          unit: 'allowance',
          total: 800,
          notes: 'Material and labor for deck repairs',
        },
        {
          description: 'Install ice & water shield at eaves and valleys',
          quantity: 300,
          unit: 'sq ft',
          unitPrice: 2.50,
          total: 750,
        },
        {
          description: 'Install synthetic underlayment (entire roof)',
          quantity: 2400,
          unit: 'sq ft',
          unitPrice: 0.85,
          total: 2040,
        },
        {
          description: 'Install GAF Timberline HDZ architectural shingles',
          quantity: 26,
          unit: 'squares',
          unitPrice: 320,
          total: 8320,
          notes: 'Charcoal color, 50-year warranty',
        },
        {
          description: 'Install new roof vents and ridge venting',
          quantity: 1,
          unit: 'lot',
          total: 1200,
          notes: 'Includes all necessary ventilation components',
        },
        {
          description: 'Install new aluminum drip edge',
          quantity: 180,
          unit: 'ft',
          unitPrice: 4.50,
          total: 810,
        },
        {
          description: 'Replace step and counter flashing',
          quantity: 60,
          unit: 'ft',
          unitPrice: 12,
          total: 720,
        },
        {
          description: 'Install new pipe boot flashings',
          quantity: 4,
          unit: 'ea',
          unitPrice: 85,
          total: 340,
        },
        {
          description: 'Clean and seal chimney flashing',
          quantity: 1,
          unit: 'ea',
          total: 450,
        },
      ],
      subtotal: 19030,
      tax: 1522.40,
      total: 20552.40,
      notes: 'This estimate includes a 50-year material warranty from GAF and a 10-year labor warranty from Premium Roofing & Construction. Project timeline: 3-4 days weather permitting. Price valid for 30 days.',
    },
    {
      title: 'Standard Option - 3-Tab Shingles',
      description: 'Quality 3-tab shingles offering reliable protection at an economical price point',
      lineItems: [
        {
          description: 'Remove existing roofing materials down to deck',
          quantity: 2400,
          unit: 'sq ft',
          unitPrice: 1.50,
          total: 3600,
          notes: 'Including proper disposal and site cleanup',
        },
        {
          description: 'Inspect and repair roof decking as needed',
          quantity: 1,
          unit: 'allowance',
          total: 800,
        },
        {
          description: 'Install ice & water shield at eaves and valleys',
          quantity: 300,
          unit: 'sq ft',
          unitPrice: 2.50,
          total: 750,
        },
        {
          description: 'Install #30 felt underlayment (entire roof)',
          quantity: 2400,
          unit: 'sq ft',
          unitPrice: 0.45,
          total: 1080,
        },
        {
          description: 'Install GAF Royal Sovereign 3-tab shingles',
          quantity: 26,
          unit: 'squares',
          unitPrice: 220,
          total: 5720,
          notes: 'Charcoal color, 25-year warranty',
        },
        {
          description: 'Install new roof vents and ridge venting',
          quantity: 1,
          unit: 'lot',
          total: 1200,
        },
        {
          description: 'Install new aluminum drip edge',
          quantity: 180,
          unit: 'ft',
          unitPrice: 4.50,
          total: 810,
        },
        {
          description: 'Replace step and counter flashing',
          quantity: 60,
          unit: 'ft',
          unitPrice: 12,
          total: 720,
        },
        {
          description: 'Install new pipe boot flashings',
          quantity: 4,
          unit: 'ea',
          unitPrice: 85,
          total: 340,
        },
        {
          description: 'Clean and seal chimney flashing',
          quantity: 1,
          unit: 'ea',
          total: 450,
        },
      ],
      subtotal: 15470,
      tax: 1237.60,
      total: 16707.60,
      notes: 'This estimate includes a 25-year material warranty from GAF and a 10-year labor warranty from Premium Roofing & Construction. Project timeline: 3-4 days weather permitting. Price valid for 30 days.',
    },
  ],
  attachments: [
    {
      name: 'Owens Corning Product Brochure.pdf',
      url: '#',
      type: 'brochure',
      size: '5.2 MB',
      embedContent: true,
      pdfPages: [
        'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=900&h=1200&fit=crop',
        'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=900&h=1200&fit=crop',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&h=1200&fit=crop'
      ]
    },
    {
      name: 'GAF System Plus Warranty Information.pdf',
      url: '#',
      type: 'warranty',
      size: '856 KB',
    },
    {
      name: 'Summit Roofing Terms and Conditions.pdf',
      url: '#',
      type: 'terms',
      size: '124 KB',
    },
    {
      name: 'Roof Maintenance Guide.pdf',
      url: '#',
      type: 'other',
      size: '1.8 MB',
    },
  ],
  createdAt: '2025-12-19T10:00:00Z',
  updatedAt: '2025-12-19T10:00:00Z',
};
