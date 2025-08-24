import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios';
import './Search.css';
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';
import GridBox from '../Grid/GridBox/GridBox';
// import VideoPlayer from '../VideoPlayer/VideoPlayer';
import { useNavigate } from 'react-router-dom';

function Search() {
    
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    const handleKeyPress = async (e) => {
        if (e.key === 'Enter') {

            try {
                const response = await axios.get(`http://localhost:8080/api/getItem?title=${query}`);
                if(response.status === 200 && response.data)
                {
                    setResults(response.data);
                    setError('');
                }
                
                if(response.data.length === 0) {
                    setResults([]);
                    setError('No items found. Try searching for something else');
                }
            }
        
            catch (error) {
                setError('An error occured. Please try again');
            }
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        if(value === '') {
            setResults([]);
            setError('');
        }
    };
    
    const handlePosterClick = (item) => {
        if(isLoggedIn)
            navigate(`/watch/${item}`);

        else
            navigate('/login')
    };


  return (
    <div className='search'>
        <div className='search-input-wrapper'>
            <SearchIcon className='icon-search'/>
            <input type="search" placeholder="Search movies, shows" className='search-bar' value={query} onChange={handleInputChange} onKeyDown={handleKeyPress}/>
        </div>
        <>
        { error && <p className="error"> {error} </p> }
        { results.length > 0 && <div className="results-grid">
            {
            results.map((item, index) => (
                <GridBox key={index} imageUrl={item.poster} altText={item.title} title={item.title} onClick={() => handlePosterClick(item.uid)}/>
            ))
            }
            </div>
        }
        </>
    </div>
  )
}

export default Search