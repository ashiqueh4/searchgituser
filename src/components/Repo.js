import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {
    const { reposdata }=useGlobalContext()
    // console.log('reposdata', reposdata)

    // reduce function return total of array
    let languages = reposdata.reduce((total,item)=>{
        const { language,stargazers_count } =item;
        if (!language) return total;
        if(!total[language]){
            total[language] = { label:language,value:1,starts:stargazers_count}
        }else{
            total[language] = { ...total[language],value:total[language].value+1,starts:total[language].starts + stargazers_count}
        }
        
        return total;
    },{})
   // convert object to array 
    languages = Object.values(languages).sort((a,b)=>{
       return b.value - a.value
    }).slice(0,5);

       // convert object25 to array 
      const languages_starts = Object.values(languages).sort((a,b)=>{
        return b.starts - a.starts
     }).map((items)=>{
      return {...items,value:items.starts}
     }).slice(0,5);
   

    // STEP 2 - Chart Data
const chartData = languages;


   // reduce function return total of array 11
   let { stars,forks } = reposdata.reduce((total,item)=>{
    const { name,stargazers_count ,forks} =item;
     total.stars[stargazers_count] ={label:name,value:stargazers_count}
     total.forks[stargazers_count] ={label:name,value:forks}
    return total;
},{

  stars:{},
  forks:{},
})

  stars = Object.values(stars).slice(-5).reverse();
  forks = Object.values(forks).slice(-5).reverse();
  return (
    <div className='section'>
    <Wrapper className='section-center'>
    <Pie3D data={ chartData }></Pie3D>
    <Column3D data={ stars } ></Column3D>
    <Doughnut2D data={ languages_starts } ></Doughnut2D>
    <Bar3D data={ forks }></Bar3D>
    </Wrapper>
    </div>
   
  )
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;