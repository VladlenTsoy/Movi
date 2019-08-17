import React from "react";
import './Views.less';
import {Icon} from "antd";

const Views: React.FC<any> = ({popularity}) => {
    return <div className="wrapper-views">
        <Icon type="eye"/>
        <div className="views">
            <span>{popularity} Просмотров</span>
        </div>
    </div>
};

export default Views;