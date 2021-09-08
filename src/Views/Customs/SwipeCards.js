import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Animated,
  PanResponder,
  Dimensions,
  Image,
} from 'react-native';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default class SwipeCards extends Component {
  constructor(props) {
    super(props);
    this.products = props.products;
    this.addToFavorites = props.addToFavorites;

    this.position = new Animated.ValueXY();
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,

      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({x: gestureState.dx, y: gestureState.dy});
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 120) {
          Animated.spring(this.position, {
            useNativeDriver: false,
            toValue: {x: SCREEN_WIDTH + 100, y: gestureState.dy},
          }).start(() => {
            this.addToFavorites(this.products[this.state.currentIndex]);
            this.setState(
              {
                currentIndex: this.state.currentIndex + 1,
              },
              () => {
                this.position.setValue({x: 0, y: 0});
              },
            );
          });
        } else if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            useNativeDriver: false,
            toValue: {x: -SCREEN_WIDTH - 100, y: gestureState.dy},
          }).start(() => {
            this.setState(
              {
                currentIndex: this.state.currentIndex + 1,
              },
              () => {
                this.position.setValue({x: 0, y: 0});
              },
            );
          });
        } else {
          Animated.spring(this.position, {
            useNativeDriver: false,
            toValue: {x: 0, y: 0},
            friction: 4,
          }).start();
        }
      },
    });

    this.likeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    });
    this.nopeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp',
    });
    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 1],
      extrapolate: 'clamp',
    });
    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0.8, 1],
      extrapolate: 'clamp',
    });

    this.rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ['-10deg', '0deg', '10deg'],
      extrapolate: 'clamp',
    });
    this.rotateAndTranslate = {
      transform: [
        {
          rotate: this.rotate,
        },
        ...this.position.getTranslateTransform(),
      ],
    };
    this.state = {
      currentIndex: 0,
    };
  }
  renderProducts() {
    return this.products
      .map((item, i) => {
        if (i < this.state.currentIndex) {
          return null;
        } else if (i == this.state.currentIndex) {
          return (
            <Animated.View
              {...this.panResponder.panHandlers}
              key={i}
              style={[
                this.rotateAndTranslate,
                {
                  height: SCREEN_HEIGHT - 120,
                  width: SCREEN_WIDTH,
                  padding: 10,
                  position: 'absolute',
                },
              ]}>
              <Animated.View
                style={{
                  opacity: this.likeOpacity,
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
                  opacity: this.nopeOpacity,
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
                style={{
                  flex: 1,
                  height: null,
                  width: null,
                  resizeMode: 'cover',
                  borderRadius: 20,
                }}
                source={{uri: this.products[i].image}}
              />
            </Animated.View>
          );
        } else {
          return (
            <Animated.View
              key={i}
              style={{
                transform: [{scale: this.nextCardScale}],
                opacity: this.nextCardOpacity,
                height: SCREEN_HEIGHT - 120,
                width: SCREEN_WIDTH,
                padding: 10,
                position: 'absolute',
              }}>
              <Image
                style={{
                  flex: 1,
                  height: null,
                  width: null,
                  resizeMode: 'cover',
                  borderRadius: 20,
                }}
                source={{uri: this.products[i].image}}
              />
            </Animated.View>
          );
        }
      })
      .reverse();
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
        <View style={{height: 40}}></View>
        <View style={{flex: 1}}>{this.renderProducts()}</View>
        <View style={{height: 60}}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
