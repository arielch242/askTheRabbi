import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import userService from '../../services/userService';


const ProtectedRoute = ({path, component:Component, render, ...rest})=>{
    const currentUser = userService.getCurrentUser();
    return (
       <Route 
         {...rest} 
         // props are automatically come by React Routing(match,location,history)
          render = {(props) => {  
            if(!currentUser){
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

export default ProtectedRoute;