import { useEffect } from "react";
import {
    Easing,
    cancelAnimation,
    runOnUI,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from "react-native-reanimated";

interface UseRotateObjectOptions {
  duration: number; // Duration in milliseconds for one full rotation
  easing?: typeof Easing.linear;
  reverse?: boolean;
}

export function useRotateObject(options: UseRotateObjectOptions) {
  const { duration, easing = Easing.linear, reverse = false } = options;
  const rotation = useSharedValue(0);

  useEffect(() => {
    // Run animation on UI thread
    runOnUI(() => {
      "worklet";
      rotation.value = withRepeat(
        withTiming(360, {
          duration,
          easing,
        }),
        -1, // infinite
        reverse
      );
    })();

    // Cleanup animation on unmount
    return () => {
      cancelAnimation(rotation);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration, reverse]); // Re-run if duration or reverse changes

  const animatedStyle = useAnimatedStyle(() => {
    "worklet";
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return {
    rotation,
    animatedStyle,
  };
}
