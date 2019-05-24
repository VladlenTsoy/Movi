import React from "react";
import './Movies.less';
import {Row, Col} from "antd";

const Movies: React.FC = () => {
    return <div className="top-movies">
        <div className="title-block">
            <div className="title">
                2019 Лучшие Фильмы
            </div>
            <div className="line"/>
            <div className="sort">
                <span className="active">Приключения</span>
                <span>Триллер</span>
                <span>Боевик</span>
                <span>Фантастика</span>
                <span>Драма</span>
                <span>Комедия</span>
            </div>
        </div>
        <div className="contents">
            <Row type="flex" gutter={15}>
                <Col lg={4}>
                    <div className="movie"></div>
                </Col>
                <Col lg={4}>
                    <div className="movie"></div>
                </Col>
                <Col lg={4}>
                    <div className="movie"></div>
                </Col>
                <Col lg={4}>
                    <div className="movie"></div>
                </Col>
                <Col lg={4}>
                    <div className="movie"></div>
                </Col>
                <Col lg={4}>
                    <div className="movie"></div>
                </Col>
            </Row>
        </div>
    </div>;
};

export default Movies;
