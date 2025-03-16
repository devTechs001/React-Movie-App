import '../css/MovieCard.css';
import { useMovieContext } from '../contexts/MovieContexts';

function MovieCard({ movie }) {
    const { favorites, addToFavorites, removeFromFavorites } = useMovieContext();

    // Check if the movie is a favorite
    const isFavorite = favorites.some(fav => fav.id === movie.id);

    const onFavoriteClick = () => {
        if (isFavorite) {
            removeFromFavorites(movie.id); // Remove from favorites if already a favorite
        } else {
            addToFavorites(movie); // Add to favorites if not already a favorite
        }
    };

    // Construct the image URL (assuming you have a valid image path in movie.poster_path)
    const imageUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500'; // Fallback image

    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img src={imageUrl} alt={`Poster of ${movie.title}`} />
                <div className="movie-overlay">
                    <button className={`favorite-btn ${isFavorite ? "active" : ""}`} onClick={onFavoriteClick}>
                        <i className="fas fa-heart"></i> ♥
                    </button>
                </div>
            </div>

            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>Release Date: {movie.release_date}</p>
            </div>
        </div>
    );
}

export default MovieCard;