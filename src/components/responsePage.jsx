import React, { useEffect, useState } from "react";
import ValidateComp from "./validateCom";

const ResponsePage=(props)=>{
const resultFirst=props.matchingNames;
const keanuMov=props.matchingKean;
const NicolasMov=props.matchingNic;
//console.log('test response component',resultFirst,keanuMov,NicolasMov)
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
        //console.log(movieObj,'obj')
        movieObj.actors.forEach((actorId) => {
         const actor = resultFirst.find((actor) => actor.actorId === actorId);
          if (actor) {
           // console.log(movieObj)
            matchingActors.push({id:actorId,name:actor.name,KRMovies:[movieObj.title]});
          }
         // console.log(actorId,'uuj inside keanu')
        });

      });
      const uniqueActors = [];

      matchingActors.forEach(actor => {
        const existingActor = uniqueActors.find(a => a.id === actor.id);
        if (existingActor) {
          console.log('include error test',existingActor,'act',actor)
         // if (!existingActor.KRMovies.includes(actor.KRMovies[0])) {
           existingActor.KRMovies.push(actor.KRMovies[0]);
         // }
        } else {
          uniqueActors.push(actor);
        }
      });
      
setbeforeFinalResult(uniqueActors)


    }


  
useEffect(()=>{
  async function excute(){
  let result=await addNicolFinal(NicolasMov)
  setFinalResult(result)
  }
  excute()
},[keanuMov])
    const addNicolFinal=async(nicolMovie)=>{
        nicolMovie.forEach((movNic1)=>{

movNic1.actors.forEach((actorId)=>{
    const actor=resultFirst.find((actor)=>actor.actorId===actorId);
    if(actor){
        matchingActors.push({id:actorId,name:actor.name,NCMovies:[movNic1.title]});
    }
})

        })


        const uniqueActors1 = [];

  
          matchingActors.forEach(actor => {
            const existingActor = uniqueActors1.find(a => a.id === actor.id);
            if (existingActor) {
              if (!existingActor.NCMovies) {
                existingActor.NCMovies = [];
              }
              if (actor.NCMovies && actor.NCMovies[0] && !existingActor.NCMovies.includes(actor.NCMovies[0])) {
                existingActor.NCMovies.push(actor.NCMovies[0]);
              }
            } else {
              if (actor.NCMovies && actor.NCMovies[0]) {
                actor.NCMovies = [actor.NCMovies[0]];
                uniqueActors1.push(actor);
              }
            }
          });
          
          
        //  console.log(uniqueActors1,'should be ok ncccccMovies',resultbeforeFinal);
          const combinedArray = [];

          resultbeforeFinal.forEach(actor => {
            const matchingActor = uniqueActors1.find(a => a.id === actor.id && a.name === actor.name);
            if (matchingActor) {
              const combinedActor = {
                name: actor.name,
                KRMovies: actor.KRMovies,
                NCMovies: matchingActor.NCMovies
              };
              combinedArray.push(combinedActor);
            }
          });
          
          console.log(combinedArray,'HERERRRRR');
        //  setFinalResult(combinedArray)
        return combinedArray

    }
  
return(
    <>
    <p className="bg-warning">Validation's reposnse:</p>
    <ValidateComp result={finalResult}/>
    </>
)


}

export default ResponsePage;