import React from 'react';

export default function Pagination({ cardsPerPage, length, currentPage, paginate }) {
  const pageNumbers = [];

  if (length <= cardsPerPage) { }
  else if (length / cardsPerPage < 11) {
    for (let i = 1; i <= Math.ceil(length / cardsPerPage); i++) {
      pageNumbers.push(i);
    }
  }
  else {
    let j = (((currentPage - 5) < 1) ? 1 : currentPage - 5);
    for (let i = 0; i <= 10; i++) {
      pageNumbers.push(j);
      j++
    }
  }


  return (
    <div className="container">
      <nav>
        <ul className='pagination'>
          {pageNumbers.map(number => (
            <li key={number} className={number === currentPage ? 'page-item active' : 'page-item'}>
              <button onClick={() => paginate(number)} className='page-link'>
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

