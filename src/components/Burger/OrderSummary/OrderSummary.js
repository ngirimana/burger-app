import React, { Component } from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
	// this should be function component instead of class
	componentWillUpdate() {
		console.log('[OrderSummary ] WillUpdate')
	}
	render() {
		const ingridientSummary = Object.keys(this.props.ingridients)
			.map(igKey => {
				return (
					<li key={ igKey }>
						<span style={ { textTransform: 'capitalize' } }>{ igKey }</span>:{this.props.ingridients[ igKey ] }
					</li>)
			})
		return (
			<Auxiliary>
				<h3>Order Summary</h3>
				<p>A Delicius Burger With the Following Ingridients</p>
				<ul >
					{ ingridientSummary }
				</ul>
				<p><strong>Total Price:{ ` $${ this.props.price }` }</strong></p>
				<p>Continue to Checkout</p>
				<Button btnType='Danger' clicked={ this.props.purchasingCancelled }>Cancel</Button>
				<Button btnType='Success' clicked={ this.props.purchasingContinued }>Continue</Button>
			</Auxiliary>
		)

	}
}
export default OrderSummary;