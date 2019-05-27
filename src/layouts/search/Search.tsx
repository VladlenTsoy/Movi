import React from 'react';
import './Search.less';
import QueueAnim from 'rc-queue-anim';
import {Tabs, Input} from "antd";
import {useStore} from "../../store/useStore";
import {CHANGE_SEARCH_INPUT} from "../../store/app/reducer";

const TabPane = Tabs.TabPane;
const defaultAnimation = [
    {opacity: [1, 0], translateY: [0, -50]},
];

const SearchBlock: React.FC<any> = () => {
    let {state, dispatch} = useStore();

    let onChangeSearch = (e: any) =>
        dispatch({type: CHANGE_SEARCH_INPUT, payload: e.target.value});

    return <div className="search-block">
        <QueueAnim animConfig={defaultAnimation}>
            {[
                <div className="wrap-search-input" key={1}>
                    <Input
                        allowClear
                        onChange={onChangeSearch}
                        value={state.search}
                        placeholder="Введите название фильма, сериала или имя актера"
                        autoFocus={true}
                    />
                </div>,
                <Tabs defaultActiveKey="1" key={2}>
                    <TabPane tab="Все (100)" key="1">
                        Content of Tab Pane 1
                    </TabPane>
                    <TabPane tab="Фильмы (44)" key="2">
                        Content of Tab Pane 2
                    </TabPane>
                    <TabPane tab="Сериалы (34)" key="3">
                        Content of Tab Pane 2
                    </TabPane>
                    <TabPane tab="Мультфильмы (2)" key="4">
                        Content of Tab Pane 2
                    </TabPane>
                    <TabPane tab="Актеры (10)" key="5">
                        Content of Tab Pane 3
                    </TabPane>
                    <TabPane tab="Режиссеры (10)" key="6">
                        Content of Tab Pane 3
                    </TabPane>
                </Tabs>
            ]}
        </QueueAnim>
    </div>;
};

export default SearchBlock;
