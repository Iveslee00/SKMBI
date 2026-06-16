import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Customer-Led Campaign Studio",
  description: "A customer-demand-led EC campaign curation prototype"
};

export const viewport: Viewport = {
  themeColor: "#f4f1ea"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body>
        <a className="skip-link" href="#main-content">
          跳到主要內容
        </a>
        {children}
      </body>
    </html>
  );
}
