import { useEffect, useState } from "react";
import { fetchMovieCredits } from "../../api/movies-api";
import { useParams } from "react-router-dom";

const MovieCast = () => {
  const [movieCast, setMovieCast] = useState([]);

  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;
    const fetchData = async () => {
      try {
        const { data } = await fetchMovieCredits(movieId);
        setMovieCast(data.cast);
      } catch (error) {
        console.log(`object`);
      } finally {
        console.log(`object`);
      }
    };
    fetchData();
  }, [movieId]);

  return (
    <>
      {movieCast.length === 0 && <p>We don`t have any cast for this movie.</p>}

      {movieCast.length > 0 && (
        <ul>
          {movieCast.map((actor) => {
            const { cast_id, profile_path, name, character } = actor;
            return (
              <li key={cast_id}>
                <img src={profile_path ? `https://image.tmdb.org/t/p/w300/${profile_path}` : "https://via.placeholder.com/960x240"} alt={name} />
                <h4>{name}</h4>
                <p>{character}</p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default MovieCast;
