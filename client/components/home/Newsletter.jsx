import HeaderBtn from "../buttons/HeaderBtn";
import SectionTitle from "../buttons/SectionTitle";
import SectionDescription from "../buttons/SectionDescription";

export default function Newsletter() {
  return (
    <section className="bg-black text-center px-6 sm:px-10 lg:px-62 py-20 mx-auto">
      <div className=" mx-auto text-left md:text-center px-0 md:px-8 ">
        <HeaderBtn text="OUR EXPERTISE" />
        <SectionTitle>
          RELIABLE <span className="text-[#38FFF2]">WEBSITE DESIGN </span>COMPANY <br />IN KOLKATA
        </SectionTitle>
        <SectionDescription className="md:mx-auto">
          Searching for the top web development company in Kolkata? Our expert team delivers modern, responsive and user-friendly websites tailored to your business needs. From e-commerce stores to corporate sites, we provide complete website design services in Kolkata that boost your brand presence. Partner with us today to build a powerful online identity and reach more customers.
        </SectionDescription>
      </div>
    </section>
  );
}
