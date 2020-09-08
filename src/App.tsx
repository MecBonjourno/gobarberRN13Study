import 'react-native-gesture-handler';

import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'

import Routes from './routes'

import AppProvider from './hooks'


const App: React.FC = () => (
    <NavigationContainer>
     <StatusBar barStyle="light-content"/>
     <AppProvider>
     <View style={{ flex:1, backgroundColor: '#312E38'}}>
         <Routes />
     </View>
     </AppProvider>
    </NavigationContainer>
);

export default App;