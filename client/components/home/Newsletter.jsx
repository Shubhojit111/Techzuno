import HeaderBtn from "../buttons/HeaderBtn";

export default function Newsletter() {
  return (
    <section className="bg-black text-center px-6 sm:px-10 lg:px-62 py-20 mx-auto">
      <div className=" mx-auto text-left md:text-center px-0 md:px-8 ">
        <HeaderBtn text="OUR EXPERTISE" />
        <h2 className="text-[34px] sm:text-[38px] lg:text-[50px] font-bold leading-tight lg:leading-[1.1] tracking-wider mb-4">
          RELIABLE <span className="text-[#38FFF2]">WEBSITE DESIGN </span>COMPANY IN KOLKATA
        </h2>
        <p className="text-zinc-400 text-[14px] leading-tight">
          Searching for the top web development company in Kolkata? Our expert team delivers modern, responsive and user-friendly websites tailored to your business needs. From e-commerce stores to corporate sites, we provide complete website design services in Kolkata that boost your brand presence. Partner with us today to build a powerful online identity and reach more customers.
        </p>
      </div>
    </section>
  );
}
