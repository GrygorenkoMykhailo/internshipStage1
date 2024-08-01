import React from 'react';
import { Movie } from '../../types';
import { MovieComponent } from '../';

interface MovieListComponentProps {
    movies: Movie[];
}

export const MovieListComponent: React.FC<MovieListComponentProps> = ({ movies }) => {
    return (
        <div className="p-6">
            {movies.length === 0 ? (
                <p className="text-gray-500">No movies available</p>
            ) : (
                <div className="grid grid-cols-6 gap-6">
                    {movies.map((movie, index) => (
                        <MovieComponent key={index} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
};