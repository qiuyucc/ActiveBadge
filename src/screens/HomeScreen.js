import React, {memo} from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';

const HomeScreen = ({navigation}) => (
    <Background>
        <Logo/>
        <Header>Active Badger</Header>

        <Paragraph>
            Tackling childhood obesity
        </Paragraph>
        <Button mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
            Login
        </Button>
        <Button
            mode="outlined"
            onPress={() => navigation.navigate('RegisterScreen')}>
            Sign Up
        </Button>
        <Button mode="outlined" onPress={() => navigation.navigate('AvatarScreen')}>
            Avatar
        </Button>
        <Button mode="outlined" onPress={() => navigation.navigate('ActivityScreen')}>
            Activity
        </Button>
        <Button mode="outlined" onPress={() => navigation.navigate('Graphs')}>
            Graphs
        </Button>
        <Button mode="contained" onPress={() => {
            navigation.navigate('Dash')
        }}>
            Like Successful login.
        </Button>

    </Background>
);

export default memo(HomeScreen);
