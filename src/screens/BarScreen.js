import React, {memo, useState, useEffect} from 'react';
import Background from '../components/Background';
import Header from '../components/Header';
import {Dimensions, View} from 'react-native';
import {BarChart, LineChart} from "react-native-chart-kit";
import BackButton from "../components/BackButton";

const BarScreen = ({navigation}) => {

    return (
        <Background>
            <BackButton goBack={() => navigation.navigate('Graphs')}/>
            <Header> Bar Chart </Header>
            <View>
                <BarChart
                    data={{
                        labels: ['Ahmed', 'Brook', 'Jeff'],
                        datasets: [{
                            data: [
                                100,
                                1000,
                                100,
                            ]
                        }]
                    }}

                    width={Dimensions.get('window').width - 50}
                    height={200}
                    chartConfig={{

                        backgroundColor: '#61da88',
                        backgroundGradientFrom: '#61da88',
                        // backgroundGradientTo: '#61da88',
                        decimalPlaces: 0, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`
                    }}
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                />
            </View>
        </Background>
    );
    // }
}
export default memo(BarScreen);



