import React from "react";
import './Sound.less';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faClosedCaptioning,
    faGlobe,
    faMicrophoneAlt,
    faPodcast
} from "@fortawesome/free-solid-svg-icons";
import {Checkbox} from "antd";

const plainOptions = [{
    label: <div className="item-sound">
        <FontAwesomeIcon icon={faClosedCaptioning}/>
        <span>Субтитры</span>
    </div>,
    value: 0
}, {
    label: <div className="item-sound">
        <FontAwesomeIcon icon={faPodcast}/>
        <span>Моно</span>
    </div>,
    value: 1
}, {
    label: <div className="item-sound">
        <FontAwesomeIcon icon={faMicrophoneAlt}/>
        <span>Дубляж</span>
    </div>,
    value: 2
}, {
    label: <div className="item-sound">
        <FontAwesomeIcon icon={faGlobe}/>
        <span>Оригинал</span>
    </div>,
    value: 3
}];

const Sound: React.FC<any> = ({}) => {
    return <div className="sound-block">
        <Checkbox.Group options={plainOptions} defaultValue={['Apple']}/>
    </div>
};

export default Sound;