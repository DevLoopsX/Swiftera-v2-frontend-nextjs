import { apiGet, USE_MOCK } from "@/api/client";

export type LegalSection = {
  id: string;
  title: string;
  subtitle?: string;
  content: string;
  type?: string;
  orderIndex?: number;
};

export type LegalPageResponse = {
  title: string;
  subtitle?: string;
  description?: string;
  updatedAt?: string;
  sections: LegalSection[];
};

const mockLegalData = {
  title: "Chính sách & pháp lý",
  subtitle: "Dịch vụ cho thuê thiết bị điện tử",
  description:
    "Tổng hợp điều khoản sử dụng, chính sách thuê, trách nhiệm và quy định pháp lý khi sử dụng dịch vụ Swiftera.",
  updatedAt: "2026-04-03T00:00:00.000Z",
  sections: [
    {
      id: "1",
      title: "1. Tổng quan dịch vụ",
      content: `Swiftera là nền tảng cung cấp dịch vụ cho thuê các sản phẩm điện tử như điện thoại, laptop, máy ảnh và thiết bị công nghệ khác.

Người dùng có thể thuê thiết bị theo thời gian linh hoạt mà không cần sở hữu.

Việc sử dụng dịch vụ đồng nghĩa với việc đồng ý với các điều khoản và chính sách của hệ thống.`,
      type: "policy",
      orderIndex: 1,
    },
    {
      id: "2",
      title: "2. Điều kiện sử dụng dịch vụ",
      content: `Người thuê phải từ 18 tuổi trở lên, có đầy đủ năng lực hành vi dân sự.

Cần cung cấp thông tin cá nhân chính xác bao gồm CCCD/CMND, số điện thoại và địa chỉ.

Swiftera có quyền từ chối dịch vụ nếu phát hiện thông tin không hợp lệ.`,
      type: "policy",
      orderIndex: 2,
    },
    {
      id: "3",
      title: "3. Thanh toán và tiền cọc",
      content: `Người thuê cần thanh toán trước phí thuê.

Một khoản tiền cọc sẽ được yêu cầu tùy theo giá trị sản phẩm.

Tiền cọc sẽ được hoàn lại nếu sản phẩm không bị hư hỏng.`,
      type: "policy",
      orderIndex: 3,
    },
    {
      id: "4",
      title: "4. Giao nhận thiết bị",
      content: `Thiết bị sẽ được giao đến địa chỉ đăng ký.

Người thuê cần kiểm tra sản phẩm khi nhận.

Mọi khiếu nại phải thực hiện trong vòng 24 giờ.`,
      type: "policy",
      orderIndex: 4,
    },
    {
      id: "5",
      title: "5. Trách nhiệm sử dụng thiết bị",
      content: `Người thuê phải sử dụng thiết bị đúng mục đích.

Không tháo rời, sửa chữa hoặc can thiệp thiết bị.

Không sử dụng vào mục đích vi phạm pháp luật.`,
      type: "law",
      orderIndex: 5,
    },
    {
      id: "6",
      title: "6. Mất mát và bồi thường",
      content: `Trong trường hợp mất hoặc hư hỏng, người thuê phải chịu trách nhiệm bồi thường.

Chi phí được tính theo giá trị thực tế của sản phẩm.`,
      type: "law",
      orderIndex: 6,
    },
    {
      id: "7",
      title: "7. Gia hạn và trả trễ",
      content: `Người thuê có thể gia hạn thông qua hệ thống.

Nếu trả trễ, phí phạt sẽ được áp dụng.`,
      type: "law",
      orderIndex: 7,
    },
    {
      id: "8",
      title: "8. Bảo mật thông tin",
      content: `Swiftera cam kết bảo vệ thông tin cá nhân của người dùng.

Không chia sẻ cho bên thứ ba nếu không có sự đồng ý.`,
      type: "policy",
      orderIndex: 8,
    },
    {
      id: "9",
      title: "9. Giải quyết tranh chấp",
      content: `Tranh chấp sẽ được giải quyết thông qua thương lượng.

Nếu không thành công, sẽ xử lý theo pháp luật Việt Nam.`,
      type: "law",
      orderIndex: 9,
    },
    {
      id: "10",
      title: "10. Thay đổi chính sách",
      content: `Swiftera có quyền thay đổi chính sách bất kỳ lúc nào.

Người dùng tiếp tục sử dụng dịch vụ đồng nghĩa với việc chấp nhận thay đổi.`,
      type: "policy",
      orderIndex: 10,
    },
  ],
};

export async function getLegalPageData(): Promise<LegalPageResponse> {
  if (USE_MOCK) return mockLegalData;

  return apiGet<LegalPageResponse>("/legal/public");
}
