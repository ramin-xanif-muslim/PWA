import { createContext, useContext, useReducer, useState } from "react";
import reducer from "./reducer";

const AppContect = createContext();

export const AppProvider = ({ children }) => {

	const initialState = {
		checkedFooterNavItem: "",
		isSidebarOpen: false,
        isSearch: false,
        isLogin: true,
        isFooter: true,
        isHeader: true,
        documentsItem: '',
        isNewDocument: false,
        isPrint: false,
	};

	const [state, dispatch] = useReducer(reducer, initialState);

	const getCheckedFooterNavItem = (id) => {
		dispatch({ type: "CHECKED_FOOTER_NAV_ITEM", payload: id });
	};
    const openSearchInput = (bl) => {
        dispatch({ type: 'OPEN_SEARCH_INPUT', payload: bl})
    }
    const login = () => {
        dispatch({ type: 'LOGIN', payload: true})
    }
    const logout = () => {
        dispatch({ type: 'LOGOUT', payload: false})
    }
    const showFooter = () => {
        dispatch({ type: 'SHOW_FOOTER', payload: true})
    }
    const hideFooter = () => {
        dispatch({ type: 'HIDE_FOOTER', payload: false})
    }
    const hideHeader = () => {
        dispatch({ type: 'HIDE_HEADER', payload: false})
    }
    const getDocumentsItem = (item) => {
        dispatch({ type: 'DOCUMENTS_ITEM', payload: item})
    }
    const putFrom = (item) => {
        dispatch({ type: 'FROM', payload: item})
    }
    const setIsNewDocument = (item) => {
        dispatch({ type: 'IS_NEW_DOCUMENT', payload: item})
    }
    const setCustomerId = (item) => {
        dispatch({ type: 'CUSTOMER_ID', payload: item})
    }
    const print = (item) => {
        dispatch({ type: 'PRINT', payload: true})
    }

	return (
		<AppContect.Provider
			value={{
				...state,
				getCheckedFooterNavItem,
                openSearchInput,
                login,
                logout,
                showFooter,
                hideFooter,
                getDocumentsItem,
                setIsNewDocument,
                setCustomerId,
                putFrom,
                hideHeader,
                print,
			}}
		>
			{children}
		</AppContect.Provider>
	);
};

export const useGlobalContext = () => {
	return useContext(AppContect);
};
