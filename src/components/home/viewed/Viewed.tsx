import React from "react";
import './Viewed.less';
import {Row, Col, Button} from "antd";

const Viewed: React.FC = () => {
    return <div className="viewed">
        <div className="title-block">
            <div className="title">
                Недавно Просмотренные Фильмы
            </div>
            <div className="line"/>
        </div>
        <div className="contents">
            <Row type="flex" gutter={15}>
                {[1, 2, 2, 2, 2, 2, 2, 2, 2, 2].map(() =>
                    <Col>
                        <div className="movie">

                        </div>
                    </Col>
                )}
            </Row>
        </div>
    </div>;
};

export default Viewed;
