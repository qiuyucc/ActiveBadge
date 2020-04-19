// import React, {memo} from 'react';
// import Background from '../components/Background';
// import Logo from '../components/Logo';
// import Header from '../components/Header';
// import Button from '../components/Button';
// import Paragraph from '../components/Paragraph';
//
// const HomeScreen = ({navigation}) => (
//     <Background>
//         <Logo/>
//         <Header>Active Badger</Header>
//         <Paragraph>
//             Tackling childhood obesity
//         </Paragraph>
//         <Button mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
//             Login
//         </Button>
//         <Button
//             mode="outlined"
//             onPress={() => navigation.navigate('RegisterScreen')}>
//             Sign Up
//         </Button>
//         <Button mode="outlined" onPress={() => navigation.navigate('AvatarScreen')}>
//             Avatar
//         </Button>
//         <Button mode="outlined" onPress={() => navigation.navigate('ActivityScreen')}>
//             Activity
//         </Button>
//         <Button mode="outlined" onPress={() => navigation.navigate('Graphs')}>
//             Graphs
//         </Button>
//         <Button mode="contained" onPress={() => {
//             navigation.navigate('Dash')
//         }}>
//             Like Successful login.
//         </Button>
//     </Background>
// );
//
// export default memo(HomeScreen);

import React, {Component, memo} from "react";
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import { StackActions } from 'react-navigation';

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.goToScreen = this.goToScreen.bind(this);
    }

    goToScreen(screen) {
        const {navigation} = this.props;
        const replaceAction = StackActions.replace({
            routeName: screen
        }, {from: 0});
        navigation.dispatch(replaceAction);
    }

    render() {
        const {goToScreen} = this;
        return (
            <Background>
                <Logo/>
                <Header>Active Badger</Header>
                <Paragraph>
                    Tackling childhood obesity
                </Paragraph>
                <Button mode="contained" onPress={_ => goToScreen('LoginScreen')}>
                    Login
                </Button>
                <Button
                    mode="outlined"
                    onPress={() => this.props.navigation.navigate('RegisterScreen')}>
                    Sign Up
                </Button>
                <Button mode="outlined" onPress={() => this.props.navigation.navigate('AvatarScreen')}>
                    Avatar
                </Button>
                <Button mode="outlined" onPress={() => this.props.navigation.navigate('ActivityScreen')}>
                    Activity
                </Button>
                <Button mode="outlined" onPress={() => this.props.navigation.navigate('Graphs')}>
                    Graphs
                </Button>
                <Button mode="contained" onPress={() => {
                    this.props.navigation.navigate('Dash')
                }}>
                    Like Successful login.
                </Button>
            </Background>
        );
    }

}
