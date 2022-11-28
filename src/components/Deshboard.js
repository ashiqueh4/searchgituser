import React from 'react'
import Info from "./Info"
import User from './User';
import Repo from './Repo';
import Search from './Search';
import { useGlobalContext } from '../context';
import loader_img from "../images/preloader.gif"

const Deshboard = () => {
  const { loading }=useGlobalContext()
if(loading){
  return(
    <main>
    <Search></Search> 
    <img src={loader_img} alt="loader_img" className='loading-img'/>
    </main>
  )
}
  return (
    <main>
    <Search></Search>
    <Info></Info>
    <User></User>
    <Repo></Repo>
    </main>
    )
}

export default Deshboard;