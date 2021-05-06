import React, { useState, useEffect } from 'react';
import { Alert, View } from 'react-native';
import tw from 'tailwind-rn';
import { Input, Button } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { auth } from '../services/firebase';
import { login } from '../services/auth';
import { saveCurrentDocumentId } from '../services/chat';

const LoginScreen = ({ navigation }: any): JSX.Element => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const response = await login(email, password);
        if (response.status === 'ERROR') {
            Alert.alert('Notification', response.error.message);
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user: any) => {
            if (user) {
                saveCurrentDocumentId()
                    .then(() => navigation.replace('ChatListScreen'))
                    .catch((error) => Alert.alert('LoginScreen', error.message));
            }
        });
        return () => unsubscribe();
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
