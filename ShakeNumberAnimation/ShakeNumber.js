import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
export default function ShakeNumber() {
    const [count, setCount] = useState(0);
    const moveX = useSharedValue(0);
  
    const shake = useCallback(() => {
      const timeConfig = {
        duration: 80,
        easing: Easing.bezier(0.35, 0.7, 0.5, 0.7),
      };
      moveX.value = withSequence(
        withTiming(20, timeConfig),
        withRepeat(withTiming(-20, timeConfig), 3, true),
        withSpring(0, {
          mass: 0.5,
        }),
      );
    }, []);
    const shakeObject = useAnimatedStyle(() => {
      return {
        transform: [{translateX: moveX.value}],
      };
    });

    return (
      <Animated.View style={styles.container}>
        <Animated.View style={[styles.countContainer]} >
          <Animated.Text style={[styles.text, shakeObject]}>
            {count}
          </Animated.Text>
        </Animated.View>
        <TouchableHighlight
          style={styles.buttonContainer}
          underlayColor="grey"
          onPress={() => {
            setCount(count => count + 1);
          }}>
          <Text style={{fontSize: 25, color: 'white'}}>+</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.buttonContainer}
          underlayColor="grey"
          onPress={() => {
            if (count === 0) {
              shake();
            } else {
              setCount(count => count - 1);
            }
          }}>
          <Text style={{fontSize: 25, color: 'white'}}>-</Text>
        </TouchableHighlight>
      </Animated.View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 20,
    },
    countContainer: {
      height: 100,
      width: 100,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 50,
      fontWeight: 'bold',
      color: 'black',
    },
    buttonContainer: {
      height: 50,
      width: 50,
      backgroundColor: 'black',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
    },
  });