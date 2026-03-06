import { getGithubRepos } from "@/lib/content";
import { ResourceHub } from "@/components/ResourceHub";

export const metadata = {
  title: "GitHub Resources | DevKit Tools",
  description:
    "Discover awesome GitHub repositories — React ecosystem libraries, self-hosted software, and security/hacking tools.",
};

export default function GitHubResourcesPage() {
  const repos = getGithubRepos();
  return (
    <ResourceHub
      repos={repos}
      title="Popular GitHub Repositories"
      description="Awesome curated GitHub repos — React frameworks & libraries, self-hosted software, and cybersecurity tools for hackers and pentesters."
      accentColor="from-emerald-600 to-teal-700"
    />
  );
}
