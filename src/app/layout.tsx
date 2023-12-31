import type { Metadata } from "next";
import ReduxProvider from "@/redux/ReduxProvider";
import Header from "@/components/Header";
import ContentHolder from "@/components/ContentHolder";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const font = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Riot Client",
  description: "Riot Client",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ReduxProvider>
          <Header />
          <ContentHolder>{children}</ContentHolder>
        </ReduxProvider>
      </body>
    </html>
  );
}
