import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useClockRotate } from "../hooks/useClockRotate";

// Example of using the hook directly with custom images
export default function CustomClockExample() {
  // You can use the hook directly for more control
  const blueClockData = useClockRotate({
    baseImage: require("../assets/images/Clock_Base.png"),
    hourImage: require("../assets/images/Clock_Hour.png"),
    minuteImage: require("../assets/images/Clock_Minute.png"),
    speed: 2,
    size: 200,
    style: {
      borderWidth: 3,
      borderColor: "#4A90E2",
      borderRadius: 100,
      backgroundColor: "#E8F4FD",
    },
  });

  const redClockData = useClockRotate({
    baseImage: require("../assets/images/Clock_Base.png"),
    hourImage: require("../assets/images/Clock_Hour.png"),
    minuteImage: require("../assets/images/Clock_Minute.png"),
    speed: 0.75,
    size: 200,
    style: {
      borderWidth: 3,
      borderColor: "#E24A4A",
      borderRadius: 100,
      backgroundColor: "#FDE8E8",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Custom Styled Clocks</Text>

      <View style={styles.row}>
        <View style={styles.clockWrapper}>
          <blueClockData.ClockComponent />
          <Text style={styles.label}>Fast Blue Clock</Text>
        </View>

        <View style={styles.clockWrapper}>
          <redClockData.ClockComponent />
          <Text style={styles.label}>Slow Red Clock</Text>
        </View>
      </View>

      <Text style={styles.note}>
        You can access rotation values directly:{"\n"}
        Blue minute rotation: {blueClockData.minuteRotation.value?.toFixed(0)}°
        {"\n"}
        Red hour rotation: {redClockData.hourRotation.value?.toFixed(0)}°
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  clockWrapper: {
    alignItems: "center",
  },
  label: {
    marginTop: 10,
    fontSize: 14,
    color: "#666",
  },
  note: {
    marginTop: 20,
    fontSize: 12,
    color: "#999",
    textAlign: "center",
    lineHeight: 18,
  },
});
