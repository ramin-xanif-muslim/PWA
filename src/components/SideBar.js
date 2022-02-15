import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { sidebarProfileLinks, sidebarSettingsLinks } from "../config/data";
import ProfilSidebarHeader from "../img/ProfilSidebarHeader.png";
import chat from "../img/Chat.png";
import "../styles/SideBar.css";
import { useGlobalContext } from "../config/context";
import sendRequest from "../config/sentRequest";
import useRequest from "../hooks/useRequest";

const Sidebar = () => {
	const [isChecked, setIsChecked] = useState(false);
    const { logout } = useGlobalContext()
	const [balance, setBalance] = useState('');

    const onLogout = () => {
		localStorage.clear();
        logout()
    }

    const company = useRequest('company/get.php',{})
    const fetchBalance = async () => {
        let res = await sendRequest('notifications/get.php',{})
		setBalance(res.AccountBalance);
    }
    useEffect(() => {
        fetchBalance()
    },[])

	return (
		<aside className="sidebar" >
			<div className="sidebar-header">
				<div className="sidebar-header-top">
					<img src={ProfilSidebarHeader} />
					<p>BALANS: {balance}<sub>₼</sub></p>
					<img src={chat} />
				</div>
				<div className="sidebar-header-top">
					<p>{company?.data?.CompanyName}</p>
					<p>{localStorage.getItem("Login")}</p>
				</div>
			</div>
			<ul className="links">
						<li onClick={onLogout}>
									Çıxış
						</li>
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
			</ul>
		</aside>
	);
};

export default Sidebar;
