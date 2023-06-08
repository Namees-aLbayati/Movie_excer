import React, { useEffect, useState } from "react";
import LiComponents from "./liComponents";
const List = ({ actor }) => {
  const [actWithNicols, setActNicolas] = useState([]);
  const [actWithKeanu, setActKeanu] = useState([]);
  const [matchingIds, setMatchingIds] = useState([]);
  
  useEffect(() => {
    if (actor.length !== 0) {
      fetchMovie();
    }
  }, [actor]);

  useEffect(() => {
   // console.log(actWithNicols, "act with nicolas ids");
    //console.log(actWithKeanu, "act with keanu ids");
    const matchingValues = actWithNicols.filter((value) => actWithKeanu.includes(value));
   setMatchingIds(matchingValues)
  }, [actWithNicols]);



  const fetchMovie = async () => {
    const response = await fetch(
      "https://switch-yam-equator.azurewebsites.net/api/movies",
      {
        method: "GET",
        headers: {
          "x-chmura-cors": "3d088e34-eda0-4f33-a114-b7345c5c5fa9",
        },
      }
    );
    const data = await response.json();

    const filteredNicolas = data.filter((movie) =>
      movie.actors.includes(actor[0].actorId)
    );

    const actorIdsNic = filteredNicolas.map((movie) => movie.actors);

const mergeNic=actorIdsNic.reduce((acc,arr)=>{
    return acc.concat(arr);

})
const nicAllIds=[...new Set(mergeNic)]

  const nicWithoutHisId= nicAllIds.filter(item => item !== actor[0].actorId);
setActNicolas(nicWithoutHisId)
    const filteredKean = data.filter((movie) =>
    movie.actors.includes(actor[1].actorId)
  );

  const actorIdsKean = filteredKean.map((movie) => movie.actors);

const mergeKeanu=actorIdsKean.reduce((acc,arr)=>{
    return acc.concat(arr)
})

const keanAllIds=[...new Set(mergeKeanu)];
const keanWithoutHisId= keanAllIds.filter(item => item !== actor[1].actorId);
setActKeanu(keanWithoutHisId)


  };

  return (
    <>
    <ul className="list-group">
  <li className="list-group-item active" aria-current="true">Matching actors</li>
<LiComponents matchingIds={matchingIds}/>
</ul>
    </>
  );
  
};

export default List;
