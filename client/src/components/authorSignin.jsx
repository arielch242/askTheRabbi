import React from 'react';
import Joi from 'joi-browser';
import PageHeader from './common/pageHeader';
import Form from './common/form';
import authorService from '../services/authorService';

class AuthorSignin extends Form {
    state = {
        data: {
          authorName: "",
          password: "",
        },
        errors:{}
      };

      schema = {
          authorName: Joi.string().required(),
          password:Joi.string().required().min(6).label('password'),
      };

      async doSubmit(){
         const {authorName,password} = this.state.data;
         try{
            await authorService.login(authorName,password)
            window.location ="/qna";  /* refresh page to get token*/
         }
         catch(error){
            if(error.response && error.response.status === 400){
                this.setState({ errors:{ authorName: error.response.data } } )
            }
         }
      }

    render() { 
        return ( 
            <div className="container min-vh-100 bg-img text-white text-right">
              <PageHeader titleText="התחברות"/>
              <div className="row">
                    <div className="col-lg-6 mx-auto text-right">
                        <p>הזן פרטי משיב</p>
                    </div>
              </div>
              <div className="row">
                <div className="col-lg-6 mx-auto text-right">
                  <form onSubmit={this.handleSubmit} autoComplete="off" noValidate>
                            {this.renderInput('authorName','שם משיב',"name")}
                            {this.renderInput('password','סיסמה',"password")}
                            {this.renderButton('שלח')}
                        </form>
                </div>
              </div>
            </div>
            
         );
    }
}
 
export default AuthorSignin;
