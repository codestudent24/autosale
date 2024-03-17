import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Autosale",
  description: "Sell a car at a bargain price",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="header">
          Выкупим Ваш автомобиль по выгодной цене!
        </header>
        {children}
        <footer className="footer">
          <div>
            +7-999-888-77-66
          </div>
        </footer>
      </body>
    </html>
  );
}
