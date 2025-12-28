import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function CargarProducto() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState("");
  const [productos, setProductos] = useState([]);
  const [openConsumidor, setOpenConsumidor] = useState(false);
  const consumidorRef = useRef(null);

  const [editId, setEditId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const CATEGORIAS = useMemo(
    () => [
      "Bolsas de arranque",
      "Librería",
      "Cartones - Fichas",
      "Descartables",
      "Farmacia",
      "Formularios",
      "Otros",
      "Papel higiénico",
      "Policlinico",
      "Resmas",
      "Toallas de papel",
    ],
    []
  );

  const FRECUENCIAS = useMemo(
    () => ["Mensual", "Trimestral", "Semestral", "Sin restricción"],
    []
  );

  const CONSUMIDORES = useMemo(
    () => ["Centro de Salud", "Policlinico", "DCS", "Farmacia", "Dirección de Centros"],
    []
  );

  const genId = () => {
    const t = Date.now().toString(36).toUpperCase();
    const r = Math.random().toString(36).slice(2, 6).toUpperCase();
    return `PRD-${t}-${r}`;
  };

  const [form, setForm] = useState({
    id: genId(),
    producto: "",
    categoria: "",
    frecuencia: "",
    consumidores: [],
  });

  const canSave =
    form.producto.trim().length > 0 &&
    form.categoria.trim().length > 0 &&
    form.frecuencia.trim().length > 0 &&
    form.consumidores.length > 0;

  useEffect(() => {
    const onDown = (e) => {
      if (openConsumidor && consumidorRef.current && !consumidorRef.current.contains(e.target)) {
        setOpenConsumidor(false);
      }
      if (confirmOpen) {
        const modal = document.getElementById("oc_modal_card");
        if (modal && !modal.contains(e.target)) setConfirmOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [openConsumidor, confirmOpen]);

  const toggleConsumidor = (v) => {
    setForm((prev) => {
      const exists = prev.consumidores.includes(v);
      const next = exists
        ? prev.consumidores.filter((x) => x !== v)
        : [...prev.consumidores, v];
      return { ...prev, consumidores: next };
    });
  };

  const resetForm = () => {
    setForm({
      id: genId(),
      producto: "",
      categoria: "",
      frecuencia: "",
      consumidores: [],
    });
    setEditId(null);
    setOpenConsumidor(false);
  };

  const saveProducto = () => {
    if (!canSave) return;

    const payload = {
      id: form.id,
      producto: form.producto.trim(),
      categoria: form.categoria,
      frecuencia: form.frecuencia,
      consumidores: [...form.consumidores],
    };

    if (editId) {
      setProductos((prev) => prev.map((p) => (p.id === editId ? payload : p)));
      resetForm();
      return;
    }

    setProductos((prev) => [payload, ...prev]);
    resetForm();
  };

  const onEdit = (p) => {
    setEditId(p.id);
    setForm({
      id: p.id,
      producto: p.producto,
      categoria: p.categoria,
      frecuencia: p.frecuencia,
      consumidores: Array.isArray(p.consumidores) ? p.consumidores : [],
    });
    setOpenConsumidor(false);
  };

  const askDelete = (p) => {
    setDeleteTarget(p);
    setConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    setProductos((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    if (editId === deleteTarget.id) resetForm();
    setConfirmOpen(false);
    setDeleteTarget(null);
  };

  const consumidoresLabel =
    form.consumidores.length === 0
      ? "Seleccionar consumidor(es)"
      : form.consumidores.length === 1
      ? form.consumidores[0]
      : `${form.consumidores.length} seleccionados`;

  const editLabel = editId ? "Guardar cambios" : "Agregar producto";
  const hintRight = editId ? "Editando producto existente" : "Cada item queda registrado con ID único";

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
          <div style={styles.headerTitle}>Órdenes de Compra</div>
          <div style={styles.headerSub}>Carga de productos y trazabilidad</div>
        </div>
      </div>

      <div style={styles.wrapper}>
        <div style={styles.content}>
          <div style={styles.card}>
            <div style={styles.cardHeaderRow}>
              <div style={styles.cardTitle}>Cargar producto</div>
              <div style={styles.cardHint}>{hintRight}</div>
            </div>

            <div style={styles.formGrid}>
              <div style={styles.field}>
                <div style={styles.label}>Producto</div>
                <input
                  style={styles.input}
                  value={form.producto}
                  onChange={(e) => setForm((p) => ({ ...p, producto: e.target.value }))}
                  placeholder="Nombre del producto"
                />
              </div>

              <div style={styles.field}>
                <div style={styles.label}>ID</div>
                <input style={styles.input} value={form.id} readOnly />
              </div>

              <div style={styles.field}>
                <div style={styles.label}>Categoría</div>
                <select
                  style={styles.select}
                  value={form.categoria}
                  onChange={(e) => setForm((p) => ({ ...p, categoria: e.target.value }))}
                >
                  <option value="" disabled>
                    Seleccionar categoría
                  </option>
                  {CATEGORIAS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div style={styles.field}>
                <div style={styles.label}>Frecuencia de consumo</div>
                <select
                  style={styles.select}
                  value={form.frecuencia}
                  onChange={(e) => setForm((p) => ({ ...p, frecuencia: e.target.value }))}
                >
                  <option value="" disabled>
                    Seleccionar frecuencia
                  </option>
                  {FRECUENCIAS.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ ...styles.field, gridColumn: "1 / -1" }}>
                <div style={styles.label}>Consumidor</div>

                <div ref={consumidorRef} style={styles.multiWrap}>
                  <button
                    type="button"
                    onMouseEnter={() => setHovered("consumidor")}
                    onMouseLeave={() => setHovered("")}
                    onClick={() => setOpenConsumidor((v) => !v)}
                    style={{
                      ...styles.multiBtn,
                      ...(hovered === "consumidor" ? styles.multiBtnHover : null),
                    }}
                  >
                    <div style={styles.multiLeft}>
                      <div style={styles.multiText}>{consumidoresLabel}</div>
                      {form.consumidores.length > 0 ? (
                        <div style={styles.chipsRow}>
                          {form.consumidores.slice(0, 4).map((v) => (
                            <div key={v} style={styles.chip}>
                              {v}
                            </div>
                          ))}
                          {form.consumidores.length > 4 ? (
                            <div style={styles.chipMore}>+{form.consumidores.length - 4}</div>
                          ) : null}
                        </div>
                      ) : null}
                    </div>

                    <div aria-hidden="true" style={styles.multiIconWrap}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        style={styles.multiIcon}
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>
                  </button>

                  {openConsumidor ? (
                    <div style={styles.dropdown}>
                      <div style={styles.dropdownTop}>
                        <div style={styles.dropdownTitle}>Seleccionar</div>
                        <div style={styles.dropdownHint}>Selección múltiple</div>
                      </div>

                      <div style={styles.dropdownList}>
                        {CONSUMIDORES.map((v) => {
                          const checked = form.consumidores.includes(v);
                          return (
                            <button
                              key={v}
                              type="button"
                              onClick={() => toggleConsumidor(v)}
                              style={{
                                ...styles.checkRow,
                                ...(checked ? styles.checkRowOn : null),
                              }}
                            >
                              <div style={{ ...styles.checkbox, ...(checked ? styles.checkboxOn : null) }}>
                                {checked ? (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                    style={styles.checkIcon}
                                  >
                                    <path d="M20 6 9 17l-5-5" />
                                  </svg>
                                ) : null}
                              </div>
                              <div style={styles.checkText}>{v}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div style={styles.formActions}>
              <button
                type="button"
                onClick={saveProducto}
                disabled={!canSave}
                style={{
                  ...styles.primaryBtn,
                  ...(canSave ? null : styles.primaryBtnDisabled),
                }}
              >
                {editLabel}
              </button>

              <button type="button" onClick={() => navigate(-1)} style={styles.secondaryBtn}>
                Volver
              </button>
            </div>
          </div>

          <div style={styles.tableCard}>
            <div style={styles.tableHeaderRow}>
              <div style={styles.tableTitle}>Productos cargados</div>
              <div style={styles.tableHint}>
                {productos.length === 0 ? "Todavía no cargaste productos" : `${productos.length} producto(s)`}
              </div>
            </div>

            <div style={styles.tableWrap}>
              <div style={styles.tableHead}>
                <div style={{ ...styles.th, ...styles.colProd }}>Producto</div>
                <div style={{ ...styles.th, ...styles.colCat }}>Categoría</div>
                <div style={{ ...styles.th, ...styles.colFreq }}>Frecuencia</div>
                <div style={{ ...styles.th, ...styles.colCons }}>Consumidor</div>
                <div style={{ ...styles.th, ...styles.colAct }}>Acciones</div>
              </div>

              {productos.length === 0 ? (
                <div style={styles.emptyRow}>Cargá un producto arriba y te aparece acá abajo, sin drama 😄</div>
              ) : (
                productos.map((p) => (
                  <div key={p.id} style={styles.tr}>
                    <div style={{ ...styles.td, ...styles.colProd }}>{p.producto}</div>
                    <div style={{ ...styles.td, ...styles.colCat }}>{p.categoria}</div>
                    <div style={{ ...styles.td, ...styles.colFreq }}>{p.frecuencia}</div>
                    <div style={{ ...styles.td, ...styles.colCons }}>{p.consumidores.join(", ")}</div>
                    <div style={{ ...styles.td, ...styles.colAct }}>
                      <div style={styles.actionsRow}>
                        <button
                          type="button"
                          onClick={() => onEdit(p)}
                          onMouseEnter={() => setHovered(`edit_${p.id}`)}
                          onMouseLeave={() => setHovered("")}
                          style={{
                            ...styles.iconBtn,
                            ...styles.iconBtnEdit,
                            ...(hovered === `edit_${p.id}` ? styles.iconBtnHover : null),
                          }}
                          aria-label="Editar"
                          title="Editar"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            style={styles.iconBtnIcoDark}
                          >
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
                          </svg>
                        </button>

                        <button
                          type="button"
                          onClick={() => askDelete(p)}
                          onMouseEnter={() => setHovered(`del_${p.id}`)}
                          onMouseLeave={() => setHovered("")}
                          style={{
                            ...styles.iconBtn,
                            ...styles.iconBtnDelete,
                            ...(hovered === `del_${p.id}` ? styles.iconBtnHover : null),
                          }}
                          aria-label="Eliminar"
                          title="Eliminar"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            style={styles.iconBtnIcoDark}
                          >
                            <path d="M3 6h18" />
                            <path d="M8 6V4h8v2" />
                            <path d="M19 6l-1 14H6L5 6" />
                            <path d="M10 11v6" />
                            <path d="M14 11v6" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div style={styles.note}>DCS v0.1 - 2026</div>
        </div>
      </div>

      {confirmOpen ? (
        <div style={styles.modalOverlay} role="dialog" aria-modal="true">
          <div id="oc_modal_card" style={styles.modalCard}>
            <div style={styles.modalTop}>
              <div style={styles.modalTitle}>Confirmar eliminación</div>
              <div style={styles.modalHint}>Esto no se puede deshacer</div>
            </div>

            <div style={styles.modalBody}>
              {deleteTarget ? (
                <div style={styles.modalText}>
                  ¿Querés eliminar <span style={styles.modalStrong}>{deleteTarget.producto}</span>?
                </div>
              ) : (
                <div style={styles.modalText}>¿Querés eliminar este producto?</div>
              )}
            </div>

            <div style={styles.modalActions}>
              <button
                type="button"
                onClick={() => {
                  setConfirmOpen(false);
                  setDeleteTarget(null);
                }}
                style={styles.secondaryBtn}
              >
                Cancelar
              </button>

              <button type="button" onClick={confirmDelete} style={styles.dangerBtn}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default CargarProducto;
export { CargarProducto };

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
    fontWeight: 850,
    letterSpacing: 0.2,
    color: "#F7F4F2",
    whiteSpace: "nowrap",
  },
  headerTitle: {
    fontFamily:
      '"Plus Jakarta Sans", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
    fontSize: 18,
    fontWeight: 900,
    letterSpacing: 0.2,
    color: "#F7F4F2",
  },
  headerSub: {
    fontFamily:
      '"Plus Jakarta Sans", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
    fontSize: 12,
    color: "rgba(187,172,157,0.76)",
    fontWeight: 800,
  },
  wrapper: {
    position: "relative",
    zIndex: 2,
    height: "100%",
    display: "grid",
    placeItems: "center",
    padding: "86px 18px 18px",
    boxSizing: "border-box",
    overflow: "auto",
  },
  content: {
    width: "100%",
    maxWidth: 1180,
    display: "flex",
    flexDirection: "column",
    gap: 16,
    boxSizing: "border-box",
    paddingBottom: 18,
  },
  card: {
    borderRadius: 16,
    border: "1px solid rgba(247,244,242,0.08)",
    background:
      "linear-gradient(180deg, rgba(247,244,242,0.05), rgba(247,244,242,0.02))",
    boxShadow:
      "-10px -10px 22px rgba(247,244,242,0.07), 14px 14px 26px rgba(0,0,0,0.55), inset 0 1px 0 rgba(247,244,242,0.06)",
    padding: 16,
    boxSizing: "border-box",
  },
  cardHeaderRow: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 900,
    letterSpacing: 0.2,
  },
  cardHint: {
    fontSize: 12,
    fontWeight: 750,
    color: "rgba(187,172,157,0.76)",
    textAlign: "right",
    whiteSpace: "nowrap",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 12,
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    minWidth: 0,
  },
  label: {
    fontSize: 12,
    fontWeight: 750,
    letterSpacing: 0.18,
    color: "rgba(247,244,242,0.92)",
  },
  input: {
    height: 44,
    borderRadius: 12,
    border: "1px solid rgba(247,244,242,0.06)",
    outline: "none",
    background:
      "radial-gradient(circle at 35% 30%, rgba(247,244,242,0.05), rgba(247,244,242,0.02)), rgba(43,40,39,0.65)",
    color: "#F7F4F2",
    padding: "0 12px",
    fontSize: 14,
    fontWeight: 600,
    boxShadow:
      "inset 10px 10px 18px rgba(0,0,0,0.58), inset -10px -10px 18px rgba(247,244,242,0.07)",
    boxSizing: "border-box",
  },
  select: {
    height: 44,
    borderRadius: 12,
    border: "1px solid rgba(247,244,242,0.06)",
    outline: "none",
    background:
      "radial-gradient(circle at 35% 30%, rgba(247,244,242,0.05), rgba(247,244,242,0.02)), rgba(43,40,39,0.65)",
    color: "#F7F4F2",
    padding: "0 12px",
    fontSize: 14,
    fontWeight: 600,
    boxShadow:
      "inset 10px 10px 18px rgba(0,0,0,0.58), inset -10px -10px 18px rgba(247,244,242,0.07)",
    boxSizing: "border-box",
    appearance: "none",
  },
  multiWrap: {
    position: "relative",
  },
  multiBtn: {
    width: "100%",
    minHeight: 46,
    borderRadius: 12,
    border: "1px solid rgba(247,244,242,0.08)",
    background:
      "radial-gradient(circle at 35% 30%, rgba(247,244,242,0.06), rgba(247,244,242,0.02)), rgba(43,40,39,0.65)",
    boxShadow:
      "inset 10px 10px 18px rgba(0,0,0,0.58), inset -10px -10px 18px rgba(247,244,242,0.07)",
    color: "#F7F4F2",
    padding: "10px 10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    cursor: "pointer",
    textAlign: "left",
  },
  multiBtnHover: {
    filter: "brightness(1.03)",
  },
  multiLeft: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    minWidth: 0,
    flex: 1,
  },
  multiText: {
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: 0.12,
    color: "rgba(247,244,242,0.96)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  chipsRow: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 6,
  },
  chip: {
    fontSize: 12,
    fontWeight: 800,
    color: "#2B2827",
    background: "linear-gradient(180deg, rgba(187,172,157,1), rgba(163,148,134,1))",
    borderRadius: 999,
    padding: "5px 10px",
    boxShadow:
      "-6px -6px 14px rgba(247,244,242,0.06), 10px 10px 18px rgba(0,0,0,0.50), inset 0 1px 0 rgba(247,244,242,0.20)",
  },
  chipMore: {
    fontSize: 12,
    fontWeight: 750,
    color: "rgba(247,244,242,0.92)",
    background: "rgba(247,244,242,0.08)",
    border: "1px solid rgba(247,244,242,0.10)",
    borderRadius: 999,
    padding: "5px 10px",
  },
  multiIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 999,
    background:
      "radial-gradient(circle at 35% 30%, rgba(247,244,242,0.06), rgba(247,244,242,0.02)), rgba(43,40,39,0.65)",
    boxShadow:
      "inset 9px 9px 16px rgba(0,0,0,0.58), inset -9px -9px 16px rgba(247,244,242,0.07)",
    display: "grid",
    placeItems: "center",
    flexShrink: 0,
  },
  multiIcon: {
    color: "#BBAC9D",
    opacity: 0.98,
    filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.20))",
  },
  dropdown: {
    position: "absolute",
    top: "calc(100% + 10px)",
    left: 0,
    right: 0,
    borderRadius: 14,
    border: "1px solid rgba(247,244,242,0.10)",
    background:
      "linear-gradient(180deg, rgba(43,40,39,0.92), rgba(43,40,39,0.86))",
    boxShadow:
      "-12px -12px 26px rgba(247,244,242,0.08), 18px 18px 30px rgba(0,0,0,0.62), inset 0 1px 0 rgba(247,244,242,0.08)",
    padding: 12,
    zIndex: 5,
    backdropFilter: "blur(8px)",
  },
  dropdownTop: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 10,
  },
  dropdownTitle: {
    fontSize: 14,
    fontWeight: 850,
    letterSpacing: 0.2,
  },
  dropdownHint: {
    fontSize: 12,
    fontWeight: 750,
    color: "rgba(187,172,157,0.76)",
  },
  dropdownList: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 10,
  },
  checkRow: {
    borderRadius: 12,
    border: "1px solid rgba(247,244,242,0.08)",
    background:
      "radial-gradient(circle at 35% 30%, rgba(247,244,242,0.05), rgba(247,244,242,0.02)), rgba(43,40,39,0.55)",
    boxShadow:
      "inset 9px 9px 16px rgba(0,0,0,0.58), inset -9px -9px 16px rgba(247,244,242,0.07)",
    padding: "10px 10px",
    display: "flex",
    alignItems: "center",
    gap: 10,
    cursor: "pointer",
    color: "#F7F4F2",
    textAlign: "left",
  },
  checkRowOn: {
    border: "1px solid rgba(187,172,157,0.32)",
    filter: "brightness(1.03)",
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 7,
    border: "1px solid rgba(247,244,242,0.10)",
    background: "rgba(0,0,0,0.10)",
    boxShadow:
      "inset 7px 7px 14px rgba(0,0,0,0.55), inset -7px -7px 14px rgba(247,244,242,0.06)",
    display: "grid",
    placeItems: "center",
    flexShrink: 0,
  },
  checkboxOn: {
    background: "linear-gradient(180deg, rgba(187,172,157,1), rgba(163,148,134,1))",
    border: "1px solid rgba(247,244,242,0.10)",
    boxShadow:
      "-8px -8px 16px rgba(247,244,242,0.06), 10px 10px 18px rgba(0,0,0,0.52), inset 0 1px 0 rgba(247,244,242,0.22)",
  },
  checkIcon: {
    color: "#2B2827",
  },
  checkText: {
    fontSize: 13,
    fontWeight: 750,
    letterSpacing: 0.1,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  formActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 14,
    flexWrap: "wrap",
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
    fontWeight: 850,
    cursor: "pointer",
    boxShadow:
      "-10px -10px 22px rgba(247,244,242,0.08), 14px 14px 26px rgba(0,0,0,0.62), inset 0 1px 0 rgba(247,244,242,0.10), 0 0 0 1px rgba(0,0,0,0.06)",
  },
  primaryBtnDisabled: {
    opacity: 0.55,
    cursor: "not-allowed",
    filter: "grayscale(0.2)",
  },
  secondaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 16px",
    borderRadius: 12,
    border: "1px solid rgba(247,244,242,0.10)",
    background:
      "linear-gradient(180deg, rgba(247,244,242,0.07), rgba(247,244,242,0.03))",
    color: "#F7F4F2",
    fontFamily:
      '"Plus Jakarta Sans", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
    fontWeight: 850,
    cursor: "pointer",
    boxShadow:
      "-10px -10px 22px rgba(247,244,242,0.06), 14px 14px 26px rgba(0,0,0,0.58), inset 0 1px 0 rgba(247,244,242,0.08)",
  },
  dangerBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 16px",
    borderRadius: 12,
    border: "1px solid rgba(247,244,242,0.08)",
    background:
      "linear-gradient(180deg, rgba(152,72,72,1), rgba(120,56,56,1))",
    color: "#F7F4F2",
    fontFamily:
      '"Plus Jakarta Sans", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
    fontWeight: 850,
    cursor: "pointer",
    boxShadow:
      "-10px -10px 22px rgba(247,244,242,0.06), 14px 14px 26px rgba(0,0,0,0.62), inset 0 1px 0 rgba(247,244,242,0.10), 0 0 0 1px rgba(0,0,0,0.06)",
  },
  tableCard: {
    borderRadius: 16,
    border: "1px solid rgba(247,244,242,0.08)",
    background:
      "linear-gradient(180deg, rgba(247,244,242,0.05), rgba(247,244,242,0.02))",
    boxShadow:
      "-10px -10px 22px rgba(247,244,242,0.07), 14px 14px 26px rgba(0,0,0,0.55), inset 0 1px 0 rgba(247,244,242,0.06)",
    padding: 16,
    boxSizing: "border-box",
  },
  tableHeaderRow: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 12,
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: 900,
    letterSpacing: 0.2,
  },
  tableHint: {
    fontSize: 12,
    fontWeight: 750,
    color: "rgba(187,172,157,0.76)",
    textAlign: "right",
    whiteSpace: "nowrap",
  },
  tableWrap: {
    borderRadius: 14,
    border: "1px solid rgba(247,244,242,0.08)",
    background:
      "radial-gradient(circle at 35% 30%, rgba(247,244,242,0.04), rgba(247,244,242,0.015)), rgba(43,40,39,0.55)",
    boxShadow:
      "inset 10px 10px 18px rgba(0,0,0,0.58), inset -10px -10px 18px rgba(247,244,242,0.07)",
    overflow: "hidden",
  },
  tableHead: {
    display: "grid",
    gridTemplateColumns: "1.3fr 1fr 0.8fr 1.2fr 140px",
    gap: 0,
    padding: "12px 12px",
    background:
      "linear-gradient(180deg, rgba(247,244,242,0.06), rgba(247,244,242,0.02))",
    borderBottom: "1px solid rgba(247,244,242,0.08)",
  },
  th: {
    fontSize: 12,
    fontWeight: 750,
    letterSpacing: 0.22,
    color: "rgba(247,244,242,0.92)",
    textTransform: "uppercase",
    paddingRight: 10,
  },
  tr: {
    display: "grid",
    gridTemplateColumns: "1.3fr 1fr 0.8fr 1.2fr 140px",
    gap: 0,
    padding: "12px 12px",
    borderBottom: "1px solid rgba(247,244,242,0.06)",
    alignItems: "center",
  },
  td: {
    fontSize: 13,
    fontWeight: 650,
    letterSpacing: 0.12,
    color: "rgba(247,244,242,0.94)",
    paddingRight: 10,
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  emptyRow: {
    padding: "14px 12px",
    fontSize: 13,
    fontWeight: 700,
    color: "rgba(187,172,157,0.78)",
  },
  actionsRow: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 10,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 999,
    border: "1px solid rgba(247,244,242,0.14)",
    boxShadow:
      "-8px -8px 18px rgba(247,244,242,0.06), 12px 12px 22px rgba(0,0,0,0.58), inset 0 1px 0 rgba(255,255,255,0.35)",
    display: "grid",
    placeItems: "center",
    cursor: "pointer",
  },
  iconBtnEdit: {
    background: "linear-gradient(180deg, rgba(255,224,153,1), rgba(255,206,118,1))",
  },
  iconBtnDelete: {
    background: "linear-gradient(180deg, rgba(255,171,171,1), rgba(255,132,132,1))",
  },
  iconBtnHover: {
    transform: "translateY(-1px)",
    filter: "brightness(1.04)",
  },
  iconBtnIcoDark: {
    color: "#2B2827",
    opacity: 0.98,
    filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.18))",
  },
  colProd: {},
  colCat: {},
  colFreq: {},
  colCons: {},
  colAct: {},
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
    backdropFilter: "blur(10px)",
    display: "grid",
    placeItems: "center",
    zIndex: 50,
    padding: 16,
  },
  modalCard: {
    width: "100%",
    maxWidth: 520,
    borderRadius: 16,
    border: "1px solid rgba(247,244,242,0.10)",
    background:
      "linear-gradient(180deg, rgba(43,40,39,0.92), rgba(43,40,39,0.86))",
    boxShadow:
      "-14px -14px 30px rgba(247,244,242,0.08), 22px 22px 36px rgba(0,0,0,0.66), inset 0 1px 0 rgba(247,244,242,0.08)",
    padding: 16,
  },
  modalTop: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 900,
    letterSpacing: 0.2,
  },
  modalHint: {
    fontSize: 12,
    fontWeight: 750,
    color: "rgba(187,172,157,0.76)",
    whiteSpace: "nowrap",
  },
  modalBody: {
    borderRadius: 14,
    border: "1px solid rgba(247,244,242,0.08)",
    background:
      "radial-gradient(circle at 35% 30%, rgba(247,244,242,0.04), rgba(247,244,242,0.015)), rgba(43,40,39,0.55)",
    boxShadow:
      "inset 10px 10px 18px rgba(0,0,0,0.58), inset -10px -10px 18px rgba(247,244,242,0.07)",
    padding: 14,
  },
  modalText: {
    fontSize: 14,
    fontWeight: 700,
    color: "rgba(247,244,242,0.94)",
    letterSpacing: 0.12,
  },
  modalStrong: {
    fontWeight: 900,
    color: "#F7F4F2",
  },
  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 14,
    flexWrap: "wrap",
  },
  note: {
    position: "relative",
    zIndex: 1,
    marginTop: 6,
    fontFamily:
      '"Plus Jakarta Sans", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
    fontSize: 12,
    color: "rgba(187,172,157,0.70)",
    fontWeight: 800,
    textAlign: "center",
  },
};
