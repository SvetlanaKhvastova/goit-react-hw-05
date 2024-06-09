import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../api/movies-api";

const MovieReviews = () => {
  const [movieReviews, setMovieReviews] = useState([]);

  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;
    const fetchData = async () => {
      try {
        const { data } = await fetchMovieReviews(movieId);
        setMovieReviews(data.results);
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
      {movieReviews.length === 0 && <p>We don`t have any reviews for this movie.</p>}

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
    </>
  );
};

export default MovieReviews;
