import React, {memo, useState} from 'react';
import {TouchableOpacity, StyleSheet, View, ScrollView, Image } from 'react-native';
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';


const ActivityScreen = ({ navigation }) => {

    const state = {
        activityValue: "",
    }

    return (
        <Background>
            <Header>Select Your Avatar</Header>
            <View style={styles.body} >
                <ScrollView style={styles.scroll}>
                    <View style={styles.avatarBox}>
                        <TouchableOpacity onPress={() => state.activityValue = 'tennis'} >
                            <Image style={styles.image} source={require('../images/Activity1.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => state.activityValue = 'soccer'} >
                            <Image style={styles.image} source={require('../images/Activity2.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => state.activityValue = 'bowling'} >
                            <Image style={styles.image} source={require('../images/Activity3.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.avatarBox}>
                        <TouchableOpacity onPress={() => state.activityValue = 'football'} >
                            <Image style={styles.image} source={require('../images/Activity4.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => state.activityValue = 'baseball'} >
                            <Image style={styles.image} source={require('../images/Activity5.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => state.activityValue = 'billiards'} >
                            <Image style={styles.image} source={require('../images/Activity6.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.avatarBox}>
                        <TouchableOpacity onPress={() => state.activityValue = 'basketball'} >
                            <Image style={styles.image} source={require('../images/Activity7.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => state.activityValue = 'boxing'} >
                            <Image style={styles.image} source={require('../images/Activity8.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => state.activityValue = 'pingpong'} >
                            <Image style={styles.image} source={require('../images/Activity9.png')} />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
            <Button mode="contained" onPress={() => navigation.navigate('Dashboard' , {
                activityValue: state.activityValue })}>
                Save
            </Button>
        </Background>
    );

};



const styles = StyleSheet.create({
    body: {
        justifyContent: 'center',
        flexDirection: 'row',
        paddingVertical: 1,
        width:380,

    },
    scroll: {
        paddingVertical: 18,
        height: 500,
        borderWidth:2,
        borderColor: "#61da88",

    },
    avatarBox:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
        paddingVertical: 3,
    },

    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth:3,
        borderColor:"#FFF"
    },

});

export default memo(ActivityScreen);



