import React, {useState} from "react";
import logo from '../../assets/logo.png';
import './Navbar.less';
import {Layout, Menu, Input, Avatar} from "antd";
import {withRouter} from 'react-router-dom';
import DropdownBlock from "./dropdown/Dropdown";
import {useStore} from "../../store/useStore";

const {Header} = Layout;
const {Search} = Input;

const Navbar: React.FC<any> = ({location, history}: any) => {
    let {pathname} = location;
    let {state} = useStore();
    let [dropdown, setDropdown] = useState(false);
    let [block, setBlock] = useState('');

    // Toggle Dropdown click Menu.Item
    let onDropdown = (e: any) => {
        setDropdown((e.key === block && !dropdown) || e.key !== block);
        setBlock(e.key);
    };

    // Action click on user button or login
    let onUser = (e: any) => {
        if (dropdown)
            setDropdown(false);

        history.push('/login');
    };

    // Click Homepage
    let onMain = (e: any) => {
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
                        value={state.search}
                        autoFocus={true}
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
