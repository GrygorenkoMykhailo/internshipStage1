import axios, { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { FetchMovieByIdAction, MOVIE_FETCH_BY_ID_REQUESTED, MOVIES_FETCH_REQUESTED } from "../redux/actions";
import { fetchMoviesSucceeded, fetchMoviesFailed, fetchMovieByIdSucceeded, fetchMovieByIdFailed } from "../redux/moviesSlice";
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

function* fetchMovieById(action: FetchMovieByIdAction): Generator{
    try{
        const response: AxiosResponse<Movie> = (yield call(axios.get, 'http://localhost:3000/movie/' + action.payload)) as AxiosResponse<Movie>;
        const movie = response.data;
        yield put(fetchMovieByIdSucceeded(movie));
    }catch(e){
        if (e instanceof Error) {
            yield put(fetchMovieByIdFailed(e.message));
        } else {
            yield put(fetchMovieByIdFailed('An unknown error occurred'));
        }
    }
}

function* movieSaga(){
    yield takeEvery(MOVIES_FETCH_REQUESTED, fetchMovies);
    yield takeEvery(MOVIE_FETCH_BY_ID_REQUESTED, fetchMovieById);
}

export default movieSaga;