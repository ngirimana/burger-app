import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../utility';

const initialState = {
	orders: [],
	loading: false,
	purchased: false
}
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.PURSCHASE_INIT:
			return updatedObject(state, { purchased: false })

		case actionTypes.PURSCHASE_BURGER_START:
			return updatedObject(state, { loading: true })

		case actionTypes.PURSCHASE_BURGER_SUCCESS:
			const newOrder =updatedObject(action.orderData,{id:action.orderId}) 
			return updatedObject(state, {
				loading: false,
				purchased: true,
				orders: state.orders.concat(newOrder)
			})

		case actionTypes.PURSCHASE_BURGER_FAIL:
			return updatedObject(state, { loading: false });

		case actionTypes.FETCH_ORDER_START:
			return updatedObject(state, { loading: true })

		case actionTypes.FETCH_ORDER_SUCCESS:
			return updatedObject(state, {
				orders: action.orders,
				loading: false
			})

		case actionTypes.FETCH_ORDER_FAIL:
			return updatedObject(state, { loading: false })

		default: return state
	}
}
export default reducer