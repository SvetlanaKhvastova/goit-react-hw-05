import axios from "axios";

const api_read_access_token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYTY4YTdhZjA2MGY1ZTlmN2I3ZWVmY2U5NDU2MWYzZSIsInN1YiI6IjYwNTExYTg1NTk0Yzk0MDAyOGQ5YjhlZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4VYWkMlmBG0o6rNaaqui1joclAfZwiDDpYgn7m52biI";
const headers = {
  Authorization: `Bearer ${api_read_access_token}`,
  accept: "application / json",
};

export const fetchMoviesTrending = () => {
  const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";

  const options = {
    headers: headers,
  };

  return axios.get(url, options);
};

export const fetchSearchMovie = (search) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`;

  const options = {
    headers: headers,
  };

  return axios.get(url, options);
};

export const fetchMovieDetails = (movie_id) => {
  const url = `https://api.themoviedb.org/3/movie/${movie_id}?language=en-US`;

  const options = {
    headers: headers,
  };

  return axios.get(url, options);
};

export const fetchMovieCredits = (movie_id) => {
  const url = `https://api.themoviedb.org/3/movie/${movie_id}/credits?language=en-US`;

  const options = {
    headers: headers,
  };

  return axios.get(url, options);
};

export const fetchMovieReviews = (movie_id) => {
  const url = `https://api.themoviedb.org/3/movie/${movie_id}/reviews?language=en-US&page=1`;

  const options = {
    headers: headers,
  };

  return axios.get(url, options);
};
