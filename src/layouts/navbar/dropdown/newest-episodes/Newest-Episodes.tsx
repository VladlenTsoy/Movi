import React from "react";
import './Newest-Episodes.less';
import {Col, Row} from "antd";
import QueueAnim from 'rc-queue-anim';

const NewestEpisodesBlock: React.FC<{ kids: boolean }> = ({kids}) => {
    return <Col lg={kids ? 4 : 12} key="3">
        <div className="title-block">
            Серии Дня
        </div>
        <div className="tv-series-of-the-day-block">
            {kids ?
                <Row gutter={15}>
                    <QueueAnim type={['right', 'left']} duration={300}>
                        {[
                            <Col lg={24} className="top-column" key={1}>
                                <div className="episode">
                                </div>
                            </Col>,
                            <Col lg={24} className="top-column" key={2}>
                                <div className="episode">
                                </div>
                            </Col>,
                        ]}
                    </QueueAnim>
                </Row> :
                <Row gutter={15}>
                    <QueueAnim type={['right', 'left']} duration={300}>
                        {[
                            <Col lg={8} className="top-column" key={1}>
                                <div className="episode">
                                </div>
                            </Col>,
                            <Col lg={8} className="top-column" key={2}>
                                <div className="episode">
                                </div>
                            </Col>,
                            <Col lg={8} className="top-column" key={3}>
                                <div className="episode">
                                </div>
                            </Col>,
                            <Col lg={8} key={4}>
                                <div className="episode">
                                </div>
                            </Col>,
                            <Col lg={8} key={5}>
                                <div className="episode">
                                </div>
                            </Col>,
                            <Col lg={8} key={6}>
                                <div className="episode">
                                </div>
                            </Col>,
                        ]}
                    </QueueAnim>
                </Row>
            }
        </div>
    </Col>;
};

export default NewestEpisodesBlock;
