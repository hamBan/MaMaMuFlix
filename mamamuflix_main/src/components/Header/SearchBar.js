import { Link } from 'react-router-dom';
import { ReactComponent as SearchIcon } from '../../assets/icons/search-icon.svg';
import './SearchBar.css'

function SearchBar() {

  return (
    <div className='search-container'>
      <Link to="/Search"> <SearchIcon className='search-icon'/> </Link>
    </div>
  )
}

export default SearchBar