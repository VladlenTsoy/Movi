import React, {useEffect, useState} from "react";
import './Banner.less';
import {Button, Icon} from "antd";
import QueueAnim from 'rc-queue-anim';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import PosterBlock from "../../../layouts/blocks/poster/Poster";
import {useStore} from "../../../store/useStore";
import Moment from "react-moment";
// @ts-ignore
import {LazyLoadImage} from 'react-lazy-load-image-component';

//
const BannerImage = ({data, slide}: any) => {
    return <QueueAnim animConfig={{opacity: [1, 0]}} className="banner-image">
        {data && slide ?
            <LazyLoadImage
                src={`https://image.tmdb.org/t/p/w1280/${data.backdrop_path}`}
                alt={data.title}
                effect="blur"
                width="100%"
                delayTime={500}/> :
            <div className="banner-loader" key="error">
                <Icon type="loading"/>
            </div>
        }
    </QueueAnim>
};

// Output movies by 'banner_at'
// Url = banner/movies
const Banner: React.FC = () => {
    const {state} = useStore();
    const [url] = useState(`/trending/movie/day?api_key=ac98cb53e0760e1f61d042006ba12afa&language=ru`);
    const [movies, setMovies]: any = useState([]);
    const [currentMovie, setCurrentMovie]: any = useState(null);
    const [changeMovie, setChangeMovie] = useState(false);

    const selectMovie = (e: any) => {
        const {key} = e.currentTarget.dataset;

        if (movies[key] === currentMovie)
            return;

        setCurrentMovie(movies[key]);
        setChangeMovie(false);
        setTimeout(() => setChangeMovie(true), 500);
    };

    useEffect(() => {
        const fetch = async () => {
            const {data} = await state.api.guest.get(`${url}${1}`);
            setChangeMovie(true);
            setMovies(data.results.slice(0, 5));
            setCurrentMovie(data.results[0]);
        };

        fetch().catch();
    }, [url, state.api.guest]);

    return <div className="banner-block">
        <BannerImage data={currentMovie} slide={changeMovie}/>
        <QueueAnim type={['right', 'left']} className="more">
            {changeMovie && currentMovie ? [
                <div className="info" key="info">
                    <span>Ужасы</span>
                    <span><Moment format="YYYY">{currentMovie.release}</Moment></span>
                    <span>США</span>
                </div>,
                <h1 key="title">{currentMovie.title}</h1>,
                <div className="actions" key="actions">
                    <Button type="primary" size="large">
                        Смотреть
                        <FontAwesomeIcon icon="play"/>
                    </Button>
                    <Button ghost size="large">+ Плейлист</Button>
                </div>
            ] : null}
        </QueueAnim>
        <div className="carousel" key="carousel">
            {movies.map((movie: any, key: any) =>
                <div className={`movie ${currentMovie && movie.id === currentMovie.id ? 'active' : ''}`}
                     key={key} data-key={key} onClick={selectMovie}>
                    <PosterBlock image={{
                        poster: 'https://image.tmdb.org/t/p/w92/' + movie.poster_path,
                        alt: movie.title
                    }}/>
                </div>
            )}
        </div>
    </div>
};

export default Banner;
