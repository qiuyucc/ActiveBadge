import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View, FlatList, Image} from "react-native";
import {FontAwesome5} from "@expo/vector-icons";
import Button from "../components/Button";
import React, {Component} from "react";
import Header from "../components/Header";
import {baseUrl} from "../Redux/imageUrl";
import {ListItem, ButtonGroup} from "react-native-elements";
import Loader from "../components/loader";
import {connect} from "react-redux";
import Leaderboard from 'react-native-leaderboard';



const mapStateToProps = state => {
    return {
        users: state.userReducer.getUser,
        activityRank: state.activityReducer.getActivityRank,
        vegieRank:state.vegieReducer.getVegieRank,
    }
}

const mapDispatchToProps = (dispatch) =>({
    dispatch
});

class HomeScreen extends Component {

    state={
        filter:0
    }

    RenderHeader(){
        const {users: {userDetails}} = this.props;
        const imagePath=userDetails ? userDetails.image : "";
        return(
            <View colors={[, '#1da2c6', '#1695b7']}
                  style={{ backgroundColor: '#119abf', padding: 10, paddingTop: 20, alignItems: 'center' }}>

                <Text style={{ fontSize: 25, color: 'white', }}>Overall Popularity (%)</Text>
                <View style={{
                    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                    marginBottom: 15, marginTop: 20
                }}>
                    <Image style={{ height: 85, width: 85, borderRadius: 40,  borderWidth:3, borderColor:"#FFF" }}
                         source={{uri: baseUrl +imagePath }}/>
                </View>
                <ButtonGroup
                    onPress={(x) => { this.setState({ filter: x }) }}
                    selectedIndex={this.state.filter}
                    buttons={['Activity', 'Vegie']}
                    containerStyle={{ height: 30 }} />
            </View>
        );
    }
    render() {


        if (this.props.activityRank.isLoading && this.props.vegieRank.isLoading) {
            return (
                <Loader/>
            );
        } else if (this.props.activityRank.errors && this.props.vegieRank.errors) {
            return (
                <View>
                    <Text>{props.activityRank.errors}</Text>
                    <Text>{props.vegieRank.errors}</Text>
                </View>
            );
        } else {
            const props ={
                labelBy: 'description',
                sortBy: 'percent',
                data: this.state.filter>0?  this.props.vegieRank.vegieRank:this.props.activityRank.activityRank,
                icon:'url',
                sort: this.sort
            }


            return (
                <View style={{ flex: 1, backgroundColor: 'white', }}>
                <SafeAreaView style={{flex: 1}}>
                    <TouchableOpacity
                        style={{alignItems: "flex-start", margin: 16}}
                        onPress={this.props.navigation.openDrawer}>
                        <FontAwesome5 name="bars" size={24} color="#161924"/>
                    </TouchableOpacity>
                    {this.RenderHeader()}
                    <Leaderboard {...props} />
                </SafeAreaView>
            </View>
            );

        }
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
    },
    backgroundImage:{
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(HomeScreen);