type MapPoint = {
  readonly x: number;
  readonly y: number;
};

export type AgentPlayNetworkNode = {
  readonly id: string;
  readonly label: string;
  readonly x: number;
  readonly y: number;
};

export type AgentPlayNetworkHop = {
  readonly fromId: string;
  readonly toId: string;
  readonly d: string;
};

const NETWORK_NODES: readonly AgentPlayNetworkNode[] = [
  { id: "walk-in", label: "Walk in", x: 50, y: 86 },
  { id: "arcade", label: "Play Maple Ave", x: 78, y: 38 },
  { id: "shops", label: "Buy on the floor", x: 18, y: 42 },
  { id: "talk", label: "Talk and earn", x: 48, y: 52 },
  { id: "invite", label: "Bring a friend", x: 32, y: 18 },
  { id: "bundles", label: "Trade back", x: 68, y: 22 },
  { id: "owners", label: "Places keep the sale", x: 24, y: 68 },
  { id: "bank", label: "Take it to the bank", x: 82, y: 72 },
];

export const hopPath = (from: MapPoint, to: MapPoint): string => {
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const c1x = from.x + dx * 0.35;
  const c1y = from.y + dy * 0.12 - 8;
  const c2x = midX + dy * 0.08;
  const c2y = midY - dx * 0.06;
  return `M ${String(from.x)} ${String(from.y)} C ${String(c1x)} ${String(c1y)}, ${String(c2x)} ${String(c2y)}, ${String(to.x)} ${String(to.y)}`;
};

export const AGENT_PLAY_NETWORK_NODES: readonly AgentPlayNetworkNode[] =
  NETWORK_NODES;

export const AGENT_PLAY_NETWORK_HOPS: readonly AgentPlayNetworkHop[] =
  AGENT_PLAY_NETWORK_NODES.slice(0, -1).map((node, index) => {
    const next = AGENT_PLAY_NETWORK_NODES[index + 1];
    if (next === undefined) {
      throw new Error("v0peer network hop is missing a destination");
    }
    return {
      fromId: node.id,
      toId: next.id,
      d: hopPath(node, next),
    };
  });
