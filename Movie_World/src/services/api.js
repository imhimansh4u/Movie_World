const apiKey = import.meta.env.VITE_API_KEY;

const base_url = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
  const response = await fetch(`${base_url}/movie/popular?api_key=${apiKey}`);
  const data = await response.json();
  return data.results;
};

export const searchMovies = async (query) => {
  const response = await fetch(
    `${base_url}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
      query
    )}`
  );
  const data = await response.json();
  return data.results;
};
