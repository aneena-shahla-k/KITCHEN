import React from 'react'
import OurWork from '../components/OurWorks/OurWork'
import ProjectShowcase from '../components/OurWorks/ProjectShowCase'
import BlueprintToReality from '../components/OurWorks/BlueprintToReality'
import ProjectsReveal from '../components/OurWorks/ProjectsReveal'

export default function Projects() {
  return (
    <div>
      <ProjectsReveal/>
        <BlueprintToReality/>
        <OurWork/>
        <ProjectShowcase/>
       
    </div>
  )
}
