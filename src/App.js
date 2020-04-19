import React, {Component} from 'react';
import { ActivityIndicator, SafeAreaView,View} from 'react-native';
import createRootNavigation from './NavigationTree';

const _renderRootNavigator = (authState) => {
    const RootNavigation = createRootNavigation(authState);
    return <RootNavigation />
}
const _renderLoader = () => <ActivityIndicator size="large" />

export default class App extends Component {
    constructor(props) {
        super(props);
        props.checkLogin();
    }
    render(){
        const { already_logged, auth_checked } = this.props.appState;
        const BaseView = auth_checked ? _renderRootNavigator(already_logged) : _renderLoader();
        return (
            <View style={{
                flex: 1, backgroundColor: "#050505",
                justifyContent: "center", alignContent: 'center',
            }} children={BaseView} />
        )
    }
}
