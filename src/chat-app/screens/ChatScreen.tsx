import React, { useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements';
import { auth } from '../services/firebase';

const defaultImage = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.kindpng.com%2Fimgv%2FixRmTT_free-high-quality-person-icon-default-profile-picture%2F&psig=AOvVaw17PXCjS1QBKpa3rSWWBrBc&ust=1619379883379000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIirqqnSl_ACFQAAAAAdAAAAABAD';

const ChatScreen = ({ navigation }: any): JSX.Element => {
  const signOut = () => {
    auth.signOut().then(() => {
      navigation.replace('LoginScreen');
    }).catch((error: any) => {
      // An error happened.
      console.log(error.message);
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View>
          <Avatar
            rounded
            source={{ uri: auth?.currentUser?.photoURL || defaultImage }}
          />
        </View>
      ),
      headerRight: () => (
        <Pressable onPress={signOut}>
          <FontAwesome name="sign-out" size={24} color="black" />
        </Pressable>
      ),
    });
  }, []);

  return (
    <View>
      <Text>ChatScreen</Text>
    </View>
  );
};

export default ChatScreen;
