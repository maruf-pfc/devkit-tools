import { getResourcesRepos } from "@/lib/content";
import { ResourceHub } from "@/components/ResourceHub";

export const metadata = {
  title: "Developer Resources | DevKit Tools",
  description:
    "Curated design resources, UI tools, fonts, icons, colors, and React component libraries for developers and designers.",
};

export default function ResourcesPage() {
  const repos = getResourcesRepos();
  return (
    <ResourceHub
      repos={repos}
      title="Developer Resources"
      description="Curated design assets, UI graphics, fonts, colors, icons, and React component libraries — everything to build beautiful products."
      accentColor="from-violet-600 to-indigo-700"
    />
  );
}
