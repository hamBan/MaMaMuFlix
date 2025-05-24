import React, { useState } from 'react';
import './Grid.css';
import GridBox from './GridBox/GridBox';
import allItems from '../../data/all.json'; // API endpoint needed

const itemsPerPage = 12;
var filteredItems;

function Grid({ tag }) {
  if(tag === "all"){
    filteredItems = allItems;
  }
  else{
    filteredItems = allItems.filter(item => item.tag === tag);
  }
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({top: 0,behavior: 'smooth'});
  };

  return (
    <main className="content">
      <section className="featured">
        <h2>Currently Available</h2>
        <div className="grid">
          {currentItems.map(item => (
            <GridBox
              // key={item.id}
              imageUrl={item.imageUrl}
              altText={item.altText}
              title={item.title}
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