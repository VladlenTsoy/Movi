import React, {useState} from "react";
import './Compilation.less';
import Carousel from "../../../layouts/carousel/Carousel";

const Compilation: React.FC = () => {
    let [genre, setGenre]: any = useState(12);
    let [url, setUrl] = useState(`/discover/movie?api_key=ac98cb53e0760e1f61d042006ba12afa&language=ru&page=`);

    // Sort
    let sortGenres = (_genre: number | null) => {
        setGenre(_genre);
        setUrl(`/discover/movie?${_genre ? 'with_genres=' + _genre + '&' : ''}api_key=ac98cb53e0760e1f61d042006ba12afa&language=ru&page=`);
    };

    return <div className="compilation">
        <div className="title-block">
            <div className="title">
                День святого Валентина
            </div>
            <div className="line"/>
            <div className="sort">
                <span className={genre === null ? 'active' : ''} onClick={() => sortGenres(null)}>Все</span>
                <span className={genre === 18 ? 'active' : ''} onClick={() => sortGenres(18)}>Драма</span>
                <span className={genre === 35 ? 'active' : ''} onClick={() => sortGenres(35)}>Комедия</span>
                <span className={genre === 10402 ? 'active' : ''} onClick={() => sortGenres(10402)}>Музыка</span>
                <span className={genre === 10751 ? 'active' : ''} onClick={() => sortGenres(12)}>Семейные</span>
            </div>
        </div>
        <div className="contents">
            <Carousel url={url} count={8} apiCount={20} title={true} poster={true}/>
        </div>
    </div>;
};

export default Compilation;
