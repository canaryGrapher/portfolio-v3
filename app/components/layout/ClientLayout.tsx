"use client";

import { Header } from "./Header";
import { Footer } from "./Footer";
import { LoadingScreen } from "../common";
import { Analytics } from "@vercel/analytics/react";
import ClarityAnalytics from "../common/ClarityAnalytics";
import { LoadingProvider } from "../../contexts/LoadingContext";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export const ClientLayout = ({ children }: ClientLayoutProps) => {
  return (
    <LoadingProvider>
      <LoadingScreen />
      <Header />
      {children}
      <Footer />
      <Analytics />
      <ClarityAnalytics />
    </LoadingProvider>
  );
};
