import React, { useState } from 'react';
import { View } from 'react-native';
import tw from 'tailwind-rn';
import { Input, Button } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';

const LoginScreen = ({ navigation }:any): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={tw('flex-1 relative p-3 bg-white')}>
      <Input
        placeholder="Email"
        label="Email"
        leftIcon={
          <MaterialIcons name="email" size={24} color="black" />
        }
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Input
        placeholder="Password"
        label="Password"
        leftIcon={
          <MaterialIcons name="lock-outline" size={24} color="black" />
        }
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Button title="Log In" buttonStyle={tw('mb-4 w-1/2 self-center bg-indigo-600')} />
      <Button title="Register" buttonStyle={tw('w-1/2 self-center bg-pink-600')} onPress={() => navigation.navigate('RegisterScreen')} />
    </View>
  );
};

export default LoginScreen;
