import React, {useEffect, useState} from "react";
import './Movies.less';
import QueueAnim from 'rc-queue-anim';
import PosterBlock from "../../../layouts/blocks/poster/Poster";
import {useStore} from "../../../store/useStore";
import {Icon} from 'antd';

const Movies: React.FC = () => {
    let {state} = useStore();
    let [pagination, setPagination]: any = useState({page: 0, apiPage: 0, output: 7, left: 0, cache: 0, need: 0});
    let [cacheMovie, setCacheMovie]: any = useState([]);
    let [movies, setMovies]: any = useState([]);

    // Fetch top movies on the current year
    let fetchTopMovie = async (page = 1) => {
        return await state.api.guest.get(`/discover/movie?api_key=ac98cb53e0760e1f61d042006ba12afa&language=ru&page=${page}`);
    };

    // Output of the top 7 movies on the current year
    let nextTopMovie = async (page = 0) => {
        let outputWith = page * 7;

        if (pagination.left <= 7) {
            let response = await fetchTopMovie(pagination.apiPage + 1);
            setPagination({
                ...pagination,
                apiPage: pagination.apiPage + 1,
                left: (pagination.apiPage + 1) * 20 - (outputWith + 7),
                page: page
            });
            setCacheMovie([...cacheMovie, ...response.data.results]);
            setMovies([...cacheMovie, ...response.data.results].slice().splice(outputWith, 7));
        } else {
            setMovies(cacheMovie.slice().splice(outputWith, 7));
            setPagination({
                ...pagination,
                left: pagination.apiPage * 20 - (outputWith + 7),
                page: page
            });
        }
    };

    let prevTopMovie = (page: number) => {
        let outputWith = page * 7;
        setMovies(cacheMovie.slice().splice(outputWith, 7));
        setPagination({
            ...pagination,
            left: pagination.apiPage * 20 - (outputWith + 7),
            page: page
        });
    };

    useEffect(() => {
        nextTopMovie().then();
    }, []);

    return <div className="top-movies layout-block">
        <div className="title-block">
            <div className="title">
                2019 Лучшие Фильмы
            </div>
            <div className="line"/>
            <div className="sort">
                <span className="active">Приключения</span>
                <span>Триллер</span>
                <span>Боевик</span>
                <span>Фантастика</span>
                <span>Драма</span>
                <span>Комедия</span>
            </div>
        </div>
        <div className="contents">
            <div className="carousel">
                <QueueAnim className="carousel-movies" onEnd={(e) => console.log(e)}>
                    {movies.map((movie: any): any =>
                        <div className="movie" key={movie.id}>
                            <PosterBlock data={movie ?
                                {
                                    poster: movie.poster_path,
                                    alt: movie.title,
                                    title: movie.title
                                } : null
                            }/>
                        </div>
                    )}
                </QueueAnim>
                <div className="navigation">
                    <span className="nav-left">
                        <Icon type="left" onClick={() => prevTopMovie(pagination.page - 1)}/>
                    </span>
                    <span className="nav-right">
                        <Icon type="right" onClick={() => nextTopMovie(pagination.page + 1)}/>
                    </span>
                </div>
            </div>
        </div>
    </div>;
};

export default Movies;
