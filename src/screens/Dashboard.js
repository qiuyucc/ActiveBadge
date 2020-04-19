import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
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
    },errorText: {
        fontSize: 14,
        color: theme.colors.error,
        paddingHorizontal: 4,
        paddingTop: 4,
    }
});
class Dashboard extends Component<> {

    logoutUser = () => {
        this.props.dispatch(logoutUser());
    }

    render() {
        const {getUser: {userDetails}} = this.props;

        return(
            <Background>
                <Text style={styles.textStyle}>This is a profile page for {userDetails ? userDetails.name : ""}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);