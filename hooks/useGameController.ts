import * as Haptics from "expo-haptics";
import { useState } from "react";
import { GestureResponderEvent } from "react-native";

export type ButtonName = "x" | "circle" | "triangle" | "square";
export type ArrowName = "up" | "down" | "left" | "right";

export const useGameController = () => {
  const [pressedButtons, setPressedButtons] = useState<Set<ButtonName>>(new Set());
  const [pressedArrows, setPressedArrows] = useState<Set<ArrowName>>(new Set());

  const getDirectionsFromPosition = (
    x: number,
    y: number,
    centerX: number,
    centerY: number
  ): Set<ArrowName> => {
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

  const getButtonsFromPosition = (
    x: number,
    y: number,
    centerX: number,
    centerY: number
  ): Set<ButtonName> => {
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

  const handleArrowPadTouch = (event: GestureResponderEvent) => {
    const { locationX, locationY } = event.nativeEvent;

    // Get directions based on touch position relative to D-pad center
    const newDirections = getDirectionsFromPosition(locationX, locationY, 80, 80);

    // Find what changed
    const currentPressed = new Set(pressedArrows);
    const toAdd = new Set<ArrowName>();

    // Find buttons to press
    newDirections.forEach((dir) => {
      if (!currentPressed.has(dir)) {
        toAdd.add(dir);
      }
    });

    // Apply changes with haptic feedback
    if (toAdd.size > 0 || currentPressed.size !== newDirections.size) {
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

  const handleButtonPadTouch = (event: GestureResponderEvent) => {
    const { locationX, locationY } = event.nativeEvent;

    // Get buttons based on touch position relative to button pad center
    const newButtons = getButtonsFromPosition(locationX, locationY, 80, 80);

    // Find what changed
    const currentPressed = new Set(pressedButtons);
    const toAdd = new Set<ButtonName>();

    // Find buttons to press
    newButtons.forEach((btn) => {
      if (!currentPressed.has(btn)) {
        toAdd.add(btn);
      }
    });

    // Apply changes with haptic feedback
    if (toAdd.size > 0 || currentPressed.size !== newButtons.size) {
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

  const getStatusText = () => {
    const allPressed = [
      ...Array.from(pressedButtons).map((b) => b.toUpperCase()),
      ...Array.from(pressedArrows).map((a) => a.toUpperCase()),
    ];
    if (allPressed.length === 0) return "No buttons pressed";
    return `You pressed ${allPressed.join(", ")}!`;
  };

  return {
    pressedButtons,
    pressedArrows,
    handleArrowPadTouch,
    handleArrowPadRelease,
    handleButtonPadTouch,
    handleButtonPadRelease,
    getStatusText,
  };
};