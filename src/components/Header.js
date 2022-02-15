import React, { useEffect, useState } from "react";
import logo from "../img/logo.png";
import notification from "../img/Notification.png";
import menu from "../img/Menu.png";
import home from "../img/Home wite.png";
import products from "../img/Products wite.png";
import buy from "../img/Buy wite.png";
import checkout from "../img/Checkout wite.png";
import customers from "../img/CustomersN wite.png";
import finance from "../img/Finance wite.png";
import relate from "../img/Relate wite.png";
import reports from "../img/Reports wite.png";
import search from "../img/Search.png";
import slider from "../img/Slider.png";
import "../styles/Header.css";
import { useGlobalContext } from "../config/context";
import { Link } from "react-router-dom";

function Header({ openSidebar }) {
	const {
		checkedFooterNavItem,
		openSearchInput,
		isSearch,
	} = useGlobalContext();

	const [icon, setIcon] = useState("");
	const [text, setText] = useState("");

    useEffect(() => {
        setText(document.title)
    },[document.title])

	const fucShowIcons = () => {
		if (checkedFooterNavItem === "") {
			setIcon(home);
		}
		if (checkedFooterNavItem === 1) {
			setIcon(home);
		}
		if (checkedFooterNavItem === 2) {
			setIcon(products);
		}
		if (checkedFooterNavItem === 3) {
			setIcon(buy);
		}
		if (checkedFooterNavItem === 4) {
			setIcon(checkout);
		}
		if (checkedFooterNavItem === 5) {
			setIcon(customers);
		}
		if (checkedFooterNavItem === 6) {
			setIcon(finance);
		}
		if (checkedFooterNavItem === 7) {
			setIcon(relate);
		}
		if (checkedFooterNavItem === 8) {
			setIcon(reports);
		}
	};
	useEffect(() => {
		fucShowIcons();
	}, [checkedFooterNavItem]);

	return (
		<div className="header">
			<div>
				<div className="wraper">
					<button onClick={() => openSidebar(true)}>
						<img src={menu} alt="menu" className="img-menu" />
					</button>
					<div>
						<Link to="/">
							<img src={logo} alt="logo" className="img-logo" />
						</Link>
					</div>
					<div>
						<img
							src={notification}
							alt="notification"
							className="img-notification"
						/>
					</div>
				</div>
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<div style={{ display: "flex", marginTop: "20px" }}>
					<img src={icon} alt="home" className="home" />
					<p className="text">/ {text}</p>
				</div>
				<div>
					<button onClick={() => openSearchInput(!isSearch)}>
						<img
							src={search}
							alt="search"
							style={{ marginRight: "1em" }}
						/>
					</button>
					<img src={slider} alt="slider" />
				</div>
			</div>
		</div>
	);
}

export default Header;
