import Faq from '@/components/faq/Faq'
import CTA from '@/components/home/CTA'
import React from 'react'

export const metadata = {
  title: "FAQs | Techzuno Web & App Development",
  description: "Answers to the most common questions about working with Techzuno — timelines, pricing, support, and the process from kickoff to launch",
  url: "https://techzuno.com/faq",
};

const page = () => {
  return (
    <div>
      <Faq />
      <CTA/>
    </div>
  )
}

export default page
