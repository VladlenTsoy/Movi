import React, {useState} from "react";
import './Playlist.less';
import {Modal, List, Icon, Spin} from 'antd';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookmark, faHeart} from "@fortawesome/free-regular-svg-icons";

const data = [
    {
        icon: <FontAwesomeIcon icon={faBookmark}/>,
        title: 'Буду смотреть',
        description: 'Отложенные фильмы для вфывфы',
    },
    {
        icon: <FontAwesomeIcon icon={faHeart}/>,
        title: 'Любимые фильмы',
        description: 'Выбранные вами фильмы',
    },
];

const PlaylistModal: React.FC<any> = ({visible, close}) => {
    const [loading, setLoading] = useState(false);

    const createPlaylist = () => {
        setLoading(true);
    };

    const closeModal = () => {
        setLoading(false);
        close();
    };

    return <Modal
        className="playlist-block"
        title="Выберите плейлист"
        centered
        closable={false}
        footer={null}
        width={300}
        visible={visible}
        onCancel={closeModal}
    >
        <Spin spinning={loading} indicator={<Icon type="loading"/>}>
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={item.icon}
                            title={item.title}
                            description={item.description}
                        />
                    </List.Item>
                )}
            />
            <div className="create-playlist" onClick={createPlaylist}>
                <Icon type="plus"/>
                <span className="title">Создать плейлист</span>
            </div>
        </Spin>
    </Modal>
};

export default PlaylistModal;