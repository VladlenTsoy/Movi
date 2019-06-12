import React, {useEffect, useState} from "react";
import moment from "moment";
import PosterBlock from "../blocks/poster/Poster";

export interface MovieProps {
    isPoster?: boolean,
    data?: any,
    title?: {
        outside?: boolean,
        view: 'SE' | 'G' | 'GY',
    },
    isSeason?: boolean
}

const MovieBlock: React.FC<MovieProps> = ({isPoster, data, title, isSeason}) => {
    const [subTitle, setSubTitle] = useState('');

    useEffect(() => {
        if (title && data)
            switch (title.view) {
                case 'SE':
                    return setSubTitle(`Сезон ${data.season_number}, Серия ${data.episode_number}`);
                case 'G':
                    return setSubTitle('Ужасы');
                case 'GY':
                    return setSubTitle(`Ужасы, ${moment(data.release_date, 'YYYY-MM-DD').format('YYYY')}`);
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

export default MovieBlock;
