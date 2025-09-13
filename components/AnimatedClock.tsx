import { Image } from "expo-image";
import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const AnimatedImage = Animated.createAnimatedComponent(Image);

export default function AnimatedClock() {
  const minuteRotation = useSharedValue(0);
  const hourRotation = useSharedValue(0);

  useEffect(() => {
    // Minute hand: completes full rotation in 6 seconds (for demo purposes)
    // In a real clock, this would be 60 seconds
    minuteRotation.value = withRepeat(
      withTiming(360, {
        duration: 6000,
        easing: Easing.linear,
      }),
      -1, // infinite
      false // don't reverse
    );

    // Hour hand: completes full rotation in 72 seconds (12x slower than minute hand)
    // In a real clock, this would be 12 hours
    hourRotation.value = withRepeat(
      withTiming(360, {
        duration: 72000, // 12 times slower than minute hand
        easing: Easing.linear,
      }),
      -1, // infinite
      false // don't reverse
    );
  }, [hourRotation, minuteRotation]);

  const minuteAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${minuteRotation.value}deg` }],
    };
  });

  const hourAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${hourRotation.value}deg` }],
    };
  });

  return (
    <View
      style={{
        width: 300,
        height: 300,
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Base layer - static */}
      <Image
        source={require("../assets/images/Clock_Base.png")}
        style={{
          width: 300,
          height: 300,
          position: "absolute",
        }}
        contentFit="contain"
      />

      {/* Hour hand - middle layer, slower rotation */}
      <AnimatedImage
        source={require("../assets/images/Clock_Hour.png")}
        style={[
          {
            width: 300,
            height: 300,
            position: "absolute",
          },
          hourAnimatedStyle,
        ]}
        contentFit="contain"
      />

      {/* Minute hand - top layer, faster rotation */}
      <AnimatedImage
        source={require("../assets/images/Clock_Minute.png")}
        style={[
          {
            width: 300,
            height: 300,
            position: "absolute",
          },
          minuteAnimatedStyle,
        ]}
        contentFit="contain"
      />
    </View>
  );
}
