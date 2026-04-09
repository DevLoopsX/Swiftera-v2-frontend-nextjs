import { Layout } from "@/components/Layout";
import LegalPageFlip from "@/components/legal/legalpageflip";
import { getLegalPageData } from "@/api/legal";

export const dynamic = "force-dynamic";

export default async function LegalPage() {
  const data = await getLegalPageData();

  return (
    <Layout>
      <LegalPageFlip
        title={data.title}
        subtitle={data.subtitle}
        description={data.description}
        updatedAt={data.updatedAt}
        sections={data.sections}
      />
    </Layout>
  );
}
