import React from "react";
import './TVSeriesDay.less';
import {Button, Col, Row} from "antd";
import poster from "../../../../assets/movies/kinopoisk.ru-True-Detective-3260147.jpg";

const TVSeriesDayBlock: React.FC = () => {
    return <Col lg={8} className="block" key="1">
        <div className="title-block">
            Сериал Дня
        </div>
        <Row type="flex" gutter={15}>
            <Col lg={12}>
                <picture className="poster">
                    <img src={poster} alt=""/>
                </picture>
            </Col>
            <Col lg={12}>
                <div className="movie-of-the-day-block">
                    <span className="genres">
                        Фантастика, Боевик, Приключения
                    </span>
                    <div className="title">
                        Настоящий детектив
                    </div>
                    <div className="description">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, aliquam
                        aliquid
                        amet consectetur earum enim impedit maiores molestias nisi, nulla, obcaecati
                        officiis omnis praesentium quibusdam reiciendis rem rerum sapiente voluptatem!
                    </div>
                    <Button type="link" block={true}>Смотреть</Button>
                </div>
            </Col>
        </Row>
    </Col>;
};

export default TVSeriesDayBlock;
