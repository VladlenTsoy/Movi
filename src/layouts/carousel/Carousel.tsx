import './Carousel.less';
import React, {useEffect, useState} from "react";
import {useStore} from "../../store/useStore";
import SliderBlock from "./Slider";
import MovieBlock, {MovieProps} from "./MovieCar";

interface CarouselProps {
    config: {
        url: string,
        count: number,
        apiCount: number,
    },
    isScrollMax?: boolean,
    outputConf: MovieProps
}

const Carousel: React.FC<CarouselProps> = ({config, isScrollMax, outputConf}) => {
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
