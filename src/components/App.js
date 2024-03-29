import React, { useReducer, useEffect } from 'react';
import './App.css';
import Header from "./header";
import Movie from "./Movie";
import Search from "./Search";


const MOVIE_API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=4439d2f7"; // you should replace this with yours


const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
};

const reducer = (state, action) =>{
  switch (action.type){
    case "SEARCH_MOVIES_REQUEST":
      return{
        ...state,
        loading: true,
        errorMessage: null
      };
    case "SEARCH_MOVIES_SUCCESS":
      return{
        ...state,
        loading: false,
        movies: action.payload
      };
    case "SEARCH_MOVIES_FAILURE":
      return{
        ...state,
        loading: false,
        movies: action.payload
      };
    default:
      return state; 
  }
};
const App = () =>{
    const [state, dispatch] = useReducer(reducer, initialState);

      useEffect(() =>{
        
        fetch(MOVIE_API_URL)
          .then(response => response.json())
          .then(jsonResponse => {
          
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse.Search
          });
        });
      },[]);
      
    const search = searchValue =>{
        dispatch({
          type: "SEARCH_MOVIES_REQUEST"
        });
        fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4439d2f7`)
          .then(response => response.json())
          .then(jsonResponse => {
           if (jsonResponse.Response === "TRUE"){
              dispatch({
                type: "SEARCH_MOVIE_SUCCESS",
                payload: jsonResponse.Search
              });

            } else {
            dispatch({
              type: "SEARCH_MOVIES_FAILURE",
              error: jsonResponse.Error
            });
            }          
          });  
    };
      const {movies, errorMessage, loading} = state;

    
    
  return(
    <div className="App">
      <Header text="Movie DB Search" />
      <Search search={search} />
      <p className="App-Intro">Sharing a few good movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) :( 
          movies.map((movie, index) => (

            <Movie key={`${index}-${movie.Title}`} movie = {movie} />
        
          ))
          )}
      </div>
    </div>
  );
};

export default App;
