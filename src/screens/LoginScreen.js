import React, {Component, memo, useState} from 'react';
import {TouchableOpacity, StyleSheet, Text, View, AsyncStorage, ActivityIndicator} from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import {theme} from '../core/theme';
import {emailValidator, passwordValidator} from '../core/utils';
import {actionCreator} from "../Redux/ActionCreators";
import {connect} from 'react-redux';
import {login} from "../Redux/login";
import * as ActionTypes from "../Redux/ActionTypes";

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch, _) => ({
    async doLogin(credentials, onError) {
        //console.log('555')
        try {
            const authResponse = await fetch(`http://localhost:3000/login?username=${credentials.username.value}&password=${credentials.password.value}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseJSON = await authResponse.json();
            console.log('37864873264783'+responseJSON);
            if (authResponse.ok && authResponse.status === 200) {

                AsyncStorage.setItem('token', responseJSON.token)
                    .then(() => dispatch(actionCreator(ActionTypes.LOAD_DATA)))
                    .catch(error => console.debug(error))
                    .finally(_ => dispatch(actionCreator(ActionTypes.LOGIN)));
            } else {
                throw (authResponse.status);
            }
        } catch (error) {
            onError(error)
        }
//abc@gmail.com

    }
})

class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: {value: '', error: ''},
            password: {value: '', error: ''},
            loading: false,
        }
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }

    onUsernameChange(username) {
        this.setState({username: {value: username, error: ''}});
    }

    onPasswordChange(password) {
        this.setState({password: {value: password, error: ''}});
    }

    _onLoginPressed() {
        const {username, password} = this.state;
        const usernameError = emailValidator(username.value);
        const passwordError = passwordValidator(password.value);

        if (usernameError || passwordError) {
            this.setState({username: {...username, error: usernameError}});
            this.setState({password: {...password, error: passwordError}});
            return;
        }
        if (username.value === '123@qq.com' && password.value === '123') {
            this.setState({username: {...username, error: 'Please Check again Email or password.'}});
            this.setState({password: {...password, error: 'Please Check again Email or password.'}});
            return;
        }

        //Do Login
        this.setState({loading: true}, () => {
            this.props.doLogin({username, password}, (error) => {
                alert(error);
                this.setState({loading: false})
            });
        });


        {
            this.props.navigation.navigate('Dash')
        }
    };

    render() {
        const {navigation} = this.props,
            from = navigation.getParam('from') || 1,
            {loading} = this.state;


        return (
            //<LoginScreen1 navigation={this.props.navigation}/>
            <Background>
                <BackButton goBack={() => navigation.navigate('HomeScreen')}/>
                <Logo/>
                <Header>Welcome back.</Header>
                <TextInput
                    label="Email"
                    returnKeyType="next"
                    value={this.state.username.value}
                    onChangeText={this.onUsernameChange}
                    error={!!this.state.username.error}
                    errorText={this.state.username.error}
                    autoCapitalize="none"
                    autoCompleteType="email"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                />
                <TextInput
                    label="Password"
                    returnKeyType="done"
                    value={this.state.password.value}
                    onChangeText={this.onPasswordChange}
                    error={!!this.state.password.error}
                    errorText={this.state.password.error}
                    secureTextEntry
                />
                <View style={styles.forgotPassword}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ForgotPasswordScreen')}
                    >
                        <Text style={styles.label}>Forgot your password?</Text>
                    </TouchableOpacity>
                </View>
                {/* Start here*/}
                {loading ?  <ActivityIndicator size="small"/> :<Button mode="contained" onPress={() => this._onLoginPressed()}>Login</Button>}
                <View style={styles.row}>
                    <Text style={styles.label}>Don’t have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
                        <Text style={styles.link}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </Background>
        )
    }
}


const styles = StyleSheet.create({
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    label: {
        color: theme.colors.secondary,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
//export default memo(LoginScreen);
