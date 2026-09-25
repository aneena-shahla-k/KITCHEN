import React from 'react'
import KitchenHero from '../components/HomeMain/KitchenHero'

import KitchenPricing from '../components/HomeMain/KitchenPricing'
import WhyChooseUs from '../components/HomeMain/WhyChooseUs'
import InteractiveKitchenVisualizer from '../components/HomeMain/InteractiveKitchenVisualizer'
import KitchenProcess from '../components/HomeMain/KitchenProcess'
import BeforeAfter from '../components/HomeMain/BeforeAfter'
import Testimonials from '../components/HomeMain/Testimonials'
import FinalVideoCTA from '../components/HomeMain/FinalVideoCTA'

export default function Home() {
  return (
    <div>
        <KitchenHero/>
        <InteractiveKitchenVisualizer/>
        {/* <KitchenRedesign/> */}
        <KitchenPricing/>
        <KitchenProcess/>
        <WhyChooseUs/>
        <BeforeAfter/>
        <Testimonials/>
        <FinalVideoCTA/>








    </div>
  )
}
