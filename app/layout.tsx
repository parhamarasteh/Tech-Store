import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./global.css";
import { Vazirmatn } from "next/font/google";


const vazirmatn = Vazirmatn({ subsets: ["arabic"], display: "swap", variable: "--font-vazirmatn", });

export const metadata: Metadata = {
  title: "TechStore",
  description: "Modern technology store",
  icons: { icon: "/images/favIcon.png", },
};



export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" >
      <body className={vazirmatn.variable}>{children}</body>
    </html>
  );
}