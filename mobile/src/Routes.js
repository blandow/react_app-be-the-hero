import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const AppStack = createStackNavigator();

import Detail from './pages/Detail';
import Incidents from './pages/Incidents';

export default function Routes() {
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{headerShown:false}}>

                <AppStack.Screen name="Detail" component={Detail} />
                <AppStack.Screen name="incidents" incidentscomponent={Incidents} />

            </AppStack.Navigator>
        </NavigationContainer>
    );
}