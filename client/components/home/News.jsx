import Link from 'next/link';
import KnowMoreBtn from '../buttons/KnowMoreBtn';
import Assets from '@/Assets/Assets';
import Image from 'next/image';
import SectionTitle from '../buttons/SectionTitle';
import SectionDescription from '../buttons/SectionDescription';

export default function News() {
  const news = [
    {
      id: 1,
      image: Assets.NewsImage1,
      title: "How Software Development Services Improve",
      date: "October 12, 2023"
    },
    {
      id: 2,
      image: Assets.NewsImage2,
      title: "The Future of Web Development: What to Expect",
      date: "October 15, 2023"
    },
    {
      id: 3,
      image: Assets.NewsImage3,
      title: "Why React is Still the King of Frontend",
      date: "October 18, 2023"
    },
    {
      id: 4,
      image: Assets.NewsImage4,
      title: "Top 5 AI Tools Every Developer Should Know",
      date: "October 20, 2023"
    }
  ];

  return (
    <section className="pb-24 pt-12 bg-black relative">
      <div className="px-6 sm:px-10 lg:px-62 mx-auto">
        <div className="text-center px-0 md:px-8 mx-auto mb-12 md:mb-16">
          <SectionTitle className="text-center mx-auto text-white mb-4 md:mb-6" title="NEWS" />
          <SectionDescription className="text-center mx-auto" description="Insights, Trends And Updates From Our Tech Innovators & Industry" />
          
          <div className="mb-8">
            <KnowMoreBtn text="View All Insights From Blog" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-4">
          {news.map((item, idx) => (
            <div
              key={item.id}
              className={`flex flex-col md:h-[280px] md:h-auto overflow-hidden text-left group hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-shadow ${idx % 2 === 0 ? "rounded-tl-4xl" : "rounded-tr-4xl"}`}
            >
              <div className="h-[60%] md:h-[65%] overflow-hidden">
                <Image 
                  src={item.image} 
                  alt={item.title || "Techzuno News"} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex-1 w-full p-3 md:p-4 pb-6 md:pb-8 bg-cyan-50">
                <h3 className="w-full md:w-[85%] font-medium text-gray-900 text-[12px] md:text-[18px] lg:text-[14px] leading-tight underline underline-offset-[1.5px] mb-2 line-clamp-2 md:line-clamp-2 hover:text-cyan-600 transition-colors cursor-pointer">
                  {item.title}
                </h3>
                <p className="text-cyan-800 text-[10px] md:text-[14px] lg:text-xs">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
