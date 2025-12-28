import React from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import Login from "./pages/Login.jsx";
import MenuPrincipal from "./pages/MenuPrincipal.jsx";
import Compras from "./pages/compras.jsx";
import OrdenCompra from "./pages/OrdenCompra.jsx";

function Home() {
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Abastecimiento 2026</h1>
        <p style={styles.subtitle}>
          Proyecto nuevo, limpio, y listo para escalar. (Sí, ahora sí 😅)
        </p>

        <div style={styles.actions}>
          <Link to="/login" style={styles.primaryBtn}>
            Entrar
          </Link>
          <Link to="/about" style={styles.secondaryBtn}>
            About
          </Link>
        </div>

        <div style={styles.footerNote}>Vite + React funcionando ✅</div>
      </div>
    </div>
  );
}

function AppShell() {
  return (
    <div style={styles.shell}>
      <header style={styles.header}>
        <div style={styles.brand}>
          <span style={styles.brandDot} />
          <span style={styles.brandText}>Abastecimiento 2026</span>
        </div>
        <nav style={styles.nav}>
          <Link to="/home" style={styles.navLink}>
            Inicio
          </Link>
          <Link to="/about" style={styles.navLink}>
            About
          </Link>
        </nav>
      </header>

      <main style={styles.main}>
        <div style={styles.cardWide}>
          <h2 style={styles.h2}>Panel (placeholder)</h2>
          <p style={styles.p}>
            Acá vamos a colgar el menú principal del 2026, módulos, auth, etc.
          </p>
          <p style={styles.p}>
            Por ahora esto es una base sólida para que el proyecto compile sin pelearse con imports.
          </p>
        </div>
      </main>
    </div>
  );
}

function About() {
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>About</h1>
        <p style={styles.subtitle}>
          Base mínima para arrancar el proyecto 2026 sin mezclar con el viejo.
        </p>
        <div style={styles.actions}>
          <Link to="/login" style={styles.secondaryBtn}>
            Volver
          </Link>
          <Link to="/home" style={styles.primaryBtn}>
            Ir al Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>404</h1>
        <p style={styles.subtitle}>Esa ruta no existe.</p>
        <div style={styles.actions}>
          <Link to="/login" style={styles.primaryBtn}>
            Ir al Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/menu" element={<MenuPrincipal />} />
      <Route path="/compras" element={<Compras />} />
      <Route path="/ordenes-compra" element={<OrdenCompra />} />
      <Route path="/home" element={<Home />} />
      <Route path="/app" element={<AppShell />} />
      <Route path="/about" element={<About />} />
      <Route path="/inicio" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    padding: "48px 20px",
    background: "#0f1216",
    color: "#F8F9FA",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
  },
  shell: {
    minHeight: "100vh",
    background: "#0f1216",
    color: "#F8F9FA",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
  },
  header: {
    height: 64,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 18px",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(15,18,22,0.9)",
    backdropFilter: "blur(10px)",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontWeight: 800,
    letterSpacing: 0.2,
  },
  brandDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    background: "#FFB703",
    boxShadow: "0 0 0 4px rgba(255,183,3,0.18)",
  },
  brandText: {
    fontSize: 16,
  },
  nav: {
    display: "flex",
    gap: 14,
  },
  navLink: {
    color: "#F8F9FA",
    textDecoration: "none",
    fontWeight: 700,
    opacity: 0.9,
  },
  main: {
    padding: "28px 18px 48px 18px",
    display: "grid",
    placeItems: "center",
  },
  card: {
    width: "100%",
    maxWidth: 560,
    background: "#171b21",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 18,
    padding: 26,
    boxShadow: "0 18px 60px rgba(0,0,0,0.45)",
  },
  cardWide: {
    width: "100%",
    maxWidth: 920,
    background: "#171b21",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 18,
    padding: 26,
    boxShadow: "0 18px 60px rgba(0,0,0,0.45)",
  },
  title: {
    margin: 0,
    fontSize: 34,
    fontWeight: 900,
    letterSpacing: 0.2,
  },
  subtitle: {
    marginTop: 10,
    marginBottom: 18,
    fontSize: 15,
    lineHeight: 1.5,
    opacity: 0.92,
  },
  h2: {
    margin: 0,
    fontSize: 24,
    fontWeight: 900,
  },
  p: {
    marginTop: 10,
    marginBottom: 0,
    fontSize: 15,
    lineHeight: 1.55,
    opacity: 0.92,
  },
  actions: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
    marginTop: 14,
  },
  primaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 16px",
    borderRadius: 12,
    background: "#FFB703",
    color: "#121212",
    fontWeight: 900,
    textDecoration: "none",
    border: "1px solid rgba(0,0,0,0.15)",
  },
  secondaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 16px",
    borderRadius: 12,
    background: "transparent",
    color: "#F8F9FA",
    fontWeight: 800,
    textDecoration: "none",
    border: "1px solid rgba(255,255,255,0.14)",
  },
  footerNote: {
    marginTop: 18,
    fontSize: 13,
    opacity: 0.75,
  },
};
