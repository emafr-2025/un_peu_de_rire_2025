import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "あんぷうどり - 勤妻笑母で笑顔をお届け",
  description: "発達障害の子のトンデモ発想を笑いと学びに変えるポッドキャストと、日本のお母さんに元気を届けるプラットフォーム",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
