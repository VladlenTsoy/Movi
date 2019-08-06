import React, {useState} from "react";
import './Trending.less';
import TrendingContent from "./trending-content/TrendingContent";

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
                <TrendingContent key={`tv_${filter}`}
                          tab={currentTab}
                          url={`/trending/movie/${filter}?api_key=ac98cb53e0760e1f61d042006ba12afa&language=ru&page=`}/> :
                <TrendingContent key={`movie_${filter}`}
                          tab={currentTab}
                          url={`/trending/tv/${filter}?api_key=ac98cb53e0760e1f61d042006ba12afa&language=ru&page=`}/>
            }
        </div>
    </div>;
};

export default Trending;
