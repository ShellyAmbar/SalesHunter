import {View, Text, Button, StyleSheet} from 'react-native';
import React, {useContext, useState} from 'react';
import {AuthContext} from '../../navigation/AuthProvider.android';
import {useNavigation} from '@react-navigation/native';

const ProfileScreen = () => {
  const {logout} = useContext(AuthContext);
  const navigation = useNavigation();
  const handleLogout = () => {
    logout(() => {
      navigation.navigate('Login');
    });
  };
  return (
    <View style={styles.container}>
      <Text>ProfileScreen</Text>
      <Button title="Logout" onPress={() => handleLogout()} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
});
