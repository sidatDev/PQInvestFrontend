// src/app/layout.js
import { Open_Sans } from "next/font/google"; // Sahi package name
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
// Font configuration
const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Pak-Qatar Investment",
  description: "Together We Prosper",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={openSans.className}>
      <body className="antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}