import { render } from '@testing-library/react';
import React, { Component, useState } from 'react';
const Home=()=>{
console.log('test')
const [actor,setActor]=useState()
const actArr=[]
function getActor() {
    fetch('https://switch-yam-equator.azurewebsites.net/api/actors', {
      method: 'GET',
      headers: {
        'x-chmura-cors': '3d088e34-eda0-4f33-a114-b7345c5c5fa9'
      }
    })
      .then(response => response.json())
      .then(data=>{
        const filteredActors = data.filter(
            (element) =>
              element.name === 'Nicolas Cage' || element.name === 'Keanu Reeves'
          );
          setActor(filteredActors);
        
      })

      
}
getActor()


return(
    <h1>{actArr[0]}</h1>
)

 /* fetchData() {
    fetch('https://switch-yam-equator.azurewebsites.net/api/movies', {
      method: 'GET',
      headers: {
        'x-chmura-cors': '3d088e34-eda0-4f33-a114-b7345c5c5fa9'
      }
    })
      .then(response => response.json())
      .then(data => {
        data.forEach(element => {
          this.getActor(element);
        });
      })
      .catch(error => {
        // Handle any errors
        console.error(error);
      });
  }*/


}


export default Home;
