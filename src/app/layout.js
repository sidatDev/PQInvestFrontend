// src/app/layout.js
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { fetchGoogleTag } from "@/lib/strapi";
import Footer from "@/components/Footers/Footer";
import CmsScripts from "@/components/CmsScripts";



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

export default async function RootLayout({ children }) {
  const googleTagData = await fetchGoogleTag();

  return (
    <html lang="en" className={openSans.className}>
      <body className="antialiased">
        {/* Inject Google Tag Manager script at the start of body */}
        <CmsScripts html={googleTagData?.GManager} idPrefix="gmanager" />
        {/* Inject Google Analytics script */}
        <CmsScripts html={googleTagData?.Gtag} idPrefix="gtag" />
        {children}
  
      </body>
    </html>
  );
}