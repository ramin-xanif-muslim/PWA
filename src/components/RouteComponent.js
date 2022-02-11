import React from "react";
import { Navigate, Route, Routes } from "react-router";
import Cashins from "../pages/Cashins";
import Cashouts from "../pages/Cashouts";
import Credittransactions from "../pages/Credittransactions";
import Customers from "../pages/Customers";
import Dashboards from "../pages/Dashboards";
import Demandreturns from "../pages/Demandreturns";
import Demands from "../pages/Demands";
import Documents from "../pages/Documents";
import Enters from "../pages/Enters";
import LoginPage from "../pages/LoginPage";
import Losses from "../pages/Losses";
import Moves from "../pages/Moves";
import Products from "../pages/Products";
import Returns from "../pages/Returns";
import Salepoints from "../pages/Salepoints";
import Sales from "../pages/Sales";
import Settlements from "../pages/Settlements";
import Spenditems from "../pages/Spenditems";
import Stockbalance from "../pages/Stockbalance";
import Supply from "../pages/Supply";
import Supplyreturns from "../pages/Supplyreturns";
import Transactions from "../pages/Transactions";
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
			<Route path="/supplies" element={<Supply />} />
			<Route path="/supplyreturns" element={<Supplyreturns />} />
			<Route path="/demandreturns" element={<Demandreturns />} />
			<Route path="/products" element={<Products />} />
			<Route path="/enters" element={<Enters />} />
			<Route path="/losses" element={<Losses />} />
			<Route path="/moves" element={<Moves />} />
			<Route path="/stockbalance" element={<Stockbalance />} />
			<Route path="/customers" element={<Customers />} />
			<Route path="/transactions" element={<Transactions />} />
			<Route path="/spenditems" element={<Spenditems />} />
			<Route path="/sales" element={<Sales />} />
			<Route path="/returns" element={<Returns />} />
			<Route path="/credittransactions" element={<Credittransactions />} />
			<Route path="/salepoints" element={<Salepoints />} />
			<Route path="/settlements" element={<Settlements />} />
			<Route path="/cashins" element={<Cashins />} />
			<Route path="/cashouts" element={<Cashouts />} />
			<Route path="*" element={<Navigate to='/' />} />
		</Routes>
	);
}

export default RouteComponent;
