import React, { useEffect, useState } from "react";
const ResponsePage=(props)=>{
const resultFirst=props.matchingNames;
const keanuMov=props.matchingKean;
const NicolasMov=props.matchingNic;
const [result,setResult]=useState([])
const matchingActors=[]
useEffect(()=>{
    if(resultFirst.length!==0){
        setResult(resultFirst)

    }
perpairResult(keanuMov)
},[resultFirst])
const perpairResult=(movie)=>{
 
    movie.forEach((movieObj) => {
        console.log(movieObj)
        movieObj.actors.forEach((actorId) => {
         const actor = resultFirst.find((actor) => actor.actorId === actorId);
          if (actor) {
            matchingActors.push({ actorId, title: movieObj.title });
          }
          console.log(actorId,'uuj inside keanu')
        });

      });
      console.log('matching array',matchingActors)
console.log('res',result)
}
return(
    <>
    <p className="bg-warning">Validation's reposnse:</p>
    </>
)


}

export default ResponsePage;