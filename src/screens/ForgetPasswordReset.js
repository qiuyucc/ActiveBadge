import React, {Component, memo, useState} from 'react';
import {Text, StyleSheet, TouchableOpacity, View, Alert} from 'react-native';
import {passwordValidator} from '../core/utils';
import Background from '../components/Background';
import BackButton from '../components/BackButton';
import Logo from '../components/Logo';
import Header from '../components/Header';
import TextInput from '../components/InputText';
import {theme} from '../core/theme';
import Button from '../components/Button';
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux";
import {forgetResetPwd, forgetDeleteCode} from "../actions/userPwd.action";
import {Field, reduxForm} from "redux-form";
import {compose} from "redux";
import Loader from "../components/loader";
import InputText from "../components/InputText";
import {ErrorUtils} from "../core/auth.utils";


const validate = (values) => {
    const errors = {};
    errors.password = passwordValidator(values.password);
    return errors;
};
const mapStateToProps = (state) => ({
    forgetResetPwd: state.userPwdReducer.forgetResetPwd,
    forgetDeleteCode: state.userPwdReducer.forgetDeleteCode
})
const mapDispatchToProps = (dispatch) => ({
    dispatch
});

class ForgetPasswordReset extends Component {
    constructor(props) {
        super(props);
        console.log('345' + JSON.stringify({email:this.props.email}));

        this.forgetDeleteCode({email:this.props.email});
    }
    forgetDeleteCode = async (values) => {
        try {
            const response = await this.props.dispatch(forgetDeleteCode(values));
            console.log('Delete code: ' + response.responseBody.response);
            if (!response.success) {
                throw response;
            }
            //response.responseBody.ack==='success'
            console.log('delete' + response.responseBody.response);
        } catch (error) {
            let errorText;
            if (error.message) {
                errorText = error.message
            }
            errorText = error.responseBody;
            Alert.alert(
                'delete wrong.',
                errorText,
                [
                    {
                        text: 'OK',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                ]
            );
        }
    }
    forgetResetPwd = async (values) => {
        try {
            const response = await this.props.dispatch(forgetResetPwd(values));
            console.log('Reset pwd!: ' + response.responseBody.response);
            if (!response.success) {
                throw response;
            }
            //response.responseBody.ack==='success'
            console.log('hello' + response.responseBody.response);
            this.loginView();

        } catch (error) {
            let errorText;
            if (error.message) {
                errorText = error.message
            }
            errorText = error.responseBody;
            Alert.alert(
                'Please Enter your new password.',
                errorText,
                [
                    {
                        text: 'OK',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                ]
            );
        }
    }

    onSubmit = (values) => {
        values.email = this.props.email;
        this.forgetResetPwd(values);
    }

    loginView() {
        Actions.login();
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

    render() {
        const {handleSubmit, forgetVerify} = this.props;
        console.log(this.props.email + '999');
        return (
            <Background>
                {/*<BackButton goBack={() => navigation.navigate('login')}/>*/}
                {/*{(forgetVerify && forgetVerify.isLoading) && <Loader/>}*/}
                <Logo/>
                <Header>Password Reset Page</Header>
                <Field
                    name="password"
                    placeholder="password"
                    component={this.renderTextInput}/>
                <Button mode="contained" onPress={handleSubmit(this.onSubmit)} style={styles.button}>
                    Reset your password.
                </Button>
                <TouchableOpacity
                    style={styles.back}
                    onPress={this.loginView}
                >
                    <Text style={styles.label}>← Back to login</Text>
                </TouchableOpacity>
            </Background>
        );
    }
};

const styles = StyleSheet.create({
    back: {
        width: '100%',
        marginTop: 12,
    },
    button: {
        marginTop: 12,
    },
    label: {
        color: theme.colors.secondary,
        width: '100%',
    },
    errorText: {
        fontSize: 14,
        color: theme.colors.error,
        paddingHorizontal: 4,
        paddingTop: 4,
    }
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form: "password",
        validate
    })
)(ForgetPasswordReset);
