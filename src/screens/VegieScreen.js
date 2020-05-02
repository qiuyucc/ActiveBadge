import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet, View, ScrollView, Image, Text} from 'react-native';
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import Loader from "../components/loader";
import BackButton from "../components/BackButton";
import {baseUrl} from "../Redux/imageUrl";
import {connect} from "react-redux";
const mapStateToProps = state =>{
    return{
        users:state.userReducer.getUser,
        vegies: state.vegieReducer.getVegie,
    }
}

const mapDispatchToProps = dispatch=>({
    dispatch
})

class VegieScreen extends Component{

    render(){
        if(this.props.vegies.isLoading){
            return(
                <Loader/>
            );
        }else if(this.props.vegies.errors){
            return(
                <View>
                    <Text>{props.vegies.errors}</Text>
                </View>
            );
        }else{
            return (
                <Background>
                    <BackButton goBack={() => this.props.navigation.navigate('Home')}/>
                    <Header>Select Your Vegie</Header>
                    <Text style={{fontSize:16, fontWeight:'bold', margin:5}}>What fruit / veg did you eat today?</Text>
                    <View style={styles.body}>
                        <ScrollView style={styles.scroll}
                                    keyboardShouldPersistTaps="always">
                            <View style={styles.avatarBox}>
                                {this.props.vegies.vegieDetails.map((item) => {
                                    return (
                                        <TouchableOpacity key={item.id}>
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

export default connect(mapStateToProps,mapDispatchToProps)(VegieScreen);



