import React, {useState} from "react";
import './MoviePoster.less'
import PosterBlock from "../poster/Poster";
import {Icon, Button, Modal} from "antd";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faImdb} from "@fortawesome/free-brands-svg-icons";
import {faBookmark} from "@fortawesome/free-regular-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {userAddWillWatch, userRemoveWillWatch} from "../../../store/user/actions";

const MoviesPosterBlock: React.FC<any> = ({user, movie, addSeeLater, removeSeeLater}) => {
    const [visible, setVisible] = useState(false);
    const [laterLoading, setLaterLoading] = useState(false);
    const isWillWatch = user.see_later.includes(movie.id);

    const sendIdToSeeLater = async () => {
        setLaterLoading(true);

        if (isWillWatch)
            await removeSeeLater(movie.id);
        else
            await addSeeLater(movie.id);

        setLaterLoading(false);
    };

    return <div className="movie-poster-block">
        <div className="poster-block">
            <PosterBlock image={{
                poster: 'https://image.tmdb.org/t/p/w92' + movie.poster_path,
                alt: movie.title
            }}/>
        </div>
        <div className="info-block">
            <div className="header-block">
                <div className="header-title">
                    <div className="genres-title">
                        <span className="genres">Action, 2019</span>
                        <Link to={`movies/${movie.id}`} className="title">{movie.title}</Link>
                    </div>

                    <Button type="link"
                            size="small"
                            loading={laterLoading}
                            className={`will-watch ${isWillWatch ? 'active' : ''}`}
                            onClick={sendIdToSeeLater}>
                        {laterLoading ? null : isWillWatch ?
                            <Icon type="check"/> :
                            <FontAwesomeIcon icon={faBookmark}/>}
                        Буду смотреть
                    </Button>
                </div>
            </div>

            <div className="description" onClick={() => setVisible(true)}>
                <p>{movie.overview.substr(0, 90)}{movie.overview.length > 90 ? '...' : ''}</p>
            </div>

            <div className="reviews">
                <div className="stars">
                    <div className="wrapper-star">
                        <Icon type="star" theme="filled"/>
                        <span className="assessment">{movie.vote_average}</span>
                    </div>
                    <div className="wrapper-votes">
                        <div className="votes">
                            <span>{movie.vote_count}</span>
                            <span>голосов</span>
                        </div>
                    </div>
                </div>
                <div className="wrapper-imdb">
                    <FontAwesomeIcon icon={faImdb}/>
                    <span className={movie.vote_average > 6.5 ? 'active' : ''}>
                        {movie.vote_average}
                        <small>{movie.vote_count}</small>
                    </span>
                </div>
                <div className="wrapper-views">
                    <Icon type="eye"/>
                    <div className="views">
                        <span>{movie.popularity} Просмотров</span>
                        {/*<span>Просмотров</span>*/}
                    </div>
                </div>
            </div>
        </div>
        <Modal
            className="movie-more-modal"
            title="Vertically centered modal dialog"
            centered
            closable={false}
            footer={null}
            visible={visible}
            onCancel={() => setVisible(false)}
        >
            <p>some contents...</p>
            <p>some contents...</p>
            <p>some contents...</p>
        </Modal>
    </div>;
};


const MoviesPosterState: React.FC<any> = ({movie}) => {
    const {user} = useSelector((state: any) => (state));
    const dispatch = useDispatch();

    const addSeeLater = (id: string) =>
        dispatch(userAddWillWatch(id));

    const removeSeeLater = (id: string) =>
        dispatch(userRemoveWillWatch(id));

    return <MoviesPosterBlock
        user={user}
        movie={movie}
        addSeeLater={addSeeLater}
        removeSeeLater={removeSeeLater}/>
};

export default MoviesPosterState;
