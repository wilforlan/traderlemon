import { siteSeo } from "@/lib/site-seo";

type SiteLogoProps = {
  readonly size?: number;
};

export const SiteLogo = ({ size = 32 }: SiteLogoProps) => {
  return (
    <img
      src={siteSeo.logoPath}
      alt="v0peer"
      width={size}
      height={size}
      className="shrink-0 rounded-[22%]"
      decoding="async"
    />
  );
};
