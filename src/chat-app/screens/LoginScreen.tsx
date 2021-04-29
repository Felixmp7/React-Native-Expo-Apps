import React, { useState, useEffect } from 'react';
import { Alert, View } from 'react-native';
import tw from 'tailwind-rn';
import { Input, Button } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { auth } from '../services/firebase';

const LoginScreen = ({ navigation }:any): JSX.Element => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                Alert.alert('Notification', 'Login successfully');
                navigation.replace('ChatRoom');
            })
            .catch((error: any) => {
                Alert.alert('Notification', error.message);
            });
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user: any) => {
            if (user) {
                navigation.replace('ChatRoom');
            }
            return unsubscribe;
        });
    }, []);

    return (
        <View style={tw('flex-1 relative p-3 bg-white')}>
            <Input
                placeholder="Email"
                label="Email"
                leftIcon={<MaterialIcons name="email" size={24} color="black" />}
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <Input
                placeholder="Password"
                label="Password"
                leftIcon={<MaterialIcons name="lock-outline" size={24} color="black" />}
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
            />
            <Button title="Log In" onPress={handleLogin} buttonStyle={tw('mb-4 w-1/2 self-center bg-indigo-600')} />
            <Button title="Register" buttonStyle={tw('w-1/2 self-center bg-pink-600')} onPress={() => navigation.navigate('RegisterScreen')} />
        </View>
    );
};

export default LoginScreen;
