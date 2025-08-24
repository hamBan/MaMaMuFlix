import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './Grid.css';
import GridBox from './GridBox/GridBox';
import axios from 'axios';

const itemsPerPage = 12;
var filteredItems;

function Grid({ tag }) {
  
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data");
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get('http://localhost:8080/api/getLoadingItems');
        setData(response.data);
      } catch (err) {
        setError('Failed to load data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePosterClick = (uid) => {
    if(isLoggedIn)
      navigate(`/watch/${uid}`);

    else
      navigate('/login');
  };


  filteredItems = tag === "all" ? data : data.filter(item => item.tag === tag);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // Get items for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  return (
    <main className="content">
      <section className="featured">
        {/* <h2>Currently Available</h2> */}
        <div className="grid">
          {currentItems.map(item => (
            <GridBox
              key={item.uid}
              imageUrl={item.poster}
              altText={item.title}
              title={item.title}
              onClick={() => handlePosterClick(item.uid)}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={currentPage === pageNumber ? 'active' : ''}
                >
                  {pageNumber}
                </button>
              )
            )}
          </div>
        )}
      </section>
    </main>
  );
}

export default Grid;