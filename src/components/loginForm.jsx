import React , { Component } from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import auth from '../services/authService';


class LoginForm extends Form{

    state = {
        data : { username: '' , password: ''},
        errors : {} 
    };

    schema = {
        username: Joi.string()
                    .required()
                    .label('Username'),
        password: Joi.string()
                    .required()                    
                    .label('Password'),
    };

    doSubmit = async () =>{
        try {
            const { data } = this.state;
            await auth.login(data.username , data.password);
            const { state } = this.props.location;
            window.location = state ? state.from.pathname : '/';
        } catch (ex) {
            if(ex.response && ex.response.status === 400){
                const errors = { ...this.state.errors }; 
                errors.username = ex.response.data;
                this.setState({ errors });
            }   
        }
   }

    render() { 

        return ( 
            <React.Fragment>
               <div className="container">
                    <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card card-signin my-5">
                        <div className="card-body">
                            <h5 className="card-title text-center">Login</h5>
                            <form onSubmit={this.handleSubmit}>
                                {this.renderInput('username' , 'Username')}
                                {this.renderInput('password' , 'Password' , 'password')}
                                { this.renderButton('Login') }
                            </form>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </React.Fragment>
         );
    }
}
 
export default LoginForm;