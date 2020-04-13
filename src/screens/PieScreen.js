import React, {memo, useState, useEffect} from 'react';
import Background from '../components/Background';
import Header from '../components/Header';
import BackButton from '../components/BackButton';
import {View} from 'react-native';
import {VictoryPie, VictoryLabel} from 'victory-native';
import Svg from "react-native-svg";


const graphColor = ['#45b3b9', '#3D9970', '#98CCCC']; // Colors
const Data = [{y: 1, label: "Three"}, {y: 70, label: "one"}, {y: 80, label: "two"}]; // Data that we want to display
const defaultAnimatedData = [{y: 0}, {y: 0}, {y: 100}]; // Data used to make the animate prop work

const PieScreen = ({navigation}) => {
    const [animatedData, setData] = useState(defaultAnimatedData);


    useEffect(() => {
        setData(Data); // Setting the data that we want to display
    }, []);


    return (
        <Background>
            <BackButton goBack={() => navigation.navigate('Graphs')}/>
            <Header> Pie Chart </Header>
            <View>
                <Svg viewBox="0 0 400 400">
                    <VictoryPie
                        animate={{easing: 'exp'}}
                        data={animatedData}
                        width={350}
                        height={350}
                        colorScale={graphColor}
                        innerRadius={60}

                    />
                    <VictoryLabel
                        textAnchor="middle"
                        style={{fontSize: 20}}
                        x={200} y={200}
                        text="Pie!"
                    />

                </Svg>
            </View>
        </Background>
    );
    // }
}
export default memo(PieScreen);



