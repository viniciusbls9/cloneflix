import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Tmdb from '../../services/tmdb';
import { useParams } from 'react-router-dom';
import list from '../../assets/list-text.svg';
import next from '../../assets/next.svg';
import previous from '../../assets/left-arrow.svg';

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

    const [scrollX, setScrollX] = useState(0);
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
            window.location.href = `https://www.themoviedb.org/authenticate/${token.request_token}?redirect_to=http://localhost:3000/details/${type}/${id}`;
            localStorage.setItem('token', token.request_token);

            // Pegando o Token do usuário para poder criar uma session ID após voltar para o site
            // let getToken = localStorage.getItem('token');
            // let session = await Tmdb.sessionId(getToken);
            // localStorage.setItem('session', session.session_id);

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






            //Fazer a ação de salvar o filme/serie
            let favorite = localStorage.getItem('session');
            if (favorite) {
                let getFavorite = await Tmdb.markFavorite(type, id, true);
                console.log(getFavorite);
            } else {
                console.log('n passou')
            }

        } else {
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                                <span>{genres.join(', ')}</span>
                                <div className="serie--overal">
                                    <b>{item.vote_average} %</b>
                                </div>
                                <h3>Sinopse</h3>
                                <p>{item.overview}</p>
                                <div className="featured--buttons">
                                    <abbr title="Adicionar a listagem">
                                        <button style={{ background: '#fff' }}> <img src={list} width="20px" /> </button>
                                    </abbr>
                                    <abbr title="Adicionar aos Favoritos"><button onClick={handleFavorite}>♥</button></abbr>
                                </div>
                                <Dialog
                                    fullScreen={fullScreen}
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="responsive-dialog-title"
                                >
                                    <DialogTitle id="responsive-dialog-title">{"Gerar Token"}</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            cloneflix está pedindo sua permissão para ler e gravar dados em seu nome. Isso é necessário se você quiser salvar como favoritos, salvar filmes e series para assistir mais tarde. Caso aceite, você será redirecionado para o site TMDB.
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button autoFocus onClick={handleClose} color="secondary">
                                            Não aceito
                                        </Button>
                                        <Button onClick={handlePermission} color="primary" autoFocus>
                                            Aceito
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </div>

                        <div className="column--wrapper">
                            <div className="content--wrapper">
                                <div className="content--center">
                                    <div className="movieRow">
                                        <h2>Elenco Principal</h2>

                                        <div className="movieRow--left" onClick={handleLeftArrow}>
                                            <img src={previous} alt="" width="30px" />
                                        </div>

                                        <div className="movieRow--right" onClick={handleRightArrow}>
                                            <img src={next} alt="" width="30px" />
                                        </div>

                                        <div className="movieRow--listarea">
                                            <div className="movieRow--list" style={{ marginLeft: scrollX, width: items.results.length * 150 }}>
                                                {/* {items.results.length > 0 && items.results.map((item, key) => (
                                                    <div className="movieRow--item" key={key}>
                                                        <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title} key={key} />
                                                    </div>
                                                ))} */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="content--sidebar">dasd</div>
                            </div>
                        </div>

                    </div>
                </div>
            ))}
        </div>
    );
}

export default Details;