import React, { memo ,  useState, useEffect} from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import {TouchableOpacity, Text, View, Dimensions, StyleSheet, Image} from 'react-native';
import BarScreen from "./BarScreen";


// function Graphs() {
    class Graphs extends React.Component {
    constructor(props){
        super(props)
    }
        render() {

        return (
            <Background>
                <Header>
                    Graphs
                </Header>
                <View style={styles.avatarBox}>

                    <TouchableOpacity onPress={() => {this.props.navigation.navigate("LineScreen")}} >
                        <Image style={styles.image} source={require('../assets/Activity1.png')} />
                    </TouchableOpacity>

                </View>
                <View style={styles.avatarBox}>

                    <TouchableOpacity onPress={() => {this.props.navigation.navigate("BarScreen")}} >
                        <Image style={styles.image} source={require('../assets/Activity1.png')} />
                    </TouchableOpacity>

                </View>
                <View style={styles.avatarBox}>

                    <TouchableOpacity onPress={() => {this.props.navigation.navigate("PieScreen")}} >
                        <Image style={styles.image} source={require('../assets/Activity1.png')} />
                    </TouchableOpacity>

                </View>
             </Background>
        );
    }
}



const styles = StyleSheet.create({
    avatarBox:{
        marginBottom: 10,
        justifyContent: 'space-between',
        paddingVertical: 3,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 20,
    },

});




export default memo(Graphs);
