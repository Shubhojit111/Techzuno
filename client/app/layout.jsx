import { Montserrat, Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GoToTop from "@/components/layout/GoToTop";
import { AuthProvider } from "@/context/AuthContext";

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "Techzuno | Where Vision Meets Innovation",
  description: "Kolkata's Leading Website Development & Design Company",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${montserrat.variable} h-full antialiased bg-black text-white`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <AuthProvider>
          <Navbar />
          <main className="">{children}</main>
          <Footer />
          <GoToTop />
        </AuthProvider>
      </body>
    </html>
  );
}
