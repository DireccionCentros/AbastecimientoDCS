export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();

    const id = String(body.id || "").trim();
    const nombre = String(body.nombre || "").trim();
    const categoria = String(body.categoria || "").trim();
    const frecuencia = String(body.frecuencia || "").trim();

    const consumidoresArr = Array.isArray(body.consumidores) ? body.consumidores : [];
    const consumidores = JSON.stringify(consumidoresArr);

    if (!id || !nombre || !categoria || !frecuencia) {
      return new Response(JSON.stringify({ ok: false, error: "Faltan campos" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    const stmt = env.DB.prepare(
      `INSERT INTO productos (id, nombre, categoria, frecuencia, consumidores)
       VALUES (?, ?, ?, ?, ?)`
    ).bind(id, nombre, categoria, frecuencia, consumidores);

    await stmt.run();

    return new Response(JSON.stringify({ ok: true, id }), {
      status: 201,
      headers: { "content-type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: String(e?.message || e) }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}
