import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import RegisterModal from "@/components/modal/registerModal";
import LoginModal from "@/components/modal/loginModal";
import { Toaster } from "react-hot-toast";

import RentModal from "@/components/modal/rentModal";




const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Airbnb clone",
  description: "Sitio ",
};

export default async function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      > 
         
          <RentModal/>
          <LoginModal/>
          <RegisterModal/>
          <Navbar/>
          <Toaster/>
          <section className="pb-20 pt-28">
            {children}
          </section>
     
           
      </body>
    </html>
  );
}
