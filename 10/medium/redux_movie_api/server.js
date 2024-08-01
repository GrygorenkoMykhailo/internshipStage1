const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

const movies = [
    {
        id: 1,
        title: 'Inception',
        releaseYear: 2010,
        genre: ["Sci-fi", "Action", "Adventure"],
        imageUrl: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg',
    },
    {
        id: 2,
        title: 'Titanic',
        releaseYear: 1997,
        genre: ["Romantic", "Action"],
        imageUrl: 'https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg',
    },
    {
        id: 3,
        title: 'The Avengers',
        releaseYear: 2012,
        genre: ["Sci-fi", "Action", "Adventure"],
        imageUrl: 'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
    },
    {
        id: 4,
        title: 'The Hangover',
        releaseYear: 2009,
        genre: ["Comedy"],
        imageUrl: 'https://m.media-amazon.com/images/M/MV5BNGQwZjg5YmYtY2VkNC00NzliLTljYTctNzI5NmU3MjE2ODQzXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
    },
    {
        id: 1,
        title: 'Inception',
        releaseYear: 2010,
        genre: ["Sci-fi", "Action", "Adventure"],
        imageUrl: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg',
    },
    {
        id: 2,
        title: 'Titanic',
        releaseYear: 1997,
        genre: ["Romantic", "Action"],
        imageUrl: 'https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg',
    },
    {
        id: 3,
        title: 'The Avengers',
        releaseYear: 2012,
        genre: ["Sci-fi", "Action", "Adventure"],
        imageUrl: 'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
    },
    {
        id: 4,
        title: 'The Hangover',
        releaseYear: 2009,
        genre: ["Comedy"],
        imageUrl: 'https://m.media-amazon.com/images/M/MV5BNGQwZjg5YmYtY2VkNC00NzliLTljYTctNzI5NmU3MjE2ODQzXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
    },
    {
        id: 1,
        title: 'Inception',
        releaseYear: 2010,
        genre: ["Sci-fi", "Action", "Adventure"],
        imageUrl: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg',
    },
    {
        id: 2,
        title: 'Titanic',
        releaseYear: 1997,
        genre: ["Romantic", "Action"],
        imageUrl: 'https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg',
    },
    {
        id: 3,
        title: 'The Avengers',
        releaseYear: 2012,
        genre: ["Sci-fi", "Action", "Adventure"],
        imageUrl: 'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
    },
    {
        id: 4,
        title: 'The Hangover',
        releaseYear: 2009,
        genre: ["Comedy"],
        imageUrl: 'https://m.media-amazon.com/images/M/MV5BNGQwZjg5YmYtY2VkNC00NzliLTljYTctNzI5NmU3MjE2ODQzXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
    },
]

app.get('/movies', (req, res) => {
    console.log('request');
    res.json(movies);
});

app.listen(3000, () => {
    console.log('server started');
});