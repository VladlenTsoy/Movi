import React from "react";
import './Newest-Episodes.less';
import {Col, Row} from "antd";

const NewestEpisodesBlock: React.FC = () => {
    return <Col lg={12} key="3">
        <div className="title-block">
            Серии Дня
        </div>
        <div className="tv-series-of-the-day-block">
            <Row gutter={15}>
                <Col lg={8} className="top-column">
                    <div className="episode"> </div>
                </Col>
                <Col lg={8} className="top-column">
                    <div className="episode"> </div>
                </Col>
                <Col lg={8} className="top-column">
                    <div className="episode"> </div>
                </Col>
                <Col lg={8}>
                    <div className="episode"> </div>
                </Col>
                <Col lg={8}>
                    <div className="episode"> </div>
                </Col>
                <Col lg={8}>
                    <div className="episode"> </div>
                </Col>
            </Row>
        </div>
    </Col>;
};

export default NewestEpisodesBlock;
