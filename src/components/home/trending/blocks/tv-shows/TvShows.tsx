import React, {useEffect, useState} from "react";
import {Button, Col, Row} from "antd";
import QueueAnim from "rc-queue-anim";
import EpisodeBlock from "../../../../../layouts/blocks/episode/Episode";
import {useStore} from "../../../../../store/useStore";

const TrendingTvShowsBlock: React.FC = () => {
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

    return <div className="contents">
        <Row type="flex" gutter={15}>
            <Col className="top-trend-col">
                <QueueAnim type={['bottom', 'top']} className="top-trend">
                    {[
                        <EpisodeBlock data={movies && movies[0] ? {
                            poster: `https://image.tmdb.org/t/p/w500/${movies[0].backdrop_path}`,
                            alt: movies[0].title,
                            title: movies[0].name,
                            release: movies[0].release_date,
                        } : null}/>
                    ]}
                </QueueAnim>
            </Col>
            {[1, 2, 3].map((key_col) =>
                <Col className="trend-col" key={key_col}>
                    <QueueAnim type={['bottom', 'top']}>
                        {[
                            [1, 2].map((key) =>
                                <div className="trend" key={`${key_col}${key}`}>
                                    <EpisodeBlock data={movies && movies[key_col] ? {
                                        poster: `https://image.tmdb.org/t/p/w300/${movies[key_col].backdrop_path}`,
                                        alt: movies[key_col].name,
                                        title: movies[key_col].name,
                                        release: movies[key_col].release_date,
                                    } : null}/>
                                </div>
                            )]}
                    </QueueAnim>
                </Col>
            )}
        </Row>
        <div className="action">
            <Button className="btn-for-block" type="ghost" block={true}>Показать еще</Button>
        </div>
    </div>;
};

export default TrendingTvShowsBlock;
