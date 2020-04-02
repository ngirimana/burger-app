import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'

const INGRIDIENT_PRICE = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
}
class BurgerBuilder extends Component {
	// constructor(props){
	// 	super(props)
	// 	this.state={...};
	// }
	state = {
		ingridients: null,
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
		loading:false,
		error:false
	}
	componentDidMount(){
		axios.get('https://burger-a78d9.firebaseio.com/ingridients.json')
		.then(response=>{
			this.setState({ingridients:response.data})
		}).catch(error=>{
			this.setState({error:true})
		})
	}
	
	updatePurchaseState = (ingridients) => {
		const sum = Object.keys(ingridients).map(igKey => {
			return ingridients[ igKey ]
		}).reduce((sum, el) => {
			return sum + el;
		}, 0);
		this.setState({ purchasable: sum > 0 })
	}
	addIngridientHandler = (type) => {
		const oldCount = this.state.ingridients[ type ];
		const updatedCount = oldCount + 1;
		const UpdatedIngridients = {
			...this.state.ingridients
		}
		UpdatedIngridients[ type ] = updatedCount;
		const priceAddition = INGRIDIENT_PRICE[ type ];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;
		this.setState({
			totalPrice: newPrice,
			ingridients: UpdatedIngridients
		});
		this.updatePurchaseState(UpdatedIngridients);
	}
	removeIngridientHandler = (type) => {
		const oldCount = this.state.ingridients[ type ];
		if (oldCount <= 0) {
			return;
		}
		const updatedCount = oldCount - 1;
		const UpdatedIngridients = {
			...this.state.ingridients
		}
		UpdatedIngridients[ type ] = updatedCount;
		const priceDeduction = INGRIDIENT_PRICE[ type ];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceDeduction;
		this.setState({
			totalPrice: newPrice,
			ingridients: UpdatedIngridients
		});
		this.updatePurchaseState(UpdatedIngridients);
	}
	purchaseHandler = () => {
		this.setState({ purchasing: true });
	}
	purchasingCancelHandler = () => {
		this.setState({ purchasing: false })
	}
	purchaseContinueHandler = () => {
	//	alert('You continue!')
	this.setState({loading:true})
	const order={
		ingridients:this.state.ingridients,
		price:this.state.totalPrice.toFixed(2),
		customer:{
			name:'Schadrack',
			address:{
				City:'Kigali',
				country:'Rwanda',
				phoneNumber:'0781475108',
			},
			email:'chadrackngirimana@gmail.com'
		},
		deliveryMethod:'Fast class'
	}
	axios.post('/orders.json',order)
	.then(response=>{
		this.setState({loading:false,	purchasing: false,})
	}).catch(error=>{
		this.setState({loading:false,	purchasing: false,})
	})

	}
	render() {
		const disabledInfo = {
			...this.state.ingridients
		}
		for (let key in disabledInfo) {
			disabledInfo[ key ] = disabledInfo[ key ] <= 0
		}
let orderSummary= null
	
		let burger= this.state.error?<p>Ingridients can't be loaded</p>:<Spinner/>
		if(this.state.ingridients){
		burger=(
			<Auxiliary>
		<Burger ingridients={ this.state.ingridients } />
			<BuildControls
				ingridientAdded={ this.addIngridientHandler }
				ingridientRemoved={ this.removeIngridientHandler }
				disabled={ disabledInfo }
				purchasable={ this.state.purchasable }
				ordered={ this.purchaseHandler }
				price={ this.state.totalPrice } />
				</Auxiliary>
				);
				orderSummary=	<OrderSummary
		ingridients={ this.state.ingridients }
		price={ this.state.totalPrice.toFixed(2) }
		purchasingCancelled={ this.purchasingCancelHandler }
		purchasingContinued={ this.purchaseContinueHandler } />
		
		}
		if(this.state.loading){
			orderSummary=<Spinner/>}
		return (
			<Auxiliary>
				<Modal show={ this.state.purchasing } modalClosed={ this.purchasingCancelHandler }>
				{orderSummary}
				</Modal>
				{burger}
			</Auxiliary>
		);
	}
}

export default withErrorHandler( BurgerBuilder,axios);