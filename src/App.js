import React, { useEffect, useState } from "react";
import Movie from "./components/Movie";

const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=59bb077760fa1840166f072ef6b239a7&page=1";
const IMG_API = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=59bb077760fa1840166f072ef6b239a7&query=";

function App() {
  const [ movies, setMovies ] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
     fetch(FEATURED_API)
     .then((res) => res.json())
     .then((data) => {
       setMovies(data.results);
     });

  }, []);
  const handleOnSubmit = (e) => {
      e.preventDefault();
  if(searchTerm) {
      fetch(SEARCH_API + searchTerm)
     .then((res) => res.json())
     .then((data) => {
       setMovies(data.results);
     }); 
     setSearchTerm(''); }
     
  };

  const handleOnchange = (e) => {
    setSearchTerm(e.target.value);

  }
return ( 
   <>
   
    <header>
    <h1><a href="/">The Movie Dashboard</a></h1>
    
      <form onSubmit ={handleOnSubmit}>
      <input 
    className= "search" 
    type="search" 
    placeholder="Search For Movies"
    value={searchTerm}
    onChange= {handleOnchange}
    />
      </form> 
     </header> 
     
       <div className= "movie-container">
         
         {movies.length > 0 && 
           movies.map((movie) => 
             <Movie key= {movie.id} {...movie} />)}
          </div> 
          <footer >
            <h3 style={{textAlign: "center"}}>Made with Love by <a href="https://github.com/annviik/react-app-movie" style={{color: "white", textDecoration:"none"}}>Annvii Kumar</a></h3>
          </footer>
          </>
);
}

export default App;