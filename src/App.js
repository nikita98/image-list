import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios'

import ImageList from './pages/Image-list'
import Pagination from './components/Pagination'
import Navbar from './components/Navbar'


export default function App() {
  const [allCards, setAllCards] = useState([]);
  const [favoriteCards, setFavoriteCards] = useState([]);
  const [currentFavoriteCards, setCurrentFavoriteCards] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [favoritePage, setFavoritePage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [cardsPerPage] = useState(6);

  const favoriteCardsSetter = () => {
    let newFavoriteCards = [];
    for (let i = 0; i < allCards.length; i++) {
      const cards = allCards[i];
      if (cards) {
        for (let j = 0; j < cards.length; j++) {
          const card = cards[j];
          if (card.starred) {
            newFavoriteCards.push(card);
          }
        }
      }
    }
    setFavoriteCards(newFavoriteCards)
  }
  const CurrentFavoriteCardsSetter = () => {
    // const newFavoriteCards = favoriteCards.slice(((favoritePage - 1) * cardsPerPage), cardsPerPage)
    const newFavoriteCards = favoriteCards.slice(((favoritePage - 1) * cardsPerPage), favoritePage * cardsPerPage)
    setCurrentFavoriteCards(newFavoriteCards)
  }
  // переменные для пагинации
  const favoriteCardsLength = favoriteCards.length
  // добавление элемента в "избранное"
  const addToFavorite = (id) => {
    let newCards = allCards.slice();
    for (let i = 0; i < newCards.length; i++) {
      const cards = allCards[i]
      if (cards) {
        for (let j = 0; j < cards.length; j++) {
          const card = cards[j];
          if (card.id === id) {
            card.starred = !card.starred
          }
        }
      }
    }
    setAllCards(newCards);
    // setFavoriteCards(newFavoriteCards);
  }

  // меняем страницу
  const paginate = (page, favorite) => {
    favorite ? favoritePageSetter(page) : cuurentPageSetter(page)
  }

  const cuurentPageSetter = (page) => {
    if (allCards[page - 1]) {
      setCurrentPage(page);
      return
    }
    fetchCards(page).then((data) => {
      let newCards = allCards.slice();
      newCards[page - 1] = data;
      setAllCards(newCards);
      setLoading(false)
    })
    setCurrentPage(page)
  }

  const favoritePageSetter = (page) => {

    if (favoritePage === page) { return }
    setFavoritePage(page)
  }

  // получение JSON api
  const fetchCards = async (page) => {
    setLoading(true);
    const res = await axios.get(`https://picsum.photos/v2/list?page=${page}&limit=6`);
    return res.data;
  };

  // устанавливаем начальную страницу
  useEffect(() => {
    paginate(currentPage)
  }, []);

  useEffect(() => {
    favoriteCardsSetter()
  }, [allCards]);

  useEffect(() => {
    CurrentFavoriteCardsSetter()
  }, [favoritePage, favoriteCards]);


  if (loading) {
    return (
      <div className="loading">
        <h2>loading...</h2>
      </div>
    )
  }
  else {
    return (
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path={'/'} exact
            // приходится юзать render, чтобы передать в Route props
            render={props => (
              <div>
                <ImageList
                  paginate={paginate}
                  cards={allCards[currentPage - 1]}
                  addToFavorite={addToFavorite}
                  loading={loading} />
                <Pagination
                  currentPage={currentPage}
                  cardsPerPage={cardsPerPage}
                  paginate={(number) => paginate(number)}
                />
              </div>
            )}
          />
          <Route path={'/Favorites'} render={props => (
            //тот же компонент, что и предыдущий, но с опцией "onlyFavorite" - в нём отображаются только избранные элементы
            <div>
              <ImageList
                currentPage={favoritePage}
                cards={currentFavoriteCards}
                addToFavorite={addToFavorite}
                loading={loading}
                onlyFavorite />
              <Pagination
                currentPage={favoritePage}
                cardsPerPage={cardsPerPage}
                length={favoriteCardsLength}
                paginate={(number) => paginate(number, true)}
              />
            </div>
          )} />
        </Switch>
      </BrowserRouter>
    )
  }
}
