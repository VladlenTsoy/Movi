import React from "react";
import './Poster.less';

interface Poster {
    poster: string,
    alt: string,
}

const PosterBlock: React.FC<{ data: Poster }> = ({data}) => {
    return <div className={`poster-block`}>
        <picture>
            <img src={data.poster} alt={data.alt}/>
        </picture>
    </div>;
};

export default PosterBlock;
