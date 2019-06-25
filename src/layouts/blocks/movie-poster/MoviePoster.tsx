import React from "react";
import './MoviePoster.less'
import PosterBlock from "../poster/Poster";
import {Icon} from "antd";

const MoviesPosterBlock: React.FC<any> = ({movie}) => {
    return <div className="movie-poster-block">
        <div className="poster-block">
            <PosterBlock image={{
                poster: 'https://image.tmdb.org/t/p/w92' + movie.poster_path,
                alt: movie.title
            }}/>
        </div>
        <div className="info-block">
            <span className="genres">Action, 2019</span>
            <span className="title">{movie.title}</span>
            <span className="description">{movie.overview}</span>
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
                <div className="views">
                    <Icon type="eye"/>
                    <span>{movie.popularity} Просмотров</span>
                </div>
            </div>
        </div>
    </div>;
};

export default MoviesPosterBlock;
