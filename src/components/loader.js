import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator
} from 'react-native';

export default class Loader extends Component<> {


    render() {
        return(
            <View style={styles.container}>
                <ActivityIndicator color="#0000ff" size="large" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "transparent",
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 99,
        justifyContent: "center"

    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
});
