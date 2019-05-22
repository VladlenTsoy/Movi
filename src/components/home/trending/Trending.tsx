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
            <Row gutter={16}>
                <Col lg={8}>
                    <div className="top-trend">
                        <picture></picture>
                    </div>
                </Col>
                {[1,2,3,4,5,6,7,8].map(()=>
                    <Col lg={4}>
                        <div className="trend">
                            <picture></picture>
                        </div>
                    </Col>
                )}
            </Row>
            <div className="action">
                <Button className="btn-for-block" type="ghost" block={true}>Посмотреть все</Button>
            </div>
        </div>
    </div>;
};

export default Trending;
