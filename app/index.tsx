import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AnimatedClock from "../components/AnimatedClock";

export default function Index(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <AnimatedClock />

      <View style={styles.card}>
        <Text style={styles.title}>Animated Clock Demo</Text>
        <Text style={styles.subtitle}>
          Minute hand: 1 rotation per 6 seconds
        </Text>
        <Text style={styles.subtitleLast}>
          Hour hand: 1 rotation per 72 seconds
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  card: {
    marginTop: 30,
    padding: 20,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: "#000",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  subtitle: {
    marginTop: 5,
    fontSize: 12,
    color: "#999",
  },
  subtitleLast: {
    fontSize: 12,
    color: "#999",
  },
});
