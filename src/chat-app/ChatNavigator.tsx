import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ChatRoom from './screens/ChatRoom';
import ChatListScreen from './screens/ChatListScreen';

const Chat = createStackNavigator();

const ChatNavigator = () => (
    <Chat.Navigator initialRouteName="LoginScreen">
        <Chat.Screen
            name="LoginScreen"
            options={{ title: 'Login' }}
            component={LoginScreen}
        />
        <Chat.Screen
            name="RegisterScreen"
            options={{ title: 'Register' }}
            component={RegisterScreen}
        />
        <Chat.Screen
            name="ChatRoom"
            component={ChatRoom}
        />
        <Chat.Screen
            name="ChatListScreen"
            options={{ headerShown: false }}
            component={ChatListScreen}
        />
    </Chat.Navigator>
);

export default ChatNavigator;
