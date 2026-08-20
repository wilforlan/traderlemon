import { LandingPage } from "@/components/landing-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WebsiteJsonLd } from "@/components/website-json-ld";

export default function Home() {
  return (
    <main className="min-h-dvh">
      <WebsiteJsonLd />
      <SiteHeader />
      <LandingPage />
      <SiteFooter />
    </main>
  );
}
