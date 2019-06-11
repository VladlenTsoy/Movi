import './Carousel.less';
import React, {useEffect, useState} from "react";
import {Icon} from "antd";
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


const SliderBlock = () => {

};

interface PropsType {
    url: string,
    count: number,
    apiCount: number,
    title: boolean,
    poster: boolean,
    season?: boolean,
}

const Carousel: React.FC<PropsType> = ({url, count, apiCount, title = true, poster = true, season = false}) => {
    const {state} = useStore();
    const [apiPage, setApiPage] = useState(1);
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
        if ((apiPage * apiCount) - current <= count)
            setApiPage(apiPage + 1);
    };

    useEffect(() => {
        const fetch = async () => {
            setLoaderNext(true);
            apiPage !== 1 || setMovies(Array(count).fill(null));

            let {data} = await state.api.guest.get(`${url}${apiPage}`);

            apiPage === 1 ? setMovies(data[season ? 'episodes' : 'results']) :
                setMovies((m: any) => [...m, ...data[season ? 'episodes' : 'results']]);

            setLoaderNext(false);
        };

        fetch().catch();
    }, [apiPage, url, count, season, apiCount, state.api.guest]);

    useEffect(() => {
        setApiPage(1);
    }, [url, count, apiCount, state.api.guest]);

    return <div className="carousel">
        <Slider {...settings} key="carousel"
                className="carousel-movies"
                afterChange={currentSlide => afterChange(currentSlide + 7)}
        >
            {movies.map((elem: any, key: number): any =>
                <div className="movie" key={key}>
                    <PosterBlock
                        position={poster ? 'portrait' : 'landscape'}
                        {...elem ?
                            {
                                image: {
                                    poster: `https://image.tmdb.org/t/p/${poster ? 'w185' : 'w300'}/${poster ? elem.poster_path : season ? elem.still_path : elem.backdrop_path}`,
                                    alt: poster ? elem.title : elem.name
                                },
                                info: {
                                    title: poster ? elem.title : elem.name,
                                    subTitle: '',
                                }
                            } : null}
                    />
                </div>
            )}
        </Slider>
    </div>;
};

export default Carousel;
