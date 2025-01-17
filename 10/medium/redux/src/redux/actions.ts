import { Movie } from "../types";

export const MOVIES_FETCH_REQUESTED = 'MOVIES_FETCH_REQUESTED';
export const MOVIES_FETCH_SUCCEEDED = 'MOVIES_FETCH_SUCCEEDED';
export const MOVIES_FETCH_FAILED = 'MOVIES_FETCH_FAILED';
export const MOVIE_FETCH_BY_ID_REQUESTED = 'MOVIE_FETCH_BY_ID_REQUESTED';

export type FetchMoviesRequestedAction  = {
    type: typeof MOVIES_FETCH_REQUESTED;
}

export type FetchMovieByIdAction = {
    type: typeof MOVIE_FETCH_BY_ID_REQUESTED;
    payload: number;
}

export type FetchMoviesSucceededAction = {
    type: typeof MOVIES_FETCH_SUCCEEDED;
    movies: Movie[];
}

export type FetchMoviesFailedAction = {
    type: typeof MOVIES_FETCH_FAILED;
    message: string;
}

export type MoviesActionTypes =
    | FetchMoviesRequestedAction
    | FetchMoviesSucceededAction
    | FetchMoviesFailedAction;

export const fetchMoviesRequested = (): FetchMoviesRequestedAction => ({
    type: MOVIES_FETCH_REQUESTED,
});

export const fetchMovieByIdRequested = (id: number) => ({
    type: MOVIE_FETCH_BY_ID_REQUESTED,
    payload: id
});

export const fetchMoviesSucceeded = (movies: Movie[]): FetchMoviesSucceededAction => ({
    type: MOVIES_FETCH_SUCCEEDED,
    movies,
});

export const fetchMoviesFailed = (message: string): FetchMoviesFailedAction => ({
    type: MOVIES_FETCH_FAILED,
    message,
});