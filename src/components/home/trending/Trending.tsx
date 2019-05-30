import React, {useState} from "react";
import './Trending.less';
import TrendingMoviesBlock from "./blocks/movies/Movies";
import TrendingTvShowsBlock from "./blocks/tv-shows/TvShows";

const Trending: React.FC = () => {
    let [currentTabMovie, setCurrentTabMovie] = useState(0);

    let changeTabs = (tab: number) =>
        setCurrentTabMovie(tab);

    return <div className="trending layout-block">
        <div className="tabs">
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
        {
            currentTabMovie ? <TrendingMoviesBlock/> : <TrendingTvShowsBlock/>
        }
    </div>;
};

export default Trending;
