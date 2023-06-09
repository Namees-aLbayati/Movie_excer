import React, { Component, useState,useEffect } from 'react';
import List from './list';
const Home=()=>{
const [actor,setActor]=useState([])

useEffect(() => {
  fetch('https://switch-yam-equator.azurewebsites.net/api/actors', {
    method: 'GET',
    headers: {
      'x-chmura-cors': '3d088e34-eda0-4f33-a114-b7345c5c5fa9'
    }
  })
    .then(response => response.json()).then((data) => {
      
    const filteredActors = data.filter(
      (element) =>
        element.name === 'Nicolas Cage' || element.name === 'Keanu Reeves'
    );
    console.log(filteredActors,'id needeed')
    setActor(filteredActors);
  });
}, []); 


return(
  <>
<nav className="navbar bg-body-tertiary">
  <div className="container-fluid d-flex justify-content-center ">
    <span className="navbar-text fs-3 text-primary  ">
List of the Actors who've been with N.C. &K.R.    </span>
  </div>
</nav>
<List actor={actor}/>
</>
  )




}


export default Home;
