import React from "react";
import './Footer.less';
import {Col, Layout, Row} from "antd";
import logo from '../../assets/logo.png';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const {Footer} = Layout;

const FooterBlock: React.FC = () => {
    return <div className="footer">
        <div className="logo-and-socials">
            <div className="logo">
                <picture>
                    <img src={logo} alt="Movi - Логотип"/>
                </picture>
            </div>
            <div className="socials">
                <div className="social">
                    <FontAwesomeIcon icon={['fab', 'telegram']}/>
                    <span>Telegram</span>
                </div>
                <div className="social">
                    <FontAwesomeIcon icon={['fab', 'instagram']}/>
                    <span>Instagram</span>
                </div>
                <div className="social">
                    <FontAwesomeIcon icon={['fab', 'facebook']}/>
                    <span>Facebook</span>
                </div>
                <div className="social">
                    <FontAwesomeIcon icon={['fab', 'twitter']}/>
                    <span>Twitter</span>
                </div>
            </div>
        </div>
        <div className="categories">
            <Row gutter={15}>
                <Col span={6}>
                    <div className="title">Movi</div>
                    <div className="menu">
                        <span>О компании</span>
                        <span>Размещение рекламы</span>
                        <span>Подарочные сертификаты</span>
                        <span>Вакансии</span>
                        <span>Партнерам</span>
                        <span>Пользовательское соглашение</span>
                        <span>Политика конфиденциальности</span>
                    </div>
                </Col>
                <Col span={4}>
                    <div className="title">Разделы</div>
                    <div className="menu">
                        <span>Фильмы</span>
                        <span>Сериалы</span>
                        <span>Мультфильмы</span>
                        <span>Аниме</span>
                        <span>Подборки</span>
                    </div>
                </Col>
                <Col span={10}>

                </Col>
                <Col span={4} className="support-block">
                    <div className="title">Поддержка</div>
                    <div className="menu">
                        <span>Мой аккаунт</span>
                        <span>Устройства</span>
                        <span>FAQ</span>
                        <span>Смотреть на TV</span>
                        <span>support@movi.uz</span>
                    </div>
                </Col>
            </Row>
        </div>
        <Footer className="copyright">Movi ©2019 Creator Tsoy Vladlen</Footer>
    </div>;
};

export default FooterBlock;
