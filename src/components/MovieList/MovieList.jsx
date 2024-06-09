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
                <img src={poster_path ? `https://image.tmdb.org/t/p/w300/${poster_path}` : "https://via.placeholder.com/960x240"} alt={original_title} />
                <span>{original_title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default MovieList;
