import React from "react";
import './Years.less';
import {Radio} from 'antd';

const Years: React.FC<any> = ({changeYear}) => {
    const yearsFromTheCurrent = () => {
        let years = [];
        let currentYear = new Date().getFullYear();
        let startYear = currentYear - 13;

        while (startYear <= currentYear) {
            years.push(startYear++);
        }
        return years;
    };

    const selectYear = (e: any) =>
        changeYear(e.target.value);

    return <div className="filter-years">
        <div className="title-block">
            <div className="title">Года</div>
        </div>

        <Radio.Group defaultValue="all" className="wrapper-years" onChange={selectYear}>
            <Radio.Button className="year" value="all">Все</Radio.Button>
            {yearsFromTheCurrent().reverse().map((year) =>
                <Radio.Button className="year" key={year} value={year}>{year}</Radio.Button>
            )}
            <Radio.Button className="year" value="2000">00-е</Radio.Button>
            <Radio.Button className="year" value="1990">90-е</Radio.Button>
            <Radio.Button className="year" value="1980">80-е</Radio.Button>
            <Radio.Button className="year" value="80">до 80</Radio.Button>
        </Radio.Group>
    </div>
};

export default Years;