import * as actionTypes from './actionTypes';
import axios from '../../axios-orders'
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
export const purchaseBurgerStart=(orderData)=>{
	return dispach=>{
		axios.post('/orders.json', orderData)
		.then(response => {
		console.log(response.data)
		dispach(purchaseBurgerSuccess(response.data,orderData))
		})
		.catch(error => {
		dispach(purchaseBurgerFail(error))
		});
	}
}