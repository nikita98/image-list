import React, { useState, useEffect } from 'react'
import Card from '../components/Card'
import Pagination from '../components/Pagination'

export default function ImageList(props) {
  const { cards, onlyFavorite, loading, addToFavorite} = props;

  const displayedCards = onlyFavorite ? cards.filter(card => card.starred) : cards;
  // переменные для пагинации
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(6);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = displayedCards.slice(indexOfFirstCard, indexOfLastCard);
  // переходим на 1ю страницу пагинации
  useEffect(() => {
    setCurrentPage(1);
  }, [onlyFavorite]);

  function paginate(pageNumber) {
    setCurrentPage(pageNumber);
  }

  if (loading) {
    return (
      <div className="container mt-5">
        <h2>loading...</h2>
      </div>
    )
  }

  return (
    <div>
      <div className="container">
        <div className="image-list mt-5">
          {currentCards.map(card => {
            const { id, author, starred = false, download_url: src } = card;
            if (!(onlyFavorite && !starred)) {
              return (
                <div className="image-list__item mb-3" key={id}>
                  <Card
                    card={card}
                    author={author}
                    starred={starred}
                    src={src}
                    addToFavorite={() => addToFavorite(id)}
                  ></Card>
                </div>
              )
            }
            else return null
          })}
        </div>
        <div className="container">
          {/* Если карочек слишком мало, пагинации не будет */}
          {(displayedCards.length > cardsPerPage) &&
            <Pagination
              cardsPerPage={cardsPerPage}
              totalCards={displayedCards.length}
              paginate={paginate}
            />}
        </div>
      </div>
    </div >
  );
};