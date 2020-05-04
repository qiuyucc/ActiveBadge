import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar ,
    TouchableOpacity
} from 'react-native';
import {connect} from "react-redux";

import Routes from './Routers';

class Main extends Component<> {

    render() {
        const {authData:{isLoggedIn}} = this.props;
        return(
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#1c313a"
                    barStyle="light-content"
                />
                <Routes isLoggedIn={isLoggedIn} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex: 1
    }
});

const mapStateToProps = state => ({
    authData: state.authReducer.authData
})

export default connect(mapStateToProps, null)(Main)