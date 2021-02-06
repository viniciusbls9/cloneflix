import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Tmdb from '../../services/tmdb';
import { useParams } from 'react-router-dom';

// MODAL
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import './styles.css';

function Details() {
    let { id, type } = useParams();

    const [detailsInfos, setDetailsInfos] = useState([]);
    const [genres, setGenres] = useState([]);
    const [firstDate, setFirstDate] = useState('');
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handlePermission = async () => {
        let token = await Tmdb.newToken();
        if (token.success) {
            // Salvando o token do usuário no Localstorage e redirecionando para o TMDB para permitir
            window.location.href = `https://www.themoviedb.org/authenticate/${token.request_token}?redirect_to=http://localhost:3000/`;
            localStorage.setItem('token', token.request_token);

        } else {
            alert('Opa, seu pedido deu falha ): Tente novamente');
        }
    }

    const handleFavorite = async () => {
        let token = localStorage.getItem('token');
        if (token) {

            // Salvando a sessão do usuário após aprovação do token
            let session = await Tmdb.sessionId(token);
            localStorage.setItem('session', session.session_id);

            // Fazer a ação de salvar o filme/serie
            console.log('salvo');

        } else {
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const infos = async () => {
            let info = await Tmdb.getMovieInfo(id, type);
            let genres = [];
            for (let i in info.genres) {
                genres.push(info.genres[i].name);
            }

            let date = new Date(info.first_air_date);
            setFirstDate(date.getFullYear());

            console.log(Array(info));
            setGenres(genres);
            setDetailsInfos(Array(info));
        }
        infos();
    }, []);

    return (
        <div>
            <Header />
            {detailsInfos.map((item, key) => (
                <div key={key}>
                    <section className="banner--details" style={{
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${item.backdrop_path})`,
                    }}>
                        <div className="banner--gradient"></div>
                    </section>
                    <div className="banner--container">
                        <div className="banner--contents">
                            <div className="banner--content-image">
                                <img src={`https://www.themoviedb.org//t/p/w300_and_h450_bestv2/${item.poster_path}`} alt="" />
                            </div>

                            <div className="banner--content-texts">
                                <div>
                                    <h1>{item.name}</h1>
                                    <span>({firstDate})</span>
                                </div>
                                <p>{genres.join(', ')}</p>
                                <div className="serie--overal">
                                    <b>{item.vote_average} %</b>
                                </div>
                                <h3>Sinopse</h3>
                                <p>{item.overview}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Details;