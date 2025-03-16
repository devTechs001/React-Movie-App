
import {Routes, Route} from 'react-router-dom';
import './css/App.css'
import MovieCard from './components/MovieCard';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import NavBar from './components/NavBar';
import { MovieProvider } from './contexts/MovieContexts';

function App() {

  return (
    <MovieProvider>
      <NavBar />
   <div className="main-content">
      <Routes>
         <Route exact path="/" element={<Home />} />
         <Route exact path="favorites" element={<Favorites />} />
      </Routes>
   </div>
   </MovieProvider>
  );
}


export default App
