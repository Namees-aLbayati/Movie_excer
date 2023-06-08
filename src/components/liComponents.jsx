import React from "react";
import { useState } from "react";
import { useEffect } from "react";
const LiComponents=({matchingIds})=>{
    const [actors,setActor]=useState([])

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
const result2 = result.filter(item => ids.includes(item.actorId));
    setActor(result2)

}
useEffect(()=>{
checkValidation(actors)
},[actors])


const checkValidation = async (actors) => {
    if (actors.length === 0) {
        console.log('actors array is empty');
        return;
      }
  
console.log(actors,'act')
    const response=await   fetch('https://switch-yam-equator.azurewebsites.net/api/validation', {
        method: 'POST',
        headers: {
"Content-Type":"application/json",
          'x-chmura-cors': '3d088e34-eda0-4f33-a114-b7345c5c5fa9'
        },
        body:JSON.stringify(actors)
      });

      const showingResult=await response.json();
      console.log(showingResult,'validate results')

  };
  
  


return(
    <>
    <li className="list-group-item " aria-current="true">Matching actors</li>
    <li className="list-group-item " aria-current="true">Matching actors</li>
</>
)
}

export default LiComponents;