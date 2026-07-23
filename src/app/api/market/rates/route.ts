const getEconextApiBase = (): string =>
  (process.env.ECONEXT_API_URL ?? "http://localhost:3001").replace(/\/$/, "");

export async function GET() {
  const upstream = await fetch(`${getEconextApiBase()}/api/market/rates`, {
    method: "GET",
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  const body = await upstream.text();
  return new Response(body, {
    status: upstream.status,
    headers: {
      "content-type": upstream.headers.get("content-type") ?? "application/json",
      "Cache-Control": "no-store",
    },
  });
}
