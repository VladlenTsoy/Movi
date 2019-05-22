import React from "react";
import './Banner.less';
import {Button} from "antd";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import interstellar from '../../../assets/movies/iphone360_258687.jpg';
import iron_man_3 from '../../../assets/movies/iphone360_462762.jpg';
import infinity_war from '../../../assets/movies/iphone360_843649.jpg';
import picachu from '../../../assets/movies/iphone360_994864.jpg';
import endgame from '../../../assets/movies/kinopoisk.ru-Avengers_3A-Endgame-3355268.jpg';


const Banner: React.FC = () => {
    return <div className="banner">
        <div className="more">
            <div className="info">
                <span>Фантастика, Боевик, Приключения</span>
                <span>2019</span>
                <span>США</span>
            </div>
            <h1>Мстители: Война бесконечности</h1>
            <div className="actions">
                <Button type="primary" size="large">
                    Смотреть
                    <FontAwesomeIcon icon="play"/>
                </Button>
                <Button ghost size="large">+ Плейлист</Button>
            </div>
        </div>
        <div className="carousel">
            <div className="movie">
                <img src={interstellar} alt=""/>
            </div>
            <div className="movie">
                <img src={iron_man_3} alt=""/>
            </div>
            <div className="movie active">
                <img src={infinity_war} alt=""/>
            </div>
            <div className="movie">
                <img src={picachu} alt=""/>
            </div>
            <div className="movie">
                <img src={endgame} alt=""/>
            </div>
        </div>
    </div>
};

export default Banner;
