import React, {useEffect, useState} from "react";
import "./Movies.less";
import Genres from "./filter/genres/Genres";
import {Col, Row, Pagination, Spin, Icon} from "antd";
import MoviesPosterBlock from "../../layouts/blocks/movie-poster/MoviePoster";
import Breadcrumb from "../../layouts/breadcrumb/Breadcrumb";
import {useSelector} from "react-redux";
import FilterBarBlock from "./filter-bar/FilterBar";

const Movies: React.FC<any> = ({data, page, loading, changeSortBy, changeGenres, changePagination}) => {
    return <div className="movies">
        <Breadcrumb/>
        <Row>
            <Col span={6}>
                <Genres changeGenres={changeGenres}/>
            </Col>
            <Col span={18} className="wrapper-movies-block">
                <div className="title-block">
                    <div className="title">Фильмы</div>
                </div>
                <FilterBarBlock changeSortBy={changeSortBy}/>

                {loading ?
                    <div className="loading-block">
                        <Spin indicator={<Icon type="loading"/>}/>
                    </div> :
                    <div className="wrapper-posters-block">
                        {data ? data.results.map((movie: any, key: number) =>
                            <MoviesPosterBlock movie={movie} key={key}/>
                        ) : null}
                    </div>
                }

                <div className="pagination">
                    <Pagination
                        defaultCurrent={Number(page)}
                        current={Number(page)}
                        defaultPageSize={20}
                        total={data ? data.total_results : 0}
                        onChange={changePagination}/>
                </div>
            </Col>
        </Row>
    </div>;
};

const MoviesState: React.FC<any> = ({history, match}: any) => {
    const {api} = useSelector((state: any) => (state));
    const [apiPage, setApiPage] = useState(match.params.page || 1);
    const [data, setData]: any = useState(null);
    const [loading, setLoading]: any = useState(false);
    const [sortBy, setSortBy] = useState('popularity.desc');
    const [genres, setGenres]: any = useState([]);

    useEffect(() => {
        (async () => {
            setLoading(true);
            window.scrollTo(0, 0);
            history.push(`/movies/${apiPage}`);

            let response = await api.guest.get(`/discover/movie`, {
                params: {
                    sort_by: sortBy,
                    api_key: 'ac98cb53e0760e1f61d042006ba12afa',
                    language: 'ru',
                    page: apiPage,
                    with_genres: genres.join(),
                }
            });

            setData(response.data);
            setLoading(false);
        })();
    }, [apiPage, sortBy, genres]);

    const changePagination = async (page: any) => {
        setApiPage(page);
    };

    const changeSortBy = async (sort: any) => {
        setSortBy(sort);
        setApiPage(1);
    };

    const changeGenres = async (genre: any, state: boolean) => {
        let _genres = [];
        if (state)
            _genres = [...genres, genre];
        else
            _genres = genres.filter((_genre: any) => _genre !== genre);

        setGenres(_genres);
        setApiPage(1);
    };

    return <Movies
        data={data}
        page={apiPage}
        loading={loading}
        changePagination={changePagination}
        changeGenres={changeGenres}
        changeSortBy={changeSortBy}/>
};

export default MoviesState;
