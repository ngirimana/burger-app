import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';

class ContactData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: ''
		}
	}
	orderHandler=()=>{

	}
	render() {
		return (
			<div className={ classes.ContactData }>
				<h3>Enter Your Contact Data</h3>
				<form>
					<input className={ classes.Input } type="text" name="name" placeholder="Your Name" />
					<input className={ classes.Input } type="email" name="email" placeholder="Your Mail" />
					<input className={ classes.Input } type="text" name="street" placeholder="Your Street" />
					<input className={ classes.Input } type="text" name="postal" placeholder="Your Postal Code" />
					<Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
				</form>
			</div>
		)
	}
}
export default ContactData;