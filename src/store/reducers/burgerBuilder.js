import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../utility';



const initialState = {
	ingredients: null,
	error: false,
	totalPrice: 4,
	building:false
}
const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
};
const addIngredients = (state, action) => {
	const UpdatedIngredient = { [ action.ingredientName ]: state.ingredients[ action.ingredientName ] + 1 }
	const UpdatedIngredients = updatedObject(state.ingredients, UpdatedIngredient);
	const updatedState = {
		ingredients: UpdatedIngredients,
		totalPrice: state.totalPrice + INGREDIENT_PRICES[ action.ingredientName ],
		building:true
	}
	return updatedObject(state, updatedState)
}
const removeIngredients = (state, action) => {
	const UpdatedIng = { [ action.ingredientName ]: state.ingredients[ action.ingredientName ] - 1 }
	const UpdatedIngs = updatedObject(state.ingredients, UpdatedIng);
	const updatedSt = {
		ingredients: UpdatedIngs,
		totalPrice: state.totalPrice + INGREDIENT_PRICES[ action.ingredientName ],
		building:true
	}
	return updatedObject(state, updatedSt)
}
const setIngredients = (state, action) => {
	return updatedObject(state,
		{
			ingredients: {
				salad: action.ingredients.salad,
				bacon: action.ingredients.bacon,
				cheese: action.ingredients.cheese,
				meat: action.ingredients.meat
			},
			totalPrice: 4,
			error: false,
			building:false
		});
}
const fetchIngredientsFailed = (state, action) => {
	return updatedObject(state, { error: true })
}
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT: return addIngredients(state, action)
		case actionTypes.REMOVE_INGREDIENT: return removeIngredients(state, action)
		case actionTypes.SET_INGREDIENTS: return setIngredients(state, action)
		case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action)
		default: return state;
	}
}

export default reducer;