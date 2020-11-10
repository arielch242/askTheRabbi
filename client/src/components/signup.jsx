import React from 'react';
import Joi from 'joi-browser';
import {toast} from 'react-toastify';

import {apiUrl} from '../config.json';
import http from '../services/httpService'

import PageHeader from './common/pageHeader';
import Form from './common/form';

class Signup extends Form {
    state = {
        data: {
          name: "",
          email: "",
          password: "",
        },
        errors:{}
      };

      schema = {
          email: Joi.string().required().email().label('email'),
          password:Joi.string().required().min(6).label('password'),
          name:Joi.string().required().min(2).label('name'),
      };

      async doSubmit(){
          const {history} = this.props;
          const data = {...this.state.data,biz:false};
          try{
          await http.post(`${apiUrl}/users`,data);
          console.log('api UrL ****', apiUrl,'   data ****',data);
          toast('נפתח חשבון חדש');
          history.replace("/signin");
          } catch (error){
              if( error.response && error.response.status === 400){
                this.setState({
                    errors:{
                        ...this.state.errors,
                        email:"Email is already registered",
                },
               });
              }
          }

      }

    render() { 
        return ( 
            <div className="container min-vh-100 bg-img text-white text-right">
            <PageHeader titleText="הרשמה"/>
                <div className="row">
                    <div className="col-lg-6 mx-auto text-right">7654
                        <form onSubmit={this.handleSubmit}>
                            {this.renderInput('name','שם המשתמש',"name")}
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
 
export default Signup;
