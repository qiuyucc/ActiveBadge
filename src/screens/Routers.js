import React, {Component} from 'react';

import {Router, Stack, Scene} from 'react-native-router-flux';
import Login from './LoginScreen';
import Register from './RegisterScreen';
import ForgetPassword from './ForgotPasswordScreen';
import Dashboard from "./Dashboard";
import Home from "./HomeScreen";
import Avatar from "./AvatarScreen";
import Activity from "./ActivityScreen";
import Profile from "./ProfileScreen";
import SignOut from "./SignoutScreen";
import ForgetPasswordVerify from "./ForgetPasswordVerify";
import ForgetPasswordReset from "./ForgetPasswordReset";



export default  class Routers extends Component{
    render(){
        return(
            <Router>
                <Scene key="root" hideNavBar={true}>
                    <Scene key ="auth" hideNavBar={true} initial={!this.props.isLoggedIn}>
                        <Scene key="login" component={Login} title="Login" initial={true}/>
                        <Scene key="register" component={Register} title="Register"  />
                        <Scene key="forgetPassword" component={ForgetPassword} title="ForgetPassword" />
                        <Scene key="ForgetPasswordVerify" component={ForgetPasswordVerify} title="ForgetPasswordVerify" />
                        <Scene key="ForgetPasswordReset" component={ForgetPasswordReset} title="ForgetPasswordReset" />
                    </Scene>
                    <Scene key="app" hideNavBar={true} initial={this.props.isLoggedIn}>
                        <Scene Key="dashboard" component={Dashboard} title="Dashboard" initial={true}/>
                        <Scene key="home" component={Home} title="Home"/>
                        <Scene key="avatar" component={Avatar} title="Avatar"/>
                        <Scene key="Activity" component={Activity} title="Activity" />
                        <Scene key="profile" component={Profile} titile="Profile" />
                        <Scene key="SignOut" component={SignOut} title="SignOut"/>
                    </Scene>
                </Scene>

            </Router>
        );
    }
}

