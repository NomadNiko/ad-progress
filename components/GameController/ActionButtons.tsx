import { Image } from "expo-image";
import React from "react";
import { View, StyleSheet, ImageSourcePropType, GestureResponderEvent } from "react-native";
import type { ButtonName } from "../../hooks/useGameController";

interface ActionButtonsProps {
  pressedButtons: Set<ButtonName>;
  onTouchStart: (event: GestureResponderEvent) => void;
  onTouchMove: (event: GestureResponderEvent) => void;
  onTouchEnd: () => void;
}

const buttonImages: Record<
  ButtonName,
  { normal: ImageSourcePropType; pressed: ImageSourcePropType }
> = {
  x: {
    normal: require("../../assets/buttons/yellow-hex-x.png"),
    pressed: require("../../assets/buttons/yellow-hex-x-pressed.png"),
  },
  circle: {
    normal: require("../../assets/buttons/yellow-hex-circle.png"),
    pressed: require("../../assets/buttons/yellow-hex-circle-pressed.png"),
  },
  triangle: {
    normal: require("../../assets/buttons/yellow-hex-triangle.png"),
    pressed: require("../../assets/buttons/yellow-hex-triangle-pressed.png"),
  },
  square: {
    normal: require("../../assets/buttons/yellow-hex-square.png"),
    pressed: require("../../assets/buttons/yellow-hex-square-pressed.png"),
  },
};

const getButtonImage = (button: ButtonName, isPressed: boolean) => {
  return buttonImages[button][isPressed ? "pressed" : "normal"];
};

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  pressedButtons,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}) => {
  return (
    <View style={styles.controllerArea}>
      <View
        style={styles.diamondContainer}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Triangle Button - Top */}
        <View style={[styles.button, styles.topButton]} pointerEvents="none">
          <Image
            source={getButtonImage("triangle", pressedButtons.has("triangle"))}
            style={styles.buttonImage}
            contentFit="contain"
          />
        </View>

        {/* Circle Button - Right */}
        <View style={[styles.button, styles.rightButton]} pointerEvents="none">
          <Image
            source={getButtonImage("circle", pressedButtons.has("circle"))}
            style={styles.buttonImage}
            contentFit="contain"
          />
        </View>

        {/* X Button - Bottom */}
        <View style={[styles.button, styles.bottomButton]} pointerEvents="none">
          <Image
            source={getButtonImage("x", pressedButtons.has("x"))}
            style={styles.buttonImage}
            contentFit="contain"
          />
        </View>

        {/* Square Button - Left */}
        <View style={[styles.button, styles.leftButton]} pointerEvents="none">
          <Image
            source={getButtonImage("square", pressedButtons.has("square"))}
            style={styles.buttonImage}
            contentFit="contain"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  controllerArea: {
    position: "absolute",
    bottom: 100,
    right: 20,
    height: "33%",
    justifyContent: "center",
    alignItems: "center",
  },
  diamondContainer: {
    width: 160,
    height: 160,
    position: "relative",
  },
  button: {
    position: "absolute",
    width: 60,
    height: 60,
  },
  buttonImage: {
    width: "100%",
    height: "100%",
  },
  topButton: {
    top: 0,
    left: "50%",
    transform: [{ translateX: -30 }],
  },
  rightButton: {
    top: "50%",
    right: 0,
    transform: [{ translateY: -30 }],
  },
  bottomButton: {
    bottom: 0,
    left: "50%",
    transform: [{ translateX: -30 }],
  },
  leftButton: {
    top: "50%",
    left: 0,
    transform: [{ translateY: -30 }],
  },
});