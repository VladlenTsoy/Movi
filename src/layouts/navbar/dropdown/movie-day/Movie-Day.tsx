import React from "react";
import './Movie-Day.less';
import {Button, Col, Row} from "antd";
import poster from "../../../../assets/movies/kinopoisk.ru-Avengers_3A-Endgame-3355268.jpg";

const MovieDayBlock: React.FC = () => {
    return <Col lg={8} className="block">
        <div className="title-block">
            Фильм Дня
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
                        Мстители: Финал
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

export default MovieDayBlock;
