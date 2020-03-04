import React, { Component } from 'react';
import cookie from 'react-cookies'
import { toast } from 'react-toastify';
import { logoutUser, productList, specificProduct } from '../utils'
import ProductLIst from './ProductList'
import Stock from './Stock'
import ProductDetail from './ProductDetail';

class Dashboard extends Component {
	constructor(props){
		super(props)
		this.state = {
			products: [],
			specific: {}
		}
	}

	componentDidMount(){
		const token = cookie.load('token')
		if(!token){
			this.props.history.push('/')
		}
		this.getProductList()
	}

	getProductList = async () => {
		const res = await productList()
		if(res.status){
			this.setState({products: res.data, specific: { id: null}})
		}
	}

	handelLogout = async () => {
		const res = await logoutUser()
		if(res.status){
			toast.success(res.msg)
			this.props.history.push('/')
		}
	}

	getSpecificProduct = async (id) => {
		const res = await specificProduct(id)
		if(res.status){
			this.setState({specific: res.data})
		}
	}

  	render() {
	const { products, specific } = this.state
    return (
      <div className="container">
    	<div className="row justify-content-center mt-5">
        	<div className="col-md-12">
            	<div className="card">
                	<div className="card-header"><p className="float-left">Product Manager</p><a href="#/" onClick={()=>this.handelLogout()} className="float-right">Logout</a></div>
						<div className="card-body">
							<div className="row">
								<div className="col-md-4">
									<ProductLIst list={products} get={(id)=>this.getSpecificProduct(id)}/>
								</div>
								<div className="col-md-8">
									<Stock count={products.length}/>
									<ProductDetail data={specific} list={()=>this.getProductList()}/>						
								</div>
							</div>
                        </div>
            		</div>
		        </div>
		    </div>
		</div>
    );
  }
}

export default Dashboard;
