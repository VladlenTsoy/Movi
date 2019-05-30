import React from "react";
import {Button, Col, Row} from "antd";
import QueueAnim from "rc-queue-anim";
import EpisodeBlock from "../../../../../layouts/blocks/episode/Episode";

const TrendingTvShowsBlock: React.FC = () => {
    return <div className="contents">
        <Row type="flex" gutter={15}>
            <Col className="top-trend-col">
                <QueueAnim type={['bottom', 'top']} className="top-trend">
                    {[
                        <EpisodeBlock data={{image: null, alt: null}} key="episode"/>
                    ]}
                </QueueAnim>
            </Col>
            {[1, 2, 3].map((key_col) =>
                <Col className="trend-col" key={key_col}>
                    <QueueAnim type={['bottom', 'top']}>
                        {[
                            [1, 2].map((key) =>
                                <div className="trend" key={`${key_col}${key}`}>
                                    <EpisodeBlock data={{image: null, alt: null}}/>
                                </div>
                            )]}
                    </QueueAnim>
                </Col>
            )}
        </Row>
        <div className="action">
            <Button className="btn-for-block" type="ghost" block={true}>Показать еще</Button>
        </div>
    </div>;
};

export default TrendingTvShowsBlock;
