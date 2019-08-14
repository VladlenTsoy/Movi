import React, {useEffect, useState} from "react";
import './Banner.less';
import {Button} from "antd";
import QueueAnim from 'rc-queue-anim';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import PosterBlock from "../../../layouts/blocks/poster/Poster";
import Moment from "react-moment";
import {useDispatch, useSelector} from "react-redux";
import BannerImage from "./banner-image/BannerImage";
import {RouteComponentProps, withRouter} from "react-router";
import {faPlay} from "@fortawesome/free-solid-svg-icons";
import {faBookmark} from "@fortawesome/free-regular-svg-icons";
import {userAddWillWatch} from "../../../store/user/actions";

// Your component own properties
type BannerPropTypes = RouteComponentProps & {
    currentData: any;
    banners: any;
    history: any;
    selectMovie: any;
    addSeeLater: any;
}

/**
 * Output movies by 'banner_at'
 */
const Banner: React.FC<BannerPropTypes> = ({currentData, banners, selectMovie, history, addSeeLater}) => {
    const goToView = (id: string) => {
        history.push(`/movies/${id}`);
    };


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
                <Button type="primary" size="large" loading={!currentData} onClick={() => goToView(currentData.id)}>
                    Смотреть
                    {currentData ? <FontAwesomeIcon icon={faPlay}/> : null}
                </Button>
                <Button className="willWatch" ghost size="large" loading={!currentData}
                        onClick={() => addSeeLater(currentData.id)}>
                    {currentData ? <FontAwesomeIcon icon={faBookmark}/> : null}
                    Буду смотреть
                </Button>
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

const RouterBanner: any = withRouter(Banner);

const BannerState: React.FC = () => {
    const {api} = useSelector((state: any) => (state));
    const [url] = useState(`/trending/movie/day?api_key=ac98cb53e0760e1f61d042006ba12afa&language=ru`);
    const [banners, setBanners]: any = useState([]);
    const [currentData, setCurrentData]: any = useState(null);
    const dispatch = useDispatch();

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
            setBanners(data.results.slice(0, 5));
            setCurrentData(data.results[0]);
        })();
    }, [url, api.guest]);

    const addSeeLater = (id: string) => {
        dispatch(userAddWillWatch(id));
    };

    return <RouterBanner banners={banners} currentData={currentData} selectMovie={selectMovie} addSeeLater={addSeeLater}/>
};

export default BannerState;
