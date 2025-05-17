"use client";

import { FC, ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { CurrencyProvider } from "@/hooks/use-currency";

interface LayoutProps {
  children: ReactNode;
}

const Providers: FC<LayoutProps> = ({ children }) => (
  <CurrencyProvider>{children}</CurrencyProvider>
);

export default Providers;
