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
  const [currentFavoritePage, setCurrentFavoritePage] = useState(1);

  const [loading, setLoading] = useState(true);
  // Переменные для пагинации
  const favoriteCardsLength = favoriteCards.length
  const [cardsPerPage] = useState(6);

  // Обновляем избранное
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

  // Это то, что мы показываем на странице избранного.
  useEffect(() => {
    const CurrentFavoriteCardsSetter = () => {
      const newFavoriteCards = favoriteCards.slice(((currentFavoritePage - 1) * cardsPerPage), currentFavoritePage * cardsPerPage)
      setCurrentFavoriteCards(newFavoriteCards)
    }
    CurrentFavoriteCardsSetter()
  }, [currentFavoritePage, favoriteCards, cardsPerPage]);


  // Добавление элемента в "избранное"
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
    favoriteCardsSetter() // Вот тут вызываеи обновление избранного
  }



  // Меняем страницу. Если "Favorite" - меняем страницу в избранном
  const paginate = (page, favorite) => {
    favorite ? currentFavoritePageSetter(page) : cuurentPageSetter(page)
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

  const currentFavoritePageSetter = (page) => {
    if (currentFavoritePage === page) { return }
    setCurrentFavoritePage(page)
  }

  // получение JSON api
  const fetchCards = async (page) => {
    setLoading(true);
    const res = await axios.get(`https://picsum.photos/v2/list?page=${page}&limit=${cardsPerPage}`);
    return res.data;
  };

  // устанавливаем начальную страницу
  useEffect(() => {
    paginate(currentPage)
  }, []);



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
            <div>
              <ImageList
                currentPage={currentFavoritePage}
                cards={currentFavoriteCards}
                addToFavorite={addToFavorite}
                loading={loading}
                onlyFavorite />
              <Pagination
                currentPage={currentFavoritePage}
                cardsPerPage={cardsPerPage}
                length={favoriteCardsLength}
                paginate={(number) => paginate(number, true)}//передаёт true, потому что избранный
              />
            </div>
          )} />
        </Switch>
      </BrowserRouter>
    )
  }
}
