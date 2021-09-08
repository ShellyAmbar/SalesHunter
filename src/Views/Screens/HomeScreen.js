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
import SwipeCards from '../Customs/SwipeCards';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const mapStateToProps = (state, props) => {
  const {products} = state.products;
  console.log('products', products);

  return {
    products,
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

const Home = ({products, getProducts, addToFavorites}) => {
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const navigation = useNavigation();
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,

      onPanResponderMove: (evt, gestureState) => {
        pan.setValue({x: gestureState.dx, y: gestureState.dy});
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 120) {
          Animated.spring(pan, {
            useNativeDriver: false,
            toValue: {x: SCREEN_WIDTH + 100, y: gestureState.dy},
          }).start(() => {
            addToFavoritesAction(reverseProducts[currentIndex.current]);

            currentIndex.current += 1;
            console.log('currentIndex', currentIndex.current);
            pan.setValue({x: 0, y: 0});
          });
        } else if (gestureState.dx < -120) {
          Animated.spring(pan, {
            useNativeDriver: false,
            toValue: {x: -SCREEN_WIDTH - 100, y: gestureState.dy},
          }).start(() => {
            currentIndex.current += 1;
            console.log('currentIndex', currentIndex.current);
            pan.setValue({x: 0, y: 0});
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

  return (
    <SwipeCards products={products} addToFavorites={addToFavoritesAction} />
  );
};

const HomeScreen = connect(mapStateToProps, mapDispatchToProps)(Home);
export default HomeScreen;
