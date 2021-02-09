import React, { useState, useEffect } from 'react';
import Tmdb from '../../services/tmdb';
import Header from '../../components/Header';
import Cards from '../../components/Cards';
import './styles.css';

function MovieList() {

    const [movieList, setMovieList] = useState([]);
    const [increment, setIncrement] = useState(1);
    const [blackHeader, setBlackHeader] = useState(false);
    const [currentPage, setcurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState();
    

    useEffect(() => {
        const scrollListener = () => {
            if (window.scrollY > 70) {
                setBlackHeader(true);
            } else {
                setBlackHeader(false);
            }
        }
        window.addEventListener('scroll', scrollListener);

        return () => {
            window.removeEventListener('scroll', scrollListener);
        }
    }, []);

    const morePaginator = async () => {
        // pegando lista total de filmes
        let list = await Tmdb.getList('movie');
        
        // Incrementando o valor de increment + 1 para colocar o valor no número da página
        setIncrement(increment + 1);

        // Incrementando o valor da página atual + 1 para fazer a paginação
        let page = await Tmdb.paginator(list.page + increment, 'movie');
        setMovieList(page.results);

        // Pegando valor da página atual para incluir o valor no botão da páginação
        setcurrentPage(page.page);

        // Fazendo o scroll da página para a paginação
        window.scroll({
            top: 0,
            behavior: 'smooth'
          });
    }

    useEffect(() => {
        const loadAll = async () => {
            // pegando lista total de filmes
            let list = await Tmdb.getList('movie');
            setMovieList(list.results);

            // Pegando valor total de páginas para incluir o valor no botão da páginação
            setTotalPage(list.total_pages);
        }
        loadAll();
    }, []);

    return (
        <div>
            <Header black={blackHeader} />
            <div className="uk-container uk-container-xlarge">
                <div className="movie--container-cards uk-grid-match">
                    {movieList.map((item, key) => (
                        <Cards key={key} items={item} />
                    ))}
                </div>
                <button onClick={morePaginator} className="movie--button-paginator">carregar mais (Pag. {currentPage} de {totalPage})</button>
            </div>
        </div>
    );
}

export default MovieList;