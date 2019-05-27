import React, {useState} from "react";
import './Banner.less';
import {Button} from "antd";
import QueueAnim from 'rc-queue-anim';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import PosterBlock from "../../../layouts/blocks/poster/Poster";
import interstellar from '../../../assets/movies/iphone360_258687.jpg';
import iron_man_3 from '../../../assets/movies/iphone360_462762.jpg';
import infinity_war from '../../../assets/movies/iphone360_843649.jpg';
import picachu from '../../../assets/movies/iphone360_994864.jpg';
import endgame from '../../../assets/movies/kinopoisk.ru-Avengers_3A-Endgame-3355268.jpg';
import bannerInfinityWar from '../../../assets/rZ19Fono_o.jpg';
import bannerEndgame from '../../../assets/qBKuxWkpUx94EPuu8SWwQw.jpg';
import bannerInterstellar from '../../../assets/interstellar_new_poster.jpg';
import bannerPicachu from '../../../assets/81DEE96D-53EE-47BD-8054-D9F90013D54E.jpeg';
import bannerIronMan3 from '../../../assets/filmz.ru_f_154023.jpg';

const movies = [
    {
        id: 1,
        title: 'Мстители: Финал',
        poster: endgame,
        banner: bannerEndgame,
        genres: 'Фантастика, Боевик, Приключения',
        released: '2019'
    },
    {
        id: 2,
        title: 'Мстители: Война бесконечности',
        poster: infinity_war,
        banner: bannerInfinityWar,
        genres: 'Фантастика, Боевик, Приключения',
        released: '2018'
    },
    {
        id: 3,
        title: 'Интерстеллар',
        poster: interstellar,
        banner: bannerInterstellar,
        genres: 'Драма, Детектив, Приключения',
        released: '2014'
    },
    {
        id: 4,
        title: 'Покемон. Детектив Пикачу',
        poster: picachu,
        banner: bannerPicachu,
        genres: 'Фэнтези, Детектив, Приключения',
        released: '2019'
    },
    {
        id: 5,
        title: 'Железный человек 3',
        poster: iron_man_3,
        banner: bannerIronMan3,
        genres: 'Фантастика , Боевик, Приключения',
        released: '2019'
    }
];

const Banner: React.FC = () => {
    let [currentMovie, setCurrentMovie] = useState(movies[0]);
    let [changeMovie, setChangeMovie] = useState(true);

    let selectMovie = (e: any) => {
        let {key} = e.currentTarget.dataset;

        if (movies[key] === currentMovie)
            return;

        setCurrentMovie(movies[key]);
        setChangeMovie(false);
        setTimeout(() => setChangeMovie(true), 500);
    };

    return <div className="banner-block">
        <QueueAnim type={['right', 'left']} className="banner-image">
            {changeMovie ? [
                <picture key="banner">
                    <img src={currentMovie.banner} alt={currentMovie.title}/>
                </picture>
            ] : null}
        </QueueAnim>
        <QueueAnim type={['right', 'left']} className="more">
            {changeMovie ? [
                <div className="info" key="info">
                    <span>{currentMovie.genres}</span>
                    <span>{currentMovie.released}</span>
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

        <QueueAnim animConfig={[{opacity: [1, 0], translateY: [0, -50]}]}>
            {[
                <div className="carousel" key="carousel">
                    {movies.map((movie, key) =>
                        <div className={`movie ${movie.id === currentMovie.id ? 'active' : ''}`}
                             key={key} data-key={key} onClick={selectMovie}>
                            <PosterBlock data={{poster: movie.poster, alt: movie.title}}/>
                        </div>
                    )}
                </div>
            ]}
        </QueueAnim>
    </div>
};

export default Banner;
