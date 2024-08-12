import React, {useState, useCallback} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  ReduceMotion,
  interpolate,
} from 'react-native-reanimated';
import Checkbox from 'react-native-check-box';
export default function Option({name}) {
  const [selected, setSelected] = useState(true);
  const w = useSharedValue(90);
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const AnimatedCheckbox = Animated.createAnimatedComponent(Checkbox);
  const handleWidth = () => {
    setSelected(!selected);
    widthSize();
  };
  const widthSize = useCallback(() => {
    w.value = withSpring(selected ? 120 : 90, {
      duration: 800,
      dampingRatio: 0.5,
      stiffness: 80,
      overshootClamping: false,
      restDisplacementThreshold: 2,
      restSpeedThreshold: 2,
      reduceMotion: ReduceMotion.System,
    });
    
  }, [selected]);

  const widthStyle = useAnimatedStyle(() => {
    return {
      width: w.value,
    };
  });
  const animatedBox = useAnimatedStyle(() => {
    return {
      opacity: interpolate(w.value, [90, 120], [0, 1]),
      left: 85,
    };
  });
  
  
  return (
    <AnimatedPressable
      onPress={handleWidth}
      style={[styles.optionContainer,{borderColor:!selected ? 'orange': 'black'}, widthStyle]}>
      <Animated.Text style={[styles.optionText,{color:!selected ? 'orange': 'black'}]}>
        {name}
      </Animated.Text>

      <AnimatedCheckbox
        isChecked={!selected}
        onClick={handleWidth}
        style={[styles.box, animatedBox]}
        checkedCheckBoxColor={'orange'}
        uncheckedCheckBoxColor={'orange'}
      />
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  optionContainer: {
    height: 45,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 30,
    position: 'relative',
    overflow: 'hidden',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
    position: 'absolute',
    left: 10,
  },
  box: {
    position: 'absolute',
  },
});
