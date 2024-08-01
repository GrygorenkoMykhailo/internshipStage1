import { configureStore } from "@reduxjs/toolkit";
import moviesSlice from "./moviesSlice";
import createSagaMiddleware from "@redux-saga/core";
import movieSaga from '../sagas/sagas'

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        movies: moviesSlice,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(sagaMiddleware)
});

sagaMiddleware.run(movieSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;