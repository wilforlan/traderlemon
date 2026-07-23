import { NextRequest } from "next/server";

const getEconextApiBase = (): string =>
  (process.env.ECONEXT_API_URL ?? "http://localhost:3001").replace(/\/$/, "");

export async function POST(request: NextRequest) {
  const body = await request.text();
  const upstream = await fetch(`${getEconextApiBase()}/api/auth/connect`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      cookie: request.headers.get("cookie") ?? "",
    },
    body,
  });

  const responseBody = await upstream.text();
  const response = new Response(responseBody, {
    status: upstream.status,
    headers: {
      "content-type": upstream.headers.get("content-type") ?? "application/json",
    },
  });

  const setCookie = upstream.headers.getSetCookie?.() ?? [];
  for (const cookie of setCookie) {
    response.headers.append("Set-Cookie", cookie);
  }
  const single = upstream.headers.get("set-cookie");
  if (setCookie.length === 0 && single !== null) {
    response.headers.set("Set-Cookie", single);
  }

  return response;
}

export async function DELETE(request: NextRequest) {
  const upstream = await fetch(`${getEconextApiBase()}/api/auth/connect`, {
    method: "DELETE",
    headers: {
      cookie: request.headers.get("cookie") ?? "",
    },
  });
  const responseBody = await upstream.text();
  const response = new Response(responseBody, {
    status: upstream.status,
    headers: {
      "content-type": upstream.headers.get("content-type") ?? "application/json",
    },
  });
  const setCookie = upstream.headers.getSetCookie?.() ?? [];
  for (const cookie of setCookie) {
    response.headers.append("Set-Cookie", cookie);
  }
  return response;
}
