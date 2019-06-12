import React, {useState} from "react";
import './Newest.less';
import Carousel from "../../../layouts/carousel/Carousel";

const Newest: React.FC = () => {
    let [url] = useState(`/tv/popular?api_key=ac98cb53e0760e1f61d042006ba12afa&language=ru&page=`);

    return <div className="newest layout-block">
        <div className="title-block">
            <div className="title">
                Новейшие эпизоды
            </div>
            <div className="line"/>
            <div className="sort">
                <span className="active">Сегодня</span>
                <span>За неделю</span>
                <span>За месяц</span>
                <span>За 3 месяца</span>
            </div>
        </div>
        <div className="contents">
            <Carousel
                config={{
                    url: url,
                    count: 5,
                    apiCount: 20,
                }}
                outputConf={{
                    title: {
                        view: 'GY'
                    }
                }}
            />
        </div>
    </div>;
};

export default Newest;
