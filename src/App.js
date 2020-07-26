import React, { useState } from 'react';
import { BrowserRouter, Router, Switch, Route } from 'react-router-dom';
import ImageList from './pages/Image-list'
import Navbar from './components/Navbar'
import api from './api.json'
export default function App() {
  const [cards, setCards] = useState(api);
  const changedId = 0;
  const addToFavorite = (id) => {
    console.log("new id =" + id);
    const newCards = cards.slice(0);
    // const newCards = [...cards];
    const st = newCards.find(card => card.id === id);
    st.starred = !st.starred;
    setCards(newCards);
  }
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path={'/'} exact
          render={props => (
            <ImageList cards={cards} addToFavorite={addToFavorite} />
          )}
        />
        <Route path={'/Favorites'} render={props => (
          <ImageList cards={cards} addToFavorite={addToFavorite} onlyFavorite/>
        )} />
      </Switch>

    </BrowserRouter>
  );
}
