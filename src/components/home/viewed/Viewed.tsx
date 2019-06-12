import React, {useState} from "react";
import './Viewed.less';
import Carousel from "../../../layouts/carousel/Carousel";

const Viewed: React.FC = () => {
    let [url] = useState(`/discover/movie?with_genres=12&api_key=ac98cb53e0760e1f61d042006ba12afa&language=ru&primary_release_year=2019&page=`);

    return <div className="viewed">
        <div className="title-block">
            <div className="title">
                Недавно Просмотренные Фильмы
            </div>
            <div className="line"/>
        </div>
        <div className="contents">
            <Carousel
                config={{
                    url: url,
                    count: 10,
                    apiCount: 20,
                }}
                outputConf={{
                    isPoster: true,
                    title: {
                        view: 'GY',
                        outside: true
                    }
                }}
            />
        </div>
    </div>;
};

export default Viewed;
