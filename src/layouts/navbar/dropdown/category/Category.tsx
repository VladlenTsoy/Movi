import React from "react";
import './Category.less';
import {Col} from "antd";

const CategoryBlock: React.FC = () => {
    return <Col lg={4} className="block">
        <div className="title-block">
            Категории
        </div>
        <div className="category-block">
            <span>Все</span>
            <span>Новинки</span>
            <span>Подборки</span>
            <span>Популяные</span>
            <span>Рекомендованные</span>
            <span className="sub-title">По рейтингу</span>
            <span>IMDb</span>
            <span>КиноПоиск</span>
            <span>Rotten Tomatoes</span>
        </div>
    </Col>;
};

export default CategoryBlock;
