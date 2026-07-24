import HeaderBtn from "../buttons/HeaderBtn";
import SectionTitle from "../buttons/SectionTitle";
import SectionDescription from "../buttons/SectionDescription";

export default function Newsletter() {
  return (
    <section className="bg-black text-center px-6 sm:px-10 lg:px-62 pb-10 mx-auto ">
      <div className=" mx-auto text-left  md:text-center ">
        <HeaderBtn text="OUR EXPERTISE" />
        <SectionTitle className="mb-4 md:mb-6" title={<>
          RELIABLE <span className="text-[#38FFF2]">WEBSITE DESIGN </span>COMPANY <br />IN KOLKATA
        </>} />
        <SectionDescription className="md:mx-auto" description="Whether you need a sleek brand website, a robust e-commerce store, or a full-stack web application, our Kolkata-based team has the design instincts and engineering depth to deliver it — on time and built to last." />
      </div>
    </section>
  );
}
