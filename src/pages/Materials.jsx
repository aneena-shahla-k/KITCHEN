import React from 'react'
import MaterialsHero from '../components/MaterialsMain/MaterialsHero'
import MaterialsCollection from '../components/MaterialsMain/MaterialsCollection'
import MaterialCta from '../components/MaterialsMain/MaterialCta'

export default function Material() {
  return (
    <div>
      <MaterialsHero/>
      <MaterialsCollection/>
      <MaterialCta/>
    </div>
  )
}
