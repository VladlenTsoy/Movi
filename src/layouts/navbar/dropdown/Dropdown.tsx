import React from "react";
import './Dropdown.less';
import QueueAnim from "rc-queue-anim";
import {Row} from "antd";
import Kid from "./kid/Kid";
import MovieDayBlock from "./movie-day/Movie-Day";
import CategoryBlock from "./category/Category";
import GenresBlock from "./genres/Genres";
import TVSeriesDayBlock from "./tv-series-day/TVSeriesDay";
import NewestEpisodesBlock from "./newest-episodes/Newest-Episodes";

const defaultAnimation = [
    {opacity: [1, 0], translateY: [0, -50]},
];

const TVSeriesBlock = () => (
    <QueueAnim animConfig={defaultAnimation}>
        {[
            <TVSeriesDayBlock key="1"/>,
            <CategoryBlock key="2"/>,
            <NewestEpisodesBlock key="3"/>
        ]}
    </QueueAnim>
);

const MoviesBlock = () => (
    <QueueAnim animConfig={defaultAnimation}>{[
        <MovieDayBlock key="1"/>,
        <CategoryBlock key="2"/>,
        <GenresBlock key="3"/>,
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
                            {block === '/movies' ? <MoviesBlock/> : block === '/kids' ? <Kid/> : <TVSeriesBlock/>}
                        </Row>
                    </div>
                </div>
            ] : null
        }
    </QueueAnim>;
};

export default DropdownBlock;
