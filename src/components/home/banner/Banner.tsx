import React, {useEffect, useState} from "react";
import './Banner.less';
import {Button, Icon} from "antd";
import QueueAnim from 'rc-queue-anim';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import PosterBlock from "../../../layouts/blocks/poster/Poster";
import Moment from "react-moment";
// @ts-ignore
import {LazyLoadImage} from 'react-lazy-load-image-component';
import {useSelector} from "react-redux";

interface BannerImage {
    data: any,
}

/**
 * Output image for the banner (background)
 * @param data = movie | tv | kids
 */
const BannerImage: React.FC<BannerImage> = ({data}) => {
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState(false);

    const imageLoad = () => {
        setLoader(false);
        setError(false);
    };

    const imageError = () => {
        setLoader(false);
        setError(true);
    };

    return <div className="banner-image">
        {data && !error ?
            <LazyLoadImage
                src={`https://image.tmdb.org/t/p/w1280/${data.backdrop_path}`}
                alt={data.title}
                effect="blur"
                width="100%"
                onError={imageError}
                afterLoad={imageLoad}
                delayTime={500}/> :
            error ?
                <div className="banner-loader" key="empty">
                    <Icon type="exclamation-circle"/>
                </div> : null}
        {loader ?
            <div className="banner-loader" key="loader">
                <Icon type="loading"/>
            </div> : null}
    </div>
};

/**
 * Output movies by 'banner_at'
 */
const Banner: React.FC = () => {
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

    return <div className="banner-block" key="banner-home-block">
        {/* picture for the background */}
        <BannerImage data={currentData} key={currentData ? currentData.id : 'banner'}/>

        {/* output of detailed information */}
        <QueueAnim type={['bottom', 'top']} className="more">
            {currentData ? [
                <div className="info" key={`info-${currentData.id}`}>
                    <span>Ужасы</span>
                    <span><Moment format="YYYY">{currentData.release}</Moment></span>
                    <span>США</span>
                </div>,
                <h1 key={`title-${currentData.id}`}>{currentData.title}</h1>,
                <div className="actions" key={`actions-${currentData.id}`}>
                    <Button type="primary" size="large">
                        Смотреть
                        <FontAwesomeIcon icon="play"/>
                    </Button>
                    <Button ghost size="large">+ Плейлист</Button>
                </div>
            ] : null}
        </QueueAnim>

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

export default Banner;
