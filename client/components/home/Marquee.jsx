export default function Marquee() {
  const items = ["S.JS", "MYSQL", "REACT NATIVE", "TAILWIND CSS", "JAVA", "EXPRESS.JS", "NODE.JS"];
  const baseItems = [...items, ...items];
  
  return (
    <div className="w-full overflow-hidden py-10 bg-black relative">
      <div className="absolute left-0 top-0 w-16 sm:w-20 lg:w-32 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 w-60 sm:w-20 lg:w-32 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      
      <div className="flex flex-col gap-8">
        <p className="text-[14px] uppercase text-center tracking-widest text-white">OUR ENGINEERING TECH STACK</p>

        <div className="w-full overflow-hidden">
          <div className="flex w-max whitespace-nowrap animate-marquee will-change-transform">
            <div className="flex">
              {baseItems.map((item, idx) => (
                <div
                  key={`top-a-${idx}`}
                  className="mx-4 sm:mx-8 text-3xl md:text-6xl tracking-widest font-montserrat font-black text-white/20 hover:text-white transition-colors cursor-default"
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="flex" aria-hidden="true">
              {baseItems.map((item, idx) => (
                <div
                  key={`top-b-${idx}`}
                  className="mx-4 sm:mx-8 text-3xl md:text-6xl tracking-widest font-montserrat font-black text-white/20 hover:text-white transition-colors cursor-default"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full overflow-hidden">
          <div className="flex w-max whitespace-nowrap animate-marquee-reverse will-change-transform">
            <div className="flex">
              {baseItems.map((item, idx) => (
                <div
                  key={`bottom-a-${idx}`}
                  className="mx-4 sm:mx-8 text-3xl md:text-6xl tracking-widest font-montserrat font-black text-white/20 hover:text-white transition-colors cursor-default"
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="flex" aria-hidden="true">
              {baseItems.map((item, idx) => (
                <div
                  key={`bottom-b-${idx}`}
                  className="mx-4 sm:mx-8 text-3xl md:text-6xl tracking-widest font-montserrat font-black text-white/20 hover:text-white transition-colors cursor-default"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      
    </div>
  );
}
