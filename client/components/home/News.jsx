import Link from 'next/link';
import KnowMoreBtn from '../buttons/KnowMoreBtn';
import Assets from '@/Assets/Assets';
import Image from 'next/image';

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
    <section className="pb-24 pt-12 bg-black">
      <div className="px-62 mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-semibold mb-4">NEWS</h2>
        <p className="text-zinc-400 mb-8 text-sm">Insights, Trends And Updates From Our Tech Innovators & Industry</p>
        
        <div className="mb-16">
          <KnowMoreBtn text="View All Insights From Blog" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {news.map((item, idx) => (
            <div
              key={item.id}
              className={`overflow-hidden text-left group hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-shadow ${idx % 2 === 0 ? "rounded-tl-3xl" : "rounded-tr-3xl"}`}
            >
              <div className="h-[65%] overflow-hidden">
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="max-h-[35%] w-full p-4 pb-8 bg-cyan-50">
                <h3 className=" w-[80%] font-medium text-gray-900 text-[13px] leading-tight underline underline-offset-1 mb-2 line-clamp-2 hover:text-cyan-600 transition-colors cursor-pointer">
                  {item.title}
                </h3>
                <p className="text-cyan-800 text-xs">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
