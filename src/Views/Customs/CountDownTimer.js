import React, {useRef, useEffect, useState} from 'react';
import {StyleSheet, Text, View, Animated, TextInput} from 'react-native';
import Svg, {G, Circle} from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
export default function CountDownTimer({
  duration = 1000,
  delay = 0,
  textColor,
  color = 'tomato',
  strokeWidth = 10,
  radius = 40,
  max = 100,
  maxVal = 20,
  onAnimationFinished,
}) {
  const halfCircle = radius + strokeWidth;
  const circleCircumference = 2 * Math.PI * radius;
  const circleRef = useRef();
  const inputRef = useRef();
  const intervalRef = useRef(null);

  let [presentage, setPresentage] = useState(maxVal);
  const animatedValue = useRef(new Animated.Value(maxVal)).current;

  const animation = toValue => {
    return Animated.timing(animatedValue, {
      toValue,
      duration,
      delay,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      animation(presentage--);
      if (presentage === -1) {
        clearInterval(interval);
        onAnimationFinished();
        console.log('onAnimationFinished');
      }
    }, 1000);

    animatedValue.addListener(v => {
      if (circleRef?.current) {
        const maxPerc = (100 * v.value * (100 / maxVal)) / max;
        const strokeDashoffset =
          circleCircumference - (circleCircumference * maxPerc) / 100;
        circleRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
      if (inputRef?.current) {
        inputRef.current.setNativeProps({
          text: `${Math.round(v.value)}`,
        });
      }
    });
  }, []);
  return (
    <View>
      <Svg
        width={radius * 2}
        height={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
        <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            cx="50%"
            cy="50%"
            stroke={color}
            strokeWidth={strokeWidth}
            r={radius}
            fill="transparent"
            strokeOpacity={0.3}
          />
          <AnimatedCircle
            ref={circleRef}
            cx="50%"
            cy="50%"
            stroke={color}
            strokeWidth={strokeWidth}
            r={radius}
            fill="transparent"
            strokeDasharray={circleCircumference}
            strokeDashoffset={circleCircumference}
            strokeLinecap="round"
          />
        </G>
      </Svg>
      <TextInput
        ref={inputRef}
        underlineColorAndroid="transparent"
        editable={false}
        defaultValue={`${maxVal}`}
        style={[
          StyleSheet.absoluteFillObject,
          {fontSize: radius / 2, color: textColor ?? color},
          {fontWeight: '900', textAlign: 'center'},
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
