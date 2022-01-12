import React from "react";
import { Navigate, Route, Routes } from "react-router";
import Dashboards from "../pages/Dashboards";
import Demandreturns from "../pages/Demandreturns";
import Demands from "../pages/Demands";
import Document from "../pages/Document";
import Documents from "../pages/Documents";
import LoginPage from "../pages/LoginPage";
import Supply from "../pages/Supply";
import Supplyreturns from "../pages/Supplyreturns";
import Content from "./Content";
import TabContends from "./TabContends";

function RouteComponent(props) {
	return (
		<Routes>
			<Route path="login" element={<LoginPage />} />
			<Route path="/" element={<Content />} />
			<Route path="/dashboards" element={<Dashboards />} />
			<Route path="/demands" element={<Demands />} />
			<Route path="/documents" element={<Documents />} />
			<Route path="/document" element={<TabContends />} />
			<Route path="/supply" element={<Supply />} />
			<Route path="/supplyreturns" element={<Supplyreturns />} />
			<Route path="/demandreturns" element={<Demandreturns />} />
			{/* <Route path="*" element={<Navigate to='/' />} /> */}
		</Routes>
	);
}

export default RouteComponent;
