import React, {useState} from "react";
import './Episodes.less';
import {Icon} from "antd";
// @ts-ignore
import {LazyLoadImage} from 'react-lazy-load-image-component';

const EpisodeBlock: React.FC<{ data: any }> = ({data}) => {
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState(false);

    const imageLoad = () => {
        setLoader(false);
        setError(false);
    };

    const imageError = (e: any) => {
        setLoader(false);
        setError(true);
    };

    return <div className="episode-block pe-block">
        {data && !error ?
            <LazyLoadImage
                src={data.poster}
                alt={data.alt}
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

        <div className="titles-block">
            {
                data && data.title ?
                    [
                        <span className="sub-title" key="sub-title">Серия 4, Сезон 2</span>,
                        <span className="title" key="title">{data.title}</span>
                    ] : null
            }
        </div>
    </div>;
};

export default EpisodeBlock
