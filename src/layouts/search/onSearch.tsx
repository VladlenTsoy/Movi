import React, {useEffect, useState} from "react";
import QueueAnim from "rc-queue-anim";
import Search from "./Search";

const defaultAnimation = [
    {opacity: [1, 0]},
];

const OnSearch:React.FC = () => {
    const [search, setSearch] = useState();

    useEffect(() => {
        document.onkeydown = (e: any) => {
            if (e.keyCode === 27)
                setSearch('');

            if (e.key.length <= 1 && (!search || search === ''))
                setSearch(e.key);
        };

        return () => {
            document.onkeydown = null
        };
    }, [search]);

    const setSearchValue = (val: string) =>
        setSearch(val);

    return <QueueAnim animConfig={defaultAnimation} duration={300}>
        {search && search !== '' ? <Search key={1} search={search} setSearch={setSearchValue}/> : null}
    </QueueAnim>
};

export default OnSearch;