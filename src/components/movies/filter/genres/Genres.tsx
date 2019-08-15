import React, {useEffect, useState} from "react";
import './Genres.less';
import {Checkbox, Col, Row} from 'antd';
import {useSelector} from "react-redux";

const Genres: React.FC<any> = ({genres, changeGenres}) => {
    const onCheckGenres = (e: any) => {
        changeGenres(e.target.value, e.target.checked);
    };

    return <div className="filter-genres">
        <Row>
            <Col span={24}>
                <div className="title-block">
                    <div className="title">Жанры</div>
                </div>
            </Col>
            <Col span={24}>
                {genres.map((genre: any) =>
                    <div className="wrap-genres-checkbox" title="биографический"
                         key={genre.id}>
                        <Checkbox onChange={onCheckGenres} value={genre.id}>{genre.name}</Checkbox>
                    </div>
                )}
            </Col>
            {/*<Col span={13}>*/}
            {/*    <span className="wrap-genres-checkbox" title="биографический"><Checkbox>биографический</Checkbox></span>*/}
            {/*    <span className="wrap-genres-checkbox" title="боевик"><Checkbox>боевик</Checkbox></span>*/}
            {/*    <span className="wrap-genres-checkbox" title="вестерн"><Checkbox>вестерн</Checkbox></span>*/}
            {/*    <span className="wrap-genres-checkbox" title="военный"><Checkbox>военный</Checkbox></span>*/}
            {/*    <span className="wrap-genres-checkbox" title="детектив"><Checkbox>детектив</Checkbox></span>*/}
            {/*    <span className="wrap-genres-checkbox" title="детский"><Checkbox>детский</Checkbox></span>*/}
            {/*    <span className="wrap-genres-checkbox" title="документальный"><Checkbox>документальный</Checkbox></span>*/}
            {/*    <span className="wrap-genres-checkbox" title="драма"><Checkbox>драма</Checkbox></span>*/}
            {/*    <span className="wrap-genres-checkbox" title="исторический"><Checkbox>исторический</Checkbox></span>*/}
            {/*    <span className="wrap-genres-checkbox" title="кинокомикс"><Checkbox>кинокомикс</Checkbox></span>*/}
            {/*    <span className="wrap-genres-checkbox" title="комедия"><Checkbox>комедия</Checkbox></span>*/}
            {/*    <span className="wrap-genres-checkbox" title="короткометражный"><Checkbox>короткометражный</Checkbox></span>*/}
            {/*    <span className="wrap-genres-checkbox" title="криминал"><Checkbox>криминал</Checkbox></span>*/}
            {/*</Col>*/}
            {/*<Col span={11}>*/}
            {/*    <span className="wrap-genres-checkbox" title="мелодрама"><Checkbox>мелодрама</Checkbox></span>*/}
            {/*    <span className="wrap-genres-checkbox" title="мистика"><Checkbox>мистика</Checkbox></span>*/}
            {/*    <span className="wrap-genres-checkbox" title="мюзикл"><Checkbox>мюзикл</Checkbox></span>*/}
            {/*    <span className="wrap-genres-checkbox" title="научный"><Checkbox>научный</Checkbox></span>*/}
            {/*    <span className="wrap-genres-checkbox" title="приключения"><Checkbox>приключения</Checkbox></span>*/}
            {/*    <span className="wrap-genres-checkbox" title="семейный"><Checkbox>семейный</Checkbox></span>*/}
            {/*    <span className="wrap-genres-checkbox" title="спорт"><Checkbox>спорт</Checkbox></span>*/}
            {/*    <span className="wrap-genres-checkbox" title="триллер"><Checkbox>триллер</Checkbox></span>*/}
            {/*    <span className="wrap-genres-checkbox" title="ужасы"><Checkbox>ужасы</Checkbox></span>*/}
            {/*    <span className="wrap-genres-checkbox" title="фантастика"><Checkbox>фантастика</Checkbox></span>*/}
            {/*    <span className="wrap-genres-checkbox" title="фильм"><Checkbox>фильм</Checkbox></span>*/}
            {/*    <span className="wrap-genres-checkbox" title="фэнтези"><Checkbox>фэнтези</Checkbox></span>*/}
            {/*</Col>*/}
        </Row>
    </div>;
};

const GenresState: React.FC<any> = ({changeGenres}) => {
    const {api} = useSelector((state: any) => (state));
    const [genres, setGenres] = useState([]);
    useEffect(() => {
        (async () => {
            let response = await api.guest.get(`/genre/movie/list`, {
                params: {
                    api_key: 'ac98cb53e0760e1f61d042006ba12afa',
                    language: 'ru',
                }
            });
            setGenres(response.data.genres);
        })();
    }, []);

    return <Genres genres={genres} changeGenres={changeGenres}/>
};

export default GenresState;
