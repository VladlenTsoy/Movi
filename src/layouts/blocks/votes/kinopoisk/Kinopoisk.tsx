import React from "react";
import './Kinopoisk.less';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImdb} from "@fortawesome/free-brands-svg-icons";

const Kinopoisk: React.FC<any> = ({average, count}) => {
  return <div className="kinopoisk">
      <FontAwesomeIcon icon={faImdb}/>
      <div className={`count ${average > 6.5 ? 'active' : ''}`}>
          {average}
          <small>{count}</small>
      </div>
  </div>;
};

export default Kinopoisk;