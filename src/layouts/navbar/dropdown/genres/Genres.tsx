import React from "react";
import './Genres.less';
import {Col, Row} from "antd";

const GenresBlock: React.FC = () => {
    return <Col lg={12}>
        <div className="title-block">
            Жанры
        </div>
        <div className="genres-block">
            <Row type="flex" gutter={15}>
                <Col lg={8}>
                    <span>биографический</span>
                    <span>боевик</span>
                    <span>вестерн</span>
                    <span>военный</span>
                    <span>детектив</span>
                    <span>детский</span>
                    <span>документальный</span>
                    <span>драма</span>
                    <span>исторический</span>
                    <span>кинокомикс</span>

                </Col>
                <Col lg={8}>
                    <span>комедия</span>
                    <span>короткометражный</span>
                    <span>криминал</span>
                    <span>мелодрама</span>
                    <span>мистика</span>
                    <span>мюзикл</span>
                    <span>научный</span>
                    <span>приключения</span>
                    <span>семейный</span>
                    <span>спорт</span>
                </Col>
                <Col lg={8}>
                    <span>триллер</span>
                    <span>ужасы</span>
                    <span>фантастика</span>
                    <span>фильм-нуар</span>
                    <span>фэнтези</span>
                </Col>
            </Row>
        </div>
    </Col>;
};

export default GenresBlock;
