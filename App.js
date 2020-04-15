import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider as StoreProvider} from 'react-redux'
import App from './src';
import {theme} from './src/core/theme';
import {ConfigureStore} from "./src/Redux/ConfigureStore";

const store = ConfigureStore();
const Main = () => (
    <StoreProvider store={store}>
        <PaperProvider theme={theme}>
            <App/>
        </PaperProvider>
    </StoreProvider>
);

export default Main;
