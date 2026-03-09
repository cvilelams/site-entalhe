import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/api/guards";
import { ALLOWED_IMAGE_TYPES, ALLOWED_VIDEO_TYPES, MAX_UPLOAD_MB } from "@/lib/constants";

const allowed = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_VIDEO_TYPES];

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false, error: "Nao autorizado" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: "Arquivo obrigatorio" }, { status: 400 });
  }

  if (!allowed.includes(file.type)) {
    return NextResponse.json({ ok: false, error: "Tipo de arquivo nao permitido" }, { status: 400 });
  }

  const maxBytes = MAX_UPLOAD_MB * 1024 * 1024;
  if (file.size > maxBytes) {
    return NextResponse.json({ ok: false, error: `Arquivo acima de ${MAX_UPLOAD_MB}MB` }, { status: 400 });
  }

  // Fallback local: sem Supabase configurado, retornamos uma URL de preview temporaria.
  const previewUrl = URL.createObjectURL(file);
  return NextResponse.json({
    ok: true,
    data: {
      url: previewUrl,
      fileName: file.name,
      type: file.type,
      size: file.size,
    },
  });
}
