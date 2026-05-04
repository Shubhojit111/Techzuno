import Assets from '@/Assets/Assets';
import Image from 'next/image';
import Link from 'next/link';
import HeaderBtn from '../buttons/HeaderBtn';
import GlowBtn from '../buttons/GlowBtn';

export default function CTA() {
  return (
    <section className="py-8  relative overflow-hidden ">
      
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Image src={Assets.CTABG} alt="image" className='w-full h-full object-cover' />
      </div>
      
      <div className="px-62 mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
          <div className="relative h-full w-full">
             <Image 
               src={Assets.CTAImage}
               alt="Team members" 
               className="w-full h-full object-cover object-top rounded-3xl"
             />
          </div>
        </div>
        
        <div className="w-full md:w-1/2 h-full text-center md:text-left">
          <HeaderBtn text="Let's make great things" />
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-white leading-14 tracking-wider">
            HAVE A PROJECT?<br />
            SPEAK WITH<br />
            OUR <span className="text-[#38FFF2]">EXPERTS</span>
          </h2>
          <p className=" text-[24px] leading-tight text-white/75 mb-10">
            Leave Your Contact Details To Get A Free<br />
            Consultation With A Techzuno Experts.
          </p>
          
          <div className="flex flex-col sm:flex-row relative items-center  gap-6">
            <GlowBtn text="Get Started" />
            
            <div className="hidden sm:block  absolute bottom-0 -right-10">
              <Image src={Assets.CTAArrow} alt="image" className='w-40 object-cover' />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
