import React, { memo ,  useState, useEffect} from 'react';
import Background from '../components/Background';

import Header from '../components/Header';

import {Dimensions, View} from 'react-native';
import {LineChart } from "react-native-chart-kit";
import BackButton from "../components/BackButton";

const LineScreen = ({ navigation }) => {

    return (
        <Background>
            <BackButton goBack={() => navigation.navigate('Graphs')} />

            <Header> Line Chart </Header>
            <View>
                <LineChart
                    data={{
                        labels: ['Ahmed', 'Brook', 'Jeff'],
                        datasets: [{
                            data: [
                                100,
                                1000,
                                10000,
                            ]
                        }]
                    }}
                    width={Dimensions.get('window').width-50 } // from react-native
                    height={200}
                    chartConfig={{
                        // backgroundColor: '#61da88',
                        backgroundGradientFrom: '#61da88',
                        // backgroundGradientTo: '#61da88',
                        decimalPlaces: 0, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        // style: {
                        //     borderRadius: 16
                        // }
                    }}
                    bezier
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
export default memo(LineScreen);



