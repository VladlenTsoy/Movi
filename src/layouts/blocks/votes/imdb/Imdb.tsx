import React from "react";
import './Imdb.less';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImdb} from "@fortawesome/free-brands-svg-icons";

const Imdb: React.FC<any> = ({average, count}) => {
    return <div className="imdb">
        <FontAwesomeIcon icon={faImdb}/>
        <div className={`count ${average > 6.5 ? 'active' : ''}`}>
            {average}
            <small>{count}</small>
        </div>
    </div>
};

export default Imdb;