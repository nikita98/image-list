import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios'

import ImageList from './pages/Image-list'
import Navbar from './components/Navbar'


export default function App() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  // добавление элемента в "избранное"
  const addToFavorite = (id) => {
    const newCards = cards.slice(0);
    const st = newCards.find(card => card.id === id);
    st.starred = !st.starred;
    setCards(newCards);
  }
  // получение JSON api
  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      const res = await axios.get('https://picsum.photos/v2/list');
      setCards(res.data);
      setLoading(false);
    };
    fetchCards();
  }, []);


  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path={'/'} exact
        // приходится юзать render, чтобы передать в Route props
          render={props => (
            <ImageList
              cards={cards}
              addToFavorite={addToFavorite}
              loading={loading} />
          )}
        />
        <Route path={'/Favorites'} render={props => (
          //тот же компонент, что и предыдущий, но с опцией "onlyFavorite" - в нём отображаются только избранные элементы
          <ImageList
            cards={cards}
            addToFavorite={addToFavorite}
            loading={loading}
            onlyFavorite />
        )} />
      </Switch>

    </BrowserRouter>
  );
}
