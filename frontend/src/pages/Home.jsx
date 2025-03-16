import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import "../css/Home.css";
import { searchMovies, getPopularMovies } from "../services/api";

function Home() {
    const [searchQuery, setSearchQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            } catch (error) {
                console.error("Error loading popular movies", error);
            } finally {
                setLoading(false);
            }
        };

        loadPopularMovies();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const searchedMovies = await searchMovies(searchQuery);
            setMovies(searchedMovies);
        } catch (error) {
            console.error("Error searching movies", error);
        }
        setSearchQuery('');
    };

    if (loading) {
        return <div className="loading">Loading...</div>; // Corrected loading state
    }

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search movies..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">Search</button>
            </form>

            <div className="movies-grid">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
}

export default Home;