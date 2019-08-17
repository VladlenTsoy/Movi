import React from "react";
import './willWatch.less';
import {Button, Icon} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookmark} from "@fortawesome/free-regular-svg-icons";

interface WillWatchPropTypes {
    loading: boolean;
    sendIdToSeeLater: any;
    isWillWatch: boolean;
}

const ButtonWillWatch: React.FC<WillWatchPropTypes> = ({loading, sendIdToSeeLater, isWillWatch}) => {
    return <Button type="link"
                   size="small"
                   loading={loading}
                   className={`will-watch ${isWillWatch ? 'active' : ''}`}
                   onClick={sendIdToSeeLater}>
        {loading ? null : isWillWatch ?
            <Icon type="check"/> :
            <FontAwesomeIcon icon={faBookmark}/>}
        Буду смотреть
    </Button>
};

export default ButtonWillWatch;
