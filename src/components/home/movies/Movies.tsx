import React, {useState} from "react";
import './Movies.less';
import {Icon} from 'antd';
import Carousel from "../../../layouts/carousel/Carousel";

const Movies: React.FC = () => {
    let [genre, setGenre] = useState(12);
    let [url, setUrl] = useState(`/discover/movie?with_genres=${genre}&api_key=ac98cb53e0760e1f61d042006ba12afa&language=ru&primary_release_year=2019&page=`);

    // Sort
    let sortGenres = (_genre: number) => {
        setGenre(_genre);
        setUrl(`/discover/movie?with_genres=${_genre}&api_key=ac98cb53e0760e1f61d042006ba12afa&language=ru&primary_release_year=2019&page=`);
    };

    return <div className="top-movies layout-block">
        {/* Title & Genres */}
        <div className="title-block">
            <div className="title">
                2019 Лучшие Фильмы
            </div>
            <div className="line"/>
            <div className="sort">
                <span onClick={() => sortGenres(12)} className={genre === 12 ? 'active' : ''}>Приключения</span>
                <span onClick={() => sortGenres(53)} className={genre === 53 ? 'active' : ''}>Триллер</span>
                <span onClick={() => sortGenres(28)} className={genre === 28 ? 'active' : ''}>Боевик</span>
                <span onClick={() => sortGenres(878)} className={genre === 878 ? 'active' : ''}>Фантастика</span>
                <span onClick={() => sortGenres(18)} className={genre === 18 ? 'active' : ''}>Драма</span>
                <span onClick={() => sortGenres(35)} className={genre === 35 ? 'active' : ''}>Комедия</span>
            </div>
        </div>

        {/* Top movies carousel */}
        <div className="contents">
            <Carousel url={url} count={7} apiCount={20} title={true} poster={true} key={`top-movies-${genre}`}/>
        </div>
        <div className="see-all-block">
            <span className="see-all">Показать все <Icon type="right"/></span>
        </div>
    </div>;
};

export default Movies;
