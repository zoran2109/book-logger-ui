import React from 'react';
import { SearchPage } from './ui/search-page/SearchPage';
import { SearchContextProvider } from './context/SearchContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './ui/Home';
import { MyBooks } from './ui/MyBooks';
import { Header } from './ui/Header';
import { Footer } from './ui/Footer';

export const Main = () => (
  <SearchContextProvider>
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/mybooks">
          <MyBooks />
        </Route>
        <Route path="/search">
          <SearchPage />
        </Route>
      </Switch>
      <Footer />
    </Router>
  </SearchContextProvider>
);
