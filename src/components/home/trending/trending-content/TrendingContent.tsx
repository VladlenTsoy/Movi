import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import QueueAnim from "rc-queue-anim";
import PosterBlock from "../../../../layouts/blocks/poster/Poster";
import {Button} from "antd";

interface TrendingContentPropTypes {
    tab: number;
    output: any;
    setPage: any;
    page: any;
    loader: boolean;
}

const TrendingContent: React.FC<TrendingContentPropTypes> = ({tab, output, setPage, page, loader}) => {
    return <div>
        <QueueAnim type={['bottom', 'top']} className="trends">
            {[
                output.map((movie: any, key: number) =>
                    <div className="trend" key={key}>
                        {movie ?
                            <PosterBlock
                                position="landscape"
                                image={{
                                    poster: `https://image.tmdb.org/t/p/${key === 0 ? 'w500' : 'w300'}/${movie.backdrop_path}`,
                                    alt: tab ? movie.title : movie.name
                                }}
                                info={{
                                    title: tab ? movie.title : movie.name,
                                    subTitle: ''
                                }}
                            /> :
                            <PosterBlock position="landscape"/>
                        }
                    </div>)
            ]}
        </QueueAnim>
        <div className="action">
            <Button className="btn-for-block"
                    type="ghost" block
                    onClick={() => setPage(page + 1)}
                    loading={loader}
                    icon="plus">
                Показать еще
            </Button>
        </div>
    </div>
};

interface TrendingContentStatePropTypes {
    url: string;
    tab: number;
}

const TrendingContentState: React.FC<TrendingContentStatePropTypes> = ({url, tab}) => {
    const {api} = useSelector((state: any) => (state));
    const [output, setOutput]: any = useState([]);
    const [page, setPage] = useState(0);
    const [apiPage, setApiPage] = useState(1);
    const [movies, setMovies]: any = useState([]);
    const [loader, setLoader]: any = useState(false);

    useEffect(() => {
        setOutput(movies.slice(0, (page * 10 + 7)));
    }, [movies, page]);

    useEffect(() => {
        if (apiPage * 20 - output.length < 10)
            setApiPage(apiPage + 1);
    }, [apiPage, page, output.length]);

    useEffect(() => {
        (async () => {
            setLoader(true);

            if (apiPage === 1)
                setMovies([null, null, null, null, null, null, null]);

            let {data} = await api.guest.get(`${url}${apiPage}`);

            setMovies((m: any) => apiPage === 1 ? data.results : [...m, ...data.results]);
            setLoader(false);
        })();
    }, [url, api.guest, apiPage]);

    return <TrendingContent loader={loader} tab={tab} output={output} setPage={setPage} page={page}/>
};

export default TrendingContentState;