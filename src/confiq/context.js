import { createContext, useContext, useReducer, useState } from "react";
import reducer from './reducer'
import sendRequest from "./sentRequest";


const AppContect = createContext()

export const AppProvider = ({children}) => {

    const initialState = {
        loading: false,
        isLogin: false,
        redirect: false,
        isModalOpen: false,
        newDemandObjCustomer: '',
        willReceves: '',
    }
    
    const [state, dispatch] = useReducer(reducer,initialState)

    
    const getProduct = (Id) => {
      dispatch({type: 'LOADING'})
      async function fetchData() {
      const response = await sendRequest('products/get.php',{id: Id})
      console.log(response)
      dispatch({type: 'GET_PRODUCT', payload: response})
      }
      fetchData()
    }
    const getUser = (Id) => {
        async function fetchData1() {
            const response = await sendRequest('customers/get.php',{id: Id})
            // const response = await sendRequest('stocks/get.php',{id: Id})
            // const response = await sendRequest('marks/get.php',{id: Id})
            console.log(response.List[0])
            dispatch({type:'GET_USER', payload: response.List[0]})
        }
        async function fetchData2() {
            const response = await sendRequest('customers/getdata.php',{id: Id})
            console.log(response)
            dispatch({type:'GET_DEBT', payload: response.Debt})
        }
        async function fetchData3() {
            const response = await sendRequest('stocks/get.php',{id: Id})
            console.log(response)
            dispatch({type:'GET_DEBT', payload: response.Debt})
        }
        fetchData1()
        fetchData2()
        fetchData3()
    }
    const createNewDemandObjCustomer = (Id) => {
        dispatch({type:'CREATE_NEW_DEMAND_OBJ_CUSTOMER',
            payload: {
                "id": "",
                "name": "",
                "moment": '',
                "consumption": 0,
                "stockid": "",
                'customerid': '',
                "amount": 0,
                "discount": 0,
                "status": 1,
                "positions": [],
            }
        })
    }
    const getCustomerWillReceve = (data) => {
        dispatch({type:'WILL_RECEVES',payload: data})
    }

    return(
        <AppContect.Provider 
          value = {{
              ...state,
              getProduct,
              getUser,
              createNewDemandObjCustomer,
              getCustomerWillReceve
          }}
          >
            {children}
        </AppContect.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContect)
}
