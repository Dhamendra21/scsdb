import React, { useState } from 'react'
import Sidenav from './partials/Sidenav'
import Topnav from './partials/Topnav'
import Header from './partials/Header'
import { useEffect } from 'react'
import axios from '../utils/axios'
import Drpdown from './partials/Drpdown'
import HorizontalCards from './partials/HorizontalCards'
import Loading from './Loading'

const Home = () => {

  const [wallpaper, setWallpaper] = useState(null)
  const [trending, setTrending ] = useState(null)
  const [category, setcategory] = useState("all")

  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let randomData = data.results[(Math.random()*data.results.length).toFixed()]
      setWallpaper(randomData)
    } catch (error) {
      console.log(error);
    }
  };

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      setTrending(data.results);
    } catch (error) {
      console.log(error);
    }
  };

 
  
  useEffect(() => {
    GetTrending()
   
    
    !wallpaper && GetHeaderWallpaper()
  }, [category]);
  // console.log("wallpaper",wallpaper);
  
  // console.log(trending);
  

  return trending && wallpaper ? (
    <div className="w-screen flex overflow-x-hidden max-sm-overflow-x-auto px-2 ">

      <Sidenav/>
      <div className='w-[80%] max-sm:w-full h-full overflow-auto overflow-x-hidden '>
        <Topnav/>
        <Header data={wallpaper}/>

        <div className="mb-5 p-10 flex justify-between">
        <h1 className=" text-3xl font-semibold text-zinc-400">Trending</h1>
        <Drpdown title='filter' options={["tv","movie", "all"]} fnc={(e)=>setcategory(e.target.value)} />
      </div>

        <HorizontalCards data={trending}/>
      </div>
    </div>
  ) : <Loading/>
}

export default Home