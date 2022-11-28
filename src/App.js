import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Deshboard from "./components/Deshboard";
import Login from "./components/Login";
import Error from "./components/Error";
import { Home } from "./components/Home";
import { useAuth0 } from "@auth0/auth0-react";
import loader_img from "./images/preloader.gif"



function App() {
  const { isAuthenticated ,isLoading } = useAuth0();
  if (isLoading) {
    return <main><img src={loader_img} alt="loader_img" className='loading-img'/></main>;
    
  }

  return (
     <BrowserRouter>
     <Routes>
      <Route path="/" element={ isAuthenticated ?<Home/>:<Login/>}>
       <Route path="Deshboard" element={ <Deshboard/>}></Route>
      </Route>
      <Route path="*" element={<Error/>}></Route>
      <Route path="Login" element={<Login/>}></Route>
     </Routes>
     </BrowserRouter>
   
  );
}

export default App;
