import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import {Image} from "react-native";


class Dashboard extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        const image =  this.props.navigation.getParam("imageValue","No");
        const activity =  this.props.navigation.getParam("activityValue","No");
        return (
            <Background>
                <Logo/>
                <Header>Let’s start</Header>
                <Paragraph>
                    Done.{"\n"}
                    Imagevalue is : {image.valueOf()}{"\n"}
                    activityValue is : {activity.valueOf()}{"\n"}
                </Paragraph>
                <Button mode="outlined" onPress={() => {this.props.navigation.navigate("HomeScreen")}}>
                    Logout
                </Button>
            </Background>
        );
    }
}
export default memo(Dashboard);
