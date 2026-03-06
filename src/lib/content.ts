import resourcesData from "@/data/resources.json";
import githubData from "@/data/github.json";
import interviewData from "@/data/interview.json";

export interface ResourceItem {
  name: string;
  url: string;
  description: string;
}

export interface ResourceCategory {
  name: string;
  items: ResourceItem[];
}

export interface ResourceRepo {
  id: string;
  label: string;
  categories: ResourceCategory[];
}

export function getResourcesRepos(): ResourceRepo[] {
  return resourcesData as ResourceRepo[];
}

export function getGithubRepos(): ResourceRepo[] {
  return githubData as ResourceRepo[];
}

export function getInterviewRepos(): ResourceRepo[] {
  return interviewData as ResourceRepo[];
}

export function getAllCategories(repos: ResourceRepo[]): ResourceCategory[] {
  return repos.flatMap((r) => r.categories);
}

export function getCategoryByName(
  repos: ResourceRepo[],
  name: string
): ResourceCategory | undefined {
  return getAllCategories(repos).find((c) => c.name === name);
}
