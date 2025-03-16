import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    // Load favorites from localStorage when the component mounts
    useEffect(() => {
        const storedFavs = localStorage.getItem('favorite');
        if (storedFavs) {
            setFavorites(JSON.parse(storedFavs)); // Correctly parse the stored favorites
        }
    }, []); // Empty dependency array to run only once on mount

    // Function to add a movie to favorites
    const addToFavorites = (movie) => {
        setFavorites((prevFavorites) => {
            // Check if the movie is already in favorites
            if (!prevFavorites.some(fav => fav.id === movie.id)) {
                return [...prevFavorites, movie]; // Add movie if not already a favorite
            }
            return prevFavorites; // Return existing favorites if movie is already there
        });
    };

    // Function to remove a movie from favorites
    const removeFromFavorites = (movieId) => {
        setFavorites((prevFavorites) => 
            prevFavorites.filter(fav => fav.id !== movieId) // Filter out the movie to be removed
        );
    };

    // Save favorites to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('favorite', JSON.stringify(favorites));
    }, [favorites]); // Run this effect whenever favorites change

    return (
        <MovieContext.Provider value={{
            favorites,
            setFavorites,
            addToFavorites, // Provide the addToFavorites function
            removeFromFavorites, // Provide the removeFromFavorites function
        }}>
            {children}
        </MovieContext.Provider>
    );
};

export default MovieContext;