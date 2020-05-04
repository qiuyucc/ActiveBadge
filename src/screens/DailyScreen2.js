import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View, FlatList, Image, ScrollView} from "react-native";
import {FontAwesome5} from "@expo/vector-icons";
import Button from "../components/Button";
import React, {Component} from "react";
import Header from "../components/Header";
import {baseUrl} from "../Redux/imageUrl";
import {ListItem} from "react-native-elements";
import Loader from "../components/loader";
import {connect} from "react-redux";
import { fetchActivityRecord,fetchVegieRecord} from "../actions/ActionCreators";


const mapStateToProps = state => {
    return {
        users: state.userReducer.getUser,
        activityRecord: state.activityReducer.getActivityRecord,
        vegieRecord: state.vegieReducer.getVegieRecord
    }
}

const mapDispatchToProps = (dispatch) =>({
    dispatch
});


class DailyScreen2 extends Component {


    render() {
        const {users: {userDetails}} = this.props;
        const email = userDetails?userDetails.email:"";
        const now = new Date();
        const date = now.getDate() + "-" + (now.getMonth() + 1) + "-" + now.getFullYear();

        const renderActivityItem = ({item, index}) => {
            return (
                <ListItem
                    key={index}
                    title={item.description}
                    subtitle={item.mins + " mins"}
                    hideChevron={true}
                    leftAvatar={{source: {uri: baseUrl + item.name}}}
                ></ListItem>
            );
        }

        const renderVegieItem = ({item, index}) => {
            return (
                <ListItem
                    key={index}
                    title={item.description}
                    subtitle={item.count + " Box / Each"}
                    hideChevron={true}
                    leftAvatar={{source: {uri: baseUrl + item.name}}}
                ></ListItem>
            );
        }

        if (this.props.activityRecord.isLoading && this.props.vegieRecord.isLoading) {
            return (
                <Loader/>
            );
        } else if (this.props.activityRecord.errors && this.props.vegieRecord.errors) {
            return (
                <View>
                    <Text>{props.activityRecord.errors}</Text>
                    <Text>{props.vegieRecord.errors}</Text>
                </View>
            );
        } else {
            return (

                <View style={styles.container}>
                    <SafeAreaView style={{flex: 1}}>
                        <TouchableOpacity
                            style={{alignItems: "flex-start", margin: 16}}
                            onPress={this.props.navigation.openDrawer}>
                            <FontAwesome5 name="bars" size={24} color="#161924"/>
                        </TouchableOpacity>
                            <Text style={{margin:5,textAlign: 'right',fontSize:15,backgroundColor: '#dbb8ff'}}>Activity</Text>
                        <ScrollView>
                            <View styles={{flex: 1,padding:20}}>
                                <FlatList data={this.props.activityRecord.activityRecordDetails.filter(record=>record.date===date && record.email===email)}
                                          renderItem={renderActivityItem}
                                          keyExtractor={(record,index)=>index.toString()}/>
                            </View>
                        </ScrollView>

                        <Text style={{margin:5,textAlign: 'right',fontSize:15,backgroundColor: '#dbb8ff'}}>Fruit / Vegie</Text>
                        <ScrollView>
                            <View styles={{flex: 1,padding:20}}>
                                <FlatList data={this.props.vegieRecord.vegieRecordDetails.filter(record=>record.date===date && record.email===email)}
                                          renderItem={renderVegieItem}
                                          keyExtractor={(record,index)=>index.toString()}/>
                            </View>
                        </ScrollView>



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

        export default connect(mapStateToProps,mapDispatchToProps)(DailyScreen2);