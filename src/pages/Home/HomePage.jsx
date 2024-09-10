import React from 'react'
import Banner from '../../component/Banner/Banner'
import Categories from '../../component/Categories/Categories'
import Course from '../../component/Course/Course'
import AboutUs from '../../component/AboutUs/AboutUs'
import Instructor from '../../component/Instructor/Instructor'
import Partner from '../../component/Partner/Partner'

const Homepage = () => {
  return (
    <>
      <Banner/>
      <Categories/>
      <Course/>
      <AboutUs/>
      <Instructor/>
      <Partner/>
    </>
  )
}

export default Homepage