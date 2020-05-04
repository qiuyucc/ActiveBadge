import React, {Component} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider as StoreProvider} from 'react-redux';


import {theme} from './src/core/theme';
import { PersistGate } from 'redux-persist/es/integration/react';
import persist from "./src/Redux/ConfigureStore";
import Main from "./src/screens/Main"


const persistStore = persist();

export default class App extends Component {
    render() {
        return (
    <StoreProvider store={persistStore.store}>
        <PaperProvider theme={theme}>
            <PersistGate loading={null}
            persistor={persistStore.persistor}>
            <Main/>
            </PersistGate>
        </PaperProvider>
    </StoreProvider>
);}
}


