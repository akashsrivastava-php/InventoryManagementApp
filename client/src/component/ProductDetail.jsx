import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { toast } from 'react-toastify';
import { add, update, deleteData } from '../utils'

class ProductDetail extends Component {
	constructor(props){
		super(props)
		this.state = {
            name: '',
            price: '',
            rating: ''
        }
        this.validator = new SimpleReactValidator();
    }
    
    static getDerivedStateFromProps(props, state) {
        if (props.data.id != state.id) {
          return {
            ...props.data
          };
        }
    }

    setVal = (event) => {
        const obj = {}
        obj[event.target.name] = event.target.value
		this.setState(obj);
    }

    isFormValid = () => {
        if(this.validator.allValid()){
            return true
        }else{
            this.validator.showMessages();
	        this.forceUpdate();
            return false
        }
    }

    addProduct = async () => {
        const { name, price, rating } = this.state
        const res = await add({name, price, rating})
        if(res.status){
            this.clearForm()
            toast.success(res.msg)
        }else{
            toast.error(res.msg)
        }
    }

    updateProduct = async () => {
        const { name, price, rating, id } = this.state
        if(id){
            const res = await update({name, price, rating, id})
            if(res.status){
                this.clearForm()
                toast.success(res.msg)
            }else{
                toast.error(res.msg)
            }
        }else{
            toast.error('Please select product!')
        }
    }

    deleteProduct = async () => {
        const { id } = this.state
        if(id){
            const res = await deleteData(id)
            if(res.status){
                this.clearForm()
                toast.success(res.msg)
            }else{
                toast.error(res.msg)
            }
        }else{
            toast.error('Please select product!')
        }
    }

    clearForm = () => {
        const formData = {
            name: '',
            price: '',
            rating: ''
        }
        this.props.list()
        this.setState(formData)
    }
    
    handelBtnClick = (btn) => {
        switch (btn) {
            case 'add':
                if(this.isFormValid()){
                    this.addProduct()
                }
                break;
            case 'save':
                if(this.isFormValid()){
                    this.updateProduct()
                }
                break;
            case 'delete':
                this.deleteProduct()
            break;
        
            default:
                this.clearForm()
        }
    }

  	render() {
    const { name, price, rating } = this.state
    return (
        <div className="card mt-3">
        <div className="card-header">
            Product Deatils
        </div>
        <div className="card-body">
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" className="form-control" id="name" placeholder="Enter Name" value={name} onChange={this.setVal}/>
                <p className='text-danger'>{this.validator.message('Name', name, 'required')}</p>
            </div>
            <div className="form-group">
                <label htmlFor="price">Price</label>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">$</div>
                    </div>
                    <input type="text" name="price" className="form-control" id="price" placeholder="Enter Price" value={price} onChange={this.setVal}/>
                </div>
                <p className='text-danger'>{this.validator.message('Price', price, 'required')}</p>
            </div>
            <div className="card">
                <div className="card-header">
                    Rating
                </div>
                <div className="card-body">
                    <div className="form-group">
                        <label htmlFor="rating">Rating</label>
                        <input type="number" name="rating" className="form-control" id="rating" placeholder="Enter Rating" max="10" min="1" value={rating} onChange={this.setVal}/>
                        <p className='text-danger'>{this.validator.message('Rating', rating, 'required|max:10,num|min:1,num')}</p>
                    </div>
                </div>
            </div>
            <div className="float-right mt-3">
                <button type="button" className="btn btn-primary mr-2" onClick={()=>this.handelBtnClick('add')}>Add</button>
                <button type="button" className="btn btn-success mr-2" onClick={()=>this.handelBtnClick('save')}>Save</button>
                <button type="button" className="btn btn-danger mr-2" onClick={()=>this.handelBtnClick('delete')}>Delete</button>
                <button type="button" className="btn btn-warning" onClick={()=>this.handelBtnClick('cancel')}>Cancel</button>
            </div>
        </div>
    </div>
    );
  }
}

export default ProductDetail;
