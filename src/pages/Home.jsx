import React from 'react'
import KitchenHero from '../components/HomeMain/KitchenHero'
import DesignProcess from '../components/HomeMain/DesignProcess'
// import FeaturedKitchens from '../components/HomeMain/FeaturedKitchens'
// import ProcessCTA from '../components/HomeMain/ProcessCTA'
// import KitchenConfigurator from '../components/HomeMain/KitchenConfigurator'
// import AIKitchenSuggestion from '../components/HomeMain/AIKitchenSuggestion'
import KitchenDetails from '../components/HomeMain/KitchenDetails'
import KitchenIdeas from '../components/HomeMain/KitchenIdeas'
import KitchenLayouts from '../styles/HomeStyles/KitchenLayouts'
import KitchenCostPlanner from '../components/HomeMain/KitchenCostPlanner'
import KitchenRedesign from '../components/HomeMain/KitchenRedesign'
import ProjectShowcase from '../components/OurWorks/ProjectShowCase'
import KitchenMarquee from '../components/HomeMain/KitchenMarquee'

export default function Home() {
  return (
    <div>
        <KitchenHero/>
        <KitchenLayouts/>
        <KitchenMarquee/>
        <KitchenIdeas/>
        <DesignProcess/>
        <KitchenCostPlanner/>
        <KitchenRedesign/>
        <KitchenDetails/>
        {/* <AIKitchenSuggestion/> */}
        {/* <KitchenConfigurator/>   */}
        {/* <FeaturedKitchens/> */}
        <ProjectShowcase/>
        {/* <ProcessCTA/> */}
    </div>
  )
}
