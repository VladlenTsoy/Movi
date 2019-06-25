import React from "react";
import './Category.less';
import {Col} from "antd";
import {Link} from "react-router-dom";

const CategoryBlock: React.FC = () => {
    return <Col lg={4} className="block">
        <div className="title-block">
            Категории
        </div>
        <div className="category-block">
            <Link to="/movies">Все</Link>
            <a>Новинки</a>
            <a>Подборки</a>
            <a>Популяные</a>
            <a>Рекомендованные</a>
            <span className="sub-title">По рейтингу</span>
            <a>IMDb</a>
            <a>КиноПоиск</a>
            <a>Rotten Tomatoes</a>
        </div>
    </Col>;
};

export default CategoryBlock;
