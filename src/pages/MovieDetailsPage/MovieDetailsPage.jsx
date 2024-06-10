import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { fetchMovieDetails } from "../../api/movies-api";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import GoBackLink from "../../components/GoBackLink/GoBackLink";
import clsx from "clsx";
import css from "./MovieDetailsPage.module.css";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const MovieDetailsPage = () => {
  const [movieDetails, setMovieDetails] = useState({});
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  const { movieId } = useParams();
  const location = useLocation();
  console.log(movieId, `movieId`);

  useEffect(() => {
    if (!movieId) return;
    const fetchData = async () => {
      try {
        setError(false);
        setLoader(true);
        const { data } = await fetchMovieDetails(movieId);
        setMovieDetails(data);
      } catch (error) {
        setError("Whoops, something went wrong! Please try reloading this page later!");
      } finally {
        setLoader(false);
      }
    };
    movieId && fetchData();
  }, [movieId]);

  return (
    <>
      <div className="container">
        {error && <ErrorMessage txt={error} />}
        <GoBackLink txt="Go back" location={location.state} />
        {loader && <Loader />}
        {movieDetails && (
          <>
            <div className={css.details_page}>
              <img alt={movieDetails.title} src={movieDetails.poster_path ? `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}` : "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg"} />
              <div>
                <h2>{movieDetails.title}</h2>
                <h3>User score</h3>
                <p>{movieDetails.vote_average}</p>
                <h3>Overview</h3>
                <p>{movieDetails.overview}</p>
                {movieDetails.genres && (
                  <>
                    <h3>Genres</h3>
                    <ul>
                      {movieDetails.genres.map((genre, id) => {
                        return <li key={id}>{genre.name}</li>;
                      })}
                    </ul>
                  </>
                )}
              </div>
            </div>
            <div className={css.addition_information}>
              <h4>Addition Information </h4>
              <nav>
                <NavLink className={buildLinkClass} to="cast" state={location.state}>
                  Cast
                </NavLink>
                <NavLink className={buildLinkClass} to="reviews" state={location.state}>
                  Reviews
                </NavLink>
              </nav>
              <Outlet />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MovieDetailsPage;
