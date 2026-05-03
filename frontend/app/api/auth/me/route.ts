import { NextResponse } from "next/server";
import { getAuthUser } from "@/libs/auth";

/**
 * GET /api/auth/me
 *
 * Route Handler phục vụ client-side fetch (nếu cần).
 * Tái sử dụng getAuthUser() — React.cache() đảm bảo không duplicate
 * fetch nếu layout đã gọi hàm này trong cùng request.
 */
export async function GET() {
    const session = await getAuthUser();
    return NextResponse.json(session);
}