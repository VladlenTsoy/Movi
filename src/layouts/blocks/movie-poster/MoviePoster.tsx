import React, {useState} from "react";
import './MoviePoster.less'
import PosterBlock from "../poster/Poster";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {userAddWillWatch, userRemoveWillWatch} from "../../../store/user/actions";
import moment from 'moment';

import MoreModal from "./more-modal/MoreModal";
import Imdb from "../votes/imdb/Imdb";
import ButtonWillWatch from "../../components/will-watch/willWatch";
import Views from "../votes/views/Views";
import Stars from "../votes/stars/Stars";

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

    const closeMoreModal = () => {
        setVisible(false);
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
                        <span className="genres">Action, {moment(movie.release_date).format('YYYY')}</span>
                        <Link to={`/movie/${movie.id}`} className="title">{movie.title}</Link>
                    </div>

                    <ButtonWillWatch loading={laterLoading} sendIdToSeeLater={sendIdToSeeLater} isWillWatch={isWillWatch}/>
                </div>
            </div>

            <div className="description" onClick={() => setVisible(true)}>
                <p>{movie.overview.substr(0, 90)}{movie.overview.length > 90 ? '...' : ''}</p>
            </div>

            <div className="reviews">
                <Stars average={movie.vote_average} count={movie.vote_count}/>
                <Imdb average={movie.vote_average} count={movie.vote_count}/>
                <Views popularity={movie.popularity}/>
            </div>
        </div>
        <MoreModal
            key={movie.id}
            movie={movie}
            laterLoading={laterLoading}
            sendIdToSeeLater={sendIdToSeeLater}
            isWillWatch={isWillWatch}
            visible={visible}
            closeMoreModal={closeMoreModal}/>
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
