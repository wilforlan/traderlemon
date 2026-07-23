import { LandingPage } from "@/components/landing-page";
import { SiteHeader } from "@/components/site-header";
import { WebsiteJsonLd } from "@/components/website-json-ld";

export default function Home() {
  return (
    <main className="min-h-dvh bg-[color:var(--bg)]">
      <WebsiteJsonLd />
      <SiteHeader />
      <LandingPage />
    </main>
  );
}
