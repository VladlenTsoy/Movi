import React from "react";
import './Dropdown.less';
import QueueAnim from "rc-queue-anim";
import {Row} from "antd";
import MovieDayBlock from "./movie-day/MovieDay";
import CategoryBlock from "./category/Category";
import GenresBlock from "./genres/Genres";
import NewestEpisodesBlock from "./newest-episodes/Newest-Episodes";
import pMovie from "../../../assets/movies/kinopoisk.ru-Avengers_3A-Endgame-3355268.jpg";
import pCartoon from "../../../assets/movies/iphone360_706655.jpg";
import pTVSeries from "../../../assets/movies/kinopoisk.ru-True-Detective-3260147.jpg";

const defaultAnimation = [
    {opacity: [1, 0], translateY: [0, -50]},
];

let movie = {
    genres: 'Фантастика, Боевик, Приключения',
    title: 'Мстители: Финал',
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, aliquam
                        aliquid
                        amet consectetur earum enim impedit maiores molestias nisi, nulla, obcaecati
                        officiis omnis praesentium quibusdam reiciendis rem rerum sapiente voluptatem!`,
    poster: pMovie,
};

let tvShow = {
    genres: 'Фантастика, Боевик, Приключения',
    title: 'Настоящий детектив',
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, aliquam
                        aliquid
                        amet consectetur earum enim impedit maiores molestias nisi, nulla, obcaecati
                        officiis omnis praesentium quibusdam reiciendis rem rerum sapiente voluptatem!`,
    poster: pTVSeries,
};

let cartoon = {
    genres: 'Фантастика, Боевик, Приключения',
    title: 'Как приручить дракона 3',
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, aliquam
                        aliquid
                        amet consectetur earum enim impedit maiores molestias nisi, nulla, obcaecati
                        officiis omnis praesentium quibusdam reiciendis rem rerum sapiente voluptatem!`,
    poster: pCartoon,
};

const MoviesBlock = () => (
    <QueueAnim animConfig={defaultAnimation}>{[
        <MovieDayBlock key="1" data={movie}/>,
        <CategoryBlock key="2"/>,
        <GenresBlock key="3" movie={true}/>,
    ]}
    </QueueAnim>
);

const TVSeriesBlock = () => (
    <QueueAnim animConfig={defaultAnimation}>
        {[
            <MovieDayBlock key="1" data={tvShow}/>,
            <CategoryBlock key="2"/>,
            <NewestEpisodesBlock key="3" kids={false}/>
        ]}
    </QueueAnim>
);

const KidsBlock = () => (
    <QueueAnim animConfig={defaultAnimation}>{[
        <MovieDayBlock key="1" data={cartoon}/>,
        <CategoryBlock key="2"/>,
        <GenresBlock key="3" movie={false}/>,
        <NewestEpisodesBlock key="4" kids={true}/>
    ]}
    </QueueAnim>
);

const DropdownBlock: React.FC<any> = ({dropdown, block}) => {
    return <QueueAnim animConfig={defaultAnimation}>
        {dropdown ?
            [
                <div className="dropdown active" key="a">
                    <div className="movie-block">
                        <Row type="flex" gutter={40}>
                            {block === '/movies' ? <MoviesBlock/> : block === '/kids' ? <KidsBlock/> : <TVSeriesBlock/>}
                        </Row>
                    </div>
                </div>
            ] : null
        }
    </QueueAnim>;
};

export default DropdownBlock;
