import { WORLD_SERVER_HOST, WORLD_SERVER_URL } from "@/lib/site-links";

export const World1 = () => {
  return (
    <figure className="bank-card min-w-0 overflow-hidden">
      <figcaption className="flex items-center justify-between gap-3 border-b border-[color:var(--line)] px-4 py-3 sm:px-5">
        <span className="text-sm font-semibold tracking-tight text-[color:var(--ink)]">
          World 1
        </span>
        <span className="truncate text-xs font-medium text-[color:var(--ink-muted)]">
          {WORLD_SERVER_HOST}
        </span>
      </figcaption>
      <div className="aspect-[4/3] bg-[color:var(--mint)]">
        <iframe
          src={WORLD_SERVER_URL}
          title="Agent Play World 1"
          className="h-full w-full border-0"
          loading="lazy"
          allow="microphone; autoplay; fullscreen; speaker-selection"
        />
      </div>
    </figure>
  );
};
