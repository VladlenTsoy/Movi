import React, {useEffect, useRef, useState} from "react";
import './Movies.less';
import Slider from "react-slick";
import PosterBlock from "../../../layouts/blocks/poster/Poster";
import {useStore} from "../../../store/useStore";
import {Icon, Spin} from 'antd';

const Movies: React.FC = () => {
    let {state} = useStore();
    let slidesRef = useRef(null);
    let [loader, setLoader] = useState(true);
    let settings = {
        dots: false,
        infinite: false,
        draggable: false,
        arrows: false,
        speed: 500,
        lazyLoad: true,
        slidesToShow: 7,
        slidesToScroll: 7,
    };
    let [pagination, setPagination]: any = useState({
        page: 0,        // Count pages
        apiPage: 0,     // Count pages api
        output: 7,      // Count output movies
        left: 0,        // Movies left loaded
    });

    // Current movies
    let [movies, setMovies]: any = useState([]);

    // Fetch top movies on the current year
    let fetchTopMovie = async (page = 1) =>
        await state.api.guest.get(`/discover/movie?api_key=ac98cb53e0760e1f61d042006ba12afa&language=ru&page=${page}`);


    // Back to 7 movies
    let prevTopMovie = (page: number) => {
        let {output, apiPage} = pagination;
        let outputWith = page * output;

        // Output movies
        if (slidesRef.current)
        // @ts-ignore
            slidesRef.current.slickPrev();

        // Set setting for pagination
        setPagination({
            ...pagination,
            left: apiPage * 20 - (outputWith + output),
            page: page
        });
    };

    // Output of the top 7 movies on the current year
    let nextTopMovie = async (page: number = 0) => {
        let {left, output, apiPage} = pagination;
        let outputWith = page * output;

        if (left <= output) {
            setLoader(true);
            let {data} = await fetchTopMovie(apiPage + 1);
            setPagination({
                ...pagination,
                apiPage: apiPage + 1,
                left: (apiPage + 1) * 20 - (outputWith + output),
                page: page
            });
            setMovies([...movies, ...data.results]);
        } else
            setPagination({
                ...pagination,
                left: apiPage * 20 - (outputWith + output),
                page: page
            });

        if (slidesRef.current)
        // @ts-ignore
            slidesRef.current.slickNext();

        setLoader(false);
    };

    useEffect(() => {
        nextTopMovie(1).then();
    }, []);
    
    // console.log(pagination.page);

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
                <Spin spinning={loader}>
                    {/*
                    // @ts-ignore */}
                    <Slider {...settings}
                            ref={slidesRef}
                            className="carousel-movies"
                            beforeChange={(count) => console.log(0)}
                            afterChange={(count) => console.log(1)}
                    >
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
                    </Slider>
                </Spin>
                <div className="navigation">
                    <span className={`nav-left ${pagination.page > 1 || 'disabled'}`}>
                        <Icon type="left" onClick={() => {
                            if (loader || pagination.page <= 1) return;
                            return prevTopMovie(pagination.page - 1);
                        }}/>
                    </span>
                    <span className={`nav-right ${!loader || 'disabled'}`}>
                        <Icon type="right" onClick={() => {
                            if (loader) return;
                            return nextTopMovie(pagination.page + 1);
                        }}/>
                    </span>
                </div>
            </div>
        </div>
    </div>;
};

export default Movies;
