import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AnimatedClock from "../components/AnimatedClock";
import AnimatedClock2 from "../components/AnimatedClock2";
import AnimatedClock3 from "../components/AnimatedClock3";

export default function Index(): React.JSX.Element {
  return (
    // Use SafeAreaView as the root component to avoid UI intrusions
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Multiple Clocks Demo</Text>

        <View style={styles.clockRow}>
          <View style={styles.clockContainer}>
            <AnimatedClock speed={0.5} size={50} />
            <Text style={styles.label}>Half Speed</Text>
            <Text style={styles.sublabel}>0.5x</Text>
          </View>

          <View style={styles.clockContainer}>
            <AnimatedClock speed={0.5} size={50} />
            <Text style={styles.label}>Half Speed</Text>
            <Text style={styles.sublabel}>0.5x</Text>
          </View>

          <View style={styles.clockContainer}>
            <AnimatedClock2 speed={1} size={50} />
            <Text style={styles.label}>Normal Speed</Text>
            <Text style={styles.sublabel}>1x</Text>
          </View>

          <View style={styles.clockContainer}>
            <AnimatedClock2 speed={1} size={50} />
            <Text style={styles.label}>Normal Speed</Text>
            <Text style={styles.sublabel}>1x</Text>
          </View>
        </View>

        <View style={styles.clockContainer}>
          <AnimatedClock2 speed={2} size={50} />
          <Text style={styles.label}>Double Speed</Text>
          <Text style={styles.sublabel}>2x</Text>
        </View>

        <View style={styles.clockContainer}>
          <AnimatedClock speed={3} size={50} />
          <Text style={styles.label}>Triple Speed</Text>
          <Text style={styles.sublabel}>3x</Text>
        </View>

        <View style={styles.clockRow}>
          <View style={styles.clockContainer}>
            <AnimatedClock2 speed={2} size={50} />
            <Text style={styles.label}>Double Speed</Text>
            <Text style={styles.sublabel}>2x</Text>
          </View>

          <View style={styles.clockContainer}>
            <AnimatedClock3 speed={3} size={50} />
            <Text style={styles.label}>Triple Speed</Text>
            <Text style={styles.sublabel}>3x</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Style for the SafeAreaView component
  safeArea: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  // Style for the ScrollView's content container
  container: {
    flexGrow: 1,
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#333",
  },
  clockRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
  },
  clockContainer: {
    alignItems: "center",
  },
  label: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  sublabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
});
