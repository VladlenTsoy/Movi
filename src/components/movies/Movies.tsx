import React, {useEffect, useState} from "react";
import "./Movies.less";
import Genres from "./filter/genres/Genres";
import {Col, Row, Pagination, Spin, Icon} from "antd";
import MoviesPosterBlock from "../../layouts/blocks/movie-poster/MoviePoster";
import Breadcrumb from "../../layouts/breadcrumb/Breadcrumb";
import {useSelector} from "react-redux";
import FilterBarBlock from "./filter-bar/FilterBar";
import Years from "./filter/years/Years";

const Movies: React.FC<any> = ({data, page, loading, changeSortBy, changeGenres, changePagination, changeYear}) => {
    return <div className="movies">
        <Breadcrumb/>
        <Row>
            <Col span={6}>
                <Genres changeGenres={changeGenres}/>
                <Years changeYear={changeYear}/>
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
    const [year, setYear]: any = useState({gte: '', lte: ''});

    useEffect(() => {
        (async () => {
            setLoading(true);
            window.scrollTo(0, 0);
            history.push(`/movies/${apiPage}`);

            let response = await api.guest.get(`/discover/movie`, {
                params: {
                    sort_by: sortBy,
                    'primary_release_date.gte': year.gte,
                    'primary_release_date.lte': year.lte,
                    api_key: 'ac98cb53e0760e1f61d042006ba12afa',
                    language: 'ru',
                    page: apiPage,
                    with_genres: genres.join(),
                }
            });

            setData(response.data);
            setLoading(false);
        })();
    }, [apiPage, sortBy, genres, year]);

    const changePagination = (page: any) => {
        setApiPage(page);
    };

    const changeSortBy = (sort: any) => {
        setSortBy(sort);
        setApiPage(1);
    };

    const changeGenres = (genre: any, state: boolean) => {
        let _genres = [];
        if (state)
            _genres = [...genres, genre];
        else
            _genres = genres.filter((_genre: any) => _genre !== genre);

        setGenres(_genres);
        setApiPage(1);
    };

    const changeYear = (year: any) => {
        switch (year) {
            case 'all':
                return setYear({gte: '', lte: ''});
            case '2000':
                return setYear({gte: '2000-01-01', lte: '2010-12-31'});
            case '1990':
                return setYear({gte: '1990-01-01', lte: '1999-12-31'});
            case '1980':
                return setYear({gte: '1980-01-01', lte: '1989-12-31'});
            case '80':
                return setYear({gte: '', lte: '1979-12-31'});
            default:
                return setYear({gte: `${year}-01-01`, lte: `${year}-12-31`});
        }
    };

    return <Movies
        data={data}
        page={apiPage}
        loading={loading}
        changePagination={changePagination}
        changeGenres={changeGenres}
        changeYear={changeYear}
        changeSortBy={changeSortBy}/>
};

export default MoviesState;
