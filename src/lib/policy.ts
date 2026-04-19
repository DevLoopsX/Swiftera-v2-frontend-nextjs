export type Policy = {
  policyDocumentId: string;
  code: string;
  policyVersion: number;
  title: string;
  pdfUrl: string | null;
  effectiveFrom: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type PolicyResponse = {
  success?: boolean;
  message?: string;
  data?: {
    content?: Policy[];
    meta?: {
      currentPage: number;
      pageSize: number;
      totalPages: number;
      totalElements: number;
      hasNext: boolean;
      hasPrevious: boolean;
    };
  };
  meta?: {
    timestamp?: string;
    instance?: string;
  };
};

export async function getPolicies(): Promise<PolicyResponse> {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://swiftera.azurewebsites.net";

  const url = `${baseUrl}/api/v1/policies?page=1&size=10&filter=${encodeURIComponent(
    "isActive:true",
  )}`;

  try {
    console.log("CALLING REAL POLICIES API:", url);

    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    console.log("POLICIES STATUS:", res.status);

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Policies API error:", res.status, errorText);

      return {
        success: false,
        message: `Policies API failed: ${res.status}`,
        data: {
          content: [],
          meta: {
            currentPage: 1,
            pageSize: 10,
            totalPages: 0,
            totalElements: 0,
            hasNext: false,
            hasPrevious: false,
          },
        },
      };
    }

    const data: PolicyResponse = await res.json();
    console.log("REAL POLICIES RESPONSE:", data);

    return data;
  } catch (error) {
    console.error("Policies fetch failed:", error);

    return {
      success: false,
      message: "Không thể kết nối tới API chính sách.",
      data: {
        content: [],
        meta: {
          currentPage: 1,
          pageSize: 10,
          totalPages: 0,
          totalElements: 0,
          hasNext: false,
          hasPrevious: false,
        },
      },
    };
  }
}
