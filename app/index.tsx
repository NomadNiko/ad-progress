import {
  Button,
  ColorPicker,
  ContextMenu,
  Host,
  Picker,
  Slider,
} from "@expo/ui/swift-ui";
import { GlassView } from "expo-glass-effect";
import { ImageBackground } from "expo-image";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";

export default function Index(): React.JSX.Element {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [regularOpacityIndex, setRegularOpacityIndex] = useState<number>(2);
  const [regularColor, setRegularColor] = useState<string>("#ff0000ff");
  const [clearOpacityValue, setClearOpacityValue] = useState<number>(0.25);
  const [clearColor, setClearColor] = useState<string>("#0051ffff");
  const pickerOptions = ["User", "Admin", "Vendor"];
  const image = require("../assets/images/bg_medium.jpg");

  // Opacity options and their corresponding hex values for the Picker
  const opacityOptions = ["0%", "25%", "50%", "75%", "100%"];
  const opacityValues = ["00", "40", "80", "BF", "FF"];

  // Function to get the background color with selected opacity (for Picker)
  const getBackgroundColor = (color: string, index: number) => {
    let baseColor = color;
    if (color.length === 9) {
      baseColor = color.substring(0, 7);
    } else if (color.length === 4) {
      baseColor = `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`;
    }
    return `${baseColor}${opacityValues[index]}`;
  };

  // Function to get background color with slider value
  const getSliderBackgroundColor = (color: string, value: number) => {
    let baseColor = color;
    if (color.length === 9) {
      baseColor = color.substring(0, 7);
    } else if (color.length === 4) {
      baseColor = `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`;
    }
    const hexOpacity = Math.round(value * 255)
      .toString(16)
      .padStart(2, "0")
      .toUpperCase();
    return `${baseColor}${hexOpacity}`;
  };

  return (
    <ImageBackground source={image} style={styles.backgroundImage}>
      {/* Regular Glass View with Picker for opacity */}
      <GlassView
        style={[
          styles.regularGlassView,
          {
            backgroundColor: getBackgroundColor(
              regularColor,
              regularOpacityIndex
            ),
          },
        ]}
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
                  router.push("/tab2");
                }}
              >
                Push to Tab2
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

        <Host style={{ width: 300, height: 60, marginTop: 10 }}>
          <Picker
            options={opacityOptions}
            selectedIndex={regularOpacityIndex}
            onOptionSelected={({ nativeEvent: { index } }) => {
              setRegularOpacityIndex(index);
              console.log(`Regular opacity set to: ${opacityOptions[index]}`);
            }}
            variant="segmented"
          />
        </Host>

        <Host style={styles.colorPickerRegular} matchContents>
          <ColorPicker
            label="Background Color"
            selection={regularColor}
            onValueChanged={(color) => {
              setRegularColor(color);
              console.log(`Regular color changed to: ${color}`);
            }}
          />
        </Host>
      </GlassView>

      {/* Clear Glass View with Slider for opacity */}
      <GlassView
        style={[
          styles.clearGlassView,
          {
            backgroundColor: getSliderBackgroundColor(
              clearColor,
              clearOpacityValue
            ),
          },
        ]}
        glassEffectStyle="clear"
        isInteractive
      >
        <Text style={styles.header}>Clear Glass Effect</Text>

        <Host style={{ width: 280, minHeight: 60 }}>
          <Slider
            value={clearOpacityValue}
            onValueChange={(value) => {
              setClearOpacityValue(value);
            }}
          />
        </Host>
        <Text style={styles.sliderLabel}>
          Opacity: {Math.round(clearOpacityValue * 100)}%
        </Text>

        <Host style={styles.colorPicker} matchContents>
          <ColorPicker
            label="Background Color"
            selection={clearColor}
            onValueChanged={(color) => {
              setClearColor(color);
              console.log(`Clear color changed to: ${color}`);
            }}
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
    top: 80,
    width: 350,
    height: 310,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  clearGlassView: {
    position: "absolute",
    top: 420,
    width: 350,
    height: 225,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#ffffffff",
  },
  opacityLabel: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
    color: "#ffffffDD",
  },
  sliderLabel: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 5,
    color: "#ffffffBB",
  },
  colorPicker: {
    marginTop: 12,
  },
  colorPickerRegular: {
    marginTop: 12,
  },
});
