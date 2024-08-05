import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchMoviesRequested } from "../../redux/actions";
import { MovieListComponent, SelectComponent } from "../../components";
import { Genre } from "../../types";

export const IndexPage = () => {
    const dispatch = useAppDispatch();
    const { movies, error } = useAppSelector(state => state.movies);

    const [sortOption, setSortOption] = useState<'name' | 'releaseYear'>('name');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);

    useEffect(() => {
        dispatch(fetchMoviesRequested());
    }, [dispatch]);

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOption(event.target.value as 'name' | 'releaseYear');
    };

    const handleSortOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOrder(event.target.value as 'asc' | 'desc');
    };

    const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;

        if (value === 'Default') {
            setSelectedGenres([]);
        } else {
            setSelectedGenres(prev =>
                prev.includes(value as Genre) ? prev.filter(g => g !== value) : [...prev, value as Genre]
            );
        }
    };

    const filteredAndSortedMovies = movies
        .filter(movie => selectedGenres.length === 0 || selectedGenres.every(genre => movie.genre.includes(genre)))
        .sort((a, b) => {
            if (sortOption === 'name') {
                return sortOrder === 'asc'
                    ? a.title.localeCompare(b.title)
                    : b.title.localeCompare(a.title);
            } else {
                return sortOrder === 'asc'
                    ? a.releaseYear - b.releaseYear
                    : b.releaseYear - a.releaseYear;
            }
        });

    return (
        <div className="p-6"> 
            <div className="p-6 w-96">
                <h1 className="text-2xl font-bold mb-4">Movie List</h1>
                <SelectComponent value={sortOption} onChange={handleSortChange} options={[
                        { value: 'name', label: 'Name' },
                        { value: 'releaseYear', label: 'Release Year' }
                    ]} label="Sort by" />
                
                <SelectComponent value={sortOrder} onChange={handleSortOrderChange}  options={[
                        { value: 'asc', label: 'Ascending' },
                        { value: 'desc', label: 'Descending' }
                    ]} label="Order" />

                <SelectComponent value={selectedGenres} onChange={handleGenreChange} options={[
                        { value: 'Default', label: 'Default' },
                        { value: 'Sci-fi', label: 'Sci-fi' },
                        { value: 'Action', label: 'Action' },
                        { value: 'Adventure', label: 'Adventure' },
                        { value: 'Romantic', label: 'Romantic' },
                        { value: 'Comedy', label: 'Comedy' }
                    ]} label="Filter by Genre" multiple />
            </div>
            {error && <p className="text-red-500">Error: {error}</p>}
            {filteredAndSortedMovies.length === 0 ? 
                <p className="text-gray-500">No movies available</p> 
                : 
                <MovieListComponent movies={filteredAndSortedMovies} />}
        </div>
    );
};