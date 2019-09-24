import React  from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import userService from '../services/httpService';
import auth from '../services/authService';

class LoginForm extends Form{

    state = {
        data : { username: '' , password: '' , name: '' },
        errors : {} 
    };

    schema = {
        username: Joi.string()
                    .required()
                    .email({ minDomainSegments: 2 })
                    .label('Username'),
        password: Joi.string()
                    .required()
                    .min(5)
                    .label('Password'),
        name: Joi.string()
                .required()
                .label('Name')
    };

    doSubmit = async () =>{
        try{
            
            const { data : response } = await userService.register(this.state.data);
            //auth.loginWithJwt(response.headers['x-auth-token']);
            window.location = '/';
        }catch(ex){
            if(ex.response && ex.response.status === 400){
                const errors = {...this.state.errors};
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
                            <h5 className="card-title text-center">Sign Up</h5>
                            <form onSubmit={this.handleSubmit}>
                                {this.renderInput('username' , 'Username')}
                                {this.renderInput('name' , 'Name')}
                                {this.renderInput('password' , 'Password' , 'password')}
                                { this.renderButton('Register') }
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