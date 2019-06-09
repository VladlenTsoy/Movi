import React, {useEffect, useState} from "react";
import './Poster.less';
import {Icon} from 'antd';
import QueueAnim from 'rc-queue-anim';
import Moment from 'react-moment';

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

    const imageError = (e:any) => {
        setLoader(false);
        setError(true);
    };

    useEffect(() => {
        if (!data) return;

        img.src = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2/' + data.poster;
        img.onload = imageLoad;
        img.onerror = imageError;

        return () => {
            img.onload = null;
        };
    }, [data, img]);

    return <div className="poster-block">
        <QueueAnim>
            {!loader && data && !error ?
                <picture key="picture">
                    <img src={'https://image.tmdb.org/t/p/w185_and_h278_bestv2/' + data.poster} alt={data.alt}/>
                </picture> :
                error ?
                    <div className="loader-block" key="empty">
                        <Icon type="exclamation-circle"/>
                    </div> :
                    <div className="loader-block" key="loader">
                        <Icon type="loading"/>
                    </div>
            }
        </QueueAnim>
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
