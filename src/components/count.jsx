import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [actors, setActors] = useState([]);
  const [movies, setMovies] = useState([]);
  const [status, setStauts] = useState([]);

  const finalResult = [];

  //
  const baseUrl = "https://switch-yam-equator.azurewebsites.net/api/";
  const accessToken = "3d088e34-eda0-4f33-a114-b7345c5c5fa9";

  //  get actors
  const getActors = async () => {
    console.log('namees ping')
    const actors = await axios.get(baseUrl + `actors`, {
      headers: {
        "x-chmura-cors": accessToken,
      },
    });
    setActors(actors.data);
  };

  // const get movies
  const getMovies = async () => {
    const movies = await axios.get(baseUrl + `movies`, {
      headers: {
        "x-chmura-cors": accessToken,
      },
    });
    setMovies(movies.data);

  };

  const forrmatDate = () => {
    const KRId = actors.find((actor) => actor.name === "Keanu Reeves")?.actorId;
    const NCId = actors.find((actor) => actor.name === "Nicolas Cage")?.actorId;

    const allKRMovies = movies.filter((movie) => movie.actors.includes(KRId));
    const allNCMovies = movies.filter((movie) => movie.actors.includes(NCId));

    const allKRMoviesActorIds = new Set();
    const allNCMoviesActorIds = new Set();

    allKRMovies.forEach((m) => {
      m.actors.forEach((id) => allKRMoviesActorIds.add(id));
    });

    allNCMovies.forEach((m) => {
      m.actors.forEach((id) => allNCMoviesActorIds.add(id));
    });

    // intersecting KR & NC movies actor IDs
    const targetActorsIds = Array.from(allKRMoviesActorIds).filter(
      (KRActorId) => allNCMoviesActorIds.has(KRActorId)
    );

    // assembling final data for validation
    targetActorsIds.forEach((targetActorId) => {
      const actor = actors.find((actor) => actor.actorId == targetActorId);

      if (!actor) return;
      const actorMovies = movies.filter((movie) =>
        movie.actors.includes(targetActorId)
      );
      const Movies = actorMovies.map((movies) => movies.title);
      const KRMovies = actorMovies
        .filter((movie) => movie.actors.includes(KRId))
        .map((movie) => movie.title);
      const NCMovies = actorMovies
        .filter((movie) => movie.actors.includes(NCId))
        .map((movie) => movie.title);

      let targetActor = {
        Name: actor.name,
        Movies: Movies,
        KRMovies: KRMovies,
        NCMovies: NCMovies,
      };

      finalResult.push(targetActor);
    });
    console.log(finalResult)
  };
  forrmatDate();
 
  const checkValidation=()=>{

    fetch('https://switch-yam-equator.azurewebsites.net/api/validation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-chmura-cors': '3d088e34-eda0-4f33-a114-b7345c5c5fa9'
      },
      body: JSON.stringify(finalResult)
    })
      .then(response => {
setStauts(response.status)

      })
};

  useEffect(() => {
    getMovies();
    getActors();
    checkValidation()
  }, []);

 
  


  return (
    <>
    <div>
      <h1>List of Actor's Names</h1>
      <ul>
        {finalResult.map((item, index) => (
          <li key={index}>{item.Name}</li>
        ))}
      </ul>
    </div>
    <div>
    validation's response : {status}
    </div>
    </>
  );
};
export default Home;
