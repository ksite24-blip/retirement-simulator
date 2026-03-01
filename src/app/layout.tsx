import type { Metadata } from "next";
import "./globals.css";
import { PHProvider } from "./providers";

export const metadata: Metadata = {
  title: "退職シミュレーター | 有給・失業保険の目安試算",
  description:
    "有給残・給与・勤続年数・離職理由から、最短退職日・基本手当・社会保険の目安を試算。FP監修を想定した参考ツールです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="scroll-smooth">
      <body className="min-h-screen antialiased font-sans text-neutral-800">
        <PHProvider>{children}</PHProvider>
      </body>
    </html>
  );
}
