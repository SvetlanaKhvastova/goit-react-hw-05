import { useEffect, useState } from "react";
import { fetchMovieCredits } from "../../api/movies-api";
import { useParams } from "react-router-dom";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const [movieCast, setMovieCast] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;
    const fetchData = async () => {
      try {
        setError(false);
        setLoader(true);
        const { data } = await fetchMovieCredits(movieId);
        setMovieCast(data.cast);
        data.cast.length === 0 && setError("We don`t have any cast for this movie.");
      } catch (error) {
        setError("Whoops, something went wrong! Please try reloading this page later!");
      } finally {
        setLoader(false);
      }
    };
    fetchData();
  }, [movieId]);

  return (
    <>
      {error && <ErrorMessage txt={error} />}
      {movieCast.length > 0 && (
        <ul className={css.movie_cast_list}>
          {movieCast.map((actor) => {
            const { cast_id, profile_path, name, character } = actor;
            return (
              <li key={cast_id}>
                <img src={profile_path ? `https://image.tmdb.org/t/p/w300/${profile_path}` : "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg"} alt={name} />
                <h4>{name}</h4>
                <p>{character}</p>
              </li>
            );
          })}
        </ul>
      )}
      {loader && <Loader />}
    </>
  );
};

export default MovieCast;
