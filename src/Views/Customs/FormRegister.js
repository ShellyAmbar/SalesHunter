import React, {useState} from 'react';
import {View, Text} from 'react-native';

const FormRegister = props => {
  const [isLogin, setIsLogin] = useState(props.isLogin ? true : false);
  const handleSignInEmail = () => {};
  const handleSignInGoogle = () => {};
  const handleSignInFacebook = () => {};

  const handleSignUpEmail = () => {};
  const handleSignUpGoogle = () => {};
  const handleSignUpFacebook = () => {};

  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default FormRegister;
