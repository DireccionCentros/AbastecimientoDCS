import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailFocus, setEmailFocus] = useState(false);
  const [passFocus, setPassFocus] = useState(false);
  const [submitHover, setSubmitHover] = useState(false);
  const [eyeHover, setEyeHover] = useState(false);

  const canSubmit = useMemo(() => {
    return email.trim().length > 0 && pass.trim().length > 0 && !loading;
  }, [email, pass, loading]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const em = email.trim();
    const pw = pass.trim();

    if (!em || !pw) {
      setError("Completá email y contraseña.");
      return;
    }

    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 450));
      navigate("/menu", { replace: true, state: { remember } });
    } catch (err) {
      setError("No se pudo iniciar sesión. Probá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div aria-hidden="true" style={styles.bgGlowA} />
      <div aria-hidden="true" style={styles.bgGlowB} />
      <div aria-hidden="true" style={styles.grid} />
      <div aria-hidden="true" style={styles.noise} />

      <div style={styles.wrapper}>
        <div style={styles.brandRow}>
          <div style={styles.brandMark}>
            <span style={styles.brandDot} />
          </div>
          <div>
            <div style={styles.brandTitle}>
              Abastecimiento Direccion de Centros de Salud
            </div>
            <div style={styles.brandSubtitle}>Ingreso al sistema</div>
          </div>
        </div>

        <div style={styles.card}>
          <div aria-hidden="true" style={styles.cardAccent} />
          <div aria-hidden="true" style={styles.cardHighlight} />

          <div aria-hidden="true" style={styles.heroLogoWrap}>
            <div aria-hidden="true" style={styles.heroLogoCard}>
              <div aria-hidden="true" style={styles.heroLogoGlow} />
              <svg
                width="112"
                height="112"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                style={styles.heroLogo}
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
          </div>

          <div style={styles.cardHeader}>
            <h1 style={styles.h1}>Bienvenido</h1>
          </div>

          {error ? (
            <div role="alert" style={styles.alert}>
              {error}
            </div>
          ) : (
            <div style={styles.alertSpacer} />
          )}

          <form onSubmit={onSubmit} style={styles.form}>
            <div style={styles.field}>
              <label htmlFor="email" style={styles.label}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                placeholder="nombre@dominio.gob.ar"
                style={{
                  ...styles.input,
                  ...(emailFocus ? styles.inputFocus : null),
                }}
              />
            </div>

            <div style={styles.field}>
              <label htmlFor="password" style={styles.label}>
                Contraseña
              </label>

              <div style={styles.passWrap}>
                <input
                  id="password"
                  name="password"
                  type={showPass ? "text" : "password"}
                  autoComplete="current-password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  onFocus={() => setPassFocus(true)}
                  onBlur={() => setPassFocus(false)}
                  placeholder="••••••••••"
                  style={{
                    ...styles.input,
                    paddingRight: 56,
                    ...(passFocus ? styles.inputFocus : null),
                  }}
                />

                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  onMouseEnter={() => setEyeHover(true)}
                  onMouseLeave={() => setEyeHover(false)}
                  style={{
                    ...styles.eyeBtn,
                    ...(eyeHover ? styles.eyeBtnHover : null),
                  }}
                  aria-label={showPass ? "Ocultar contraseña" : "Mostrar contraseña"}
                  title={showPass ? "Ocultar" : "Mostrar"}
                >
                  {showPass ? (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 3L21 21"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M10.58 10.58C10.21 10.95 10 11.45 10 12C10 13.1 10.9 14 12 14C12.55 14 13.05 13.79 13.42 13.42"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.88 5.38C10.56 5.14 11.27 5 12 5C17 5 21 12 21 12C20.33 13.18 19.45 14.5 18.35 15.65"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.61 6.61C4.79 8.07 3.38 10.02 3 12C3 12 7 19 12 19C13.41 19 14.74 18.72 15.97 18.22"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M1.5 12S5.5 5 12 5S22.5 12 22.5 12S18.5 19 12 19S1.5 12 1.5 12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              </div>

              <div style={styles.metaRow}>
                <label style={styles.checkRow}>
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    style={styles.checkbox}
                  />
                  <span style={styles.checkText}>Recordarme</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={!canSubmit}
              onMouseEnter={() => setSubmitHover(true)}
              onMouseLeave={() => setSubmitHover(false)}
              style={{
                ...styles.submit,
                ...(submitHover && canSubmit ? styles.submitHover : null),
                ...(canSubmit ? null : styles.submitDisabled),
              }}
            >
              {loading ? "Ingresando..." : "Ingresar"}
            </button>

            <div style={styles.footer}>
              <div style={styles.footerRight}>DCS v0.1 - 2026</div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    padding: "56px 18px",
    background:
      "radial-gradient(1200px circle at 18% 10%, rgba(143,114,88,0.12), rgba(43,40,39,0) 58%), radial-gradient(980px circle at 86% 92%, rgba(187,172,157,0.10), rgba(43,40,39,0) 62%), #2B2827",
    color: "#F7F4F2",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
    position: "relative",
    overflow: "hidden",
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
  grid: {
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
  wrapper: {
    width: "100%",
    maxWidth: 560,
    zIndex: 2,
    transform: "translateY(-14px)",
  },
  brandRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 14,
    paddingLeft: 4,
  },
  brandMark: {
    width: 46,
    height: 46,
    borderRadius: 999,
    background:
      "radial-gradient(circle at 35% 30%, rgba(247,244,242,0.08), rgba(247,244,242,0.02)), rgba(43,40,39,0.65)",
    border: "1px solid rgba(187,172,157,0.22)",
    display: "grid",
    placeItems: "center",
    boxShadow: "0 18px 70px rgba(0,0,0,0.52)",
    position: "relative",
    overflow: "hidden",
  },
  brandDot: {
    width: 12,
    height: 12,
    borderRadius: 999,
    background: "#8F7258",
    boxShadow:
      "0 0 0 7px rgba(187,172,157,0.10), 0 0 0 13px rgba(143,114,88,0.10)",
  },
  brandTitle: {
    fontSize: 16,
    fontWeight: 900,
    letterSpacing: 0.2,
    color: "#F7F4F2",
  },
  brandSubtitle: {
    marginTop: 2,
    fontSize: 12,
    color: "rgba(187,172,157,0.86)",
  },
  card: {
    position: "relative",
    overflow: "hidden",
    background:
      "linear-gradient(180deg, rgba(247,244,242,0.07), rgba(247,244,242,0.02))",
    border: "1px solid rgba(187,172,157,0.22)",
    borderRadius: 22,
    padding: 32,
    boxShadow: "0 30px 110px rgba(0,0,0,0.64)",
    backdropFilter: "blur(14px)",
  },
  cardAccent: {
    position: "absolute",
    left: 0,
    top: 16,
    bottom: 16,
    width: 2,
    background:
      "linear-gradient(180deg, rgba(143,114,88,0.0), rgba(143,114,88,0.75), rgba(143,114,88,0.0))",
    opacity: 0.7,
    pointerEvents: "none",
  },
  cardHighlight: {
    position: "absolute",
    inset: -2,
    background:
      "linear-gradient(135deg, rgba(247,244,242,0.08), rgba(247,244,242,0.00) 42%, rgba(187,172,157,0.05) 78%, rgba(187,172,157,0.00))",
    opacity: 0.55,
    pointerEvents: "none",
  },
  heroLogoWrap: {
    position: "absolute",
    right: 18,
    top: 18,
    width: 140,
    height: 140,
    pointerEvents: "none",
    display: "grid",
    placeItems: "center",
    opacity: 1,
  },
  heroLogoCard: {
    width: 124,
    height: 124,
    borderRadius: 24,
    border: "1px solid rgba(187,172,157,0.10)",
    background:
      "linear-gradient(180deg, rgba(247,244,242,0.05), rgba(247,244,242,0.02))",
    boxShadow:
      "inset -7px -7px 16px rgba(247,244,242,0.06), inset 7px 7px 16px rgba(0,0,0,0.42), 0 16px 44px rgba(0,0,0,0.16)",
    display: "grid",
    placeItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  heroLogoGlow: {
    position: "absolute",
    inset: -20,
    background:
      "radial-gradient(circle at 50% 45%, rgba(187,172,157,0.10), rgba(187,172,157,0.0) 66%)",
    filter: "blur(18px)",
    opacity: 0.26,
  },
  heroLogo: {
    position: "relative",
    transform: "none",
    filter: "drop-shadow(0 8px 18px rgba(0,0,0,0.14))",
    opacity: 0.92,
  },
  cardHeader: {
    marginBottom: 16,
    position: "relative",
    zIndex: 1,
    paddingRight: 160,
  },
  h1: {
    margin: 0,
    fontSize: 30,
    fontWeight: 950,
    letterSpacing: 0.2,
    color: "#F7F4F2",
  },
  alert: {
    background: "rgba(255, 75, 75, 0.12)",
    border: "1px solid rgba(255, 75, 75, 0.26)",
    color: "#F7F4F2",
    padding: "10px 12px",
    borderRadius: 14,
    fontSize: 13,
    lineHeight: 1.4,
    marginBottom: 16,
    position: "relative",
    zIndex: 1,
  },
  alertSpacer: {
    height: 44,
    marginBottom: 16,
    position: "relative",
    zIndex: 1,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    position: "relative",
    zIndex: 1,
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: 0.25,
    color: "rgba(187,172,157,0.92)",
  },
  input: {
    height: 48,
    borderRadius: 14,
    border: "none",
    background:
      "linear-gradient(180deg, rgba(247,244,242,0.05), rgba(247,244,242,0.02))",
    color: "#F7F4F2",
    padding: "0 14px",
    outline: "none",
    fontSize: 14,
    boxShadow:
      "inset 10px 10px 22px rgba(0,0,0,0.58), inset -10px -10px 22px rgba(247,244,242,0.07)",
  },
  inputFocus: {
    border: "none",
    boxShadow:
      "inset 10px 10px 22px rgba(0,0,0,0.58), inset -10px -10px 22px rgba(247,244,242,0.07), 0 0 0 4px rgba(143,114,88,0.14)",
  },
  passWrap: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  eyeBtn: {
    position: "absolute",
    right: 8,
    height: 34,
    width: 40,
    borderRadius: 12,
    border: "1px solid rgba(247,244,242,0.08)",
    background:
      "linear-gradient(180deg, rgba(143,114,88,1), rgba(118,92,73,1))",
    color: "#F7F4F2",
    cursor: "pointer",
    display: "grid",
    placeItems: "center",
    lineHeight: 1,
    boxShadow:
      "-10px -10px 22px rgba(247,244,242,0.08), 14px 14px 26px rgba(0,0,0,0.62), inset 0 1px 0 rgba(247,244,242,0.10), 0 0 0 1px rgba(0,0,0,0.06)",
    transition: "transform 160ms ease, box-shadow 160ms ease, filter 160ms ease",
    transform: "translateY(0px)",
  },
  eyeBtnHover: {
    transform: "translateY(-1px)",
    boxShadow:
      "-12px -12px 26px rgba(247,244,242,0.09), 18px 18px 30px rgba(0,0,0,0.68), inset 0 1px 0 rgba(247,244,242,0.12), 0 0 0 1px rgba(0,0,0,0.06)",
    filter: "brightness(1.03)",
  },
  metaRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    flexWrap: "wrap",
    marginTop: 6,
  },
  checkRow: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    cursor: "pointer",
    userSelect: "none",
  },
  checkbox: {
    width: 16,
    height: 16,
    accentColor: "#8F7258",
  },
  checkText: {
    fontSize: 13,
    color: "rgba(247,244,242,0.92)",
    fontWeight: 800,
  },
  submit: {
    height: 52,
    borderRadius: 16,
    border: "1px solid rgba(247,244,242,0.08)",
    background:
      "linear-gradient(180deg, rgba(143,114,88,1), rgba(118,92,73,1))",
    color: "#F7F4F2",
    fontWeight: 950,
    fontSize: 15,
    cursor: "pointer",
    boxShadow:
      "-14px -14px 30px rgba(247,244,242,0.08), 18px 18px 34px rgba(0,0,0,0.64), inset 0 1px 0 rgba(247,244,242,0.10), 0 0 0 1px rgba(0,0,0,0.06)",
    letterSpacing: 0.2,
    transform: "translateY(0px)",
    transition: "transform 160ms ease, box-shadow 160ms ease, filter 160ms ease",
    position: "relative",
    overflow: "hidden",
  },
  submitHover: {
    transform: "translateY(-1px)",
    boxShadow:
      "-18px -18px 36px rgba(247,244,242,0.09), 24px 24px 40px rgba(0,0,0,0.70), inset 0 1px 0 rgba(247,244,242,0.12), 0 0 0 1px rgba(0,0,0,0.06)",
    filter: "brightness(1.03)",
  },
  submitDisabled: {
    opacity: 0.58,
    cursor: "not-allowed",
    boxShadow:
      "-10px -10px 22px rgba(247,244,242,0.05), 14px 14px 26px rgba(0,0,0,0.52), inset 0 1px 0 rgba(247,244,242,0.08), 0 0 0 1px rgba(0,0,0,0.06)",
    filter: "none",
    transform: "translateY(0px)",
  },
  footer: {
    marginTop: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    flexWrap: "wrap",
  },
  footerRight: {
    fontSize: 12,
    color: "rgba(187,172,157,0.70)",
    fontWeight: 900,
    textAlign: "center",
  },
};
