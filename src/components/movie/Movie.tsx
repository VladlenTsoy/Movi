import React, {useEffect, useState} from "react";
import './Movie.less';
import {Typography} from "antd";
import {useSelector} from "react-redux";

const {Title} = Typography;

const Movie: React.FC = ({match}: any) => {
    const {api} = useSelector((state: any) => (state));
    const [movie, setMovie] = useState();

    useEffect(() => {
        (async () => {
            try {
                const response = await api.guest(`/movie/${match.params.id}?api_key=ac98cb53e0760e1f61d042006ba12afa&language=ru`);
                setMovie(response.data);
            } catch (e) {
                console.error(e);
            }
        })()
    }, []);

    console.log(movie);

    return <div>
        {movie ? <div className="movie">
                <div className="movie-head">
                    <div className="movie-background">
                        <img src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`} alt=""/>
                    </div>
                    <div className="movie-player"/>
                </div>
                <div className="movie-body">
                    <div className="title-block">
                        <div className="title-info">
                            <Title level={1} className="title">
                                {movie.title}
                            </Title>
                            <p className="sub-title">
                                <span>32мин</span>
                                <span>Добавлен: 17.06.1212</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div> :
            <div/>
        }
    </div>;
};

export default Movie;