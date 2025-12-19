export interface Badge {
  name: string;
  imageUrl: string;
}

export interface Contractor {
  name: string;
  logo?: string;
  phone?: string;
  email?: string;
  address?: string;
  license?: string;
  badges?: Badge[];
}

export interface Homeowner {
  name: string;
  address: string;
  phone?: string;
  email?: string;
}

export interface TitlePage {
  contractor: Contractor;
  homeowner: Homeowner;
  date: string;
  propertyImage?: string;
  projectTitle?: string;
}

export interface IntroPage {
  content: string;
  signature?: string;
  contractorName?: string;
}

export interface Photo {
  url: string;
  caption: string;
  timestamp?: string;
}

export interface PhotoSection {
  title: string;
  photos: Photo[];
}

export interface LineItem {
  description: string;
  quantity?: number;
  unit?: string;
  unitPrice?: number;
  total: number;
  notes?: string;
}

export interface Estimate {
  id: string;
  title: string;
  description?: string;
  lineItems: LineItem[];
  subtotal: number;
  tax?: number;
  total: number;
  notes?: string;
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface FileAttachment {
  name: string;
  url: string;
  type: 'brochure' | 'warranty' | 'terms' | 'other';
  size?: string;
  embedContent?: boolean; // If true, render PDF pages inline
  pdfPages?: string[]; // Array of image URLs for each PDF page
}

export interface Proposal {
  id: string;
  titlePage: TitlePage;
  introPage: IntroPage;
  photoSections: PhotoSection[];
  estimates: Estimate[];
  attachments?: FileAttachment[];
  addOns?: AddOn[];
  createdAt: string;
  updatedAt: string;
}
