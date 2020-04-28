import { takeEvery, all ,takeLatest} from "redux-saga/effects";
import * as actionTypes from '../actions/actionTypes'
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga } from './auth';
import { initIngredientSaga } from './burgerBuilder';
import { purchaseBurgerSaga, fetchOrdersSaga } from './orders'

export function* watchAuth() {
	yield all([
		takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
		takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
		takeEvery(actionTypes.AUTH_USER, authUserSaga),
		takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
	])

}
export function* watchBurgerBuilder() {
	yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientSaga)
}
export function* watchOrder() {
	yield all([
		takeLatest(actionTypes.PUCHASE_BURGER, purchaseBurgerSaga),
		takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga)
	])
}

