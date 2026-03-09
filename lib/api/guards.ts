import { NextRequest } from "next/server";

export function isAdminRequest(request: NextRequest) {
  const sent = request.headers.get("x-admin-password");
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return sent === expected;
}
