import type { APIRoute } from "astro";

const ranges = {
  "1D": { ms: 24 * 60 * 60 * 1000, interval: "h1" },
  "7D": { ms: 7 * 24 * 60 * 60 * 1000, interval: "h1" },
  "1M": { ms: 30 * 24 * 60 * 60 * 1000, interval: "d1" },
  "1Y": { ms: 365 * 24 * 60 * 60 * 1000, interval: "d1" },
  ALL: { ms: null as number | null, interval: "d1" },
} as const;

function getEnv(): { baseApi: string; apiKey: string } {
  const baseApiRaw =
    import.meta.env.COINCAP_BASE_API ?? import.meta.env.PUBLIC_BASE_API ?? "";
  const apiKey =
    import.meta.env.COINCAP_API_KEY ?? import.meta.env.PUBLIC_KEY_API ?? "";

  const baseApi = baseApiRaw.replace(/\/$/, "");
  return { baseApi, apiKey };
}

export const GET: APIRoute = async ({ params, request }) => {
  const coinId = params.id;
  if (!coinId) {
    return new Response(JSON.stringify({ error: "Missing coin id." }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const url = new URL(request.url);
  const rangeKey = (url.searchParams.get("range") ?? "7D").toUpperCase();
  const range =
    rangeKey in ranges ? ranges[rangeKey as keyof typeof ranges] : ranges["7D"];

  const { baseApi, apiKey } = getEnv();
  if (!baseApi || !apiKey) {
    return new Response(
      JSON.stringify({ error: "Server is missing CoinCap env vars." }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }

  const end = Date.now();
  const start = range.ms == null ? 0 : end - range.ms;

  const fetchHistory = async (startMs: number) => {
    const upstream = new URL(
      `${baseApi}/assets/${encodeURIComponent(coinId)}/history`
    );
    upstream.searchParams.set("interval", range.interval);
    upstream.searchParams.set("start", String(startMs));
    upstream.searchParams.set("end", String(end));
    upstream.searchParams.set("apiKey", apiKey);

    const res = await fetch(upstream, {
      headers: { accept: "application/json" },
    });

    if (!res.ok) {
      return { ok: false as const, status: res.status, body: await res.text() };
    }

    return { ok: true as const, json: await res.json() };
  };

  let upstream;
  try {
    upstream = await fetchHistory(start);
    if (!upstream.ok && rangeKey === "ALL") {
      const fiveYears = 5 * 365 * 24 * 60 * 60 * 1000;
      upstream = await fetchHistory(end - fiveYears);
    }
  } catch {
    return new Response(JSON.stringify({ error: "Upstream fetch failed." }), {
      status: 502,
      headers: { "content-type": "application/json" },
    });
  }

  if (!upstream.ok) {
    return new Response(
      JSON.stringify({
        error: "Upstream error.",
        status: upstream.status,
        details: upstream.body?.slice?.(0, 300) ?? "",
      }),
      { status: 502, headers: { "content-type": "application/json" } }
    );
  }

  return new Response(JSON.stringify(upstream.json), {
    status: 200,
    headers: {
      "content-type": "application/json",
      "cache-control": "public, max-age=60",
    },
  });
};

