import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { DPad, ActionButtons } from "../components/GameController";
import { useGameController } from "../hooks/useGameController";

export default function Tab2(): React.JSX.Element {
  const {
    pressedButtons,
    pressedArrows,
    handleArrowPadTouch,
    handleArrowPadRelease,
    handleButtonPadTouch,
    handleButtonPadRelease,
    getStatusText,
  } = useGameController();

  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>{getStatusText()}</Text>

      <DPad
        pressedArrows={pressedArrows}
        onTouchStart={handleArrowPadTouch}
        onTouchMove={handleArrowPadTouch}
        onTouchEnd={handleArrowPadRelease}
      />

      <ActionButtons
        pressedButtons={pressedButtons}
        onTouchStart={handleButtonPadTouch}
        onTouchMove={handleButtonPadTouch}
        onTouchEnd={handleButtonPadRelease}
      />
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
});