export type ParsedCredentialsFields = {
  readonly serverUrl: string;
  readonly nodeId: string;
  readonly passw: string;
  readonly agentNodeCount: number;
};

export type ParseCredentialsUploadResult =
  | {
      readonly ok: true;
      readonly rawJson: string;
      readonly fields: ParsedCredentialsFields;
    }
  | {
      readonly ok: false;
      readonly error: string;
    };

export const parseCredentialsUpload = (
  raw: string,
): ParseCredentialsUploadResult => {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw) as unknown;
  } catch {
    return { ok: false, error: "Could not parse credentials.json." };
  }
  if (typeof parsed !== "object" || parsed === null) {
    return { ok: false, error: "Invalid credentials.json." };
  }
  const record = parsed as {
    serverUrl?: unknown;
    nodeId?: unknown;
    passw?: unknown;
    agentNodes?: unknown;
  };
  if (
    typeof record.serverUrl !== "string" ||
    typeof record.nodeId !== "string" ||
    typeof record.passw !== "string"
  ) {
    return {
      ok: false,
      error: "Expected serverUrl, nodeId, and passw in credentials.json.",
    };
  }
  if (record.serverUrl.trim().length === 0 || record.nodeId.trim().length === 0) {
    return { ok: false, error: "serverUrl and nodeId must not be empty." };
  }
  if (record.passw.trim().length === 0) {
    return { ok: false, error: "passw must not be empty." };
  }
  const agentNodeCount = Array.isArray(record.agentNodes)
    ? record.agentNodes.length
    : 0;
  return {
    ok: true,
    rawJson: raw,
    fields: {
      serverUrl: record.serverUrl.replace(/\/$/, ""),
      nodeId: record.nodeId.trim(),
      passw: record.passw,
      agentNodeCount,
    },
  };
};
