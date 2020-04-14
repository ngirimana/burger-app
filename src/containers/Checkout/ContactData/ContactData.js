import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './ContactData.module.css';
import axios from '../../../axios-orders'
import Input from '../../../components/UI/Input/Input'
class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Name'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Street'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your ZIP Code'
				},
				value: '',
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5
				},
				valid: false,
				touched: false
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Country'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your Mail'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: 'fastest', displayValue: 'Fastest' },
						{ value: 'cheapest', displayValue: 'Cheapest' },
						{ value: 'firstclass', displayValue: 'First Class' }
					],
				},
				value: '',
				valid: false,
			}
		},
		formIsValid: false,
		loading: false
	}
	orderHandler = (event) => {
		event.preventDefault();
		// alert('You continue!');
		this.setState({ loading: true });
		let formData = {};
		for (let formElementIdentifier in this.state.orderForm) {
			formData[ formElementIdentifier ] = this.state.orderForm[ formElementIdentifier ].value
		}
		const order = {
			ingredients: this.props.ingredients,
			price: parseFloat(this.props.price),
			orderData: formData

		}
		axios.post('/orders.json', order)
			.then(response => {

				this.setState({ loading: false });
			})
			.catch(error => {
				this.setState({ loading: false });
			});
	}
	checkValidity(value, rules) {
		let isValid = true;

		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid
		}

		return isValid;
	}


	inputChangedHandler = (event, inputIdentifier) => {
		const updateOrderForm = {
			...this.state.orderForm
		}
		const updatedFormElement = {
			...updateOrderForm[ inputIdentifier ]
		}
		updatedFormElement.value = event.target.value;
		updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
		updatedFormElement.touched = true;
		updateOrderForm[ inputIdentifier ] = updatedFormElement;
		let formIsValid=true;
		for(let inputIdentifier in updateOrderForm){
			formIsValid=updateOrderForm[inputIdentifier] && formIsValid
		}
		this.setState({ orderForm: updateOrderForm,formIsValid:formIsValid })
	}
	render() {
		let formElementArray = [];
		for (let key in this.state.orderForm) {
			formElementArray.push({
				id: key,
				config: this.state.orderForm[ key ]
			})
		}
		let form = (
			<form onSubmit={ this.orderHandler }>
				{ formElementArray.map(formElement => (
					<Input
						key={ formElement.id }
						elementType={ formElement.config.elementType }
						elementConfig={ formElement.config.elementConfig }
						invalid={ !formElement.config.valid }
						shouldValidate={ formElement.config.validation }
						touched={ formElement.config.touched }
						value={ formElement.config.value }
						changed={ (event) => this.inputChangedHandler(event, formElement.id) }
					/>
				)) }
				<Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
			</form>
		);
		if (this.state.loading) {
			form = <Spinner />
		}
		return (
			<div className={ classes.ContactData }>
				<h3>Enter Your Contact Data</h3>
				{ form }
			</div>
		)
	}
}
export default ContactData;