import { Geist, Geist_Mono, Marcellus } from "next/font/google";
import "./globals.css";
import ChatWidget from "./components/ChatWidget";
import {Header} from "./components/header";
import {Footer} from "./components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-marcellus",
});

export const metadata = {
  title: "Advaitha | AI Skincare",
  description: "Advanced AI-powered personalized skincare routines.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${marcellus.variable} antialiased bg-[#0f1115] `}>
        <Header />
        <div className="min-h-screen pt-14"> 
          {children}
        </div>
        <ChatWidget />
        <Footer />
      </body>
    </html>
  );
}