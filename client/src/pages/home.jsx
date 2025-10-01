import React from 'react'
import Hero from '../components/Hero.jsx'
import FeaturedDestination from '../components/FeaturedDestination.jsx'
import ExclusiveOffer from '../components/ExclusiveOffer.jsx'
import Testimonials from '../components/Testimonials.jsx'
import NewsLetter from '../components/NewsLetter.jsx'

const home = () => {
  return (
    <>
        <Hero />
        <FeaturedDestination />
        <ExclusiveOffer />
        <Testimonials />
        <NewsLetter />
    </>
  )
}

export default home