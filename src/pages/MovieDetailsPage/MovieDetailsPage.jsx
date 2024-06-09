import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { fetchMovieDetails } from "../../api/movies-api";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import GoBackLink from "../../components/GoBackLink/GoBackLink";
import css from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const [movieDetails, setMovieDetails] = useState({});
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  const { movieId } = useParams();
  const location = useLocation();

  useEffect(() => {
    if (!movieId) return;
    const fetchData = async () => {
      try {
        setError(false);
        setLoader(true);
        const { data } = await fetchMovieDetails(movieId);
        // console.log(data, `data`);
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
        <div className={css.details_page}>
          <img alt={movieDetails.title} src={movieDetails.poster_path ? `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}` : "https://via.placeholder.com/960x240"} />
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
            <NavLink to="cast" state={location.state}>
              Cast
            </NavLink>
            <NavLink to="reviews" state={location.state}>
              Reviews
            </NavLink>
          </nav>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MovieDetailsPage;
