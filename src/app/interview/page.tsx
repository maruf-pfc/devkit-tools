import { getInterviewRepos } from "@/lib/content";
import { ResourceHub } from "@/components/ResourceHub";

export const metadata = {
  title: "Interview Preparation | DevKit Tools",
  description:
    "Comprehensive interview prep resources — algorithms, data structures, CS fundamentals, system design, and Bangladesh tech interview questions.",
};

export default function InterviewPreparationPage() {
  const repos = getInterviewRepos();
  return (
    <ResourceHub
      repos={repos}
      title="Interview Preparation"
      description="Algorithms, data structures, CS fundamentals, OSSU free curriculum, system administration tools, and Bangladeshi tech company interview questions."
      accentColor="from-orange-500 to-rose-600"
    />
  );
}
