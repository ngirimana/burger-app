import React,{Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';

const withErrorHandler=(WrappedComponent,axios )=>{
return class extends Component{
	state={
		error:null
	}
	componentWillMount(){
		this.reqInteceptors= axios.interceptors.request.use(req=>{
			this.setState({error:null});
			return req
		})
		this.resInteceptors=axios.interceptors.response.use(res=> res,error=>{
	this.setState({error:error});})
		}
		componentWillUnMount(){
			console.log('WillMount',this.reqInteceptors,this.resInteceptors)
			axios.interceptors.request.eject(this.reqInteceptors)
			axios.interceptors.response.eject(this.resInteceptors)
		}
	errorConfirmedHandler=()=>{
		this.setState({error:null})
	};
	
	render(){
		
		return (
			<Auxiliary>
				<Modal 
				modalClosed={this.errorConfirmedHandler}
				show={this.state.error}>
					{this.state.error?this.state.error.message:null}
				</Modal>
			<WrappedComponent {...this.props}/>
			</Auxiliary>
		)
	}
}
}

export default  withErrorHandler