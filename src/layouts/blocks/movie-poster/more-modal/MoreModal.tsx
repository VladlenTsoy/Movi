import React from "react";
import './MoreModal.less';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button, Modal, Typography} from "antd";
import {faPlay} from "@fortawesome/free-solid-svg-icons";
import moment from 'moment';
import Imdb from "../../votes/imdb/Imdb";
import PosterBlock from "../../poster/Poster";
import ButtonWillWatch from "../../../components/will-watch/willWatch";
import {Link} from "react-router-dom";
import Stars from "../../votes/stars/Stars";
import Views from "../../votes/views/Views";
// @ts-ignore
import {LazyLoadImage} from 'react-lazy-load-image-component';

const {Title} = Typography;

const MoreModal: React.FC<any> = ({movie, isWillWatch, laterLoading, sendIdToSeeLater, visible, closeMoreModal}) => {
    return <Modal
        className="movie-more-modal"
        title={null}
        centered
        width={1200}
        closable={false}
        footer={null}
        visible={visible}
        onCancel={closeMoreModal}
    >
        <div className="image-block">
            <LazyLoadImage
                src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
                alt={movie.title}
                effect="blur"
                width="100%"
                // onError={imageError}
                // afterLoad={imageLoad}
                delayTime={500}/>
        </div>

        <div className="content-block">
            <div className="header-block">
                <div className="more-poster-block">
                    <PosterBlock image={{
                        poster: 'https://image.tmdb.org/t/p/w185' + movie.poster_path,
                        alt: movie.title
                    }}/>
                    <div className="votes-block">
                        <span className="rating">+18</span>
                        <Imdb average={movie.vote_average} count={movie.vote_count}/>
                        <Views popularity={movie.popularity}/>
                        <Stars average={movie.vote_average} count={movie.vote_count}/>
                    </div>
                </div>

                <div className="action-play-block">
                    <Button size="large" ghost>Смотреть <FontAwesomeIcon icon={faPlay}/></Button>
                    <span className="sub-button">Смотреть трейлер</span>
                </div>

                <div className="actions-right-block">
                    <ButtonWillWatch loading={laterLoading} sendIdToSeeLater={sendIdToSeeLater}
                                     isWillWatch={isWillWatch}/>
                </div>
            </div>

            <div className="title-more">
                <div className="title">
                    <span className="genres">Action, {moment(movie.release_date).format('YYYY')}</span>
                    <Title>{movie.title}</Title>
                </div>
            </div>
            <p>{movie.overview}</p>
            <p className="directors">
                <span className="title">Режиссёры:</span>
                <Link to={`/director/1`} className="director">Дэвид Яровески</Link>
            </p>
            <p className="actors">
                <Link to={`/actor/1`} className="title">Актеры:</Link>
                <Link to={`/actor/1`} className="actor">Элизабет Бэнкс</Link>
                <Link to={`/actor/1`} className="actor">Джексон А. Данн</Link>
                <Link to={`/actor/1`} className="actor">Дэвид Денман</Link>
                <Link to={`/actor/1`} className="actor">Мэтт Джонс</Link>
                <Link to={`/actor/1`} className="actor">Мередит Хагнер</Link>
                <Link to={`/actor/1`} className="actor">Эмми Хантер</Link>
                <Link to={`/actor/1`} className="actor">Бекки Уолстром</Link>
                <Link to={`/actor/1`} className="actor">Грегори Алан Уильямс</Link>
                <Link to={`/actor/1`} className="actor">Стив Эйджи</Link>
            </p>
        </div>
    </Modal>;
};

export default MoreModal;