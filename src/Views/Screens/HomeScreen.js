import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  Animated,
  PanResponder,
} from 'react-native';
import {connect} from 'react-redux';
import {ADD_TO_FAVORITE_REQUEST} from '../../models/favorites/actions';
import {GET_PRODUCTS_REQUEST} from '../../models/products/actions';

import OptionsScrollView from '../Customs/OptionsScrollView';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const mapStateToProps = (state, props) => {
  const {products} = state.products;
  console.log('products', products);
  const reverseProducts = products.reverse();
  return {
    reverseProducts,
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  getProducts: () => {
    dispatch({
      type: GET_PRODUCTS_REQUEST,
      payload: {},
    });
  },
  addToFavorites: favorite => {
    dispatch({
      type: ADD_TO_FAVORITE_REQUEST,
      payload: favorite,
    });
  },
});

const Home = ({reverseProducts, getProducts, addToFavorites}) => {
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const navigation = useNavigation();
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,

      onPanResponderMove: (evt, gestureState) => {
        pan.setValue({x: gestureState.dx, y: gestureState.dy});
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 120) {
          Animated.spring(pan, {
            useNativeDriver: false,
            toValue: {x: SCREEN_WIDTH + 150, y: gestureState.dy},
          }).start(() => {
            addToFavoritesAction(reverseProducts[currentIndex.current]);
            reverseProducts.pop();
            currentIndex.current += 1;
            console.log('currentIndex', reverseProducts.length);
            pan.setValue({x: 0, y: 0});
            pan.flattenOffset();
          });
        } else if (gestureState.dx < -120) {
          Animated.spring(pan, {
            useNativeDriver: false,
            toValue: {x: -SCREEN_WIDTH - 150, y: gestureState.dy},
          }).start(() => {
            reverseProducts.pop();
            currentIndex.current += 1;
            console.log('currentIndex', reverseProducts.length);
            pan.setValue({x: 0, y: 0});
            pan.flattenOffset();
          });
        } else {
          Animated.spring(pan, {
            useNativeDriver: false,
            toValue: {x: 0, y: 0},
            friction: 4,
          }).start();
        }
      },
    }),
  ).current;

  const onClickTypeOfProduct = type => {
    //const list = getListOfProducts(type);
  };

  const onClickItem = product => {
    navigation.navigate('ArticleDetails', {product});
  };
  const addToFavoritesAction = favorite => {
    addToFavorites(favorite);
  };
  let currentIndex = useRef(0);
  const [likeOpacity, setLikeOpacity] = useState(
    pan.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    }),
  );
  const [nopeOpacity, setNopeOpacity] = useState(
    pan.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp',
    }),
  );
  const [nextCardOpacity, setNextCardOpacity] = useState(
    pan.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 1],
      extrapolate: 'clamp',
    }),
  );
  const [nextCardScale, setNextCardScale] = useState(
    pan.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0.8, 1],
      extrapolate: 'clamp',
    }),
  );
  let rotate = pan.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp',
  });
  let rotateAndTranslate = {
    transform: [
      {
        rotate: rotate,
      },
      ...pan.getTranslateTransform(),
    ],
  };

  const renderCards = () => {
    return reverseProducts.map((product, index) => {
      if (index < currentIndex.current) {
        return null;
      } else if (index == currentIndex.current) {
        return (
          <Animated.View
            key={product.id}
            style={[
              rotateAndTranslate,
              {
                height: SCREEN_HEIGHT - 90,
                width: SCREEN_WIDTH,
                padding: 20,
                position: 'absolute',
              },
            ]}
            {...panResponder.panHandlers}>
            <Animated.View
              style={{
                opacity: likeOpacity,
                position: 'absolute',
                top: 50,
                left: 40,
                zIndex: 100,
                transform: [{rotate: '-30deg'}],
              }}>
              <Text
                style={{
                  borderWidth: 1,
                  borderColor: 'green',
                  color: 'green',
                  fontSize: 50,
                  fontWeight: '500',
                  padding: 5,
                }}>
                LIKE
              </Text>
            </Animated.View>
            <Animated.View
              style={{
                opacity: nopeOpacity,
                position: 'absolute',
                top: 50,
                right: 40,
                zIndex: 100,
                transform: [{rotate: '30deg'}],
              }}>
              <Text
                style={{
                  borderWidth: 1,
                  borderColor: 'red',
                  color: 'red',
                  fontSize: 50,
                  fontWeight: '500',
                  padding: 10,
                }}>
                Nope
              </Text>
            </Animated.View>
            <Image
              source={{uri: reverseProducts[index].image}}
              style={{
                flex: 1,
                height: null,
                width: null,
                resizeMode: 'cover',
                borderRadius: 20,
              }}></Image>
          </Animated.View>
        );
      } else {
        return (
          <Animated.View
            key={product.id}
            style={{
              transform: [{scale: nextCardScale}],
              opacity: nextCardOpacity,
              height: SCREEN_HEIGHT - 90,
              width: SCREEN_WIDTH,
              padding: 20,
              position: 'absolute',
            }}>
            <Image
              source={{uri: reverseProducts[index].image}}
              style={{
                flex: 1,
                height: null,
                width: null,
                resizeMode: 'cover',
                borderRadius: 20,
              }}></Image>
          </Animated.View>
        );
      }
    });
  };

  return (
    <View style={{flex: 1, paddingBottom: 50}}>
      <View style={{height: 30}}></View>
      <View style={{flex: 1}}>{renderCards()}</View>
      <View style={{height: 60}}></View>
    </View>
  );
};

const HomeScreen = connect(mapStateToProps, mapDispatchToProps)(Home);
export default HomeScreen;
