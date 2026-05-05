export type Category = 'All' | 'Newsletter' | 'Flex Design' | 'Certificate' | 'Poster' | 'Banner' | 'Card' | 'ID Card';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: Category;
  thumbnailUrl: string;
  fullImageUrl: string;
  canvaUrl: string;
  pdfUrl?: string;
  featured: boolean;
}

