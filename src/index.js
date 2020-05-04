import React from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';


import {
    HomeScreen,
    LoginScreen,
    RegisterScreen,
    ForgotPasswordScreen,
    Dashboard,
    TestScreen,
    ActivityScreen,
    AvatarScreen,
    BarScreen,
    LineScreen,
    PieScreen,
    Graphs
} from './screens';

const Router1 = createStackNavigator(
    {
        HomeScreen,
        LoginScreen,
        RegisterScreen,
        ForgotPasswordScreen,
        Dashboard,
        TestScreen: {
            screen: TestScreen,
            navigationOptions: {}
        },
        ActivityScreen,
        AvatarScreen,
        BarScreen,
        LineScreen,
        PieScreen,
        Graphs

    },
    {
        initialRouteName: 'HomeScreen',
        headerMode: 'none',
    }
);
//bottom navigator
// const Router2 = createMaterialBottomTabNavigator(
//     {
//         HomeScreen: {
//             screen: TestScreen, navigationOptions: {
//                 tabBarIcon: ({tintColor}) => (
//                     <Image source={require('./assets/arrow_back.png')} style={styles.tabBarIconImage}
//                     />),
//                 tabBarLabel: <Text style={{fontSize: 15}}>Home</Text>
//             }
//         },
//         Sport: {
//             screen: Router1, navigationOptions: {
//                 tabBarIcon: ({tintColor}) => (
//                     <Image source={require('./assets/arrow_back.png')} style={styles.tabBarIconImage}
//                     />)
//             }
//         },
//         Fruit: {
//             screen: LoginScreen, navigationOptions: {
//                 tabBarIcon: ({tintColor}) => (
//                     <Image source={require('./assets/arrow_back.png')} style={styles.tabBarIconImage}
//                     />)
//             }
//         },
//         Me: {
//             screen: Dashboard, navigationOptions: {
//                 tabBarIcon: ({tintColor}) => (
//                     <Image source={require('./assets/arrow_back.png')} style={styles.tabBarIconImage}
//                     />)
//             }
//         },
//
//     }, {
//         shifting: false,
//         initialRouteName: 'Me',
//         activeColor: '#f6d614',
//         inactiveColor: '#f0edf6',
//         barStyle: {backgroundColor: '#29a5a7',},
//
//     }
// );

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

const Router = createStackNavigator(
    {
        Login: {screen: Router1},
        Dash: {screen: Router2},
    }, {
        initialRouteName: 'Login',
        headerMode: 'none',
    }
);

export default createAppContainer(Router);
