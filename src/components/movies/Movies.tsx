import React from "react";
import Filter from "./filter/Filter";
import Genres from "./filter/genres/Genres";

const Movies: React.FC = () => {
    return <div className="movies">
        <Filter>
            <Genres>
            </Genres>
        </Filter>
    </div>;
};

export default Movies;
