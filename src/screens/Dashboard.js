import React, { Component } from 'react';
import {
    View,
    Platform,
    Text,
    ScrollView,
    Image,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Dimensions,
    ImageBackground, Modal
} from 'react-native';
import {createAppContainer} from 'react-navigation';
import { createDrawerNavigator,DrawerItems } from 'react-navigation-drawer';
import {Feather, Ionicons} from "@expo/vector-icons";
import {connect} from "react-redux";
import {baseUrl} from "../Redux/imageUrl";
import Activity from "./ActivityScreen";
import Home from "./HomeScreen";
import Signout from "./SignoutScreen";
import Avatar from "./AvatarScreen";
import Profile from "./ProfileScreen";
import Report from "./ReportScreen";
import Vegie from "./VegieScreen";

import {fetchAvatar, fetchVegie, fetchActivity} from "../actions/ActionCreators";

class Dashboard extends Component<>{

    constructor(props){
        super(props)
    }
    componentDidMount() {
        this.props.fetchAvatar();
        this.props.fetchVegie();
        this.props.fetchActivity();
    }

    render(){
        const {getUser: {userDetails}} = this.props;

        const imagePath=userDetails ? userDetails.image : ""
        const CustomDrawerContentComponent =(props) =>(

            <SafeAreaView style={{flex:1}}>
                <ScrollView>
                    <ImageBackground source={require("../images/drawerbg.jpg")}
                                     style={{width:undefined,padding:16,paddingTop:30}}>
                        <TouchableOpacity
                            onPress={() => props.navigation.navigate('Avatar')}>
                            <Image source={{uri: baseUrl +imagePath }} style={styles.profile}/>
                        </TouchableOpacity>
                        <Text style={styles.name}>Hello {userDetails ? userDetails.username : ""}</Text>
                        <View style={{flexDirection:"row"}}>
                            <Text style={styles.points}> {userDetails?userDetails.point: ""} Points</Text>
                            <Ionicons name="md-star" size={16} color="rgba(255,255,255,0.8)"/>
                        </View>
                    </ImageBackground>
                    <View style={styles.container}>
                        <DrawerItems {...props} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
//bar-chart for report

        const appDrawer = createDrawerNavigator({
            Home:
                {screen:Home,
                    navigationOptions:{
                        title:"Home",
                        drawerIcon:({tintColor}) =><Feather name="home" size={16} color={tintColor}/>
                    }},
            Profile:
                {screen:Profile,
                    navigationOptions:{
                        title:"Profile",
                        drawerIcon:({tintColor}) =><Feather name="user" size={16} color={tintColor}/>
                    }},
            Activity:{screen:Activity,
                navigationOptions:{
                    title:"Activity",
                    drawerIcon:({tintColor}) =><Feather name="activity" size={16} color={tintColor}/>
                }},
            Vegie:{screen:Vegie,
                navigationOptions:{
                    title:"Vegie",
                    drawerIcon:({tintColor}) =><Feather name="feather" size={16} color={tintColor}/>
                }},
            Report:{screen:Report,
                navigationOptions:{
                    title:"Report",
                    drawerIcon:({tintColor}) =><Feather name="bar-chart" size={16} color={tintColor}/>
                }},
            Signout:{screen:Signout,
                navigationOptions:{
                    title:"Log Out",
                    drawerIcon:({tintColor}) =><Feather name="log-out" size={16} color={tintColor}/>
                }},
            Avatar:{screen:Avatar,
                navigationOptions:{
                    drawerLabel: () => null
                }},

        },{
            contentComponent:CustomDrawerContentComponent,
            initialRouteName: 'Home',
            drawerWidth:Dimensions.get('window').width*0.85,
            hideStatusBar:true,
            contentOptions:{
                activeBackgroundColor:"rgba(212,118,207,0.2)",
                activeTintColor:"#53115B",
                itemsContainerStyle:{
                    marginTop:16,
                    marginHorizontal:8
                },itemStyle:{
                    borderRadius:4
                }
            }
        })

        const NavigatorDrawer = createAppContainer(appDrawer);
        return(
           <NavigatorDrawer/>
        );
    }
}

const mapStateToProps=(state)=>({
    getUser: state.userReducer.getUser,
    avatars: state.avatarReducer.getAvatar
});

const mapDispatchToProps = (dispatch) =>({
    fetchAvatar: () => dispatch(fetchAvatar()),
    fetchVegie:()=>dispatch(fetchVegie()),
    fetchActivity:()=>dispatch(fetchActivity())
});
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
    profile:{
        width:85,
        height:85,
        borderRadius:40,
        borderWidth:3,
        borderColor:"#FFF"
    },
    name:{
        color:"#FFF",
        fontSize: 20,
        fontWeight: "800",
        marginVertical:8
    },
    points:{
        color: "rgba(255,255,255,0.8)",
        fontSize:13,
        marginRight:4
    }

});



export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
