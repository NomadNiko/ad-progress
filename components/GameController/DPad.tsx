import { Image } from "expo-image";
import React from "react";
import { View, StyleSheet, ImageSourcePropType, GestureResponderEvent } from "react-native";
import type { ArrowName } from "../../hooks/useGameController";

interface DPadProps {
  pressedArrows: Set<ArrowName>;
  onTouchStart: (event: GestureResponderEvent) => void;
  onTouchMove: (event: GestureResponderEvent) => void;
  onTouchEnd: () => void;
}

const arrowImages: Record<
  ArrowName,
  { normal: ImageSourcePropType; pressed: ImageSourcePropType }
> = {
  up: {
    normal: require("../../assets/buttons/red-hex-up.png"),
    pressed: require("../../assets/buttons/red-hex-up-pressed.png"),
  },
  down: {
    normal: require("../../assets/buttons/red-hex-down.png"),
    pressed: require("../../assets/buttons/red-hex-down-pressed.png"),
  },
  left: {
    normal: require("../../assets/buttons/red-hex-left.png"),
    pressed: require("../../assets/buttons/red-hex-left-pressed.png"),
  },
  right: {
    normal: require("../../assets/buttons/red-hex-right.png"),
    pressed: require("../../assets/buttons/red-hex-right-pressed.png"),
  },
};

const getArrowImage = (arrow: ArrowName, isPressed: boolean) => {
  return arrowImages[arrow][isPressed ? "pressed" : "normal"];
};

export const DPad: React.FC<DPadProps> = ({
  pressedArrows,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}) => {
  return (
    <View style={styles.arrowPadArea}>
      <View
        style={styles.arrowPadContainer}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Up Arrow */}
        <View style={[styles.arrowButton, styles.upArrow]} pointerEvents="none">
          <Image
            source={getArrowImage("up", pressedArrows.has("up"))}
            style={styles.arrowImage}
            contentFit="contain"
          />
        </View>

        {/* Right Arrow */}
        <View style={[styles.arrowButton, styles.rightArrow]} pointerEvents="none">
          <Image
            source={getArrowImage("right", pressedArrows.has("right"))}
            style={styles.arrowImage}
            contentFit="contain"
          />
        </View>

        {/* Down Arrow */}
        <View style={[styles.arrowButton, styles.downArrow]} pointerEvents="none">
          <Image
            source={getArrowImage("down", pressedArrows.has("down"))}
            style={styles.arrowImage}
            contentFit="contain"
          />
        </View>

        {/* Left Arrow */}
        <View style={[styles.arrowButton, styles.leftArrow]} pointerEvents="none">
          <Image
            source={getArrowImage("left", pressedArrows.has("left"))}
            style={styles.arrowImage}
            contentFit="contain"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  arrowPadArea: {
    position: "absolute",
    bottom: 100,
    left: 20,
    height: "33%",
    justifyContent: "center",
    alignItems: "center",
  },
  arrowPadContainer: {
    width: 160,
    height: 160,
    position: "relative",
  },
  arrowButton: {
    position: "absolute",
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  upArrow: {
    top: -10,
    left: "50%",
    transform: [{ translateX: -40 }],
  },
  rightArrow: {
    top: "50%",
    right: -10,
    transform: [{ translateY: -40 }],
  },
  downArrow: {
    bottom: -10,
    left: "50%",
    transform: [{ translateX: -40 }],
  },
  leftArrow: {
    top: "50%",
    left: -10,
    transform: [{ translateY: -40 }],
  },
  arrowImage: {
    width: 60,
    height: 60,
  },
});