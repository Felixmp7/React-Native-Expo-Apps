import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ChatScreen from './screens/ChatScreen';

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
      options={{ title: 'Register' }}
      component={ChatScreen}
    />
  </Chat.Navigator>
);

export default ChatNavigator;
