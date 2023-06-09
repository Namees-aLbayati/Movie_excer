import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ResponsePage from "./responsePage";
const LiComponents=(data)=>{
    const mainId=data.mainActIds;
    let movies=data.movies;
    const matchingIds=data.matchingIds
    const [actors,setActor]=useState([])

const [matchingMovieKeanState,setKean]=useState([]);
const [matchingMovieNicolasState,setNicols]=useState([]);
const [matcingActNamesState,setMatchingNames]=useState([]);



useEffect(()=>{
   
   getActorsData(matchingIds)
},[matchingIds])


const getActorsData=async(ids)=>{
 const response=await   fetch('https://switch-yam-equator.azurewebsites.net/api/actors', {
        method: 'GET',
        headers: {
          'x-chmura-cors': '3d088e34-eda0-4f33-a114-b7345c5c5fa9'
        }
      });



const result=await response.json();
const namesActors = result.filter(item => ids.includes(item.actorId));

    setActor(namesActors)


if(mainId.length!==0){
const nicID = mainId[0].actorId
const keanuID=mainId[1].actorId
const matchingMovies = movies.filter(movie => {
    const hasNcId = movie.actors.includes(nicID);

    
    
    return hasNcId
  });
const matchingfinalNic=matchingMovies.filter(movie=>{

return namesActors.some(actor => movie.actors.includes(actor.actorId));


})


const matchingMoviesK = movies.filter(movie => {
    const hasNcId = movie.actors.includes(keanuID);

    
    
    return hasNcId
  });
const matchingfinalKean=matchingMoviesK.filter(movie=>{

return namesActors.some(actor => movie.actors.includes(actor.actorId));


})
console.log('matching keanu',matchingfinalKean)
console.log('matching nic ',matchingfinalNic)
console.log('matching act',namesActors)
setKean(matchingfinalKean);
setNicols(matchingfinalNic)
setMatchingNames(namesActors)
/*namesActors.map(data=>{
    setActor({...data,Movies:[],NCMovies:[],KRMovies:[]})
})*/
}

}
useEffect(()=>{
    
        if (actors.length === 0) {
          console.log('actors array is empty');
          return;
        }
       // console.log('new set act',actors)
//checkValidation(actors)
},[actors])



const checkValidation = async (actors) => {
  
  try{
      console.log(actors, 'act check validate');
  
      const response = await fetch(
        'https://switch-yam-equator.azurewebsites.net/api/validation',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-chmura-cors': '3d088e34-eda0-4f33-a114-b7345c5c5fa9'
          },
          body: JSON.stringify(actors)
        }
      );
  
      if (!response.ok) {
        throw new Error('API request failed');
      }
  
      const showingResult = await response.json();
      console.log(showingResult, 'validate results');
    } catch (error) {
      console.error('An error occurred:', error.message);
    }
  };
  
  


  const renderActors = () => {
    let arr=[]
    console.log(actors,'loading actors')
if(actors.length>1){

for(let i=0;i<actors.length;i++){
    console.log('push',actors[i])
arr.push(<li key={i}>{i+1} {actors[i].name}</li>)
}
}else{
return `Data Coming soon`
}
return arr
};







return(
    <>
{renderActors()}
<ResponsePage  matchingNames={matcingActNamesState} matchingKean={matchingMovieKeanState} matchingNic={matchingMovieNicolasState} />
</>
)
}

export default LiComponents;