import React, {Component, memo, useState} from 'react';
import {TouchableOpacity, StyleSheet, View, ScrollView, Image, Alert, Text, TouchableHighlight} from 'react-native';
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import {baseUrl} from "../Redux/imageUrl";
import Loader from "../components/loader";
import BackButton from "../components/BackButton";
import {connect} from "react-redux";
import {ErrorUtils} from "../core/auth.utils";
import {changeAvatar} from "../actions/auth.actions";

const mapStateToProps = state => {
    return {
        avatars: state.avatarReducer.getAvatar,
        users: state.userReducer.getUser
    }
}
const mapDispatchToProps = dispatch=>({
  dispatch
})

class AvatarScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            imagePath: " ",

        }
    }

    changeAvatar= async(values) =>{
        try{
            const response = await this.props.dispatch(changeAvatar(values));
            if(!response.success){
                throw response;
            }
        }catch(error){
            const newError = new ErrorUtils(error, "upload avatar error");
            newError.showAlert();
        }
        }


    onSubmit(values) {
        this.setState({imagePath:values});
       this.changeAvatar(values);
    }

    render() {

        if (this.props.avatars.isLoading) {

            return (
                <Loader/>
            );
        } else if (this.props.avatars.errors) {
            return (
                <View>
                    <Text>{props.avatars.errors}</Text>
                </View>
            );
        } else {
            return (
                <Background>
                    <BackButton goBack={() => this.props.navigation.navigate('Home')}/>
                    <Header>Select Your Avatar</Header>
                    <View style={styles.body}>
                        <ScrollView style={styles.scroll}
                                    keyboardShouldPersistTaps="always">
                            <View style={styles.avatarBox}>
                                {this.props.avatars.avatarDetails.filter(avatar => avatar.id > 0).map((item) => {
                                    return (
                                        <TouchableOpacity key={item.id}
                                                          onPress={()=>{this.onSubmit(item.name);this.props.navigation.navigate('Home');}}>
                                            <Image source={{uri: baseUrl + item.name}} style={styles.image}/>
                                        </TouchableOpacity>
                                    );
                                })
                                }
                            </View>
                        </ScrollView>
                    </View>
                </Background>
            );
        }
    }
}


const styles = StyleSheet.create({
    body: {
        justifyContent: 'center',
        flexDirection: 'row',
        paddingVertical: 1,
        width: 380,

    },
    scroll: {
        paddingVertical: 10,
        height: 480,
        borderWidth: 2,
        borderColor: "#61da88",

    },
    avatarBox: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },

    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        margin: 5,
        borderWidth: 2,
        borderColor: "#FFF"
    }


});

export default connect(mapStateToProps,mapDispatchToProps)(AvatarScreen);



