import React, {Component, memo, useState} from 'react';
import {Text, StyleSheet, TouchableOpacity, View, Alert} from 'react-native';
import {emailValidator} from '../core/utils';
import Background from '../components/Background';
import BackButton from '../components/BackButton';
import Logo from '../components/Logo';
import Header from '../components/Header';
import TextInput from '../components/InputText';
import {theme} from '../core/theme';
import Button from '../components/Button';
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux";
import {forgetVerify, forgetCreateCode} from "../actions/userPwd.action";
import {Field, reduxForm} from "redux-form";
import {compose} from "redux";
import Loader from "../components/loader";
import InputText from "../components/InputText";
import {ErrorUtils} from "../core/auth.utils";


const validate = (values) => {
    const errors = {};
    errors.code = emailValidator(values.code);
    return errors;
};
const mapStateToProps = (state) => ({
    forgetCreateCode: state.userPwdReducer.forgetCreateCode,
    forgetVerify: state.userPwdReducer.forgetVerify
})
const mapDispatchToProps = (dispatch) => ({
    dispatch
});

class ForgetPasswordVerify extends Component {
    constructor(props) {
        super(props);
        console.log('345' + JSON.stringify(this.props.email));
        this.forgetCreateCode(this.props.email);
    }
    componentDidMount(){
        this.forgetVerify();
    }

    forgetCreateCode = async (values) => {
        try {
            const response = await this.props.dispatch(forgetCreateCode(values));
            console.log('generate code' + response);
            if (!response.success) {
                throw response;
            }
        } catch (error) {
            let errorText;
            if (error.message) {
                errorText = error.message
            }
            errorText = error.responseBody.response.reason;
            Alert.alert(
                'code Error!',
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

    forgetVerify = async (values) => {
        try {
            const response = await this.props.dispatch(forgetVerify(values));
            console.log('Verify1' + response.responseBody.response.code.verified);
            if (!response.success) {
                throw response;
            }
            //response.responseBody.ack==='success'
            console.log('hello'+response.responseBody.response.code.verified);
            if(response.responseBody.response.code.verified===false &&
                response.responseBody.response.code.email===this.props.email.email){
                //set verified ==true and jump to rest Password view
                console.log('hello');
                this.ForgetPasswordResetView();
            }

        } catch (error) {
            let errorText;
            if (error.message) {
                errorText = error.message
            }
            errorText = error.responseBody;
            Alert.alert(
                'Please check your email.',
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
        //console.log(JSON.stringify(values)+'888');
        values.password=this.props.email.email;
        console.log(JSON.stringify(values)+'888');
        this.forgetVerify(values);
    }

    ForgetPasswordResetView() {
        Actions.ForgetPasswordReset({email:this.props.email.email});
        //{email:this.props.email}
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

        return (
            <Background>
                {/*<BackButton goBack={() => navigation.navigate('login')}/>*/}
                {(forgetVerify && forgetVerify.isLoading) && <Loader/>}
                <Logo/>
                <Header>Verify Page</Header>
                <Field
                    name="code"
                    placeholder="code"
                    component={this.renderTextInput}/>
                <Button mode="contained" onPress={handleSubmit(this.onSubmit)} style={styles.button}>
                    Check the code
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
        form: "code",
        //validate
    })
)(ForgetPasswordVerify);
