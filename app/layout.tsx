import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { cn } from "@/lib/utils";
import Head from "next/head";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "900", "1000"],
});

export const metadata: Metadata = {
  description: "Next JS Weather App",
  icons: {
    icon: "/assets/icons/favicon.png",
  },
};
declare global {
  namespace JSX {
    interface IntrinsicElements {
      bds: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("container bg-gray-100 pb-12", nunito.className)}>
        <Header />
        {children}
      </body>
    </html>
  );
}
