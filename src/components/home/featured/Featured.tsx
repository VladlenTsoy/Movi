import React, {useEffect, useState} from "react";
import './Featured.less';
import {useStore} from "../../../store/useStore";
import Carousel from "../../../layouts/carousel/Carousel";

const Featured: React.FC = () => {
    const [tvId] = useState(1399);
    const {state} = useStore();
    const [url] = useState(`/tv/${tvId}?api_key=ac98cb53e0760e1f61d042006ba12afa&language=ru`);
    const [current, setCurrent]: any = useState(null);
    const [season, setSeason] = useState(8);
    const [apiCount, setApiCount] = useState(8);
    const [urlSeason, setUrlSeason] = useState(`/tv/${tvId}/season/${season}?api_key=ac98cb53e0760e1f61d042006ba12afa&language=ru`);

    useEffect(() => {
        const fetch = async () => {
            const {data} = await state.api.guest.get(url);
            setCurrent(data)
        };

        fetch().catch();
    }, [url, state.api.guest]);

    const selectSeason = (s: any) => {
        setApiCount(s.episode_count);
        setSeason(s.season_number);
        setUrlSeason(`/tv/${tvId}/season/${s.season_number}?api_key=ac98cb53e0760e1f61d042006ba12afa&language=ru`)
    };

    if (!current)
        return <div>1</div>;
    else
        return <div className="featured layout-block" key="featured"
                    style={{
                        background: `url("https://image.tmdb.org/t/p/w1280/${current.backdrop_path}") no-repeat center`,
                        backgroundSize: 'cover'
                    }}>
            <div className="head-block">
                <span className="category">Рекомендуем</span>
                <span className="title">{current.name}</span>
                <span className="description">Новый Эпичный 8 Сезон. Смотри и обсуждай.</span>
            </div>
            <div className="tabs">
                {current.seasons.map((s: any) =>
                    <span
                        className={s.season_number === season ? 'active' : ''}
                        onClick={() => selectSeason(s)}
                        key={s.id}
                    >{s.name}</span>
                )}
            </div>
            <div className="contents">
                <Carousel
                    config={{
                        url: urlSeason,
                        count: 6,
                        apiCount: apiCount
                    }}
                    outputConf={{
                        isSeason: true,
                        title: {
                            outside: true,
                            view: 'SE'
                        }
                    }}
                    isScrollMax={true}
                    key={`featured-${tvId}-${season}`}
                />
            </div>
        </div>;
};

export default Featured;
