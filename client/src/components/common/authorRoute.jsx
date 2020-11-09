import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import authorService from '../../services/authorService';

const AuthorRoute = ({path, component:Component, render, ...rest})=>{

    const currentAuthor = authorService.getCurrentAuthor();
    return (
       <Route 
         {...rest} 
         // props come automatically by React Routing(match,location,history)
          render = {(props) => {
            if(!currentAuthor){
               return (
                     <Redirect to={{
                     pathname:"/signin" ,state : { from : props.location}} }
                    />  
                );
            } 
            // if Route was send using Component method, it will continue to the requested Component , otherwise it will continue by render method (different Route Render Methods)
            return Component ? <Component {...props}/> : render(props)
          }
        }
       />
  )
}

export default AuthorRoute;

