import React, {useEffect, useState} from "react";
import './Kids.less';
import {Col, Row} from "antd";
import {useStore} from "../../../store/useStore";
import EpisodeBlock from "../../../layouts/blocks/episode/Episode";

const Kids: React.FC = () => {
    const {state} = useStore();
    const [url] = useState(`/tv/popular?api_key=ac98cb53e0760e1f61d042006ba12afa&language=ru&page=1`);
    const [movies, setMovies]: any = useState([]);

    useEffect(() => {
        const fetch = async () => {
            let {data} = await state.api.guest.get(`${url}${1}`);
            setMovies(data.results);
        };

        fetch().then();
    }, [url]);

    return <div className="kids">
        <div className="title-block">
            <div className="title">
                Для Детей
            </div>
            <div className="line"/>
            <div className="sort">
                <span className="active">Сегодня</span>
                <span>За неделю</span>
                <span>За месяц</span>
                <span>За 3 месяца</span>
            </div>
        </div>
        <div className="contents">
            <Row type="flex" gutter={15}>
                <Col lg={8}>
                    <div className="top-trend">
                        <EpisodeBlock data={movies && movies[0] ? {
                            poster: `https://image.tmdb.org/t/p/w500/${movies[0].backdrop_path}`,
                            alt: movies[0].title,
                            title: movies[0].name,
                            release: movies[0].release_date,
                        } : null}/>
                    </div>
                </Col>
                <Col lg={4}>
                    {[1, 2].map((key) =>
                        <div className="trend" key={key}>
                            <EpisodeBlock data={movies && movies[key] ? {
                                poster: `https://image.tmdb.org/t/p/w300/${movies[key].backdrop_path}`,
                                alt: movies[key].title,
                                title: movies[key].name,
                                release: movies[key].release_date,
                            } : null}/>
                        </div>
                    )}
                </Col>
                <Col lg={4}>
                    {[3, 4].map((key) =>
                        <div className="trend" key={key}>
                            <EpisodeBlock data={movies && movies[key] ? {
                                poster: `https://image.tmdb.org/t/p/w300/${movies[key].backdrop_path}`,
                                alt: movies[key].title,
                                title: movies[key].name,
                                release: movies[key].release_date,
                            } : null}/>
                        </div>
                    )}
                </Col>
                <Col lg={4}>
                    {[5, 6].map((key) =>
                        <div className="trend" key={key}>
                            <EpisodeBlock data={movies && movies[key] ? {
                                poster: `https://image.tmdb.org/t/p/w300/${movies[key].backdrop_path}`,
                                alt: movies[key].title,
                                title: movies[key].name,
                                release: movies[key].release_date,
                            } : null}/>
                        </div>
                    )}
                </Col>
                <Col lg={4}>
                    {[7, 8].map((key) =>
                        <div className="trend" key={key}>
                            <EpisodeBlock data={movies && movies[key] ? {
                                poster: `https://image.tmdb.org/t/p/w300/${movies[key].backdrop_path}`,
                                alt: movies[key].title,
                                title: movies[key].name,
                                release: movies[key].release_date,
                            } : null}/>
                        </div>
                    )}
                </Col>
            </Row>
        </div>
    </div>;
};

export default Kids;
