import React from 'react'
import Card from '../components/Card'


export default function ImageList(props) {
  const { cards, loading, addToFavorite } = props;


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
          {cards.map(card => {
            const { id, author, starred = false, download_url: src } = card;
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
          })}
        </div>
      </div>
    </div >
  );
};