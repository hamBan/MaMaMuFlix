import React, { useEffect, useState } from 'react';
import './Grid.css';
import GridBox from './GridBox/GridBox';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
// import allItems from '../../data/all.json'; // API endpoint needed
import axios from 'axios';

const itemsPerPage = 12;
var filteredItems;

function Grid({ tag }) {
  // if(tag === "all"){
  //   filteredItems = allItems;
  // }
  // else{
  //   filteredItems = allItems.filter(item => item.tag === tag);
  // }
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({top: 0,behavior: 'smooth'});
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

  const handlePosterClick = async (uid) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/getuItem?uid=${uid}`);
      setSelectedItem(response.data);
      // console.log("Rendering VideoPlayer with:", selectedItem.videoId);
      } catch (err) {
        console.error('Failed to fetch item details', err);
      }
    // setSelectedMovie(movie);
    // window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  filteredItems = tag === "all" ? data : data.filter(item => item.tag === tag);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // Get items for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  return (
    <main className="content">
      { selectedItem ? (
        <div style={{ position: 'relative' }}>
        <button className="close-button" onClick={() => setSelectedItem(null)}>
          <img src="/assets/close.svg" alt="Close" />
        </button>
        <VideoPlayer
          title = {selectedItem.title}
          runtime = {selectedItem.duration}
          videoId={selectedItem.video}
          thumbnail={selectedItem.poster}
          genre = {selectedItem.genre}
        />
        </div>
      ) : (
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
      )}
    </main>
  );
}

export default Grid;