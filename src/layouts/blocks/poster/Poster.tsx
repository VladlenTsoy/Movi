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
    let [loader, setLoader] = useState(true);
    let [error, setError] = useState(false);

    useEffect(() => {
        // setLoader(true);
        let img = new Image();
        img.onload = () => setLoader(false);
        img.onerror = () => setError(true);

        if (data)
            img.src = `https://image.tmdb.org/t/p/w185_and_h278_bestv2/${data.poster}`;

    }, [data]);

    return <div className="poster-block">
        <QueueAnim>
            {!loader && data && !error ?
                <picture key="picture">
                    <img src={'https://image.tmdb.org/t/p/w185_and_h278_bestv2/' + data.poster} alt={data.alt}/>
                </picture> : error ?
                    <div className="loader-block" key="loader">
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
        {/*<QueueAnim type={['bottom', 'bottom']} className="titles-block">*/}
        {/*    {*/}
        {/*        data && data.title ?*/}
        {/*            [*/}
        {/*                <span className="sub-title" key="sub-title">Ужасы, 2019</span>,*/}
        {/*                <span className="title" key="title">{data.title}</span>*/}
        {/*            ]*/}
        {/*            : null*/}
        {/*    }*/}
        {/*</QueueAnim>*/}
    </div>;
};

export default PosterBlock;
