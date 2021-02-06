const API_KEY = '798b6117fd2bd742df2bb796d1b1722c';
const API_BASE = 'https://api.themoviedb.org/3';
// 48f3bdcd1e13f7025297f59240670e47d6970e64
const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`);
    const json = await req.json();
    return json;
}

export default {
    sessionId: async (token) => {
        const req = await fetch(`${API_BASE}/authentication/session/new?api_key=${API_KEY}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ request_token: token })
        });
        const json = await req.json();
        return json;
    },
    newToken: async () => {
        const req = await fetch(`${API_BASE}/authentication/token/new?api_key=${API_KEY}`);
        const json = await req.json();
        return json;
    },
    paginator: async (page, discover) => {
        const req = await fetch(`${API_BASE}/discover/${discover}?api_key=${API_KEY}&language=pt-BR&page=${page}`);
        const json = await req.json();
        return json;
    },

    getList: async (discover) => {
        const req = await fetch(`${API_BASE}/discover/${discover}?api_key=${API_KEY}&language=pt-BR`);
        const json = await req.json();
        return json;
    },

    getHomeList: async () => {
        return [
            {
                slug: 'originals',
                title: 'Originais do Netflix',
                items: await basicFetch(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'treding',
                title: 'Recomendados para Você',
                items: await basicFetch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'toprated',
                title: 'Em Alta',
                items: await basicFetch(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'action',
                title: 'Ação',
                items: await basicFetch(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'comedy',
                title: 'Comédia',
                items: await basicFetch(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'horror',
                title: 'Terror',
                items: await basicFetch(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'documentary',
                title: 'Documentários',
                items: await basicFetch(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`)
            }
        ];
    },

    getMovieInfo: async(movieId, type) => {
        let info = {};

        if(movieId) {
            switch(type) {
                case 'movie':
                    info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                break;
                case 'tv':
                    info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                break;
                default:
                    info = null;
                break;
            }
        }

        return info;
    }
}