import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/api/guards";
import { isVisibilityUpdateBody } from "@/lib/content/schema";
import { getVisibility, putVisibility } from "@/lib/content/store";

export async function GET() {
  return NextResponse.json({ ok: true, data: getVisibility() });
}

export async function PUT(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false, error: "Nao autorizado" }, { status: 401 });
  }

  const body = await request.json();
  if (!isVisibilityUpdateBody(body)) {
    return NextResponse.json({ ok: false, error: "Payload invalido" }, { status: 400 });
  }

  const updated = putVisibility(body.section, body.is_visible);
  return NextResponse.json({ ok: true, data: updated });
}
