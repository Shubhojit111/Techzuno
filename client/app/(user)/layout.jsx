import Footer from "@/components/layout/Footer";

export default function UserLayout({ children }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
