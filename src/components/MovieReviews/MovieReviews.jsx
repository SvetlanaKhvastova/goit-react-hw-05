import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../api/movies-api";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const MovieReviews = () => {
  const [movieReviews, setMovieReviews] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;
    const fetchData = async () => {
      try {
        setError(false);
        setLoader(true);
        const { data } = await fetchMovieReviews(movieId);
        setMovieReviews(data.results);
        data.total_results === 0 && setError("We don`t have any reviews for this movie.");
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
      {movieReviews.length > 0 && (
        <ul>
          {movieReviews.map((review) => {
            const { id, author, content } = review;
            return (
              <li key={id}>
                <h4>{author}</h4>
                <p>{content}</p>
              </li>
            );
          })}
        </ul>
      )}
      {loader && <Loader />}
    </>
  );
};

export default MovieReviews;
