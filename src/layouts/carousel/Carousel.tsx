import './Carousel.less';
import React, {useEffect, useState} from "react";
import SliderBlock from "./Slider";
import MovieBlock, {MovieProps} from "./MovieCar";
import {useSelector} from "react-redux";

interface CarouselPropTypes {
    afterChange: any;
    loaderNext: any;
    config: any;
    movies: any;
    outputConf: any;
}

const Carousel: React.FC<CarouselPropTypes> = ({afterChange, loaderNext, config, movies, outputConf}) => {
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

interface CarouselStatePropTypes {
    config: {
        url: string,
        count: number,
        apiCount: number,
    },
    isScrollMax?: boolean,
    outputConf: MovieProps
}

const CarouselState: React.FC<CarouselStatePropTypes> = ({config, isScrollMax, outputConf}) => {
    const {api} = useSelector((state: any) => (state));
    const [apiPage, setApiPage] = useState(1);
    const [loaderNext, setLoaderNext] = useState(false);
    const [_config] = useState(config);
    // Current movies
    const [movies, setMovies]: any = useState([]);

    // Fetch top movies on the current year
    const afterChange = async (current: any) => {
        if ((apiPage * config.apiCount) - current <= config.count && !isScrollMax)
            setApiPage(apiPage + 1);
    };

    useEffect(() => {
        (async () => {
            setLoaderNext(true);
            apiPage !== 1 || setMovies(Array(config.count).fill(null));

            let {data} = await api.guest.get(`${config.url}${apiPage}`);

            apiPage === 1 ? setMovies(data[outputConf.isSeason ? 'episodes' : 'results']) :
                setMovies((m: any) => [...m, ...data[outputConf.isSeason ? 'episodes' : 'results']]);

            setLoaderNext(false);
        })();
    }, [apiPage, _config, outputConf.isSeason]);

    useEffect(() => {
        setApiPage(1);
    }, [_config]);

    return <Carousel afterChange={afterChange} loaderNext={loaderNext} config={config} movies={movies} outputConf={outputConf}/>
};

export default CarouselState;
