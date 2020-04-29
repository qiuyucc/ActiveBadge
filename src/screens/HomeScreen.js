import Background from "../components/Background";
import {SafeAreaView, StyleSheet, Text, TouchableOpacity,View} from "react-native";
import {FontAwesome5} from "@expo/vector-icons";
import Button from "../components/Button";
import React,{Component} from "react";


class HomeScreen extends Component{
    render(){
        return(
        <View style={styles.container}>
            <SafeAreaView style={{flex:1}}>
                <TouchableOpacity
                    style={{alignItems:"flex-start", margin:16}}
                    onPress={this.props.navigation.openDrawer}>
                    <FontAwesome5 name="bars" size={24} color="#161924"/>
                </TouchableOpacity>

            </SafeAreaView>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
});

export default  HomeScreen;