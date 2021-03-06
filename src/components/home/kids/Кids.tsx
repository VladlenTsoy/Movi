import React, {useEffect, useState} from "react";
import './Kids.less';
import QueueAnim from "rc-queue-anim";
import PosterBlock from "../../../layouts/blocks/poster/Poster";
import {useSelector} from "react-redux";

const Kids: React.FC = () => {
    const {api} = useSelector((state: any) => (state));
    const [url] = useState(`/tv/popular?api_key=ac98cb53e0760e1f61d042006ba12afa&language=ru&page=1`);
    const [movies, setMovies]: any = useState([]);

    useEffect(() => {
        (async () => {
            let {data} = await api.guest.get(`${url}${1}`);
            setMovies(data.results.slice(0, 9));
        })();
    }, [url, api.guest]);

    return <div className="kids layout-block">
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
        <QueueAnim type={['bottom', 'top']} className="contents">
            {[
                movies.map((movie: any, key: number) =>
                    <div className="trend" key={key}>
                        <PosterBlock
                            position="landscape"
                            image={{
                                poster: `https://image.tmdb.org/t/p/${key === 0 ? 'w500' : 'w300'}/${movie.backdrop_path}`,
                                alt: movie.name
                            }}
                            info={{
                                title: movie.name,
                                subTitle: ''
                            }}
                        />
                    </div>
                )
            ]}
        </QueueAnim>
    </div>;
};

export default Kids;
