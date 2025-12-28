import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Compras() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState("");

  return (
    <div style={styles.page}>
      <div aria-hidden="true" style={styles.bgGlowA} />
      <div aria-hidden="true" style={styles.bgGlowB} />
      <div aria-hidden="true" style={styles.gridBg} />
      <div aria-hidden="true" style={styles.noise} />

      <div style={styles.topBar}>
        <div aria-hidden="true" style={styles.brandLogoCard}>
          <svg
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            style={styles.brandLogo}
          >
            <defs>
              <linearGradient id="icoG" x1="0" y1="0" x2="0" y2="24">
                <stop offset="0" stopColor="#BBAC9D" />
                <stop offset="1" stopColor="#BBAC9D" />
              </linearGradient>
            </defs>

            <path
              d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"
              stroke="url(#icoG)"
              strokeWidth="1.55"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <path
              d="M3.3 7L12 12L20.7 7"
              stroke="url(#icoG)"
              strokeWidth="1.55"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <path
              d="M12 22V12"
              stroke="url(#icoG)"
              strokeWidth="1.55"
              strokeLinecap="round"
            />
            <path
              d="M7.8 4.5L16.2 9.3"
              stroke="url(#icoG)"
              strokeWidth="1.55"
              strokeLinecap="round"
              opacity="0.85"
            />
          </svg>
        </div>

        <div style={styles.brandStack}>
          <div style={styles.brandTitle}>Abastecimiento Direccion de Centros de Salud</div>
          <div style={styles.headerTitle}>Compras</div>
          <div style={styles.headerSub}>Gestión de órdenes y productos</div>
        </div>
      </div>

      <div style={styles.wrapper}>
        <div style={styles.content}>
          <div style={styles.grid}>
            <Link
              to="/ordenes-compra"
              onMouseEnter={() => setHovered("ordenes")}
              onMouseLeave={() => setHovered("")}
              style={{
                ...styles.tileBtn,
                ...(hovered === "ordenes" ? styles.tileBtnHover : null),
              }}
            >
              <div style={styles.tileLeft}>
                <div style={styles.tileTitle}>Ordenes de Compra</div>
              </div>
              <div aria-hidden="true" style={styles.tileIconWrap}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  style={styles.tileIcon}
                >
                  <path d="M9 4h6" />
                  <path d="M10 4V3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1" />
                  <path d="M9 8h6" />
                  <path d="M9 12h6" />
                  <path d="M9 16h4" />
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                  <path d="m16.5 15.5 1 1 2-2" />
                </svg>
              </div>
            </Link>

            <Link
              to="/total-ordenes"
              onMouseEnter={() => setHovered("total")}
              onMouseLeave={() => setHovered("")}
              style={{
                ...styles.tileBtn,
                ...(hovered === "total" ? styles.tileBtnHover : null),
              }}
            >
              <div style={styles.tileLeft}>
                <div style={styles.tileTitle}>Total Ordenes</div>
              </div>
              <div aria-hidden="true" style={styles.tileIconWrap}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  style={styles.tileIcon}
                >
                  <path d="M3 3v18h18" />
                  <path d="M7 14v5" />
                  <path d="M12 10v9" />
                  <path d="M17 6v13" />
                  <path d="M8.5 8h8" />
                  <path d="M10.5 6l-2 2 2 2" />
                  <path d="M14.5 6l2 2-2 2" />
                </svg>
              </div>
            </Link>

            <Link
              to="/cargar-productos"
              onMouseEnter={() => setHovered("cargar")}
              onMouseLeave={() => setHovered("")}
              style={{
                ...styles.tileBtn,
                ...(hovered === "cargar" ? styles.tileBtnHover : null),
              }}
            >
              <div style={styles.tileLeft}>
                <div style={styles.tileTitle}>Cargar Productos</div>
              </div>
              <div aria-hidden="true" style={styles.tileIconWrap}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  style={styles.tileIcon}
                >
                  <path d="M16 16h6" />
                  <path d="M19 13v6" />
                  <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l.35-.2" />
                  <path d="M3.3 7L12 12l8.7-5" />
                  <path d="M12 22V12" />
                </svg>
              </div>
            </Link>

            <Link
              to="/proximas-ordenes"
              onMouseEnter={() => setHovered("proximas")}
              onMouseLeave={() => setHovered("")}
              style={{
                ...styles.tileBtn,
                ...(hovered === "proximas" ? styles.tileBtnHover : null),
              }}
            >
              <div style={styles.tileLeft}>
                <div style={styles.tileTitle}>Proximas Ordenes</div>
              </div>
              <div aria-hidden="true" style={styles.tileIconWrap}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  style={styles.tileIcon}
                >
                  <path d="M8 2v4" />
                  <path d="M16 2v4" />
                  <path d="M3 10h18" />
                  <path d="M5 6h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" />
                  <circle cx="16.5" cy="16.5" r="3.5" />
                  <path d="M16.5 15v2l1.5 1" />
                </svg>
              </div>
            </Link>

            <Link
              to="/proveedores"
              onMouseEnter={() => setHovered("proveedores")}
              onMouseLeave={() => setHovered("")}
              style={{
                ...styles.tileBtn,
                ...(hovered === "proveedores" ? styles.tileBtnHover : null),
              }}
            >
              <div style={styles.tileLeft}>
                <div style={styles.tileTitle}>Proveedores</div>
              </div>
              <div aria-hidden="true" style={styles.tileIconWrap}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  style={styles.tileIcon}
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
            </Link>
          </div>

          <div style={styles.actions}>
            <button onClick={() => navigate(-1)} style={styles.primaryBtn}>
              Volver
            </button>
          </div>

          <div style={styles.note}>DCS v0.1 - 2026</div>
        </div>
      </div>
    </div>
  );
}

export default Compras;
export { Compras };

const styles = {
  page: {
    height: "100vh",
    overflow: "hidden",
    background:
      "radial-gradient(1200px circle at 18% 10%, rgba(143,114,88,0.12), rgba(43,40,39,0) 58%), radial-gradient(980px circle at 86% 92%, rgba(187,172,157,0.10), rgba(43,40,39,0) 62%), #2B2827",
    color: "#F7F4F2",
    fontFamily:
      '"Plus Jakarta Sans", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
    position: "relative",
  },
  bgGlowA: {
    position: "absolute",
    width: 760,
    height: 760,
    borderRadius: 999,
    left: -290,
    top: -320,
    background:
      "radial-gradient(circle at 28% 28%, rgba(143,114,88,0.24), rgba(143,114,88,0.0) 62%)",
    filter: "blur(10px)",
    pointerEvents: "none",
    opacity: 0.9,
  },
  bgGlowB: {
    position: "absolute",
    width: 860,
    height: 860,
    borderRadius: 999,
    right: -360,
    bottom: -380,
    background:
      "radial-gradient(circle at 60% 60%, rgba(187,172,157,0.20), rgba(187,172,157,0.0) 64%)",
    filter: "blur(12px)",
    pointerEvents: "none",
    opacity: 0.82,
  },
  gridBg: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(247,244,242,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(247,244,242,0.06) 1px, transparent 1px)",
    backgroundSize: "52px 52px",
    opacity: 0.08,
    maskImage:
      "radial-gradient(circle at 42% 22%, rgba(0,0,0,1), rgba(0,0,0,0) 70%)",
    pointerEvents: "none",
  },
  noise: {
    position: "absolute",
    inset: 0,
    opacity: 0.08,
    pointerEvents: "none",
    mixBlendMode: "overlay",
    backgroundImage:
      'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27300%27 height=%27300%27 viewBox=%270 0 300 300%27%3E%3Cfilter id=%27n%27 x=%270%27 y=%270%27 width=%27100%25%27 height=%27100%25%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27300%27 height=%27300%27 filter=%27url(%23n)%27 opacity=%270.45%27/%3E%3C/svg%3E")',
  },
  topBar: {
    position: "absolute",
    top: 18,
    left: 18,
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    zIndex: 3,
  },
  brandLogoCard: {
    width: 46,
    height: 46,
    borderRadius: 16,
    border: "none",
    background:
      "radial-gradient(circle at 35% 30%, rgba(247,244,242,0.06), rgba(247,244,242,0.02)), rgba(43,40,39,0.65)",
    boxShadow:
      "inset 9px 9px 18px rgba(0,0,0,0.58), inset -9px -9px 18px rgba(247,244,242,0.07)",
    display: "grid",
    placeItems: "center",
    position: "relative",
    overflow: "hidden",
    flexShrink: 0,
  },
  brandLogo: {
    opacity: 0.92,
    filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.20))",
  },
  brandStack: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    paddingTop: 1,
  },
  brandTitle: {
    fontFamily:
      '"Plus Jakarta Sans", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
    fontSize: 16,
    fontWeight: 900,
    letterSpacing: 0.2,
    color: "#F7F4F2",
    whiteSpace: "nowrap",
  },
  headerTitle: {
    fontFamily:
      '"Plus Jakarta Sans", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
    fontSize: 18,
    fontWeight: 950,
    letterSpacing: 0.2,
    color: "#F7F4F2",
  },
  headerSub: {
    fontFamily:
      '"Plus Jakarta Sans", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
    fontSize: 12,
    color: "rgba(187,172,157,0.76)",
    fontWeight: 900,
  },
  wrapper: {
    position: "relative",
    zIndex: 2,
    height: "100%",
    display: "grid",
    placeItems: "center",
    padding: "86px 18px 18px",
    boxSizing: "border-box",
  },
  content: {
    width: "100%",
    maxWidth: 1180,
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
  },
  grid: {
    position: "relative",
    zIndex: 1,
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 16,
    gridAutoRows: "auto",
    alignContent: "center",
    alignItems: "center",
    justifyItems: "center",
  },
  tileBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 13,
    height: 140,
    width: "calc(100% - 10px)",
    margin: "0 auto",
    borderRadius: 16,
    padding: "15px 8px",
    textDecoration: "none",
    color: "#F7F4F2",
    border: "1px solid rgba(247,244,242,0.08)",
    background:
      "linear-gradient(180deg, rgba(247,244,242,0.05), rgba(247,244,242,0.02))",
    boxShadow:
      "-10px -10px 22px rgba(247,244,242,0.07), 14px 14px 26px rgba(0,0,0,0.55), inset 0 1px 0 rgba(247,244,242,0.06)",
    cursor: "pointer",
    transform: "translateY(0px) scale(1)",
    transition: "transform 160ms ease, box-shadow 160ms ease, filter 160ms ease",
    willChange: "transform",
    boxSizing: "border-box",
    fontFamily:
      '"Plus Jakarta Sans", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
  },
  tileBtnHover: {
    transform: "translateY(-1px) scale(1.02)",
    boxShadow:
      "-12px -12px 26px rgba(247,244,242,0.08), 18px 18px 30px rgba(0,0,0,0.60), inset 0 1px 0 rgba(247,244,242,0.08)",
    filter: "brightness(1.03)",
  },
  tileLeft: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    minWidth: 0,
  },
  tileIconWrap: {
    width: 92,
    height: 92,
    borderRadius: 999,
    border: "none",
    background:
      "radial-gradient(circle at 35% 30%, rgba(247,244,242,0.06), rgba(247,244,242,0.02)), rgba(43,40,39,0.65)",
    boxShadow:
      "inset 10px 10px 20px rgba(0,0,0,0.58), inset -10px -10px 20px rgba(247,244,242,0.07)",
    display: "grid",
    placeItems: "center",
    position: "relative",
    overflow: "hidden",
    flexShrink: 0,
  },
  tileIcon: {
    color: "#BBAC9D",
    opacity: 0.98,
    filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.20))",
  },
  tileTitle: {
    fontFamily:
      '"Plus Jakarta Sans", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
    fontSize: 24,
    fontWeight: 700,
    letterSpacing: 0.1,
    lineHeight: 1.05,
  },
  actions: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 14,
  },
  primaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 16px",
    borderRadius: 12,
    border: "1px solid rgba(247,244,242,0.08)",
    background:
      "linear-gradient(180deg, rgba(143,114,88,1), rgba(118,92,73,1))",
    color: "#F7F4F2",
    fontFamily:
      '"Plus Jakarta Sans", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
    fontWeight: 950,
    cursor: "pointer",
    boxShadow:
      "-10px -10px 22px rgba(247,244,242,0.08), 14px 14px 26px rgba(0,0,0,0.62), inset 0 1px 0 rgba(247,244,242,0.10), 0 0 0 1px rgba(0,0,0,0.06)",
  },
  note: {
    position: "relative",
    zIndex: 1,
    marginTop: 12,
    fontFamily:
      '"Plus Jakarta Sans", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
    fontSize: 12,
    color: "rgba(187,172,157,0.70)",
    fontWeight: 900,
    textAlign: "center",
  },
};
