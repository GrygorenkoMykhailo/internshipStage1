import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "../types";

export interface MoviesState {
    movies: Movie[];
    error?: string;
}

const initialState: MoviesState = {
    movies: [],
    error: undefined,
};

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        fetchMoviesSucceeded: (state, action: PayloadAction<Movie[]>) => {
            state.movies = action.payload;
            state.error = undefined;
        },
        fetchMoviesFailed: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
});

export const { fetchMoviesSucceeded, fetchMoviesFailed } = moviesSlice.actions;

export default moviesSlice.reducer;
