import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import InputText from '../components/InputText';
import {theme} from '../core/theme';
import {Actions} from 'react-native-router-flux';
import {reduxForm,Field} from 'redux-form';
import {connect} from "react-redux";
import {compose} from "redux";
import Loader from '../components/loader';
import {ErrorUtils} from "../core/auth.utils";
import {createNewUser} from "../actions/auth.actions";
import {emailValidator, passwordValidator,nameValidator} from '../core/utils';


class RegisterScreen extends Component {


    createNewUser = async (values) => {
        try {
            const response =  await this.props.dispatch(createNewUser(values));
            if (!response.success) {
                throw response;
            }
        } catch (error) {
            const newError = new ErrorUtils(error, "register error");
            newError.showAlert();
        }
    }

onSubmit =(values) =>{
    this.createNewUser(values);
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

render()
{
    const { handleSubmit, createNewUser} = this.props;
    return (

        <Background>
            {(createNewUser&&createNewUser.isLoading) && <Loader />}
            <Logo/>
            <Header>Create Account</Header>
            <Field name="username"
                   placeholder="username"
                   component={this.renderTextInput} />
           <Field name="email"
                  placeholder="Email"
                  component={this.renderTextInput}/>
            <Field name="password"
                   placeholder="Password"
                   secureTextEntry={true}
                   component={this.renderTextInput}/>

            <Button mode="contained" onPress={handleSubmit(this.onSubmit)} style={styles.button}>
                Sign Up
            </Button>

            <View style={styles.row}>
                <Text style={styles.label}>Already have an account? </Text>
                <TouchableOpacity onPress={this.loginView}>
                    <Text style={styles.link}>Login</Text>
                </TouchableOpacity>
            </View>
        </Background>
    );
}

    loginView(){
        Actions.login();
    }
}

const validate = (values) => {
    const errors = {};
    errors.email =emailValidator(values.email);
    errors.username = nameValidator(values.username);
    errors.password =passwordValidator(values.password);

    return errors;
};

const mapStateToProps = (state) => ({
    createUser: state.authReducer.createUser
})

const mapDispatchToProps = (dispatch) => ({
    dispatch
});

const styles = StyleSheet.create({
    label: {
        color: theme.colors.secondary,
    },
    button: {
        marginTop: 24,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
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
        form: "register",
        validate
    })
)(RegisterScreen);