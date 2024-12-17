import React from 'react'
import Header from '../component/Header'
import RecomendedFood from '../component/RecomendedFood'
import Service from '../component/Service'
import NewFoods from '../component/NewFoods'
import ServiceTwo from '../component/ServiceTwo'
import Special from '../component/Special'


const Home = () => {
  return (
    <div>
        <Header/>
        <RecomendedFood/>
        <Service/>
        <NewFoods/>
        <ServiceTwo/>
        <Special/>
    </div>
  )
}

export default Home