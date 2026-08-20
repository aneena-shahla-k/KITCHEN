import React from 'react'
import KitchenHero from '../components/HomeMain/KitchenHero'
import KitchenStyles from '../components/HomeMain/KitchenStyles'
import KitchenConsultation from '../components/HomeMain/KitchenConsultation'
import DesignProcess from '../components/HomeMain/DesignProcess'
import MaterialsCraftsmanship from '../components/HomeMain/MaterialsCraftsmanship'
// import FeaturedKitchens from '../components/HomeMain/FeaturedKitchens'
import ProjectGallery from '../components/HomeMain/ProjectGallery'
import ProcessCTA from '../components/HomeMain/ProcessCTA'
import KitchenConfigurator from '../components/HomeMain/KitchenConfigurator'

export default function Home() {
  return (
    <div>
        <KitchenHero/>
        <KitchenStyles/>
        <DesignProcess/>
        <MaterialsCraftsmanship/>
        <KitchenConsultation/>
        <KitchenConfigurator/>
        {/* <FeaturedKitchens/> */}
        <ProjectGallery/>
        <ProcessCTA/>
    </div>
  )
}
