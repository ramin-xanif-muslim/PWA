import React from "react";
import { Route, Switch } from 'react-router';
import SalesPage from '../pages/SalesPage';
import PurchasesPage from '../pages/PurchasesPage';
import FinancePage from '../pages/FinancePage';
import BasePage from '../pages/BasePage';
import Products from "../pages/ProductsPage";
import NewSale from "../pages/NewSalePage";
import NewPurchase from "../pages/NewPurchasePage";
import Indicators from "../pages/IndicatorsPage";
import NewProduct from "../pages/NewProductPage";
import LoginPage from "../pages/LoginPage";
import ProductsListPage from "../pages/ProductsListPage";
import Product from "../pages/Product";
import NewQroupPage from "../pages/NewQroupPage";
import WarehouseBalancePage from "../pages/WarehouseBalancePage";
import ChooseCustomerPage from "../pages/ChooseCustomerPage";
import NewCustomerPage from "../pages/NewCustomerPage";
import PurchaseDocumentsPage from "../pages/PurchaseDocumentsPage";
import IncomePage from "../pages/IncomePage";
import PaymentsPage from "../pages/PaymentsPage";
import ExpenditurePage from "../pages/ExpenditurePage";
import SalesDocumentsPage from "../pages/SalesDocumentsPage";
import NewSalesDocumentPage from "../pages/NewSalesDocumentPage";
import Debts from "../pages/Debts";
import WillReceves from "../pages/WillReceves";


export default function RouteComponent() {
    
    return(
        <Switch>
          <Route exact path='/' render={() => <BasePage />} />
          <Route path='/sales' render={() => <SalesPage />} />
          <Route path='/login' render={() => <LoginPage />} />
          <Route path='/products_list' render={() => <ProductsListPage />} />
          <Route path='/warehouse_balance' render={() => <WarehouseBalancePage />} />
          <Route path='/new_product' render={() => <NewProduct />} />
          <Route path='/indicators' render={() => <Indicators />} />
          <Route path='/purchases' render={() => <PurchasesPage />} />
          <Route path='/finance' render={() => <FinancePage />} />
          <Route path='/products' render={() => <Products />} />
          <Route path='/product' render={() => <Product />} />
          <Route path='/yeni_satış' render={() => <NewSale />} />
          <Route path='/yeni_alış' render={() => <NewPurchase />} />
          <Route path='/new_group' render={() => <NewQroupPage />} />
          <Route path='/choose_customer' render={() => <ChooseCustomerPage />} />
          <Route path='/new_customer' render={() => <NewCustomerPage />} />
          <Route path='/purchase_documents' render={() => <PurchaseDocumentsPage />} />
          <Route path='/income' render={() => <IncomePage />} />
          <Route path='/expenditure' render={() => <ExpenditurePage />} />
          <Route path='/payments' render={() => <PaymentsPage />} />
          <Route path='/sales_documents' render={() => <SalesDocumentsPage />} />
          <Route path='/new_sales_document' render={() => <NewSalesDocumentPage />} />
          <Route path='/debts' render={() => <Debts />} />
          <Route path='/will_receves' render={() => <WillReceves />} />
        </Switch>
    )
}