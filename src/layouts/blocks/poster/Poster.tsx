import React, {useState} from "react";
import './Poster.less';
import {Icon} from 'antd';
// @ts-ignore
import {LazyLoadImage} from 'react-lazy-load-image-component';

interface Info {
    outside?: boolean,
    title: string,
    subTitle?: string,
}


const TitleBlock: React.FC<Info> = ({title, subTitle}) => {
    return <div className="titles-block">
        {!subTitle || <span className="sub-title" key="sub-title">{subTitle}</span>}
        <span className="title" key="title">{title}</span>
    </div>
};

interface Poster {
    position?: 'landscape' | 'portrait'
    image?: {
        poster: string,
        alt: string,
    }
    info?: Info
}

const PosterBlock: React.FC<Poster> = ({position = 'portrait', image, info}) => {
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

    return <div className="wrap-block">
        <div className={`${position === 'portrait' ? 'poster-block' : 'episode-block'} pe-block`}>
            {image && !error ?
                <LazyLoadImage
                    src={image.poster}
                    alt={image.alt}
                    effect="blur"
                    onError={imageError}
                    afterLoad={imageLoad}
                    width="100%"/> :
                error ?
                    <div className="loader-block" key="empty">
                        <Icon type="exclamation-circle"/>
                    </div> : null}

            {loader ?
                <div className="loader-block" key="loader">
                    <Icon type="loading"/>
                </div> : null}

            {info && !info.outside ? <TitleBlock title={info.title} subTitle={info.subTitle}/> : null}
        </div>

        {info && info.outside ? <TitleBlock title={info.title} subTitle={info.subTitle}/> : null}
    </div>;
};

export default PosterBlock;


// {/*<span className="sub-title" key="sub-title">Ужасы, <Moment format="YYYY">{data.release}</Moment></span>,*/},
