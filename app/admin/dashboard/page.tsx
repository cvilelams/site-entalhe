"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ADMIN_SESSION_KEY } from "@/lib/constants";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

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
    return <main className="p-6">Carregando...</main>;
  }

  return (
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
                />
              </div>
            ))}
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
    </main>
  );
}
