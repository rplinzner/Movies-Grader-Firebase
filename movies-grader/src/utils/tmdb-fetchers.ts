import { tmdbApiKey } from "../constants";
import { Department, TmdbResponse } from "../types/tmdb-response";
import { TmdbConfiguration } from "../types/TmdbConfiguration";

export const fetchConfiguration = async () => {
  const url = `https://api.themoviedb.org/3/configuration?api_key=${tmdbApiKey}`;
  const response = await fetch(url);
  const {
    images: { base_url },
  } = (await response.json()) as TmdbConfiguration;
  return base_url;
};

export const fetchMovieInfo = async (baseUrl: string, movieId: number) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${tmdbApiKey}&language=pl&append_to_response=credits`;

  const response = await fetch(url);
  const {
    poster_path,
    credits,
    overview,
    title,
  } = (await response.json()) as TmdbResponse;

  return {
    poster: baseUrl + "w500" + poster_path,
    directors: credits.crew.filter(
      (e) => e.department === Department.Directing
    ),
    overview,
    title,
  };
};
