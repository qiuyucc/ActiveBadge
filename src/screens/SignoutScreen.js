import React, { Component } from 'react';
import {
    StyleSheet,
    Text
} from 'react-native';
import {connect} from "react-redux";
import Background from '../components/Background';
import Button from '../components/Button';

import {logoutUser} from "../actions/auth.actions";
import {theme} from "../core/theme";

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
    },
    textStyle: {
        fontSize: 16,
        color: theme.colors.secondary,
        paddingHorizontal: 4,
        paddingTop: 4,
    }
});
class SignoutScreen extends Component<> {

    logoutUser = () => {
        this.props.dispatch(logoutUser());
    }

    render() {
        const {getUser: {userDetails}} = this.props;

        return(
            <Background>
                <Text style={styles.textStyle}>Do you really need logout ? {userDetails ? userDetails.username : ""}</Text>
                <Text style={styles.textStyle}> {userDetails ? userDetails.image : ""}</Text>
                <Button  mode="contained" style={styles.button} onPress={this.logoutUser}>
                    Logout
                </Button>
            </Background>
        )
    }
}

const mapStateToProps = (state) => ({
    getUser: state.userReducer.getUser
});

const mapDispatchToProps = (dispatch) => ({
    dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(SignoutScreen);