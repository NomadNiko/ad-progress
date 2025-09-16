import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import React, { useState } from "react";
import { 
  ImageSourcePropType, 
  StyleSheet, 
  Text, 
  View, 
  GestureResponderEvent
} from "react-native";

type ButtonName = "x" | "circle" | "triangle" | "square";
type ArrowName = "up" | "down" | "left" | "right";

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

const arrowImages: Record<
  ArrowName,
  { normal: ImageSourcePropType; pressed: ImageSourcePropType }
> = {
  up: {
    normal: require("../assets/buttons/red-hex-up.png"),
    pressed: require("../assets/buttons/red-hex-up-pressed.png"),
  },
  down: {
    normal: require("../assets/buttons/red-hex-down.png"),
    pressed: require("../assets/buttons/red-hex-down-pressed.png"),
  },
  left: {
    normal: require("../assets/buttons/red-hex-left.png"),
    pressed: require("../assets/buttons/red-hex-left-pressed.png"),
  },
  right: {
    normal: require("../assets/buttons/red-hex-right.png"),
    pressed: require("../assets/buttons/red-hex-right-pressed.png"),
  },
};

export default function Tab2(): React.JSX.Element {
  const [pressedButtons, setPressedButtons] = useState<Set<ButtonName>>(
    new Set()
  );
  const [pressedArrows, setPressedArrows] = useState<Set<ArrowName>>(new Set());

  const getButtonsFromPosition = (x: number, y: number, centerX: number, centerY: number): Set<ButtonName> => {
    const buttons = new Set<ButtonName>();
    
    // Calculate relative position from center
    const dx = x - centerX;
    const dy = y - centerY;
    
    // Calculate distance from center
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Dead zone in the very center (20% of radius)
    if (distance < 16) {
      return buttons;
    }
    
    // Calculate angle in degrees (0 = right, 90 = up, 180 = left, 270 = down)
    const angle = Math.atan2(-dy, dx) * (180 / Math.PI);
    const normalizedAngle = (angle + 360) % 360;
    
    // Determine buttons based on angle
    // Use 45-degree segments for 8-way input
    if (normalizedAngle >= 337.5 || normalizedAngle < 22.5) {
      buttons.add("circle"); // Right
    } else if (normalizedAngle >= 22.5 && normalizedAngle < 67.5) {
      buttons.add("circle"); // Right-Up diagonal
      buttons.add("triangle");
    } else if (normalizedAngle >= 67.5 && normalizedAngle < 112.5) {
      buttons.add("triangle"); // Up
    } else if (normalizedAngle >= 112.5 && normalizedAngle < 157.5) {
      buttons.add("triangle"); // Up-Left diagonal
      buttons.add("square");
    } else if (normalizedAngle >= 157.5 && normalizedAngle < 202.5) {
      buttons.add("square"); // Left
    } else if (normalizedAngle >= 202.5 && normalizedAngle < 247.5) {
      buttons.add("square"); // Left-Down diagonal
      buttons.add("x");
    } else if (normalizedAngle >= 247.5 && normalizedAngle < 292.5) {
      buttons.add("x"); // Down
    } else if (normalizedAngle >= 292.5 && normalizedAngle < 337.5) {
      buttons.add("x"); // Down-Right diagonal
      buttons.add("circle");
    }
    
    return buttons;
  };

  const handleButtonPadTouch = (event: GestureResponderEvent) => {
    const { locationX, locationY } = event.nativeEvent;
    
    // Get buttons based on touch position relative to button pad center
    const newButtons = getButtonsFromPosition(locationX, locationY, 80, 80);
    
    // Find what changed
    const currentPressed = new Set(pressedButtons);
    const toAdd = new Set<ButtonName>();
    const toRemove = new Set<ButtonName>();
    
    // Find buttons to press
    newButtons.forEach(btn => {
      if (!currentPressed.has(btn)) {
        toAdd.add(btn);
      }
    });
    
    // Find buttons to release
    currentPressed.forEach(btn => {
      if (!newButtons.has(btn)) {
        toRemove.add(btn);
      }
    });
    
    // Apply changes with haptic feedback
    if (toAdd.size > 0 || toRemove.size > 0) {
      if (toAdd.size > 0) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
      setPressedButtons(newButtons);
    }
  };

  const handleButtonPadRelease = () => {
    if (pressedButtons.size > 0) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
      setPressedButtons(new Set());
    }
  };

  const getDirectionsFromPosition = (x: number, y: number, centerX: number, centerY: number): Set<ArrowName> => {
    const directions = new Set<ArrowName>();
    
    // Calculate relative position from center
    const dx = x - centerX;
    const dy = y - centerY;
    
    // Calculate distance from center
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Dead zone in the very center (20% of radius)
    if (distance < 16) {
      return directions;
    }
    
    // Calculate angle in degrees (0 = right, 90 = up, 180 = left, 270 = down)
    const angle = Math.atan2(-dy, dx) * (180 / Math.PI);
    const normalizedAngle = (angle + 360) % 360;
    
    // Determine directions based on angle
    // Use 45-degree segments for 8-way directional input
    if (normalizedAngle >= 337.5 || normalizedAngle < 22.5) {
      directions.add("right");
    } else if (normalizedAngle >= 22.5 && normalizedAngle < 67.5) {
      directions.add("right");
      directions.add("up");
    } else if (normalizedAngle >= 67.5 && normalizedAngle < 112.5) {
      directions.add("up");
    } else if (normalizedAngle >= 112.5 && normalizedAngle < 157.5) {
      directions.add("up");
      directions.add("left");
    } else if (normalizedAngle >= 157.5 && normalizedAngle < 202.5) {
      directions.add("left");
    } else if (normalizedAngle >= 202.5 && normalizedAngle < 247.5) {
      directions.add("left");
      directions.add("down");
    } else if (normalizedAngle >= 247.5 && normalizedAngle < 292.5) {
      directions.add("down");
    } else if (normalizedAngle >= 292.5 && normalizedAngle < 337.5) {
      directions.add("down");
      directions.add("right");
    }
    
    return directions;
  };

  const handleArrowPadTouch = (event: GestureResponderEvent) => {
    const { locationX, locationY } = event.nativeEvent;
    
    // Get directions based on touch position relative to D-pad center
    const newDirections = getDirectionsFromPosition(locationX, locationY, 80, 80);
    
    // Find what changed
    const currentPressed = new Set(pressedArrows);
    const toAdd = new Set<ArrowName>();
    const toRemove = new Set<ArrowName>();
    
    // Find buttons to press
    newDirections.forEach(dir => {
      if (!currentPressed.has(dir)) {
        toAdd.add(dir);
      }
    });
    
    // Find buttons to release
    currentPressed.forEach(dir => {
      if (!newDirections.has(dir)) {
        toRemove.add(dir);
      }
    });
    
    // Apply changes with haptic feedback
    if (toAdd.size > 0 || toRemove.size > 0) {
      if (toAdd.size > 0) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
      setPressedArrows(newDirections);
    }
  };

  const handleArrowPadRelease = () => {
    if (pressedArrows.size > 0) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
      setPressedArrows(new Set());
    }
  };

  const getStatusText = () => {
    const allPressed = [
      ...Array.from(pressedButtons).map((b) => b.toUpperCase()),
      ...Array.from(pressedArrows).map((a) => a.toUpperCase()),
    ];
    if (allPressed.length === 0) return "No buttons pressed";
    return `You pressed ${allPressed.join(", ")}!`;
  };

  const getButtonImage = (button: ButtonName, isPressed: boolean) => {
    return buttonImages[button][isPressed ? "pressed" : "normal"];
  };

  const getArrowImage = (arrow: ArrowName, isPressed: boolean) => {
    return arrowImages[arrow][isPressed ? "pressed" : "normal"];
  };

  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>{getStatusText()}</Text>

      {/* Arrow Pad - Left Side */}
      <View style={styles.arrowPadArea}>
        <View 
          style={styles.arrowPadContainer}
          onTouchStart={handleArrowPadTouch}
          onTouchMove={handleArrowPadTouch}
          onTouchEnd={handleArrowPadRelease}
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

      {/* Button Controller - Right Side */}
      <View style={styles.controllerArea}>
        <View 
          style={styles.diamondContainer}
          onTouchStart={handleButtonPadTouch}
          onTouchMove={handleButtonPadTouch}
          onTouchEnd={handleButtonPadRelease}
        >
          {/* Triangle Button - Top */}
          <View style={[styles.button, styles.topButton]} pointerEvents="none">
            <Image
              source={getButtonImage(
                "triangle",
                pressedButtons.has("triangle")
              )}
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
