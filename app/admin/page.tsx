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
    </main>
  );
}
