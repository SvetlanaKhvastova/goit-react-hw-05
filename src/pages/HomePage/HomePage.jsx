import { useEffect, useState } from "react";
import { fetchMoviesTrending } from "../../api/movies-api";
import MovieList from "../../components/MovieList/MovieList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(false);
        setLoader(true);
        const { data } = await fetchMoviesTrending();
        setTrendingMovies(data.results);
        data.total_results === 0 && setError("No results found.");
      } catch (error) {
        setError("Whoops, something went wrong! Please try reloading this page later!");
      } finally {
        setLoader(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="container">
        <h1>Trending today</h1>
        {error && <ErrorMessage txt={error} />}
        {trendingMovies.length > 0 && <MovieList movies={trendingMovies} />}
        {loader && <Loader />}
      </div>
    </>
  );
};

export default HomePage;
