import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component: Component,login, ...rest}) => {
    return <Route {...rest} component={(props) => {
        
        if(login){
            return <Component {...props} />
        }else{
            return <Redirect to={`/signin`} />
        }
    }} />
}

export default PrivateRoute;