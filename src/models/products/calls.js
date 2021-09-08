import firestore from '@react-native-firebase/firestore';

export const getProductsCall = () => {
  return firestore().collection('Products').get();
};
