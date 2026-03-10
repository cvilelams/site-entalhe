"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ADMIN_SESSION_KEY } from "@/lib/constants";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!password) {
      setError("Informe a senha.");
      return;
    }
    sessionStorage.setItem(ADMIN_SESSION_KEY, password);
    router.push("/admin/dashboard");
  }

  return (
<<<<<<< Updated upstream
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#f5f0e8" }}>
      <form onSubmit={onSubmit} style={{ width: "min(420px, 92vw)", background: "#fff", padding: 24, borderRadius: 12, border: "1px solid #d9cfbe" }}>
        <h1 style={{ marginTop: 0 }}>Admin Oficina Cigarra</h1>
        <p>Entre com a senha de administracao.</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #d9cfbe" }}
        />
        {error && <p style={{ color: "#b00020" }}>{error}</p>}
        <button type="submit" style={{ marginTop: 12, width: "100%", padding: 10, borderRadius: 8, border: "none", background: "#6b4e2a", color: "#fff" }}>
          Entrar
        </button>
      </form>
=======
    <main className="grid min-h-screen place-items-center bg-fundo-off px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="font-titulo text-h1 font-extrabold tracking-tight text-terracota">Admin Oficina Cigarra</CardTitle>
          <CardDescription>Entre com a senha de administracao.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
              />
            </div>
            {error && <p className="font-corpo text-sm-body text-red-700">{error}</p>}
            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
>>>>>>> Stashed changes
    </main>
  );
}
