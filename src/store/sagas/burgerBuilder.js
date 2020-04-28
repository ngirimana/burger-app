
import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';
import * as actions from '../actions';


export function* initIngredientSaga(action) {
	try {
		const response = yield axios.get('https://burger-a78d9.firebaseio.com/ingridients.json')
		yield put(actions.setIngredients(response.data));
	} catch (error) {
		yield put(actions.fetchIngredientsFailed());
	};

}