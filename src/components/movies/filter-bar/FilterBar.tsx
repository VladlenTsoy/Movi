import React from "react";
import './FilterBar.less';
import {Checkbox, Dropdown, Icon, Menu} from "antd";

const menu = (
    <Menu>
        <Menu.Item>По популярности</Menu.Item>
        <Menu.Item>По дате добавления</Menu.Item>
        <Menu.Item>По рейтингу КиноПоиска</Menu.Item>
        <Menu.Item>По рейтингу IMDB</Menu.Item>
    </Menu>
);

const FilterBarBlock: React.FC<any> = ({changeSortBy}) => {
    const changeSort = (e: any) => {
        if (e.target.checked)
            changeSortBy('primary_release_date.desc');
        else
            changeSortBy('popularity.desc');
    };

    return <div className="wrapper-movies-filter-block">
        <div className="movies-filter">
            <div className="movies-filter-checkbox">
                <Checkbox onChange={changeSort}>Новинки</Checkbox>
                <Checkbox>Бесплатные</Checkbox>
                <Checkbox>4K - Разрешение</Checkbox>
            </div>

            <div className="movies-filter-dropdown">
                <Dropdown overlay={menu} placement="bottomRight">
                    <a className="ant-dropdown-link" href="#">
                        <Icon type="sort-descending"/> от А до Я <Icon type="down"/>
                    </a>
                </Dropdown>

                <Dropdown overlay={menu} placement="bottomRight">
                    <a className="ant-dropdown-link" href="#">
                        Показать 20 <Icon type="down"/>
                    </a>
                </Dropdown>
            </div>
        </div>
    </div>
};

export default FilterBarBlock;