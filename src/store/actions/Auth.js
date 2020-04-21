import axios from 'axios'
import * as actionTypes from './actionTypes';

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	}
}
export const authSucces = (token,userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken:token,
		userId:userId
	}
}
export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error
	}
}
export const auth = (email, password,isSugnUp) => {
	return dispatch => {
		dispatch(authStart());
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true
		}
		let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBScNADplXoVQ8gEPf7Tl5gBX3vRo2DkmA'
	if(!isSugnUp){
		url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBScNADplXoVQ8gEPf7Tl5gBX3vRo2DkmA'
	}
		axios.post(url, authData)
			.then(response=>{
				console.log(response)
				dispatch(authSucces(response.data.idToken,response.data.localId))
			})
			.catch(err => {
				dispatch(authFail(err.response.data.error))
			})
	}
}