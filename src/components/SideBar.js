import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sidebarProfileLinks, sidebarSettingsLinks } from "../config/data";
import ProfilSidebarHeader from "../img/ProfilSidebarHeader.png";
import chat from "../img/Chat.png";
import "../styles/SideBar.css";
import { useGlobalContext } from "../config/context";

const Sidebar = () => {
    const [isChecked, setIsChecked] = useState(false);
    const { logout } = useGlobalContext();

    const onLogout = () => {
        localStorage.clear();
        logout();
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="sidebar-header-top">
                    <img src={ProfilSidebarHeader} />
                    <p>BALANS</p>
                    <img src={chat} />
                </div>
                <div className="sidebar-header-top">
                    <p>Euroclima</p>
                    <p>euroclima@admin</p>
                </div>
            </div>
            <ul className="links">
                <div className="sidebar_title">Profil ayarları</div>
                {sidebarProfileLinks.map((item) => {
                    const { id, url, text, icon, icon_h } = item;

                    const onClick = () => {
                        setIsChecked(id);
                    };
                    return (
                        <li key={id} onClick={onClick}>
                            <Link to={url}>
                                <img src={isChecked === id ? icon_h : icon} />
                                <div
                                    className={
                                        isChecked === id
                                            ? "links_text_h"
                                            : "links_text"
                                    }
                                >
                                    {text}
                                </div>
                            </Link>
                        </li>
                    );
                })}
                <div className="sidebar_title">Ayarlar</div>
                {sidebarSettingsLinks.map((item) => {
                    const { id, url, text, icon, icon_h } = item;

                    const onClick = () => {
                        setIsChecked(id);
                    };
                    return (
                        <li key={id} onClick={onClick}>
                            <Link to={url}>
                                <img src={isChecked === id ? icon_h : icon} />
                                <div
                                    className={
                                        isChecked === id
                                            ? "links_text_h"
                                            : "links_text"
                                    }
                                >
                                    {text}
                                </div>
                            </Link>
                        </li>
                    );
                })}
                <li onClick={onLogout}>
                    {/* <img src={isChecked === 10 ? icon_h : icon} /> */}
                    <div
                        className={
                            isChecked === 10 ? "links_text_h" : "links_text"
                        }
                    >
                        Çıxış
                    </div>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;
