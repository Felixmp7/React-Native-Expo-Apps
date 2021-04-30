import * as React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ColorSchemeName } from 'react-native';
import HomeScreen from './index';
import TodosNavigator from './todos-app/navigation';
import ChatNavigator from './chat-app/ChatNavigator';

const Stack = createStackNavigator();

const RootNavigator = () => (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" options={{ title: 'Mobile Apps' }} component={HomeScreen} />
        <Stack.Screen name="Todos" component={TodosNavigator} />
        <Stack.Screen name="Chat" component={ChatNavigator} />
    </Stack.Navigator>
);

const Navigation = ({ colorScheme }: { colorScheme: ColorSchemeName }) => (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <RootNavigator />
    </NavigationContainer>
);

export default Navigation;
