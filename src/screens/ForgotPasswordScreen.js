import React, {Component} from 'react';
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
import {forgetUser} from "../actions/userPwd.action";
import {Field, reduxForm} from "redux-form";
import {compose} from "redux";
import Loader from "../components/loader";
import InputText from "../components/InputText";
import {ErrorUtils} from "../core/auth.utils";


const validate = (values) => {
    const errors = {};
    errors.email = emailValidator(values.email);
    return errors;
};
const mapStateToProps = (state) => ({
    forgetUser: state.userPwdReducer.forgetUser
})
const mapDispatchToProps = (dispatch) => ({
    dispatch
});

class ForgotPasswordScreen extends Component {
    constructor(props) {
        super(props);
    }

    forgetUser = async (values) => {
        try {
            const response = await this.props.dispatch(forgetUser(values));

            console.log('???????'+JSON.stringify(response.responseBody.response));

            if (!response.success) {
                throw response;
            }
            if(response.responseBody.ack==='success'){
                this.verifyView();
            }

        } catch (error) {
            let errorText;
            if (error.message) {
                errorText = error.message;
            }
            console.log('997'+JSON.stringify(error.responseBody));
            errorText = error.responseBody.response.reason;
            Alert.alert(
                'Something wrong.',
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
        console.log(JSON.stringify(values)+'999');
        this.forgetUser(values);
    }

    loginView() {
        Actions.login();
    }
    verifyView() {
        console.log('567'+JSON.stringify(this.props.forgetUser.response.response.email));
        Actions.ForgetPasswordVerify({email:this.props.forgetUser.response.response.email});
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
        const {handleSubmit, forgetUser} = this.props;

        return (
            <Background>
                <BackButton goBack={() => this.loginView}/>
                {(forgetUser&&forgetUser.isLoading) && <Loader />}
                <Logo/>
                <Header>Restore Password</Header>
                <Field
                    name="email"
                    placeholder="Email"
                    component={this.renderTextInput}/>
                <Button mode="contained" onPress={handleSubmit(this.onSubmit)} style={styles.button}>
                    Send Reset Instructions
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
        form: "forget",
        validate
    })
)(ForgotPasswordScreen);
