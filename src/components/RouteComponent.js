import React from "react";
import { Navigate, Route, Routes } from "react-router";
import Cashins from "../pages/Cashins";
import Cashouts from "../pages/Cashouts";
import Credittransactions from "../pages/Credittransactions";
import Customers from "../pages/Customers";
import Dashboards from "../pages/Dashboards";
import Demandreturns from "../pages/Demandreturns";
import Demands from "../pages/Demands";
import DocumentProduct from "../pages/DocumentProduct";
import DocumentCustomer from "../pages/DocumentCustomer";
import DocumentTransaction from "../pages/DocumentTransaction";
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
import Salereports from "../pages/Salereports";
import Profit from "../pages/Profit";
import Cashes from "../pages/Cashes";
import Supply from "../pages/Supply";
import Supplyreturns from "../pages/Supplyreturns";
import Transactions from "../pages/Transactions";
import Document from "../pages/Document";
import Invoice from "../pages/Invoice";
import Content from "./Content";
import TabContends from "./TabContends";

function RouteComponent(props) {
	return (
		<Routes>
			<Route path="login" element={<LoginPage />} />
			<Route path="/" element={<Content />} />
			<Route path="/dashboards" element={<Dashboards />} />

			<Route path="/invoice" element={<Invoice />} />
			<Route path="/demands" element={<Demands />} />
			<Route path="/documents" element={<Documents />} />
			<Route path="/document" element={<Document />} />
			<Route path="/document_product" element={<DocumentProduct />} />
			<Route path="/document_customer" element={<DocumentCustomer />} />
			<Route path="/document_transactions" element={<DocumentTransaction />} />
			<Route path="/supplies" element={<Supply />} />
			<Route path="/supplyreturns" element={<Supplyreturns />} />
			<Route path="/demandreturns" element={<Demandreturns />} />
			<Route path="/products" element={<Products />} />
			<Route path="/enters" element={<Enters />} />
			<Route path="/losses" element={<Losses />} />
			<Route path="/moves" element={<Moves />} />
			<Route path="/stockbalance" element={<Stockbalance />} />
			<Route path="/salereports" element={<Salereports />} />
			<Route path="/profit" element={<Profit />} />
			<Route path="/cashes" element={<Cashes />} />
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
			{/* <Route path="*" element={<Navigate to='/' />} /> */}
		</Routes>
	);
}

export default RouteComponent;
