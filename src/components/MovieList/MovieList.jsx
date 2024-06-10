import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <>
      <ul className={css.movies_list}>
        {movies.map((movie) => {
          const { id, original_title, poster_path } = movie;

          return (
            <li key={id} className={css.movies_item}>
              <Link to={`/movies/${id}`} state={location}>
                <img src={poster_path ? `https://image.tmdb.org/t/p/w300/${poster_path}` : "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg"} alt={original_title} />
                <h2>{original_title}</h2>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default MovieList;
