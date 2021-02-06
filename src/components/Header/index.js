import React from 'react';
import netflix from '../../assets/netflix.png';
import loupe from '../../assets/loupe.svg';
import { Link } from 'react-router-dom';

import './styles.css';

function Header({ black }) {
    return (
        <header className={black ? 'black' : ''}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                <div className="header--logo">
                    <Link to="/">
                        <img src={netflix} alt="Netflix" />
                    </Link>
                    <Link to="/series">Series</Link>
                    <Link to="/filmes">Filmes</Link>
                </div>

                <div className="header--user">
                    <Link to="/">
                        <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png" alt="Usuário" />
                    </Link>
                    <img src={loupe} alt="Usuário" width="20px" />
                </div>
            </div>
        </header>
    );
}

export default Header;