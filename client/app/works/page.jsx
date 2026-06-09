import Assets from '@/Assets/Assets'
import ValuesSection from '@/components/about/ValuesSection'
import BusinessHero from '@/components/business-solutions/BusinessHero'
import CommonHero from '@/components/common/CommonHero'
import Stats from '@/components/common/Stats'
import CTA from '@/components/home/CTA'
import TechStack from '@/components/home/TechStack'
import Testimonials from '@/components/home/Testimonials'
import Works from '@/components/works/Works'
import React from 'react'

export default function Workspage()  {
  return (
    <div>
      <CommonHero
        headerbtn="Redifining Outsourcing"
        title={<>
        Our <span className='highlightedTextColor'>Works</span>
        </>}
        buttonText="View Our Works"
        image={Assets.WorksHeader}
      />
      <Stats />
      <Works />
      <TechStack />
      <Testimonials />
      <ValuesSection />
      <CTA />

      {/* <h1 className="mx-auto text-center text-7xl mt-32">Works Page</h1> */}
      
    </div>
  )
}