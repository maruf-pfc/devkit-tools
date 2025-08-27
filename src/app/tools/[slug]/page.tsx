import { notFound } from "next/navigation";
import { getToolBySlug } from "@/lib/tools";
import { ToolHeader } from "@/components/tool-header";
import { TextCaseConverter } from "@/components/tools/text-case-converter";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return { title: "Tool Not Found | DevKit Tools" };
  }

  return {
    title: `${tool.name} | DevKit Tools`,
    description: tool.description,
    keywords: tool.keywords,
  };
}

function getToolComponent(slug: string) {
  switch (slug) {
    case "text-case-converter":
      return <TextCaseConverter />;
    default:
      return null;
  }
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const ToolComponent = getToolComponent(slug);

  return (
    <div>
      <ToolHeader tool={tool} />
      {ToolComponent || (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-muted/30 rounded-lg p-8 text-center">
              <h2 className="text-xl font-semibold mb-2">
                Tool Implementation Coming Soon
              </h2>
              <p className="text-muted-foreground">
                The {tool.name} tool will be implemented in the next phase of
                development.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
