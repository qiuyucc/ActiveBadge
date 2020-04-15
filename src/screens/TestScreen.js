import React, {memo, Component} from 'react';
import {FlatList} from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import BackButton from "../components/BackButton";
//import Router from '../index'
import {connect} from 'react-redux';
import {fetchDishes} from '../Redux/ActionCreators';
import {baseUrl} from "../Redux/baseUrl";
import {Tile} from 'react-native-elements';


const mapStateToProps = (state) => {
    return {
        dishes: state.dishes
    }
}
const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
})

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
    </Background>
);

class TestScr1 extends Component {
    componentDidMount() {
        this.props.fetchDishes();
    }

    render() {
        const renderMenuItem = ({item, index}) => {
            return (
                <Tile
                    key={index}
                    title={item.name}
                    caption={item.description}
                    featured
                    //onPress={() => navigate('Dishdetail', {dishId: item.id})}
                    imageSrc={{uri: baseUrl + item.image}}
                />
            );
        }

        return (
            //<TestScreen/>
            <FlatList
                data={this.props.dishes.dishes}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestScr1);
//export default memo(TestScreen);
