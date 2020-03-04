import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { toast } from 'react-toastify';
import cookie from 'react-cookies'
import { loginUser } from '../utils'
import './../css/App.css';

class Login extends Component {

	constructor(props){
		super(props)
			this.state = {
				username : '',
				password : '',
				loading : ''
			}

		this.validator = new SimpleReactValidator();

	}

	componentDidMount(){
		const token = cookie.load('token')
		if(token){
			this.props.history.push('/home')
		}
	}

	setVal = (event) => {
		var obj = {};
    	obj[event.target.name] = event.target.value;
		this.setState(obj);
	}

	handelLogin = async () => {
		const { username, password } = this.state
		const { history } = this.props
		if( this.validator.allValid() ){
			this.setState({loading: true})
		  const res = await loginUser({username, password});
		  if(res.status){
				toast.success(res.msg)
				history.push('/home')
				this.setState({loading: ''})
		  }else{
			toast.error(res.msg)
			this.setState({loading: ''})
		  }
	    } else {
	      this.validator.showMessages();
	      this.forceUpdate();
	    }

	}

  render() {
	  const { username, password, loading } = this.state
    return (
      <div className="container">
    	<div className="row justify-content-center mt-5">
        	<div className="col-md-8">
            	<div className="card">
                	<div className="card-header">Login</div>
						<div className="card-body">
                			<div className="form-group row">
                            	<label htmlFor="email" className="col-md-4 col-form-label text-md-right">User Name
                            	</label>
                            	<div className="col-md-6">
                                <input ref='email' type="email" name="username" onChange={this.setVal} autoComplete='off'/>
                                <p className='text-danger'>{this.validator.message('User Name', username, 'required')}</p>
                            	</div>
                        	</div>

                        	<div className="form-group row">
                            	<label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password
                            	</label>
								<div className="col-md-6">
                                	<input ref="password" type="password" name='password' onChange={this.setVal}/>
                                	<p className='text-danger'>{this.validator.message('Password', password, 'required')}</p>
                            	</div>
                        	</div>

                        	<div className="form-group row mb-0">
                            	<div className="col-md-8 offset-md-4">
									<button type="submit" className="btn btn-primary" disabled={loading} onClick={this.handelLogin}>{ loading ? 'Processing...' : 'Login'}</button>
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

export default Login;