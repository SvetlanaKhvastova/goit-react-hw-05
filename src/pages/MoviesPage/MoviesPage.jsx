import { useEffect, useState } from "react";
import { fetchSearchMovie } from "../../api/movies-api";
import SearchBar from "../../components/SearchBar/SearchBar";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { useSearchParams } from "react-router-dom";

const MoviesPage = () => {
  const [movieSearch, setMovieSearch] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  const [params, setParams] = useSearchParams();
  // console.log(params.get("query"), `params`);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(false);
        setLoader(true);
        const { data } = await fetchSearchMovie(params.get("query"));
        setMovieSearch(data.results);
        data.total_results === 0 && setError("No results found.");
      } catch (error) {
        setError("Whoops, something went wrong! Please try reloading this page later!");
      } finally {
        setLoader(false);
      }
    };
    params.get("query") && fetchData();
  }, [params]);

  const handleSearch = async (searchQuery) => {
    params.set("query", searchQuery);
    setParams(params);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} params={params.get("query")} />
      <div className="container">
        {error && <ErrorMessage txt={error} />}
        {movieSearch.length > 0 && <MovieList movies={movieSearch} />}
        {loader && <Loader />}
      </div>
    </>
  );
};

export default MoviesPage;
