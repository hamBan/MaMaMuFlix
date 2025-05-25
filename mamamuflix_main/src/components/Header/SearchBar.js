import React, { useState, useRef, useEffect } from 'react'
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';
import './SearchBar.css'

function SearchBar() {

    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const searchRef = useRef(null);
    
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            console.log('Search for:', query);
      // Trigger search here
    }
  };

    const toggleSearch = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  return (
    <div className='search' ref={searchRef}>
        <button className='search-toggle' onClick={toggleSearch}>
            <SearchIcon className='search-icon'/>
        </button>

        {isOpen && (
            <div className='search-bar'>
                <input type="text" placeholder="Search movies, shows" name="" id="" value={query}
                onChange={(e) => setQuery(e.target.value)} onKeyDown={handleKeyPress}/>
            </div>
        )}
    </div>
  )
}

export default SearchBar