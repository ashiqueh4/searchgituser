import React from 'react'
import { Outlet } from 'react-router-dom'
import Deshboard from './Deshboard'
import Nav from './Nav';
export const Home = () => {
  return (
    <>
    <div className='body-class'>
      <Nav/>
     <Deshboard></Deshboard>
        <Outlet/>
    </div>
    </>
     
  )
}

