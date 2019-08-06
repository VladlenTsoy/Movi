import React, {useState} from "react";
import {Icon} from "antd";
// @ts-ignore
import {LazyLoadImage} from 'react-lazy-load-image-component';

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

export default BannerImage;