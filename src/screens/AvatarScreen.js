import React, {memo, useState} from 'react';
import { TouchableOpacity, StyleSheet, View, ScrollView } from 'react-native';
import Background from '../components/Background';
import AvatarImages from "../components/AvatarImages";
import Header from '../components/Header';
import Button from '../components/Button';




const AvatarScreen = ({ navigation }) => (

    <Background>
        <Header>Select Your Avatar</Header>
        <View style={styles.body} >
            <ScrollView style={styles.scroll}>
                <View style={styles.avatarBox}>
                    <AvatarImages  imageSource={require('../assets/Avatar1.jpg')} />
                    <AvatarImages imageSource={require('../assets/Avatar7.jpg')} />
                    <AvatarImages imageSource={require('../assets/Avatar5.jpg')} />
                </View>
                <View style={styles.avatarBox}>
                    <AvatarImages imageSource={require('../assets/Avatar2.jpg')} />
                    <AvatarImages imageSource={require('../assets/Avatar8.jpg')} />
                    <AvatarImages imageSource={require('../assets/Avatar6.jpg')} />
                </View>
                <View style={styles.avatarBox}>
                    <AvatarImages imageSource={require('../assets/Avatar3.jpg')} />
                    <AvatarImages imageSource={require('../assets/Avatar9.jpg')} />
                    <AvatarImages imageSource={require('../assets/Avatar10.jpg')} />
                </View>

                <View style={styles.avatarBox}>
                    <AvatarImages imageSource={require('../assets/Avatar4.jpg')} />
                    <AvatarImages imageSource={require('../assets/Avatar11.jpg')} />
                    <AvatarImages imageSource={require('../assets/Avatar12.jpg')} />
                </View>
            </ScrollView>
        </View>

        <Button mode="contained" onPress={() => navigation.navigate('Dashboard')}>
            Save
        </Button>
    </Background>
);

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

});

export default memo(AvatarScreen);
