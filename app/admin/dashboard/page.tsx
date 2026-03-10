"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ADMIN_SESSION_KEY } from "@/lib/constants";

type ContentResponse = {
  sections: Record<string, Record<string, string>>;
};

type VisibilityItem = {
  section: string;
  label: string;
  is_visible: boolean;
};

export default function AdminDashboardPage() {
  const [password, setPassword] = useState("");
  const [content, setContent] = useState<ContentResponse | null>(null);
  const [visibility, setVisibility] = useState<VisibilityItem[]>([]);
  const [status, setStatus] = useState("");
  const router = useRouter();

  useEffect(() => {
    const saved = sessionStorage.getItem(ADMIN_SESSION_KEY);
    if (!saved) {
      router.push("/admin");
      return;
    }
    setPassword(saved);
    load(saved);
  }, [router]);

  async function load(adminPassword: string) {
    const [contentRes, visibilityRes] = await Promise.all([
      fetch("/api/content", { headers: { "x-admin-password": adminPassword } }),
      fetch("/api/visibility", { headers: { "x-admin-password": adminPassword } }),
    ]);
    const contentJson = await contentRes.json();
    const visibilityJson = await visibilityRes.json();
    setContent(contentJson.data);
    setVisibility(visibilityJson.data ?? []);
  }

  async function saveField(section: string, key: string, value: string) {
    setStatus("Salvando...");
    const res = await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json", "x-admin-password": password },
      body: JSON.stringify({ section, key, value }),
    });
    if (!res.ok) {
      setStatus("Falha ao salvar");
      return;
    }
    setStatus("Salvo");
    await load(password);
  }

  async function toggleSection(section: string, is_visible: boolean) {
    setStatus("Salvando visibilidade...");
    const res = await fetch("/api/visibility", {
      method: "PUT",
      headers: { "Content-Type": "application/json", "x-admin-password": password },
      body: JSON.stringify({ section, is_visible }),
    });
    if (!res.ok) {
      setStatus("Falha ao salvar visibilidade");
      return;
    }
    setStatus("Visibilidade salva");
    await load(password);
  }

  if (!content) {
    return <main style={{ padding: 24 }}>Carregando...</main>;
  }

  return (
<<<<<<< Updated upstream
    <main style={{ padding: 24, background: "#f5f0e8", minHeight: "100vh" }}>
      <h1 style={{ marginTop: 0 }}>Dashboard de Conteudo</h1>
      {status && <p>{status}</p>}

      <section style={{ marginBottom: 24, background: "#fff", border: "1px solid #d9cfbe", borderRadius: 10, padding: 16 }}>
        <h2>Visibilidade das secoes</h2>
        <div style={{ display: "grid", gap: 8 }}>
          {visibility.map((v) => (
            <label key={v.section} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <input
                type="checkbox"
                checked={v.is_visible}
                onChange={(e) => toggleSection(v.section, e.target.checked)}
              />
              <span>{v.label}</span>
            </label>
          ))}
        </div>
      </section>

      {Object.entries(content.sections).map(([section, fields]) => (
        <section key={section} style={{ marginBottom: 16, background: "#fff", border: "1px solid #d9cfbe", borderRadius: 10, padding: 16 }}>
          <h3 style={{ marginTop: 0 }}>{section}</h3>
          <div style={{ display: "grid", gap: 10 }}>
            {Object.entries(fields).map(([key, value]) => (
              <label key={key} style={{ display: "grid", gap: 6 }}>
                <span>{key}</span>
                <textarea
                  defaultValue={value}
                  onBlur={(e) => saveField(section, key, e.target.value)}
                  rows={3}
                  style={{ width: "100%", borderRadius: 8, border: "1px solid #d9cfbe", padding: 8 }}
=======
    <main className="min-h-screen bg-fundo-off px-4 py-6 md:px-6">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <header className="space-y-2">
          <h1 className="font-titulo text-h1 font-extrabold tracking-tight text-terracota">Dashboard de Conteudo</h1>
          {status && <p className="font-corpo text-sm-body text-cinza/80">{status}</p>}
        </header>

        <Card>
          <CardHeader>
            <CardTitle className="font-titulo text-h2 font-bold text-cinza">Visibilidade das secoes</CardTitle>
            <CardDescription>Ative ou desative as secoes da landing page.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {visibility.map((v) => (
              <div key={v.section} className="flex items-center justify-between rounded-sm border border-[#e7dece] bg-white px-3 py-2">
                <Label htmlFor={`visibility-${v.section}`} className="cursor-pointer">
                  {v.label}
                </Label>
                <Switch
                  id={`visibility-${v.section}`}
                  checked={v.is_visible}
                  onCheckedChange={(checked) => toggleSection(v.section, checked)}
>>>>>>> Stashed changes
                />
              </label>
            ))}
<<<<<<< Updated upstream
          </div>
        </section>
      ))}
=======
          </CardContent>
        </Card>

        {Object.entries(content.sections).map(([section, fields]) => (
          <Card key={section}>
            <CardHeader>
              <CardTitle className="font-titulo text-h2 font-bold capitalize text-cinza">{section.replaceAll("_", " ")}</CardTitle>
              <CardDescription>As alteracoes sao salvas quando o campo perde o foco.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {Object.entries(fields).map(([key, value]) => (
                <label key={key} className="grid gap-2">
                  <span className="font-titulo text-label font-bold uppercase tracking-widest text-cinza">{key}</span>
                  <Textarea
                    defaultValue={value}
                    onBlur={(e) => saveField(section, key, e.target.value)}
                    rows={3}
                  />
                </label>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
>>>>>>> Stashed changes
    </main>
  );
}
