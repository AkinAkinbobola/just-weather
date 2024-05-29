import type {Metadata} from "next";
import {Nunito} from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import {cn} from "@/lib/utils";

const nunito = Nunito(
    {
        subsets: ["latin"],
        weight: ["200", "300", "400", "500", "600", "700", "900", "1000"]
    }
);

export const metadata: Metadata = {
    title: "Just Weather",
    description: "Next JS Weather App",
    icons: {
        icon: "/assets/icons/logo.svg"
    }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={cn("container", nunito.className)}>
    <Header/>
    {children}
    </body>
    </html>
  );
}
