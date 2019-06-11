import React, {useEffect, useState} from "react";
import './Trending.less';
import {Button} from "antd";
import {useStore} from "../../../store/useStore";
import QueueAnim from "rc-queue-anim";
import PosterBlock from "../../../layouts/blocks/poster/Poster";

const Contents: React.FC<{ url: string, tab: number }> = ({url, tab}) => {
    const {state} = useStore();
    const [output, setOutput]: any = useState([]);
    const [page, setPage] = useState(0);
    const [apiPage, setApiPage] = useState(1);
    const [movies, setMovies]: any = useState([]);
    const [loader, setLoader]: any = useState(false);

    useEffect(() => {
        setOutput(movies.slice(0, (page * 10 + 7)));
    }, [movies, page]);

    useEffect(() => {
        if (apiPage * 20 - output.length < 10)
            setApiPage(apiPage + 1);
    }, [apiPage, page, output.length]);

    useEffect(() => {
        const fetch = async () => {
            setLoader(true);

            if (apiPage === 1)
                setMovies([null, null, null, null, null, null, null]);

            let {data} = await state.api.guest.get(`${url}${apiPage}`);

            setMovies((m: any) => apiPage === 1 ? data.results : [...m, ...data.results]);
            setLoader(false);
        };
        fetch().catch();
    }, [url, state.api.guest, apiPage]);

    return <div>
        <QueueAnim type={['bottom', 'top']} className="trends">
            {[
                output.map((movie: any, key: number) =>
                    <div className="trend" key={key}>
                        {movie ?
                            <PosterBlock
                                position="landscape"
                                image={{
                                    poster: `https://image.tmdb.org/t/p/${key === 0 ? 'w500' : 'w300'}/${movie.backdrop_path}`,
                                    alt: tab ? movie.title : movie.name
                                }}
                                info={{
                                    title: tab ? movie.title : movie.name,
                                    subTitle: ''
                                }}
                            /> :
                            <PosterBlock position="landscape"/>
                        }
                    </div>)
            ]}
        </QueueAnim>
        <div className="action">
            <Button className="btn-for-block"
                    type="ghost" block
                    onClick={() => setPage(page + 1)}
                    loading={loader}
                    icon="plus">
                Показать еще
            </Button>
        </div>
    </div>
};

const Trending: React.FC = () => {
    let [currentTab, setCurrentTab] = useState(0);
    let [filter, setFilter] = useState('day');

    let changeTabs = (tab: number) =>
        setCurrentTab(tab);

    let changeFilter = (e: any) =>
        setFilter(e.currentTarget.dataset.value);

    return <div className="trending layout-block">
        <div className="title-block">
            <div className="navs">
                <span className={!currentTab ? 'active' : ''}
                      onClick={() => changeTabs(0)}>Популярные Сериалы</span>
                <span className="slash">/</span>
                <span className={currentTab ? 'active' : ''}
                      onClick={() => changeTabs(1)}>Популярные Фильмы</span>
            </div>
            <div className="line"/>
            <div className="sort">
                <span data-value="day" onClick={changeFilter}
                      className={filter === 'day' ? 'active' : ''}>Сегодня</span>
                <span data-value="week" onClick={changeFilter}
                      className={filter === 'week' ? 'active' : ''}>За неделю</span>
                <span data-value="mouth" onClick={changeFilter}
                      className={filter === 'mouth' ? 'active' : ''}>За месяц</span>
                <span data-value="3_months" onClick={changeFilter} className={filter === '3_months' ? 'active' : ''}>За 3 месяца</span>
            </div>
        </div>

        <div className="contents">
            {currentTab ?
                <Contents key={`tv_${filter}`}
                          tab={currentTab}
                          url={`/trending/movie/${filter}?api_key=ac98cb53e0760e1f61d042006ba12afa&language=ru&page=`}/> :
                <Contents key={`movie_${filter}`}
                          tab={currentTab}
                          url={`/trending/tv/${filter}?api_key=ac98cb53e0760e1f61d042006ba12afa&language=ru&page=`}/>
            }
        </div>
    </div>;
};

export default Trending;
