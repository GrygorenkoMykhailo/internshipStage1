import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchMovieByIdRequested } from '../../redux/actions';
import { Movie } from '../../types';

export const MoviePage = () => {
    const dispatch = useAppDispatch();
    const { movies, error } = useAppSelector(state => state.movies);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) {
            dispatch(fetchMovieByIdRequested(+id));
        }
    }, [dispatch, id]);

    const movie: Movie | undefined = movies.find(movie => movie.id === Number(id));

    if (error) {
        return <p className="text-red-500">Error: {error}</p>;
    }

    if (!movie) {
        return <p className="text-gray-500">Loading...</p>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">{movie.title}</h1>
            <img src={movie.imageUrl} alt="" />
            <p>Release Year: {movie.releaseYear}</p>
            <p>Genre: {movie.genre.join(', ')}</p>
        </div>
    );
};
