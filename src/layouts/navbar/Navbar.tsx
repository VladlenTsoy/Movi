import React, {useState} from "react";
import logo from '../../assets/logo.png';
import './Navbar.less';
import {Layout, Menu, Input, Avatar} from "antd";
import {withRouter} from 'react-router-dom';
import DropdownBlock from "./dropdown/Dropdown";
import {useSelector} from "react-redux";

const {Header} = Layout;
const {Search} = Input;

const Navbar: React.FC<any> = ({location, history}: any) => {
    const {app} = useSelector((state: any) => (state));
    const {pathname} = location;
    const [dropdown, setDropdown] = useState(false);
    const [block, setBlock] = useState('');

    // Toggle Dropdown click Menu.Item
    const onDropdown = (e: any) => {
        setDropdown((e.key === block && !dropdown) || e.key !== block);
        setBlock(e.key);
    };

    // Action click on user button or login
    const onUser = (e: any) => {
        if (dropdown)
            setDropdown(false);

        history.push('/login');
    };

    // Click Homepage
    const onMain = (e: any) => {
        if (dropdown)
            setDropdown(false);

        if (e.key !== pathname)
            history.push('/')
    };

    return <Header className="header">
        <div className="navbar">
            <div className="logo">
                <picture>
                    <img src={logo} alt="Movi - Логотип"/>
                </picture>
            </div>
            <Menu className="menu"
                  theme="dark"
                  selectable={false}
                  mode="horizontal"
            >
                <Menu.Item onClick={onMain} className={pathname === '/' ? 'ant-menu-item-selected' : ''} key="/">
                    Главная
                </Menu.Item>
                <Menu.Item onClick={onDropdown} className={`${dropdown && block === '/movies' ? 'active' : ''}`}
                           key="/movies">
                    Фильмы
                </Menu.Item>
                <Menu.Item onClick={onDropdown} className={`${dropdown && block === '/tv' ? 'active' : ''}`} key="/tv">
                    Сериалы
                </Menu.Item>
                <Menu.Item onClick={onDropdown} className={`mr-auto ${dropdown && block === '/kids' ? 'active' : ''}`}
                           key="/kids">
                    Мультфильмы
                </Menu.Item>
                <div className="search">
                    <Search
                        placeholder="Введите название фильма, сериала или имя актера"
                        value={app.search}
                    />
                </div>
                <Menu.Item onClick={onUser} key="/auth/login"
                           className={`profile ${pathname === '/login' ? 'ant-menu-item-selected' : ''}`}>
                    <Avatar icon="user"/>
                    <span className="profile-title">Войти</span>
                </Menu.Item>
            </Menu>
        </div>
        <DropdownBlock dropdown={dropdown} block={block}/>
    </Header>;
};

export default withRouter(Navbar);
