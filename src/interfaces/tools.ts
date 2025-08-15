export interface Tool {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  keywords: string[];
  featured?: boolean;
}
