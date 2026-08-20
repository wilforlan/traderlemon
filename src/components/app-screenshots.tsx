import clsx from "clsx";

import { storeListing } from "@/lib/store-listing";

type AppScreenshotsProps = {
  readonly variant?: "hero" | "gallery";
};

export const AppScreenshots = ({
  variant = "gallery",
}: AppScreenshotsProps) => {
  const screenshots = storeListing.marketing.screenshots;

  if (variant === "hero") {
    return (
      <div className="flex items-end justify-center gap-3 sm:gap-4">
        {screenshots.map((screenshot, index) => (
          <figure
            key={screenshot.src}
            className={clsx(
              "w-[22%] min-w-[5.5rem] max-w-[11rem]",
              index % 2 === 1 && "mb-5",
            )}
          >
            <PhoneBezel src={screenshot.src} alt={screenshot.alt} />
            <figcaption className="mt-2 text-center text-xs font-semibold text-[color:var(--ink-muted)]">
              {screenshot.label}
            </figcaption>
          </figure>
        ))}
      </div>
    );
  }

  return (
    <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-4 sm:overflow-visible sm:px-0">
      {screenshots.map((screenshot) => (
        <figure key={screenshot.src} className="w-[11.5rem] shrink-0 sm:w-auto">
          <PhoneBezel src={screenshot.src} alt={screenshot.alt} />
          <figcaption className="mt-3 text-sm font-semibold text-[color:var(--ink)]">
            {screenshot.label}
          </figcaption>
        </figure>
      ))}
    </div>
  );
};

const PhoneBezel = ({
  src,
  alt,
}: {
  readonly src: string;
  readonly alt: string;
}) => {
  return (
    <div className="phone-bezel">
      <img src={src} alt={alt} width={860} height={1860} decoding="async" />
    </div>
  );
};
