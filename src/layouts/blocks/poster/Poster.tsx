import React, {useEffect, useState} from "react";
import './Poster.less';
import {Icon} from 'antd';
import Moment from 'react-moment';
// @ts-ignore
import {LazyLoadImage} from 'react-lazy-load-image-component';

interface Poster {
    poster: string,
    alt: string,
    title?: string,
    release?: string,
    genre?: string,
}

const PosterBlock: React.FC<{ data: Poster | null }> = ({data}) => {
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState(false);
    const img = new Image();

    const imageLoad = () => {
        setLoader(false);
        setError(false);
    };

    const imageError = (e: any) => {
        setLoader(false);
        setError(true);
    };

    useEffect(() => {
        if (!data) return;

        img.src = data.poster;
        img.onload = imageLoad;

        return () => {
            img.onload = null;
        };
    }, [data, img]);

    return <div className="poster-block">
        {!loader && data && !error ?
            <LazyLoadImage
                src={data.poster}
                alt={data.alt}
                effect="blur"
                onError={imageError}
                width="100%"/> :
            error ?
                <div className="loader-block" key="empty">
                    <Icon type="exclamation-circle"/>
                </div> :
                <div className="loader-block" key="loader">
                    <Icon type="loading"/>
                </div>
        }
        <div className="titles-block">
            {
                data && data.title ?
                    [
                        <span className="sub-title" key="sub-title">Ужасы, <Moment format="YYYY">{data.release}</Moment></span>,
                        <span className="title" key="title">{data.title}</span>
                    ] : null
            }
        </div>
    </div>;
};

export default PosterBlock;
