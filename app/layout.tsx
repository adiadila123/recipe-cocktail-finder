// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "TasteHub - Recipe & Cocktail Finder",
    description: "Discover amazing recipes and cocktails from around the world",
    keywords: "recipes, cocktails, cooking, drinks, meals",
    icons: {
        icon: "/icons/favicon.svg",
        shortcut: "/icons/favicon.svg",
        apple: "/icons/favicon.svg",
    },
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en-GB" className="h-full">
        <body className={`${inter.className} min-h-screen flex flex-col gradient-bg`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        </body>
        </html>
    );
}
