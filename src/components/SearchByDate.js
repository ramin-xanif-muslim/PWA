import React, { useState } from "react";
import style from "./SearchByDate.module.css";
import dot from "../img/document_pages_img/dot.svg";

function SearchByDate({ obj, getSearcObjByDate }) {
	const [activId, setActivId] = useState(0);

	const dateTexts = [
		{
			id: 1,
			title: "Bu gün",
		},
		{
			id: 2,
			title: "Dünən",
		},
		{
			id: 3,
			title: "Bu ay",
		},
		{
			id: 4,
			title: "30 gün",
		},
		{
			id: 5,
			title: "Müddətsiz",
		},
	];
	const select = (i) => {
		let today = new Date();
		let y = today.getFullYear();
		let m = today.getMonth();
		let d = today.getDate();
		if (i === 1) {
			let date = y + "/" + (m + 1) + "/" + d;
			var tarix = {
				momb: `${date} 00:00`,
				mome: `${date} 23:59`,
			};
			Object.assign(obj, tarix);
			getSearcObjByDate(obj);
			return;
		}
		if (i === 2) {
			d = d - 1;
			let date = y + "/" + (m + 1) + "/" + d;
			var tarix = {
				momb: `${date} 00:00`,
				mome: `${date} 23:59`,
			};
			Object.assign(obj, tarix);
			getSearcObjByDate(obj);
			return;
		}
		if (i === 3) {
			d = 1;
			let date = y + "/" + (m + 1) + "/" + d;
			var tarix = {
				momb: `${date} 00:00`,
			};
			Object.assign(obj, tarix);
			d = 30;
			date = y + "/" + (m + 1) + "/" + d;
			tarix = {
				mome: `${date} 23:59`,
			};
			Object.assign(obj, tarix);
			getSearcObjByDate(obj);
			return;
		}
		if (i === 4) {
			let date = y + "/" + m + "/" + d;
			var tarix = {
				momb: `${date} 00:00`,
			};
			Object.assign(obj, tarix);
			date = y + "/" + (m + 1) + "/" + d;
			var tarix = {
				mome: `${date} 23:59`,
			};
			Object.assign(obj, tarix);
			getSearcObjByDate(obj);
			return;
		}
		if (i === 5) {
			var tarix = {
				momb: "",
				mome: "",
			};
			Object.assign(obj, tarix);
			getSearcObjByDate(obj);
			return;
		}
	};

	const onClick = (i) => {
		select(i);
		setActivId(i);
	};
	return (
		<div className="search-by-date">
			{dateTexts.map((d) => {
				return (
					<ul className={style.ul}>
						<li
							onClick={() => onClick(d.id)}
							className={d.id === activId ? "active" : ""}
						>
							{d.title}
						</li>
					</ul>
				);
			})}
		</div>
	);
}

export default SearchByDate;
