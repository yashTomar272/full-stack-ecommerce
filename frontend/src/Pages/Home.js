import React, { useEffect, useState } from 'react'
import Sliderpage from '../Components/Sliderpage'
import Cathogary from '../Components/Cathogary'
import CathogaryPage from '../Components/CathogaryPage'
import Track from '../Components/Track'
import Testimonial from '../Components/Testimonial'
import Layout from './Layout'


function Home() {
 
  return (
   <>
    <Layout >
      <Sliderpage/>
      <Cathogary/>
      <CathogaryPage/>
      <Track/>
      <Testimonial/>
    </Layout>
   </>
  )
}

export default Home