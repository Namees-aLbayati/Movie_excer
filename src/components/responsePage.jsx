import React, { useEffect, useState } from "react";
import ValidateComp from "./validateCom";

const ResponsePage=(props)=>{
const resultFirst=props.matchingNames;
const keanuMov=props.matchingKean;
const NicolasMov=props.matchingNic;
const [result,setResult]=useState([])
const [resultbeforeFinal,setbeforeFinalResult]=useState([])
const [finalResult,setFinalResult]=useState([])

const matchingActors=[]
useEffect(()=>{
    if(resultFirst.length!==0){
        setResult(resultFirst)

    }
perpairResult(keanuMov)
},[resultFirst])
const perpairResult=(movie)=>{
 
    movie.forEach((movieObj) => {
        console.log(movieObj,'obj')
        movieObj.actors.forEach((actorId) => {
         const actor = resultFirst.find((actor) => actor.actorId === actorId);
          if (actor) {
           // console.log(movieObj)
            matchingActors.push({id:actorId,name:actor.name,KRMovies:[movieObj.title]});
          }
         // console.log(actorId,'uuj inside keanu')
        });

      });
      console.log('matching array',matchingActors)
      const uniqueActors = [];

      matchingActors.forEach(actor => {
        const existingActor = uniqueActors.find(a => a.id === actor.id);
        if (existingActor) {
          if (!existingActor.KRMovies.includes(actor.KRMovies[0])) {
            existingActor.KRMovies.push(actor.KRMovies[0]);
          }
        } else {
          uniqueActors.push(actor);
        }
      });
      
      console.log(uniqueActors,'should be ok KRMovies');
setbeforeFinalResult(uniqueActors)


    }


    useEffect(()=>{
      if(NicolasMov.length!==0){
        addNicolFinal(NicolasMov)

      }



    },[])

    const addNicolFinal=async(nicolMovie)=>{
        nicolMovie.forEach((movNic1)=>{

movNic1.actors.forEach((actorId)=>{
    const actor=resultFirst.find((actor)=>actor.actorId===actorId);
    if(actor){
        matchingActors.push({id:actorId,name:actor.name,NCMovies:[movNic1.title]});
    }
})

        })


        console.log('adding nicolas',matchingActors)
        const uniqueActors = [];

        matchingActors.forEach(actor => {
            const existingActor = uniqueActors.find(a => a.id === actor.id);
            if (existingActor) {
              if (!existingActor.NCMovies.includes(actor.NCMovies[0])) {
                existingActor.NCMovies.push(actor.NCMovies[0]);
              }
            } else {
              uniqueActors.push(actor);
            }
          });
          
          console.log(uniqueActors,'should be ok ncccccMovies',resultbeforeFinal);
          const combinedArray = [];

          resultbeforeFinal.forEach(actor => {
            const matchingActor = uniqueActors.find(a => a.id === actor.id && a.name === actor.name);
            if (matchingActor) {
              const combinedActor = {
                name: actor.name,
                KRMovies: actor.KRMovies,
                NCMovies: matchingActor.NCMovies
              };
              combinedArray.push(combinedActor);
            }
          });
          
          console.log(combinedArray,'should');
          setFinalResult(combinedArray)

    }
return(
    <>
    <p className="bg-warning">Validation's reposnse:</p>
    <ValidateComp result={finalResult}/>
    </>
)


}

export default ResponsePage;