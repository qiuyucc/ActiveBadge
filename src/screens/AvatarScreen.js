import React, {memo, useState} from 'react';
import {TouchableOpacity, StyleSheet, View, ScrollView, Image , Alert} from 'react-native';
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';


const AvatarScreen = ({ navigation }) => {

    const state = {
        imageValue: "",
    }

    return (
        <Background>
            <Header>Select Your Avatar</Header>
            <View style={styles.body} >
                <ScrollView style={styles.scroll}>
                    <View style={styles.avatarBox}>
                        <TouchableOpacity onPress={() => state.imageValue = '1'} >
                            <Image style={styles.image} source={require('../assets/Avatar1.jpg')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => state.imageValue = '7'} >
                            <Image style={styles.image} source={require('../assets/Avatar7.jpg')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => state.imageValue = '5'} >
                            <Image style={styles.image} source={require('../assets/Avatar5.jpg')} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.avatarBox}>
                        <TouchableOpacity onPress={() => state.imageValue = '2'} >
                            <Image style={styles.image} source={require('../assets/Avatar2.jpg')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => state.imageValue = '8'} >
                            <Image style={styles.image} source={require('../assets/Avatar8.jpg')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => state.imageValue = '6'}>
                            <Image style={styles.image} source={require('../assets/Avatar6.jpg')} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.avatarBox}>
                        <TouchableOpacity onPress={() => state.imageValue = '3'}  >
                            <Image style={styles.image} source={require('../assets/Avatar3.jpg')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => state.imageValue = '9'} >
                            <Image style={styles.image} source={require('../assets/Avatar9.jpg')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => state.imageValue = '10'} >
                            <Image style={styles.image} source={require('../assets/Avatar10.jpg')} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.avatarBox}>
                        <TouchableOpacity onPress={() => state.imageValue = '4'} >
                            <Image style={styles.image} source={require('../assets/Avatar4.jpg')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => state.imageValue = '11'} >
                            <Image style={styles.image} source={require('../assets/Avatar11.jpg')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => state.imageValue = '12'} >
                            <Image style={styles.image} source={require('../assets/Avatar12.jpg')} />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
            <Button mode="contained" onPress={() => navigation.navigate('Dashboard' , {
                imageValue: state.imageValue })}>
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
    },

});

export default memo(AvatarScreen);



