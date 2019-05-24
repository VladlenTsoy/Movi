import React from "react";
import './MovieDay.less';
import {Button, Col, Row} from "antd";
import PosterBlock from "../../../blocks/poster/Poster";

const MovieDayBlock: React.FC<{ data: any }> = ({data}) => {
    return <Col lg={8} className="block">
        <div className="title-block">
            Фильм Дня
        </div>
        <Row type="flex" gutter={15}>
            <Col lg={10}>
                <PosterBlock data={{poster: data.poster, alt: data.title}}/>
            </Col>
            <Col lg={14}>
                <div className="movie-of-the-day-block">
                    <span className="genres">
                        {data.genres}
                    </span>
                    <div className="title">
                        {data.title}
                    </div>
                    <div className="description">
                        {data.description}
                    </div>
                    <Button type="link" block={true}>Смотреть</Button>
                </div>
            </Col>
        </Row>
    </Col>;
};

export default MovieDayBlock;
