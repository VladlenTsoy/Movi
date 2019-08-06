import React, {useEffect, useState} from "react";
import "./Movies.less";
import Genres from "./filter/genres/Genres";
import {Col, Row, Menu, Dropdown, Icon, Checkbox} from "antd";
import MoviesPosterBlock from "../../layouts/blocks/movie-poster/MoviePoster";
import Breadcrumb from "../../layouts/breadcrumb/Breadcrumb";
import {useSelector} from "react-redux";

const menu = (
    <Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                1st menu item
            </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                2nd menu item
            </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
                3rd menu item
            </a>
        </Menu.Item>
    </Menu>
);

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

    console.log(movies);
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
                <div className="wrapper-movies-filter-block">
                    <div className="movies-filter">
                        <Checkbox>Новинки</Checkbox>

                        <Dropdown overlay={menu} placement="bottomRight">
                            <a className="ant-dropdown-link" href="#">
                                Показать 20 <Icon type="down"/>
                            </a>
                        </Dropdown>

                        <Dropdown overlay={menu} placement="bottomRight">
                            <a className="ant-dropdown-link" href="#">
                                <Icon type="sort-descending"/> от А до Я <Icon type="down"/>
                            </a>
                        </Dropdown>
                    </div>
                </div>
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
