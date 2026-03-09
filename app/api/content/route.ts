import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/api/guards";
import { isContentUpdateBody } from "@/lib/content/schema";
import { getContent, putSectionValue } from "@/lib/content/store";

export async function GET() {
  return NextResponse.json({ ok: true, data: getContent() });
}

export async function PUT(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false, error: "Nao autorizado" }, { status: 401 });
  }

  const body = await request.json();
  if (!isContentUpdateBody(body)) {
    return NextResponse.json({ ok: false, error: "Payload invalido" }, { status: 400 });
  }

  const updated = putSectionValue(body.section, body.key, body.value);
  return NextResponse.json({ ok: true, data: updated });
}
