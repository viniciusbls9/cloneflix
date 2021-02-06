import React, { useState, useEffect } from 'react';
import Tmdb from '../../services/tmdb';
import Header from '../../components/Header';
import Cards from '../../components/Cards';
import './styles.css';

function SerieList() {

    const [serieList, setSerieList] = useState([]);
    const [serie, setSerie] = useState('serie');
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
        let list = await Tmdb.getList('tv');
        
        // Incrementando o valor de increment + 1 para colocar o valor no número da página
        setIncrement(increment + 1);

        // Incrementando o valor da página atual + 1 para fazer a paginação
        let page = await Tmdb.paginator(list.page + increment, 'tv');
        setSerieList(page.results);

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
            let list = await Tmdb.getList('tv');
            setSerieList(list.results);


            // Pegando valor total de páginas para incluir o valor no botão da páginação
            setTotalPage(list.total_pages);
        }
        loadAll();
    }, []);

    return (
        <div>
            <Header black={blackHeader} />
            <div className="uk-container uk-container-xlarge">
                <div className="serie--container-cards uk-grid-match">
                    {serieList.map((item, key) => (
                        <Cards key={key} items={item} type={serie} />
                    ))}
                </div>
                <button onClick={morePaginator} className="serie--button-paginator">carregar mais (Pag. {currentPage} de {totalPage})</button>
            </div>
        </div>
    );
}

export default SerieList;