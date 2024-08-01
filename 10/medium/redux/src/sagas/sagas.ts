import axios, { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { MOVIES_FETCH_REQUESTED } from "../redux/actions";
import { fetchMoviesSucceeded, fetchMoviesFailed } from "../redux/moviesSlice";
import { Movie } from "../types";

function* fetchMovies(): Generator {
    try {
        const response: AxiosResponse<Movie[]> = (yield call(axios.get, 'http://localhost:3000/movies')) as AxiosResponse<Movie[]>;
        const movies = response.data;
        yield put(fetchMoviesSucceeded(movies));
    } catch (e) {
        if (e instanceof Error) {
            yield put(fetchMoviesFailed(e.message));
        } else {
            yield put(fetchMoviesFailed('An unknown error occurred'));
        }
    }
}

function* movieSaga(){
    yield takeEvery(MOVIES_FETCH_REQUESTED, fetchMovies);
}

export default movieSaga;