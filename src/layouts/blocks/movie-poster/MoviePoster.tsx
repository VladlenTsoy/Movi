import React from "react";
import './MoviePoster.less'
import PosterBlock from "../poster/Poster";
import {Icon, Button} from "antd";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faImdb} from "@fortawesome/free-brands-svg-icons";
import {faBookmark} from "@fortawesome/free-regular-svg-icons";

const MoviesPosterBlock: React.FC<any> = ({movie}) => {
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

                    <Button type="link" ghost size="small" className="willWatch">
                        <FontAwesomeIcon icon={faBookmark}/>
                        Буду смотреть
                    </Button>
                </div>
                <div className="description">
                    <p>{movie.overview.substr(0, 120)}{movie.overview.length > 120 ? '...' : ''}</p>
                </div>
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
                        <small>{movie.vote_count} голосов</small>
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
    </div>;
};

export default MoviesPosterBlock;
