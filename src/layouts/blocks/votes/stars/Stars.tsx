import React from "react";
import './Stars.less';
import {Icon} from "antd";

const Stars: React.FC<any> = ({average, count}) => {
    return <div className="stars">
        <div className="wrapper-star">
            <Icon type="star" theme="filled"/>
            <span className="assessment">{average}</span>
        </div>
        <div className="wrapper-votes">
            <div className="votes">
                <span>{count}</span>
                <span>голосов</span>
            </div>
        </div>
    </div>
};

export default Stars;