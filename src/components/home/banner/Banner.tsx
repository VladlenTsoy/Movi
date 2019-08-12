import React, {useEffect, useState} from "react";
import './Banner.less';
import {Button} from "antd";
import QueueAnim from 'rc-queue-anim';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import PosterBlock from "../../../layouts/blocks/poster/Poster";
import Moment from "react-moment";
import {useSelector} from "react-redux";
import BannerImage from "./banner-image/BannerImage";

interface BannerPropTypes {
    currentData: any;
    banners: any;
    selectMovie: any;
}

/**
 * Output movies by 'banner_at'
 */
const Banner: React.FC<BannerPropTypes> = ({currentData, banners, selectMovie}) => {
    return <div className="banner-block" key="banner-home-block">
        {/* picture for the background */}
        <BannerImage data={currentData} key={currentData ? currentData.id : 'banner'}/>

        {/* output of detailed information */}
        <div className="more">
            <QueueAnim type={['bottom', 'top']} className="wrapper-info">
                {currentData ? [
                    <div className="info" key={`info-${currentData.id}`}>
                        <span>Ужасы</span>
                        <span><Moment format="YYYY">{currentData.release}</Moment></span>
                        <span>США</span>
                    </div>,
                    <h1 key={`title-${currentData.id}`}>{currentData.title}</h1>,

                ] : null}
            </QueueAnim>
            <div className="actions" key={`actions-${currentData ? currentData.id : 1}`}>
                <Button type="primary" size="large" loading={!currentData}>
                    Смотреть
                    <FontAwesomeIcon icon="play"/>
                </Button>
                <Button ghost size="large" icon="plus" loading={!currentData}>Плейлист</Button>
            </div>
        </div>

        {/* output five movies for banner */}
        <div className="carousel" key="banner-carousel">
            {banners.map((banner: any, key: number) =>
                <div className={`movie ${currentData && banner.id === currentData.id ? 'active' : ''}`}
                     key={key} data-key={key} onClick={selectMovie}>
                    <PosterBlock image={{
                        poster: 'https://image.tmdb.org/t/p/w92/' + banner.poster_path,
                        alt: banner.title
                    }}/>
                </div>
            )}
        </div>
    </div>
};

const BannerState: React.FC = () => {
    const {api} = useSelector((state: any) => (state));
    const [url] = useState(`/trending/movie/day?api_key=ac98cb53e0760e1f61d042006ba12afa&language=ru`);
    const [banners, setMovies]: any = useState([]);
    const [currentData, setCurrentData]: any = useState(null);

    const selectMovie = (e: any) => {
        const {key} = e.currentTarget.dataset;

        if (banners[key] === currentData)
            return;

        setCurrentData(null);
        setTimeout(() => setCurrentData(banners[key]), 500);
    };

    useEffect(() => {
        (async () => {
            const {data} = await api.guest.get(`${url}${1}`);
            setMovies(data.results.slice(0, 5));
            setCurrentData(data.results[0]);
        })();
    }, [url, api.guest]);

    return <Banner banners={banners} currentData={currentData} selectMovie={selectMovie}/>
};

export default BannerState;
