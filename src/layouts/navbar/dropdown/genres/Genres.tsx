import React from "react";
import './Genres.less';
import {Col, Row} from "antd";

const GenresBlock: React.FC<{ movie: boolean }> = ({movie}) => {
    return <Col lg={movie ? 12 : 8} className={movie ? '' : 'block'}>
        <div className="title-block">
            Жанры
        </div>
        <div className="genres-block">
            {movie ? <Row type="flex" gutter={15}>
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
                : <Row type="flex" gutter={15}>
                    <Col lg={12}>
                        <span>Аниме</span>
                        <span>Боевик</span>
                        <span>Детектив</span>
                        <span>Драма</span>
                        <span>Зарубежные</span>
                        <span>История</span>
                        <span>Комедия</span>
                        <span>Криминал</span>
                        <span>Мюзикл</span>
                        <span>Полнометражные</span>

                    </Col>
                    <Col lg={12}>
                        <span>Приключения</span>
                        <span>Развивающие</span>
                        <span>Русские</span>
                        <span>Сериалы</span>
                        <span>Советские</span>
                        <span>Спорт</span>
                        <span>Триллер</span>
                        <span>Ужасы</span>
                        <span>Фантастика</span>
                        <span>Фэнтези</span>
                    </Col>
                </Row>}
        </div>
    </Col>;
};

export default GenresBlock;
