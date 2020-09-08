import React from 'react';
import {ActivityIndicator, View} from 'react-native'
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

import {useAuth} from '../hooks/auth'


const Routes: React.FC = () => {
    const { user, loading } = useAuth();

    // Deixando o Loading em falso por enquanto ja q nao descobri pq q o usuário nao persiste
    if(loading){
        return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color="#999" />
        </View>
        );
    }
    
    return user ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;