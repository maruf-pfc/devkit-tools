import toolsData from "@/data/tools.json";
import { Category } from "@/interfaces/category";
import { Tool } from "@/interfaces/tools";

export const categories: Category[] = toolsData.categories;
export const tools: Tool[] = toolsData.tools;

export function getFeaturedTools(): Tool[] {
  return tools.filter((tool) => tool.featured);
}
