import {Dashboard, ForgotPasswordScreen, HomeScreen, LoginScreen, RegisterScreen, TestScreen} from "./screens";
import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs";
import {createAppContainer} from 'react-navigation';
import {Image, StyleSheet, Text} from "react-native";
import React from "react";
import {createStackNavigator} from "react-navigation-stack";


const AuthStack = createStackNavigator(
    {HomeScreen, LoginScreen, RegisterScreen, ForgotPasswordScreen},
    {
        initialRouteName: 'HomeScreen',
        headerMode: 'none',

    }
);

const DashboardStack = createMaterialBottomTabNavigator(
    {
        HomeScreen: {
            screen: TestScreen, navigationOptions: {
                tabBarIcon: ({tintColor}) => (
                    <Image source={require('./assets/arrow_back.png')} style={styles.tabBarIconImage}
                    />),
                tabBarLabel: <Text style={{fontSize: 15}}>Home</Text>
            }
        },
        Sport: {
            screen: AuthStack, navigationOptions: {
                tabBarIcon: ({tintColor}) => (
                    <Image source={require('./assets/arrow_back.png')} style={styles.tabBarIconImage}
                    />)
            }
        },
        Fruit: {
            screen: LoginScreen, navigationOptions: {
                tabBarIcon: ({tintColor}) => (
                    <Image source={require('./assets/arrow_back.png')} style={styles.tabBarIconImage}
                    />)
            }
        },
        Me: {
            screen: Dashboard, navigationOptions: {
                tabBarIcon: ({tintColor}) => (
                    <Image source={require('./assets/arrow_back.png')} style={styles.tabBarIconImage}
                    />)
            }
        },

    }, {
        shifting: false,
        initialRouteName: 'Me',
        activeColor: '#f6d614',
        inactiveColor: '#f0edf6',
        barStyle: {backgroundColor: '#29a5a7',},

    }
);
const styles = StyleSheet.create({
    tabBarIconImage: {
        width: 30,
        height: 30,
        marginBottom: 10,
    },
    tabBarText: {
        fontSize: 10,
    },
});

const Router = (isLoggedIn) => createStackNavigator(
    {
        Login: AuthStack,
        Dash: DashboardStack,
    }, {
        backBehaviour:'initialRoute',
        initialRouteName: isLoggedIn? 'Dash' : 'Login',
        headerMode:'none',
    }
);

export default createRootNavigation = (isLoggedIn) => createAppContainer(Router(isLoggedIn));
