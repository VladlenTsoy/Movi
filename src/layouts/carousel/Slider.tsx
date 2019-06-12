import React from "react";
import Slider from "react-slick";
import {Icon} from "antd";

const NextArrow = ({className, onClick, loaderNext}: any) => {
    return <div className={`${className} ${!loaderNext || 'slick-disabled'}`}
                onClick={loaderNext ? () => null : onClick}>
        {loaderNext ? <Icon type="loading"/> : <Icon type="right"/>}
    </div>;
};

const PrevArrow = ({className, onClick}: any) =>
    <div className={className} onClick={onClick}><Icon type="left"/></div>;


interface SlideProps {
    afterChange(current: number): void,

    loaderNext: boolean,
    count: number,
}

const SliderBlock: React.FC<SlideProps> = ({afterChange, children, count, loaderNext}) => {
    // Setting for sliders
    const settings = {
        dots: false,
        infinite: false,
        draggable: false,
        arrows: true,
        speed: 500,
        lazyLoad: 'ondemand' as 'ondemand',
        slidesToShow: count,
        slidesToScroll: count,
        nextArrow: <NextArrow loaderNext={loaderNext}/>,
        prevArrow: <PrevArrow/>,
    };

    return <Slider {...settings}
                   key="carousel"
                   className="carousel-movies"
                   afterChange={currentSlide => afterChange(currentSlide + 7)}>{children}</Slider>
};


export default SliderBlock;
