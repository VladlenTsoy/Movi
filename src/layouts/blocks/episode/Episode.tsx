import React, {useEffect, useState} from "react";
import './Episodes.less';
import QueueAnim from "rc-queue-anim";
import {Icon} from "antd";

const EpisodeBlock: React.FC<{ data: any }> = ({data}) => {
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

        img.src = 'https://image.tmdb.org/t/p/w300/' + data.poster;
        img.onload = imageLoad;
        img.onerror = imageError;

        return () => {
            img.onload = null;
        };
    }, [data, img]);

    return <div className="episode-block">
        <QueueAnim>
            {!loader && data && !error ?
                <picture key="picture">
                    <img src={'https://image.tmdb.org/t/p/w300/' + data.poster} alt={data.alt}/>
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
                        <span className="sub-title" key="sub-title">Серия 4, Сезон 2</span>,
                        <span className="title" key="title">{data.title}</span>
                    ] : null
            }
        </div>
    </div>;
};

export default EpisodeBlock
