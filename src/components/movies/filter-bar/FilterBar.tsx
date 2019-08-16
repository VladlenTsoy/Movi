import React from "react";
import './FilterBar.less';
import {Checkbox, Select} from "antd";

const {Option} = Select;

const FilterBarBlock: React.FC<any> = ({changeSortBy, changeShowBy, changeIsNew}) => {
    const changeSort = (e: any) =>
        changeSortBy(e);

    const changeShow = (e: any) =>
        changeShowBy(e);

    const changeNew = (e:any) =>
        changeIsNew(e.target.checked);

    return <div className="wrapper-movies-filter-block">
        <div className="movies-filter">
            <div className="movies-filter-checkbox">
                <Checkbox onChange={changeNew}>Новинки</Checkbox>
                <Checkbox>Бесплатные</Checkbox>
                <Checkbox>4K - Разрешение</Checkbox>
            </div>

            <div className="movies-filter-selects">
                <Select defaultValue="20" onChange={changeShow}>
                    <Option value="10">Показать 10</Option>
                    <Option value="20">Показать 20</Option>
                    <Option value="30">Показать 30</Option>
                    <Option value="40">Показать 40</Option>
                </Select>

                <Select defaultValue="popularity.desc" onChange={changeSort}>
                    <Option value="popularity.desc">По популярности</Option>
                    <Option value="release_date.desc">По дате добавления</Option>
                    <Option value="vote_count.desc">По рейтингу КиноПоиска</Option>
                    <Option value="vote_average.desc">По рейтингу IMDB</Option>
                    <Option value="primary_release_date.desc">По дате премьеры</Option>
                </Select>
            </div>
        </div>
    </div>
};

export default FilterBarBlock;