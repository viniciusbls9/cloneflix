import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function Cards({ items, type }) {

    return (
        <Link to={type === 'serie' ? `/details/tv/${items.id}` : `/details/movie/${items.id}`}>
            <div className="serie--margin-card">
                <div className="serie--single-card">
                    <img src={`https://image.tmdb.org/t/p/w220_and_h330_face${items.poster_path}`} alt="" />
                    <div className="serie--percent">
                        <p><b>{items.vote_average} %</b></p>
                    </div>
                    <h2>{type === 'serie' ? items.name : items.title}</h2>
                </div>
            </div>
        </Link>
    );
}

export default Cards;