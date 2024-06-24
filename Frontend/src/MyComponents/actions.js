// actions.js
export const setOrderDetails = (medicine, quantity) => ({
    type: 'SET_ORDER_DETAILS',
    payload: { medicine, quantity }
});

export const setCustomerInfo = (info) => ({
    type: 'SET_CUSTOMER_INFO',
    payload: info
});

export const submitOrder = () => ({
    type: 'SUBMIT_ORDER'
});
