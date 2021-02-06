import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/Home';
import SerieList from './pages/SerieList';
import MovieList from './pages/MovieList';
import Details from './pages/Details';

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Home} />
            <Route path="/series" component={SerieList} />
            <Route path="/filmes" component={MovieList} />
            <Route path="/details/:type/:id" component={Details} />
        </BrowserRouter>
    );
}

export default Routes;