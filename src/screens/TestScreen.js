import React, {memo} from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import BackButton from "../components/BackButton";


const TestScreen = ({navigation}) => (
    <Background>
        {/*<BackButton goBack={() => navigation.navigate('HomeScreen')} />*/}
        <Logo/>
        <Header>This is test page/ After Login page dash.</Header>
        <Paragraph>
            Fuck !
        </Paragraph>
        {/*<Button mode="outlined" onPress={() => navigation.navigate('HomeScreen')}>*/}
        {/*    Logout*/}
        {/*</Button>*/}
        {/*//<TabTest />*/}
    </Background>
);

export default memo(TestScreen);
