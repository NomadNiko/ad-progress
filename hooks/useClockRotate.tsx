import React from "react";
import { View, ViewStyle, ImageSourcePropType } from "react-native";
import { Image } from "expo-image";
import Animated from "react-native-reanimated";
import { useRotateObject } from "./useRotateObject";

const AnimatedImage = Animated.createAnimatedComponent(Image);

interface UseClockRotateProps {
  baseImage: ImageSourcePropType;
  hourImage: ImageSourcePropType;
  minuteImage: ImageSourcePropType;
  speed?: number; // Speed multiplier (1 = default, 2 = twice as fast, 0.5 = half speed)
  size?: number; // Size of the clock in pixels
  style?: ViewStyle;
}

export function useClockRotate({
  baseImage,
  hourImage,
  minuteImage,
  speed = 1,
  size = 300,
  style,
}: UseClockRotateProps) {
  // Base duration for minute hand (6 seconds for demo, adjust as needed)
  const baseMinuteDuration = 6000;

  // Calculate actual durations based on speed
  const minuteDuration = baseMinuteDuration / speed;
  const hourDuration = minuteDuration * 12; // Hour hand is 12x slower

  // Use the rotation hook for each hand
  const minuteRotation = useRotateObject({ duration: minuteDuration });
  const hourRotation = useRotateObject({ duration: hourDuration });

  // Create the clock component
  const ClockComponent = React.memo(() => (
    <View
      style={[
        {
          width: size,
          height: size,
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
        },
        style,
      ]}
    >
      {/* Base layer - static */}
      <Image
        source={baseImage}
        style={{
          width: size,
          height: size,
          position: "absolute",
        }}
        contentFit="contain"
        cachePolicy="memory-disk"
        recyclingKey={`clock-base-${size}`}
      />

      {/* Hour hand - middle layer, slower rotation */}
      <AnimatedImage
        source={hourImage}
        style={[
          {
            width: size,
            height: size,
            position: "absolute",
          },
          hourRotation.animatedStyle,
        ]}
        contentFit="contain"
        cachePolicy="memory-disk"
        recyclingKey={`clock-hour-${size}`}
      />

      {/* Minute hand - top layer, faster rotation */}
      <AnimatedImage
        source={minuteImage}
        style={[
          {
            width: size,
            height: size,
            position: "absolute",
          },
          minuteRotation.animatedStyle,
        ]}
        contentFit="contain"
        cachePolicy="memory-disk"
        recyclingKey={`clock-minute-${size}`}
      />
    </View>
  ));

  ClockComponent.displayName = "ClockComponent";

  return {
    ClockComponent,
    minuteRotation: minuteRotation.rotation,
    hourRotation: hourRotation.rotation,
    minuteStyle: minuteRotation.animatedStyle,
    hourStyle: hourRotation.animatedStyle,
  };
}
