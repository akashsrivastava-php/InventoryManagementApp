import React, { Component } from 'react';
import { productList } from '../utils'
import loader from '../loader.gif'

class ProductList extends Component {

  	render() {
    const { list, get } = this.props
    return (
        <div className="card" style={{width: "18rem"}}>
        <div className="card-header">
            Products
        </div>
        <ul className="list-group list-group-flush">
            {
              list && list.length > 0 &&
              list.map((val, key)=>{
                return (
                  <li style={{cursor: 'pointer'}} onClick={()=>get(val.id)} key={key} className="list-group-item">{val.name}</li>
                )
              })
            }
        </ul>
        </div>
    );
  }
}

export default ProductList;
