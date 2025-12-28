import React from "react";

function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f1318",
        color: "#F8F9FA",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
        padding: 24,
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 720 }}>
        <h1 style={{ margin: 0, fontSize: 42, fontWeight: 800, letterSpacing: 0.2 }}>
          Abastecimiento 2026
        </h1>
        <p style={{ marginTop: 12, opacity: 0.9, fontSize: 18, lineHeight: 1.5 }}>
          Proyecto nuevo, limpio, y con base sólida. Si ves esto, ya está andando el router y la app.
        </p>
      </div>
    </div>
  );
}

export default Home;
