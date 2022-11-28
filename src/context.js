import React,{useState,useContext,createContext,useEffect} from "react";
import mockData from "./mockData"
import mockFollowers from "./mockFollowers"
import mockRepos from "./mockRepos"
import axios from "axios"

const AppContext =createContext();
 const rootUrl = 'https://api.github.com';
const AppProvider=({ children })=>{
 const [userdata ,setUserdata]=useState(mockData)  
 const [followerdata ,setFollowerdata]=useState(mockFollowers) 
 const [reposdata ,setReposdata]=useState(mockRepos) 
 const [request ,setRequest]=useState(0)
 const [loading ,setIsLoading]=useState(false)
 const [error ,setError]=useState({show:false,mesg:""})

 const checkRequest=()=>{
    axios(`${rootUrl}/rate_limit`).then(({data})=>{
        const remaining = data.rate.remaining;
        const limit = data.rate.limit;
        const rem_lim= {Remaining:remaining,Limit:limit }
        setRequest(rem_lim)
        if (remaining === 0){
            toggleError(true,"soory you have exceeded your daily limit!")
        }
    }).catch((err)=>{
        console.log(err)
    })
 }

 const toggleError=(show=false,mesg="")=>{
      setError({show,mesg})
 }

 const GetgithubUser=async(user)=>{
      console.log("GetgithubUser" + user)
      setIsLoading(true)
      toggleError()
      const response = await axios(`${rootUrl}/users/${user}`).catch((error)=>{
         console.log(error)
      })

      console.log(response)
      if(response){
        setUserdata(response.data)
        setIsLoading(false)
        
        const { login ,followers_url } =response.data;

    //     //repos
    //    await axios(`${rootUrl}/users/${login}/repos?per_page=100`).then((item)=>{
    //         console.log(item)
    //         setReposdata(item.data)
    //     })

    //     //follower 
    //    await axios(`${ followers_url }?per_page=100`).then((item)=>{
    //     console.log(item)
    //     setFollowerdata(item.data)
    //    })

       await Promise.allSettled([
        axios(`${rootUrl}/users/${login}/repos?per_page=100`),
        axios(`${ followers_url }?per_page=100`)
       ]).then((res)=>{
       const status = "fulfilled"
       const [repos ,followers] =res

        if(repos.status === status){
           setReposdata(repos.value.data)
        }
        if(followers.status === status){
            setFollowerdata(followers.value.data)
         }
       
       })
       
       }else{
        toggleError(true,"there is no github user !")
        setIsLoading(false)
       }
     

 }
 useEffect(checkRequest,[])

return (
<AppContext.Provider value={{userdata,followerdata,reposdata,request,error ,GetgithubUser,loading}}>{children}</AppContext.Provider>
)
}

export const useGlobalContext=()=>{
    return useContext(AppContext)
}


export {AppContext,AppProvider}