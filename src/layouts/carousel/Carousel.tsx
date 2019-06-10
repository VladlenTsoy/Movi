import './Carousel.less';
import React, {useEffect, useState} from "react";
import {Spin, Icon} from "antd";
import Slider from "react-slick";
import {useStore} from "../../store/useStore";
import PosterBlock from "../blocks/poster/Poster";
import EpisodeBlock from "../blocks/episode/Episode";

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
    title: boolean,
    poster: boolean,
}

const Carousel: React.FC<PropsType> = ({url, count, apiCount, title = true, poster = true}) => {
    const {state} = useStore();
    const [apiPage, setApiPage] = useState(1);
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
        if ((apiPage * apiCount) - current <= count)
            setApiPage(apiPage + 1);
    };

    useEffect(() => {
        const append = async () => {
            setLoaderNext(true);
            let {data} = await state.api.guest.get(`${url}${apiPage}`);
            setMovies([...movies, ...data.results]);
            setLoaderNext(false);
        };

        const fetch = async () => {
            setLoader(true);
            let {data} = await state.api.guest.get(`${url}${1}`);
            setMovies(data.results);
            setLoader(false);
        };

        if (apiPage === 1)
            fetch().then();
        else
            append().then();
    }, [apiPage, url, count, apiCount, state.api.guest]);

    useEffect(() => {
        setApiPage(1);
    }, [url, count, apiCount, state.api.guest]);

    return <div className="carousel">
        {loader ?
            <Spin spinning={loader} key="loader"/> :
            <Slider {...settings} key="carousel"
                    className="carousel-movies"
                    afterChange={currentSlide => afterChange(currentSlide + 7)}
            >
                {movies.map((elem: any): any =>
                    <div className="movie" key={elem.id}>
                        {poster ?
                            <PosterBlock data={elem ?
                                {
                                    poster: `https://image.tmdb.org/t/p/w154/${elem.poster_path}`,
                                    alt: elem.title,
                                    title: title ? elem.title : null,
                                    release: title ? elem.release_date : null,
                                } : null
                            }/> :
                            <EpisodeBlock data={elem ?
                                {
                                    poster: `https://image.tmdb.org/t/p/w300/${elem.backdrop_path}`,
                                    alt: elem.title,
                                    title: title ? elem.name : null,
                                    release: title ? elem.release_date : null,
                                } : null
                            }/>
                        }
                    </div>
                )}
            </Slider>
        }
    </div>;
};

export default Carousel;
