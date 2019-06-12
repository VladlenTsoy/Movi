import './Carousel.less';
import React, {useEffect, useState} from "react";
import {Icon} from "antd";
import Slider from "react-slick";
import {useStore} from "../../store/useStore";
import PosterBlock from "../blocks/poster/Poster";

interface MovieBlock {
    isPoster?: boolean,
    data?: any,
    title?: {
        outside?: boolean,
        view: 'SE' | 'G' | 'GY',
    },
    isSeason?: boolean
}

const MovieBlock: React.FC<MovieBlock> = ({isPoster, data, title, isSeason}) => {
    const [subTitle, setSubTitle] = useState('');

    useEffect(() => {
        if (title && data)
            switch (title.view) {
                case 'SE':
                    return setSubTitle(`Сезон ${data.season_number}, Серия ${data.episode_number}`);
                case 'G':
                    return setSubTitle('Ужасы');
                case 'GY':
                    return setSubTitle(`Ужасы, ${data.release_date}`);
            }
    }, [title, data]);

    return <div className="movie">
        <PosterBlock
            position={isPoster ? 'portrait' : 'landscape'}
            {...data ?
                {
                    image: {
                        poster: `https://image.tmdb.org/t/p/${isPoster ? 'w185' : 'w300'}/${isPoster ? data.poster_path : isSeason ? data.still_path : data.backdrop_path}`,
                        alt: isPoster ? data.title : data.name
                    },
                    ...title ? {
                        info: {
                            outside: title.outside,
                            title: isPoster ? data.title : data.name,
                            subTitle: subTitle,
                        }
                    } : null
                } : null}
        />
    </div>
};

const NextArrow = ({className, onClick, loaderNext}: any) => {
    return <div className={`${className} ${!loaderNext || 'slick-disabled'}`}
                onClick={loaderNext ? () => null : onClick}>
        {loaderNext ? <Icon type="loading"/> : <Icon type="right"/>}
    </div>;
};

const PrevArrow = ({className, onClick}: any) =>
    <div className={className} onClick={onClick}><Icon type="left"/></div>;

interface SlideBlock {
    afterChange(current: number): void,

    loaderNext: boolean,
    count: number,
}

const SliderBlock: React.FC<SlideBlock> = ({afterChange, children, count, loaderNext}) => {
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

interface Carousel {
    config: {
        url: string,
        count: number,
        apiCount: number,
    },
    isScrollMax?: boolean,
    outputConf: MovieBlock
}

const Carousel: React.FC<Carousel> = ({config, isScrollMax, outputConf}) => {
    const {state} = useStore();
    const [apiPage, setApiPage] = useState(1);
    const [loaderNext, setLoaderNext] = useState(false);
    // Current movies
    const [movies, setMovies]: any = useState([]);

    // Fetch top movies on the current year
    const afterChange = async (current: any) => {
        if ((apiPage * config.apiCount) - current <= config.count && !isScrollMax)
            setApiPage(apiPage + 1);
    };

    useEffect(() => {
        const fetch = async () => {
            setLoaderNext(true);
            apiPage !== 1 || setMovies(Array(config.count).fill(null));

            let {data} = await state.api.guest.get(`${config.url}${apiPage}`);

            apiPage === 1 ? setMovies(data[outputConf.isSeason ? 'episodes' : 'results']) :
                setMovies((m: any) => [...m, ...data[outputConf.isSeason ? 'episodes' : 'results']]);

            setLoaderNext(false);
        };

        fetch().catch();
    }, [apiPage, config, outputConf.isSeason, state.api.guest]);

    useEffect(() => {
        setApiPage(1);
    }, [config, state.api.guest]);

    return <div className="carousel">
        <SliderBlock afterChange={afterChange} loaderNext={loaderNext} count={config.count}>
            {movies.map((elem: any, key: number): any =>
                <MovieBlock
                    key={key}
                    data={elem}
                    isPoster={outputConf.isPoster}
                    isSeason={outputConf.isSeason}
                    {...outputConf.title ? {
                        title: {
                            outside: outputConf.title.outside,
                            view: outputConf.title.view,
                        }
                    } : null}
                />
            )}
        </SliderBlock>
    </div>;
};

export default Carousel;
