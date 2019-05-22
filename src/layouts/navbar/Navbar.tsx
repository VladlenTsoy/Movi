import React from "react";
import logo from '../../assets/logo.png';
import './Navbar.less';
import {Layout, Menu, Input, Avatar} from "antd";

const {Header} = Layout;
const {Search} = Input;

const Navbar: React.FC = () => {
    return <Header className="header">
        <div className="logo">
            <picture>
                <img src={logo} alt="Movi - Логотип"/>
            </picture>
        </div>
        <Menu className="menu"
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
        >
            <Menu.Item key="0">Моя</Menu.Item>
            <Menu.Item key="1">Фильмы</Menu.Item>
            <Menu.Item key="2">Сериалы</Menu.Item>
            <Menu.Item key="3" className="mr-auto">Мультики</Menu.Item>
            <div className="search">
                <Search
                    placeholder="Введите название фильма, сериала или имя актера"
                    onSearch={value => console.log(value)}
                />
            </div>
            <Menu.Item key="4" className="profile">
                <Avatar icon="user" />
            </Menu.Item>
        </Menu>
    </Header>;
};

export default Navbar;
