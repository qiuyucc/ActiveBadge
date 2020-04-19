import React, {Component} from 'react';

import {Router, Stack, Scene} from 'react-native-router-flux';
import Login from './LoginScreen';
import Register from './RegisterScreen';
import ForgetPassword from './ForgotPasswordScreen';
import Dashboard from "./Dashboard";

export default  class Routers extends Component{
    render(){
        return(
            <Router>
                <Scene key="root" hideNavBar={true}>
                    <Scene key ="auth" hideNavBar={true} initial={!this.props.isLoggedIn}>
                        <Scene key="login" component={Login} title="Login"  initial={true}/>
                        <Scene key="register" component={Register} title="Register" />
                        <Scene key="forgetPassword" component={ForgetPassword} title="ForgetPassword" />
                    </Scene>
                    <Scene key="app" hideNavBar={true} initial={this.props.isLoggedIn}>
                        <Scene Key="dashboard" component={Dashboard} title="Dashboard"/>
                    </Scene>
                </Scene>

            </Router>
        );
    }
}