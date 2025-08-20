import toolsData from "@/data/tools.json";
import { Category } from "@/interfaces/category";
import { Tool } from "@/interfaces/tools";

export const categories: Category[] = toolsData.categories;
export const tools: Tool[] = toolsData.tools;

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(categoryId: string): Tool[] {
  return tools.filter((tool) => tool.category === categoryId);
}

export function getFeaturedTools(): Tool[] {
  return tools.filter((tool) => tool.featured);
}

export function searchTools(query: string): Tool[] {
  const lowercaseQuery = query.toLowerCase();
  return tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(lowercaseQuery) ||
      tool.description.toLowerCase().includes(lowercaseQuery) ||
      tool.keywords.some((keyword) =>
        keyword.toLowerCase().includes(lowercaseQuery)
      )
  );
}

export function getCategoryById(categoryId: string): Category | undefined {
  return categories.find((category) => category.id === categoryId);
}
