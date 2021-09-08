import React, {useCallback} from 'react';
import {View, Text, Image, Button, Linking, Alert} from 'react-native';
import dateFormat from 'dateformat';

const ProductDetails = props => {
  const product = props.route.params.product;
  const convertDateToStringFormat = date => {
    return dateFormat(date, 'mmmm dS, yyyy');
  };
  const onClickGoToWebsite = () => {
    // const url = product.url;
  };

  // const handlePress = useCallback(async () => {
  //   const url = article.url;
  //   // Checking if the link is supported for links with custom URL scheme.
  //   const supported = await Linking.canOpenURL(url);

  //   if (supported) {
  //     // Opening the link with some app, if the URL scheme is "http" the web link should be opened
  //     // by some browser in the mobile
  //     await Linking.openURL(url);
  //   } else {
  //     Alert.alert(`Don't know how to open this URL: ${url}`);
  //   }
  // }, [article.url]);

  const renderProduct = () => {
    console.log('product', product);
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          flex: 1,
          padding: 10,
          alignItems: 'center',
        }}>
        <Text
          style={{
            height: 100,
            margin: 10,
            padding: 10,
            fontSize: 30,
            width: '90%',
            textAlign: 'justify',
            fontWeight: '700',
          }}>
          {product.name}
        </Text>

        <Image
          source={{uri: `${product.image}`}}
          style={{height: 200, width: '90%', borderRadius: 10}}
        />
        <Text
          style={{
            margin: 10,
            padding: 10,
            fontSize: 25,
            height: 200,
            width: '90%',
            textAlign: 'justify',
            fontWeight: '700',
          }}>
          {`Brand: ${product.brand}\nSize: ${product.size}\nType:${product.type}  `}
        </Text>
      </View>
    );
  };

  return <View>{product ? renderProduct() : null}</View>;
};

export default ProductDetails;
