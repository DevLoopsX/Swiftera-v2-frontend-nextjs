import { getPolicies, Policy } from "@/lib/policy";
import LegalPageClient from "./LegalPageClient";

function sortPolicies(policies: Policy[]) {
  return [...policies].sort((a, b) => {
    const dateA = new Date(a.effectiveFrom).getTime();
    const dateB = new Date(b.effectiveFrom).getTime();

    if (dateB !== dateA) return dateB - dateA;
    return b.policyVersion - a.policyVersion;
  });
}

export default async function LegalPage() {
  const response = await getPolicies();

  const rawPolicies: Policy[] = Array.isArray(response?.data?.content)
    ? response.data.content
    : [];

  const policies = sortPolicies(rawPolicies);

  return <LegalPageClient policies={policies} />;
}
