import React from "react";
import './Episodes.less';

const EpisodeBlock: React.FC<{ data: any }> = ({data}) => {
    return <div className="episode-block">
        <picture>
            <img src={data.image} alt={data.alt}/>
        </picture>
        <div className="titles-block">
            <span className="sub-title">Серия 4, Сезон 2</span>
            <span className="title">Настоящий детектив</span>
        </div>
    </div>;
};

export default EpisodeBlock
