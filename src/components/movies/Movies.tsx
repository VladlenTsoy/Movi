import React, {useEffect, useState} from "react";
import "./Movies.less";
import Genres from "./filter/genres/Genres";
import {Col, Row} from "antd";
import MoviesPosterBlock from "../../layouts/blocks/movie-poster/MoviePoster";
import Breadcrumb from "../../layouts/breadcrumb/Breadcrumb";
import {useSelector} from "react-redux";
import FilterBarBlock from "./filter-bar/FilterBar";

const Movies: React.FC = () => {
    const {api} = useSelector((state: any) => (state));
    let [genre, setGenre] = useState(12);
    let [url, setUrl] = useState(`/discover/movie?with_genres=${genre}&api_key=ac98cb53e0760e1f61d042006ba12afa&language=ru&primary_release_year=2019&page=`);
    const [apiPage, setApiPage] = useState(1);
    // Current movies
    const [movies, setMovies]: any = useState([]);
    // Sort
    let sortGenres = (_genre: number) => {
        setGenre(_genre);
        setUrl(`/discover/movie?with_genres=${_genre}&api_key=ac98cb53e0760e1f61d042006ba12afa&language=ru&primary_release_year=2019&page=`);
    };

    useEffect(() => {
        (async () => {
            let {data} = await api.guest.get(`${url}${apiPage}`);

            apiPage === 1 ? setMovies(data['results']) :
                setMovies((m: any) => [...m, ...data['results']]);
        })();
    }, [apiPage, api.guest]);

    return <div className="movies">
        <Breadcrumb/>
        <Row>
            <Col span={6}>
                <Genres/>
            </Col>
            <Col span={18} className="wrapper-movies-block">
                <div className="title-block">
                    <div className="title">Фильмы</div>
                </div>
                <FilterBarBlock/>
                <div className="wrapper-posters-block">
                    {movies.map((movie: any, key: number) => {
                        if ((key + 1) % 3)
                            return <MoviesPosterBlock movie={movie} key={key}/>;
                        else
                            return <div className="line" key={key}/>;
                    })}
                </div>
            </Col>
        </Row>
    </div>;
};

export default Movies;
