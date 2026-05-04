import Link from 'next/link';

export default function Footer() {
  return (
    // <footer className="bg-black text-white py-16 border-t border-white/10">
    //   <div className="px-62 mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
    //     <div className="col-span-1 md:col-span-2">
    //       <div className="flex items-center gap-2 mb-6">
    //         <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500" />
    //         <span className="font-bold text-xl tracking-wider">TECHZUNO</span>
    //       </div>
    //       <p className="text-zinc-400 text-sm mb-2">
    //         12/1A SD Christopher Road<br />
    //         Bidhannagar South Kolkata -<br />
    //         700010
    //       </p>
    //       <p className="text-zinc-400 text-sm mb-2">P. +91 6290345020</p>
    //       <p className="text-zinc-400 text-sm">E. info@techzuno.com</p>
    //     </div>

    //     <div>
    //       <h4 className="font-semibold mb-4">Company</h4>
    //       <ul className="space-y-2 text-sm text-zinc-400">
    //         <li><Link href="/about" className="hover:text-cyan-400">About</Link></li>
    //         <li><Link href="/careers" className="hover:text-cyan-400">Careers</Link></li>
    //         <li><Link href="/blog" className="hover:text-cyan-400">Blog</Link></li>
    //       </ul>
    //     </div>

    //     <div>
    //       <h4 className="font-semibold mb-4">Services</h4>
    //       <ul className="space-y-2 text-sm text-zinc-400">
    //         <li><Link href="/services/web" className="hover:text-cyan-400">Web Development</Link></li>
    //         <li><Link href="/services/app" className="hover:text-cyan-400">App Development</Link></li>
    //         <li><Link href="/services/design" className="hover:text-cyan-400">UI/UX Design</Link></li>
    //         <li><Link href="/services/seo" className="hover:text-cyan-400">SEO Optimization</Link></li>
    //       </ul>
    //     </div>
    //   </div>
    //   <div className="px-62 mx-auto mt-12 pt-8 border-t border-white/10 text-center text-sm text-zinc-500">
    //     &copy; {new Date().getFullYear()} Techzuno. All rights reserved.
    //   </div>
    // </footer>

    <footer className='bg-white text-black  border-t border-white/10 flex items-center justify-center w-full'>
        <h1 className='font-bold text-[60px] md:text-[120px] lg:text-[260px] tracking-wider'>TECHZUNO</h1>
    </footer>
  );
}
