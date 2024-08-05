import React from 'react';
import { Movie } from '../../types';
import { useNavigate } from 'react-router';

interface MovieComponentProps {
    movie: Movie;
}

export const MovieComponent: React.FC<MovieComponentProps> = ({ movie }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/movie/' + movie.id);
    }

    return (
        <div className="max-w-100 rounded overflow-hidden shadow-lg bg-white cursor-pointer" onClick={handleClick}>
            <img className="w-full h-48 object-cover h-auto" src={movie.imageUrl} alt={movie.title} />
            <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
                <p className="text-gray-700 text-base">Release Year: {movie.releaseYear}</p>
                <div className="mt-2">
                    <h3 className="text-lg font-semibold">Genres:</h3>
                    <ul className="list-disc list-inside text-gray-600">
                        {movie.genre.map((g, index) => (
                            <li key={index}>{g}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};