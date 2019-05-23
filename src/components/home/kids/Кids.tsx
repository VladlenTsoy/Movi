import React from "react";
import './Kids.less';
import {Button, Col, Row} from "antd";

const Kids: React.FC = () => {
    return <div className="kids">
        <div className="title-block">
            <div className="title">
                Для Детей
            </div>
            <div className="line"/>
            <div className="sort">
                <span className="active">Сегодня</span>
                <span>За неделю</span>
                <span>За месяц</span>
                <span>За 3 месяца</span>
            </div>
        </div>
        <div className="contents">
            <Row type="flex" gutter={15}>
                <Col lg={8}>
                    <div className="top-trend">
                        <picture></picture>
                    </div>
                </Col>
                <Col lg={4}>
                    {[1, 2].map(() =>
                        <div className="trend">
                            <picture></picture>
                        </div>
                    )}
                </Col>
                <Col lg={4}>
                    {[1, 2].map(() =>
                        <div className="trend">
                            <picture></picture>
                        </div>
                    )}
                </Col>
                <Col lg={4}>
                    {[1, 2].map(() =>
                        <div className="trend">
                            <picture></picture>
                        </div>
                    )}
                </Col>
                <Col lg={4}>
                    {[1, 2].map(() =>
                        <div className="trend">
                            <picture></picture>
                        </div>
                    )}
                </Col>
            </Row>
        </div>
    </div>;
};

export default Kids;
