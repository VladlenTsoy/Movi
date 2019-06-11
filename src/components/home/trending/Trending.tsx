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

    const showMore = () => {
        setPage(page + 1);
    };

    useEffect(() => {
        setOutput(movies.slice(0, (page * 10 + 7)));
    }, [movies, page]);

    useEffect(() => {
        if (apiPage * 20 - output.length < 10)
            setApiPage(apiPage + 1);
    }, [page]);

    useEffect(() => {
        const fetch = async () => {
            setLoader(true);
            let {data} = await state.api.guest.get(`${url}${apiPage}`);
            setMovies([...movies, ...data.results]);
            setLoader(false);
        };
        fetch().then();
    }, [apiPage]);

    useEffect(() => {
        const fetch = async () => {
            let {data} = await state.api.guest.get(`${url}${1}`);
            setMovies(data.results);
            setOutput(data.results.slice(0, 7));
        };
        fetch().then();
    }, [url]);

    return <div>
        <QueueAnim type={['bottom', 'top']} className="contents">
            {[
                output.map((movie: any, key: number) =>
                    <div className="trend" key={key}>
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
                        />
                    </div>
                )
            ]}
        </QueueAnim>
        <div className="action">
            <Button className="btn-for-block" type="ghost" block={true} onClick={showMore} loading={loader} icon="plus">
                Показать еще
            </Button>
        </div>
    </div>
};

const Trending: React.FC = () => {
    let [currentTabMovie, setCurrentTabMovie] = useState(0);

    let changeTabs = (tab: number) =>
        setCurrentTabMovie(tab);

    return <div className="trending layout-block">
        <div className="title-block">
            <div className="navs">
                <span className={!currentTabMovie ? 'active' : ''}
                      onClick={() => changeTabs(0)}>Популярные Сериалы</span>
                <span className="slash">/</span>
                <span className={currentTabMovie ? 'active' : ''}
                      onClick={() => changeTabs(1)}>Популярные Фильмы</span>
            </div>
            <div className="line"/>
            <div className="sort">
                <span className="active">Сегодня</span>
                <span>За неделю</span>
                <span>За месяц</span>
                <span>За 3 месяца</span>
            </div>
        </div>

        <Contents key={currentTabMovie ? "tv" : "movie"}
                  tab={currentTabMovie}
                  url={currentTabMovie ?
                      '/movie/popular?api_key=ac98cb53e0760e1f61d042006ba12afa&language=ru&page='
                      : '/tv/popular?api_key=ac98cb53e0760e1f61d042006ba12afa&language=ru&page='}/>
    </div>;
};

export default Trending;
