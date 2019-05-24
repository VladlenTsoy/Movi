import React from "react";
import './Home.less';
import Banner from "./banner/Banner";
import Trending from "./trending/Trending";
import Movies from "./movies/Movies";
import Newest from "./newest/Newest";
import Featured from "./featured/Featured";
import Compilation from "./compilation/Compilation";
import Kids from "./kids/Кids";
import Viewed from "./viewed/Viewed";

const Home: React.FC = () => {
    return <div className="home">
        <Banner/>
        <Trending/>
        <Movies/>
        <Newest/>
        <Featured/>
        <Compilation/>
        <Kids/>
        <Viewed/>
    </div>;
};

export default Home;
