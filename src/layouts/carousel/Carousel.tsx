import './Carousel.less';
import React, {useEffect, useRef, useState} from "react";
import {Icon, Spin} from "antd";
import Slider from "react-slick";
import {useStore} from "../../store/useStore";
import PosterBlock from "../blocks/poster/Poster";

interface PropsType {
    url: string,
    count: number,
    apiCount: number,
}

let apiPage = 1;
let left = 0;

const Carousel: React.FC<PropsType> = ({url, count, apiCount}) => {
    let {state} = useStore();
    let slidesRef = useRef(null);
    let [loader, setLoader] = useState(true);
    // Current movies
    let [movies, setMovies]: any = useState([]);
    // Setting for carousel
    let [page, setPage] = useState(1);
    // Setting for sliders
    let settings = {
        dots: false,
        infinite: false,
        draggable: false,
        arrows: false,
        speed: 500,
        lazyLoad: 'progressive' as 'progressive',
        slidesToShow: count,
        slidesToScroll: count,
    };

    let prev = (page: number) => {
        let outputWith = page * count;

        if (slidesRef.current)
        // @ts-ignore
            slidesRef.current.slickPrev();

        // Set setting for pagination
        left = apiPage * apiCount - (outputWith + count);
        setPage(page);
    };

    // Output of the top 7 movies on the current year
    let next = async (page: number = 1, sort?: boolean) => {
        if (sort) {
            setMovies([]);
            await updateTopMovie(1);

            if (slidesRef.current)
            // @ts-ignore
                slidesRef.current.slickGoTo(0);
        } else {
            if (left <= count)
                await appendTopMovie(page);
            else
                left = (apiPage * apiCount) - (page * count);

            if (slidesRef.current)
            // @ts-ignore
                slidesRef.current.slickNext();
        }

        setPage(page);
        setLoader(false);
    };

    // Fetch top movies on the current year
    let appendTopMovie = async (page:number) => {
        setLoader(true);

        let {data} = await state.api.guest.get(`${url}${apiPage}`);
        setMovies([...movies, ...data.results]);

        apiPage++;
        left = apiPage * apiCount - (page * count);
    };

    //
    let updateTopMovie = async (page = 1) => {
        setLoader(true);
        apiPage = 1;

        let {data} = await state.api.guest.get(`${url}${apiPage}`);
        setMovies(data.results);

        left = apiCount - (page * count);
    };

    useEffect(() => {
        next(1, true).then();
    }, [url]);

    return <div className="carousel">
        <Spin spinning={loader}>
            <Slider {...settings}
                    ref={slidesRef}
                    className="carousel-movies"
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
        </Spin>
        <div className="navigation">
            <span className={`nav-left ${page > 1 || 'disabled'}`}>
                <Icon type="left" onClick={() => prev(page - 1)}/>
            </span>
            <span className={`nav-right ${!loader || 'disabled'}`}>
                <Icon type="right" onClick={() => next(page + 1)}/>
            </span>
        </div>
    </div>;
};

export default Carousel;
