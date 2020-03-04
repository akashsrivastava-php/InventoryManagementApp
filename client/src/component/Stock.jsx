import React, { Component } from 'react';

class Stock extends Component {

  	render() {
	const { count } = this.props
    return (
        <div className="card">
            <div className="card-header text-center">
                Product Count: {count}
            </div>
        </div>
    );
  }
}

export default Stock;
