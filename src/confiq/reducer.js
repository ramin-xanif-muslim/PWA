
const reducer = (state, action) => {
    if(action.type === 'LOADING') {
        return {...state, loading: true}
    }
    if(action.type === 'GET_PRODUCT') {
        return {...state,product: action.payload, loading: false}
    }
    if(action.type === 'GET_USER') {
        return { ...state, user: action.payload}
    }
    if(action.type === 'GET_DEBT') {
        return { ...state, debt: action.payload}
    }
    if(action.type === 'CREATE_NEW_DEMAND_OBJ_CUSTOMER') {
        return { ...state, newDemandObjCustomer: action.payload}
    }
    if(action.type === 'WILL_RECEVES') {
        return { ...state, willReceves: action.payload}
    }
    return state
}

export default reducer