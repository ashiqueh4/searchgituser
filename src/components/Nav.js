import React from 'react'
import styled from 'styled-components';
import { Link } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react";
import loader_img from "../images/preloader.gif"

function Nav() {
  const { user, isAuthenticated, isLoading ,logout } = useAuth0();
  if (isLoading) {
    return <main><img src={loader_img} alt="loader_img" className='loading-img'/></main>;
  }

  return (
    
    <div>
        <Wrapper className='full-div'>
          {/* <div><Link to="Deshboard">Deshboard</Link></div> */}
      
        {
        isAuthenticated && (
         <div className='login-div'>
        <img src={user.picture} alt={user.name} />
          <h4>Welcome, <strong>{user.name}</strong></h4>
          <button onClick={() => logout({ returnTo: window.location.origin })}>logout</button> 
          </div> 
          )
        }
        
        </Wrapper>
    </div>
     
  )
}

export default Nav

const Wrapper = styled.nav`
  padding: 1.5rem;
  margin-bottom: 4rem;
  background: var(--clr-white);
  text-align: center;
  display: grid;
  grid-template-columns: auto auto 100px;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  h4 {
    margin-bottom: 0;
    font-weight: 400;
  }
  img {
    width: 35px !important;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
  }
  button {
    background: transparent;
    border: transparent;
    font-size: 1.2rem;
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
`;

