import React, {useState} from "react";
import logo from '../../assets/logo.png';
import './Navbar.less';
import {Layout, Menu, Input, Avatar} from "antd";
import {withRouter} from 'react-router-dom';
import DropdownBlock from "./dropdown/Dropdown";

const {Header} = Layout;
const {Search} = Input;

const Navbar: React.FC = ({location, history}: any) => {
    let {pathname} = location;
    let [dropdown, setDropdown] = useState(false);
    let [block, setBlock] = useState('');

    console.log(pathname);

    let onDropdown = (e: any) => {
        // history.push('/franchises')
        setDropdown((e.key === block && !dropdown) || e.key !== block);
        setBlock(e.key);
    };

    let onUser = (e: any) => {};


    return <Header className="header">
        <div className="navbar">
            <div className="logo">
                <picture>
                    <img src={logo} alt="Movi - Логотип"/>
                </picture>
            </div>
            <Menu className="menu"
                  theme="dark"
                  mode="horizontal"
                  defaultSelectedKeys={[pathname]}
            >
                <Menu.Item key="/">Моя</Menu.Item>
                <Menu.Item onClick={onDropdown} key="/movies">Фильмы</Menu.Item>
                <Menu.Item onClick={onDropdown} key="/tv">Сериалы</Menu.Item>
                <Menu.Item onClick={onDropdown} key="/kids" className="mr-auto">Мультики</Menu.Item>
                <div className="search">
                    <Search
                        placeholder="Введите название фильма, сериала или имя актера"
                        onSearch={value => console.log(value)}
                    />
                </div>
                <Menu.Item onClick={onUser} key="user" className="profile">
                    <Avatar icon="user"/>
                    <span className="profile-title">Войти</span>
                </Menu.Item>
            </Menu>
        </div>
        <DropdownBlock dropdown={dropdown} block={block}/>
    </Header>;
};

export default withRouter(Navbar);
