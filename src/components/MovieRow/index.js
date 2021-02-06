import React, { useState } from 'react';
import next from '../../assets/next.svg';
import previous from '../../assets/left-arrow.svg';
import './styles.css';

function MovieRow ({ title, items }) {
    const [scrollX, setScrollX] = useState(0);

    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth / 2);
        if(x > 0) {
            x = 0;
        }
        setScrollX(x);
    }

    const handleRightArrow = () => {
        let x = scrollX - Math.round(window.innerWidth / 2);
        let listw = items.results.length * 150;
        if((window.innerWidth - listw) > x) {
            x = (window.innerWidth - listw) - 60;
        }
        setScrollX(x);
    }

  return (
    <div className="movieRow">
        <h2>{title}</h2>

        <div className="movieRow--left" onClick={handleLeftArrow}>
            <img src={previous} alt="" width="30px" />
        </div>

        <div className="movieRow--right" onClick={handleRightArrow}>
            <img src={next} alt="" width="30px" />
        </div>

        <div className="movieRow--listarea">
            <div className="movieRow--list" style={{ marginLeft: scrollX, width: items.results.length * 150 }}>
                {items.results.length > 0 && items.results.map((item, key) => (
                    <div className="movieRow--item" key={key}>
                        <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title} key={key} />
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}


export default MovieRow;