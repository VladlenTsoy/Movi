import React from "react";
import './Trending.less';
import {Row, Col, Button} from "antd";

const Trending: React.FC = () => {
    return <div className="trending">
        <div className="tabs">
            <div className="navs">
                <span className="active">Популярные Фильмы</span>
                <span className="slash">/</span>
                <span>Популярные Сериалы</span>
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
                <Col className="top-trend-col">
                    <div className="top-trend">
                        <picture></picture>
                    </div>
                </Col>
                <Col className="trend-col">
                    {[1, 2].map((key) =>
                        <div className="trend" key={key}>
                            <picture></picture>
                        </div>
                    )}
                </Col>
                <Col className="trend-col">
                    {[1, 2].map((key) =>
                        <div className="trend" key={key}>
                            <picture></picture>
                        </div>
                    )}
                </Col>
                <Col className="trend-col">
                    {[1, 2].map((key) =>
                        <div className="trend" key={key}>
                            <picture></picture>
                        </div>
                    )}
                </Col>
            </Row>
            <div className="action">
                <Button className="btn-for-block" type="ghost" block={true}>Посмотреть все</Button>
            </div>
        </div>
    </div>;
};

export default Trending;
