import './Carousel.less';
import React, {useEffect, useRef, useState} from "react";
import {Spin, Icon} from "antd";
import Slider from "react-slick";
import {useStore} from "../../store/useStore";
import PosterBlock from "../blocks/poster/Poster";

const NextArrow = ({className, onClick, loaderNext}: any) => {
    return <div className={`${className} ${!loaderNext || 'slick-disabled'}`}
                onClick={loaderNext ? () => null : onClick}>
        {loaderNext ?
            <Icon type="loading"/> :
            <Icon type="right"/>
        }
    </div>;
};

const PrevArrow = ({className, onClick}: any) =>
    <div className={className} onClick={onClick}><Icon type="left"/></div>;

interface PropsType {
    url: string,
    count: number,
    apiCount: number,
}

let apiPage = 1;
let left = 0;

const Carousel: React.FC<PropsType> = ({url, count, apiCount}) => {
    const {state} = useStore();
    const slidesRef = useRef(null);
    const [loader, setLoader] = useState(true);
    const [loaderNext, setLoaderNext] = useState(false);
    // Current movies
    const [movies, setMovies]: any = useState([]);
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

    // Fetch top movies on the current year
    const afterChange = async (current: any) => {
        left = (apiPage * apiCount) - current;

        if (left <= count) {
            setLoaderNext(true);
            apiPage++;

            let {data} = await state.api.guest.get(`${url}${apiPage}`);
            setMovies([...movies, ...data.results]);
            setLoaderNext(false);
        }
    };

    useEffect(() => {
        let fetch = async () => {
            setLoader(true);
            //
            let {data} = await state.api.guest.get(`${url}${apiPage = 1}`);

            left = apiCount - count;

            setMovies(data.results);
            setLoader(false);
        };

        fetch().then();
    }, [url, count, apiCount, state.api.guest]);

    return <div className="carousel">
        {loader ?
            <Spin spinning={loader} key="loader"/> :
            <Slider {...settings} key="carousel"
                    ref={slidesRef}
                    className="carousel-movies"
                    afterChange={currentSlide => afterChange(currentSlide + 7)}
            >
                {movies.map((elem: any): any =>
                    <div className="movie" key={elem.id}>
                        <PosterBlock data={elem ?
                            {
                                poster: elem.poster_path,
                                alt: elem.title,
                                title: elem.title,
                                release: elem.release_date,
                            } : null
                        }/>
                    </div>
                )}
            </Slider>
        }
    </div>;
};

export default Carousel;
