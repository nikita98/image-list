import React, { useState, useEffect } from 'react'
import Card from '../components/Card'
import Pagination from '../components/Pagination'

export default function ImageList(props) {
  const cards = props.cards;
  const onlyFavorite = props.onlyFavorite
  const displayedCards = onlyFavorite ? cards.filter(card => card.starred) : cards;
  // console.log(displayedCards);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(6);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = displayedCards.slice(indexOfFirstCard, indexOfLastCard);
  console.log(currentCards.length);

  useEffect(() => {
    setCurrentPage(1);
  }, [onlyFavorite]);
  function paginate(pageNumber) {
    console.log(pageNumber);
    setCurrentPage(pageNumber);
  }

  return (
    <div className="ImageList" >
      <div className="container">
        <div className="image-list mt-5">
          {
            currentCards.map(card => {
              const { id, author, starred = false, download_url } = card;
              const addToFavorite = props.addToFavorite
              if (!(onlyFavorite && !starred)) {
                return (
                  <div className="image-list__item mb-3" key={id}>
                    <Card
                      card={card}
                      author={author}
                      starred={starred}
                      src={download_url}
                      addToFavorite={() => addToFavorite(id)}
                    ></Card>
                  </div>
                )
              }
              else return null
            })
          }

        </div>
        <div className="container">
          {(displayedCards.length > cardsPerPage) && <Pagination
            cardsPerPage={cardsPerPage}
            totalCards={displayedCards.length}
            paginate={paginate}
          />}
        </div>
      </div>
    </div >
  );
};