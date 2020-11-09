import React from 'react';
import Joi from 'joi-browser';
//import {toast} from 'react-toastify';

//import {apiUrl} from '../config.json';
//import http from '../services/httpService'
import userService from '../services/userService'

import PageHeader from './common/pageHeader';
import Form from './common/form';

class Signin extends Form {
    state = {
        data: {
          email: "",
          password: "",
        },
        errors:{}
      };

      schema = {
          email: Joi.string().required().email().label('email'),
          password:Joi.string().required().min(6).label('password'),
      };

      async doSubmit(){
         const {email,password} = this.state.data;
         try{
            await userService.login(email,password)
            window.location ="/";  /* refresh page to get token*/
         }
         catch(error){
            if(error.response && error.response.status === 400){
                this.setState({ errors:{ email: error.response.data } } )
            }
         }
      }

    render() { 
        return ( 
            <div className="container min-vh-100 bg-img text-white text-right">
              <PageHeader titleText="התחברות"/>
              <div className="row">
                    <div className="col-lg-6 mx-auto text-right">
                        <p>הזן פרטי משתמש</p>
                    </div>
              </div>
              <div className="row">
                <div className="col-lg-6 mx-auto text-right">
                  <form onSubmit={this.handleSubmit} autoComplete="off" noValidate>
                            {this.renderInput('email','דוא"ל',"email")}
                            {this.renderInput('password','סיסמה',"password")}
                            {this.renderButton('שלח')}
                        </form>
                </div>
              </div>
            </div>
            
         );
    }
}
 
export default Signin;
