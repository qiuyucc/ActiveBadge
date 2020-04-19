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

const TestScreen1 = (props) => (
    <Background>
        <BackButton goBack={() => props.navigation.navigate('HomeScreen')}/>
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

class TestScreen extends Component {
    componentDidMount() {
       this.props.fetchDishes();
    }

    constructor(props) {
        super(props);

    }

    render() {

        return (
            <TestScreen1 navigation={this.props.navigation}/>
        );
    }
}

//export default connect(mapStateToProps, mapDispatchToProps)(TestScreen);
export default memo(connect(mapStateToProps, mapDispatchToProps)(TestScreen));
//export default memo(TestScreen);
