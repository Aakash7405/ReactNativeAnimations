import React, {useState, useCallback} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {
  Gesture,
  GestureDetector,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
export default function TapGesture() {
  const moveX = useSharedValue(0);
  const moveY = useSharedValue(0);
  const scaleCircle = useSharedValue(0);
  const circleOpacity = useSharedValue(1);
  const tap = Gesture.Tap()
    .onStart(event => {
      moveX.value = event.x - 50;
      moveY.value = event.y - 50;
      circleOpacity.value = 1;
      scaleCircle.value = withTiming(5, {duration: 500, easing: Easing.ease});
    })
    .onBegin(() => {
      scaleCircle.value = 0;
    })
    .onEnd(() => {
      circleOpacity.value = withTiming(0, {duration: 700});
    });
  const circleStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scaleCircle.value}],
      left: moveX.value,
      top: moveY.value,
      opacity: circleOpacity.value,
    };
  });
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <GestureDetector gesture={tap}>
          <Animated.View style={styles.mainContainer}>
            <Animated.Text style={styles.text}>Tap</Animated.Text>
            <Animated.View style={[styles.circle, circleStyle]}></Animated.View>
          </Animated.View>
        </GestureDetector>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    height: 180,
    width: 180,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor:"#6495ED",
    overflow: 'hidden',
  },
  text: {
    fontSize: 20,
    fontWeight: 500,
    color:"#6495ED"
  },
  circle: {
    position: 'absolute',
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(100, 149, 237,0.5)',
    left: 0,
    top: 0,
  },
});
