import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess=(id,orderData)=>{
	return{
		type:actionTypes.PURSCHASE_BURGER_SUCCESS,
		orderId:id,
		orderData:orderData

	}
}
export const purchaseBurgerFail=(error)=>{
	return{
		type:actionTypes.PURSCHASE_BURGER_FAIL,
		error:error
	}
}
export const purchaseBurgerStart=()=>{
	return{
		type:actionTypes.PURSCHASE_BURGER_START
	}
}
export const purchaseBurger=(orderData,token)=>{
	return dispatch=>{
		dispatch(purchaseBurgerStart())
		axios.post('/orders.json?auth='+token, orderData)
		.then(response => {
		console.log(response.data)
		dispatch(purchaseBurgerSuccess(response.data.name,orderData))
		})
		.catch(error => {
		dispatch(purchaseBurgerFail(error))
		});
	}
}
export const purchaseInit=()=>{
	return{
		type:actionTypes.PURSCHASE_INIT
	}
}
export const fetchOrderSuccess=(orders)=>{
	return{
		type:actionTypes.FETCH_ORDER_SUCCESS,
		orders:orders
	
	}
}
export const fetchOrdersFail=(error)=>{
	return{
		type:actionTypes.FETCH_ORDER_FAIL,
		error:error
	}
}
export const fetchOrdersStart=()=>{
	return{
		type:actionTypes.FETCH_ORDER_START
	}
}
export const fetchOrders=(token)=>{
	return dispatch=>{
		dispatch(fetchOrdersStart())
		axios.get('/orders.json?auth='+token)
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
								}
								dispatch(fetchOrderSuccess(fetchedOrders))
                
            })
            .catch(err => {
                dispatch(fetchOrdersFail(err))
            });
	}
}