import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import React, { useState } from "react";
import { ImageSourcePropType, StyleSheet, Text, View } from "react-native";

type ButtonName = "x" | "circle" | "triangle" | "square";

const buttonImages: Record<
  ButtonName,
  { normal: ImageSourcePropType; pressed: ImageSourcePropType }
> = {
  x: {
    normal: require("../assets/buttons/yellow-hex-x.png"),
    pressed: require("../assets/buttons/yellow-hex-x-pressed.png"),
  },
  circle: {
    normal: require("../assets/buttons/yellow-hex-circle.png"),
    pressed: require("../assets/buttons/yellow-hex-circle-pressed.png"),
  },
  triangle: {
    normal: require("../assets/buttons/yellow-hex-triangle.png"),
    pressed: require("../assets/buttons/yellow-hex-triangle-pressed.png"),
  },
  square: {
    normal: require("../assets/buttons/yellow-hex-square.png"),
    pressed: require("../assets/buttons/yellow-hex-square-pressed.png"),
  },
};

export default function Tab2(): React.JSX.Element {
  const [pressedButtons, setPressedButtons] = useState<Set<ButtonName>>(
    new Set()
  );

  const handlePressIn = (button: ButtonName) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setPressedButtons((prev) => new Set(prev).add(button));
  };

  const handlePressOut = (button: ButtonName) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    setPressedButtons((prev) => {
      const newSet = new Set(prev);
      newSet.delete(button);
      return newSet;
    });
  };

  const getStatusText = () => {
    if (pressedButtons.size === 0) return "No buttons pressed";
    const pressed = Array.from(pressedButtons)
      .map((b) => b.toUpperCase())
      .join(", ");
    return `You pressed ${pressed}!`;
  };

  const getButtonImage = (button: ButtonName, isPressed: boolean) => {
    return buttonImages[button][isPressed ? "pressed" : "normal"];
  };

  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>{getStatusText()}</Text>

      <View style={styles.controllerArea}>
        <View style={styles.diamondContainer}>
          {/* X Button - Top */}
          <View
            onTouchStart={() => handlePressIn("x")}
            onTouchEnd={() => handlePressOut("x")}
            style={[styles.button, styles.topButton]}
          >
            <Image
              source={getButtonImage("x", pressedButtons.has("x"))}
              style={styles.buttonImage}
              contentFit="contain"
            />
          </View>

          {/* Circle Button - Right */}
          <View
            onTouchStart={() => handlePressIn("circle")}
            onTouchEnd={() => handlePressOut("circle")}
            style={[styles.button, styles.rightButton]}
          >
            <Image
              source={getButtonImage("circle", pressedButtons.has("circle"))}
              style={styles.buttonImage}
              contentFit="contain"
            />
          </View>

          {/* Triangle Button - Bottom */}
          <View
            onTouchStart={() => handlePressIn("triangle")}
            onTouchEnd={() => handlePressOut("triangle")}
            style={[styles.button, styles.bottomButton]}
          >
            <Image
              source={getButtonImage(
                "triangle",
                pressedButtons.has("triangle")
              )}
              style={styles.buttonImage}
              contentFit="contain"
            />
          </View>

          {/* Square Button - Left */}
          <View
            onTouchStart={() => handlePressIn("square")}
            onTouchEnd={() => handlePressOut("square")}
            style={[styles.button, styles.leftButton]}
          >
            <Image
              source={getButtonImage("square", pressedButtons.has("square"))}
              style={styles.buttonImage}
              contentFit="contain"
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  statusText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginTop: 60,
  },
  controllerArea: {
    position: "absolute",
    bottom: 100,
    left: 0,
    right: 0,
    height: "33%",
    justifyContent: "center",
    alignItems: "center",
  },
  diamondContainer: {
    width: 200,
    height: 200,
    position: "relative",
  },
  button: {
    position: "absolute",
    width: 80,
    height: 80,
  },
  buttonImage: {
    width: "100%",
    height: "100%",
  },
  topButton: {
    top: 0,
    left: "50%",
    transform: [{ translateX: -40 }],
  },
  rightButton: {
    top: "50%",
    right: 0,
    transform: [{ translateY: -40 }],
  },
  bottomButton: {
    bottom: 0,
    left: "50%",
    transform: [{ translateX: -40 }],
  },
  leftButton: {
    top: "50%",
    left: 0,
    transform: [{ translateY: -40 }],
  },
});
