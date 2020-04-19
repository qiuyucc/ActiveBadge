import React, {Component}from 'react';
import {TouchableOpacity, StyleSheet, Text, View, AsyncStorage} from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Loader from '../components/loader';
import InputText from '../components/InputText';
import {theme} from '../core/theme';
import {emailValidator, passwordValidator} from '../core/utils';
import { Field, reduxForm } from 'redux-form';
import {Actions} from 'react-native-router-flux';
import {connect} from "react-redux";
import {compose} from "redux";
import {loginUser} from "../actions/auth.actions";



class LoginScreen extends Component{


    loginUser = async (values) => {
        try {
            const response =  await this.props.dispatch(loginUser(values));
            console.log(response);
            if (!response.success) {
                throw response;
            }
        } catch (error) {
            let errorText;
            if (error.message) {
                errorText = error.message
            }
            errorText = error.responseBody;
            Alert.alert(
                'Login Error!',
                errorText,
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                ]
            );
        }
    }

    onSubmit = (values) => {
        this.loginUser(values);
    }

    renderTextInput = (field) => {
        const {meta: {touched, error}, label, secureTextEntry, maxLength, keyboardType, placeholder, input: {onChange, ...restInput}} = field;
        return (
            <View>
                <InputText
                    onChangeText={onChange}
                    maxLength={maxLength}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    label={label}
                    {...restInput} />
                {(touched && error) && <Text style={styles.errorText}>{error}</Text>}
            </View>
        );
    }
    render(){
        const { handleSubmit, loginUser} = this.props;
        console.log(loginUser);
        return(
            <Background>

                <Logo/>

                <Header>Welcome back.</Header>
                {(loginUser && loginUser.isLoading) && <Loader />}

                <Field
                    name="email"
                    placeholder="Email"
                    component={this.renderTextInput} />
                <Field
                    name="password"
                    placeholder="Password"
                    secureTextEntry={true}
                    component={this.renderTextInput} />

                <View style={styles.forgotPassword}>
                    <TouchableOpacity
                        onPress={this.forgetPasswordView}
                    >
                        <Text style={styles.label}>Forgot your password?</Text>
                    </TouchableOpacity>
                </View>

                <Button mode="contained" onPress={handleSubmit(this.onSubmit)}>
                    Login
                </Button>

                <View style={styles.row}>
                    <Text style={styles.label}>Don’t have an account? </Text>
                    <TouchableOpacity onPress={this.registerView}>
                        <Text style={styles.link}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </Background>
        );
    }

    registerView(){
        Actions.register();
    }

    forgetPasswordView() {
        Actions.forgetPassword();
    }
}

const validate = (values) => {
    const errors = {};
    errors.email =emailValidator(values.email);
    errors.password =passwordValidator(values.password);

    return errors;
};
const mapStateToProps = (state) => ({
    loginUser: state.authReducer.loginUser
})

const mapDispatchToProps = (dispatch) => ({
    dispatch
});

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
    },errorText: {
        fontSize: 14,
        color: theme.colors.error,
        paddingHorizontal: 4,
        paddingTop: 4,
    }
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form: "login",
        validate
    })
)(LoginScreen);