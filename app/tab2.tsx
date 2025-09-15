import { Button, ContextMenu, Host, Picker } from "@expo/ui/swift-ui";
import { GlassView } from "expo-glass-effect";
import { ImageBackground } from "expo-image";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";

export default function Tab2(): React.JSX.Element {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [selectedMoneyIndex, setSelectedMoneyIndex] = useState<number>(0);
  const pickerOptions = ["User", "Admin", "Vendor"];
  const image = require("../assets/images/bg_light.jpg");

  return (
    // Use SafeAreaView as the root component to avoid UI intrusions

    <ImageBackground source={image} style={styles.backgroundImage}>
      {/* Basic Glass View */}
      <GlassView
        style={styles.regularGlassView}
        glassEffectStyle="regular"
        isInteractive
      >
        <Text style={styles.header}>Regular Glass Effect</Text>

        <Host style={{ width: 150, height: 50 }}>
          <ContextMenu>
            <ContextMenu.Items>
              <Button
                systemImage="person.crop.circle.badge.xmark"
                onPress={() => {
                  console.log("Navigated to Settings via Dropdown");
                  router.push("/");
                }}
              >
                Push to Tab1
              </Button>
              <Picker
                label="Account Type"
                options={pickerOptions}
                variant="menu"
                selectedIndex={selectedIndex}
                onOptionSelected={({ nativeEvent: { index } }) => {
                  console.log(`Selected option: ${pickerOptions[index]}`);
                  setSelectedIndex(index);
                }}
              />
            </ContextMenu.Items>
            <ContextMenu.Trigger>
              <Button variant="glass">Guest Accounts</Button>
            </ContextMenu.Trigger>
          </ContextMenu>
        </Host>
      </GlassView>
      {/* Glass View with clear style */}
      <GlassView style={styles.clearGlassView} glassEffectStyle="clear">
        <Text style={styles.header}>Clear Glass Effect</Text>
        <Host style={{ width: 280, height: 60 }} matchContents>
          <Picker
            options={["$", "$$", "$$$", "$$$$"]}
            selectedIndex={selectedMoneyIndex}
            onOptionSelected={({ nativeEvent: { index } }) => {
              setSelectedMoneyIndex(index);
            }}
            variant="segmented"
          />
        </Host>
      </GlassView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  regularGlassView: {
    position: "absolute",
    top: 100,
    width: 340,
    height: 200,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#15ff0063",
  },
  clearGlassView: {
    position: "absolute",
    top: 350,
    width: 350,
    height: 160,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#004dc098",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#ffffffff",
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
