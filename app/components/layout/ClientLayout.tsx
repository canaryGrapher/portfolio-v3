"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { LoadingScreen } from "../common";
import { Analytics } from "@vercel/analytics/react";
import ClarityAnalytics from "../common/ClarityAnalytics";
import { LoadingProvider } from "../../contexts/LoadingContext";

interface ClientLayoutProps {
  children: React.ReactNode;
}

// Routes that render their own full-screen chrome and should not get the site
// header and footer.
const BARE_ROUTES = ["/page/thoughts/write"];

export const ClientLayout = ({ children }: ClientLayoutProps) => {
  const pathname = usePathname();
  const bare = BARE_ROUTES.some((route) => pathname?.startsWith(route));

  return (
    <LoadingProvider>
      <LoadingScreen />
      {!bare && <Header />}
      {children}
      {!bare && <Footer />}
      <Analytics />
      <ClarityAnalytics />
    </LoadingProvider>
  );
};
