import React, { useEffect, useState } from 'react';
import '../css/App.css';
import { useMovieContext } from '../contexts/MovieContexts'; // Adjust the import path as necessary
import MovieCard from './../components/MovieCard';

function Favorites() {
    const { favorites: contextFavorites } = useMovieContext(); // Access favorites from context
    const [favorites, setFavorites] = useState([]);

    // Load favorites from localStorage on component mount
    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
    }, []);

    // Update localStorage whenever favorites change
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    // Update favorites state when context changes
    useEffect(() => {
        setFavorites(contextFavorites);
    }, [contextFavorites]);

    return (
        <div className="favorites">
            {favorites.length === 0 ? (
                <div className="favorite-empty">
                    <h2>Your favorite movies are empty!</h2>
                    <p>Add some movies to your favorite list by searching and clicking on them.</p>
                    <button>Add a movie</button>
                    <p>Or, you can use the <a href="https://www.themoviedb.org/">The Movie Database (TMDb)</a> API to add movies directly.</p>
                </div>
            ) : (
                <div className="favorites-list">
                    {favorites.map(movie => (
                        <MovieCard key={movie.id} movie={movie} /> // Render each favorite movie
                    ))}
                </div>
            )}
        </div>
    );
}

export default Favorites;