import { GlassContainer, GlassView } from "expo-glass-effect";
import * as Haptics from "expo-haptics";
import { ImageBackground } from "expo-image";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { SlideInLeft, SlideOutRight } from "react-native-reanimated";

export default function Tab4() {
  const image = require("../assets/images/bg_dark.jpg");
  const [digits, setDigits] = useState<{ id: number; value: string }[]>([]);

  const handlePress = (digit: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setDigits((prev) => [...prev, { id: Date.now(), value: digit }]);
  };

  const handleBackspace = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setDigits((prev) => prev.slice(0, -1));
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.backgroundImage}>
        <View style={styles.displayContainer}>
          <View style={styles.digitContainer}>
            {digits.length === 0 ? (
              <Text style={styles.placeholderText}>Enter number</Text>
            ) : (
              digits.map((digit) => (
                <Animated.Text
                  key={digit.id}
                  style={styles.digitText}
                  entering={SlideInLeft}
                  exiting={SlideOutRight}
                >
                  {digit.value}
                </Animated.Text>
              ))
            )}
          </View>
          <Pressable
            onPress={handleBackspace}
            style={styles.backspaceButtonContainer}
          >
            <GlassView
              style={styles.backspaceButton}
              glassEffectStyle="regular"
              isInteractive
            >
              <Text style={styles.backspaceText}>⌫</Text>
            </GlassView>
          </Pressable>
        </View>
        <View style={styles.mainContainer}>
          {/* Row 1: 1, 2, 3 */}
          <GlassContainer spacing={20} style={styles.rowContainer}>
            <Pressable onPress={() => handlePress("1")}>
              <GlassView
                style={styles.pinButton}
                glassEffectStyle="regular"
                isInteractive
              >
                <Text style={styles.pinText}>1</Text>
              </GlassView>
            </Pressable>
            <Pressable onPress={() => handlePress("2")}>
              <GlassView
                style={styles.pinButton}
                glassEffectStyle="regular"
                isInteractive
              >
                <Text style={styles.pinText}>2</Text>
              </GlassView>
            </Pressable>
            <Pressable onPress={() => handlePress("3")}>
              <GlassView
                style={styles.pinButton}
                glassEffectStyle="regular"
                isInteractive
              >
                <Text style={styles.pinText}>3</Text>
              </GlassView>
            </Pressable>
          </GlassContainer>

          {/* Row 2: 4, 5, 6 */}
          <GlassContainer spacing={20} style={styles.rowContainer}>
            <Pressable onPress={() => handlePress("4")}>
              <GlassView
                style={styles.pinButton}
                glassEffectStyle="regular"
                isInteractive
              >
                <Text style={styles.pinText}>4</Text>
              </GlassView>
            </Pressable>
            <Pressable onPress={() => handlePress("5")}>
              <GlassView
                style={styles.pinButton}
                glassEffectStyle="regular"
                isInteractive
              >
                <Text style={styles.pinText}>5</Text>
              </GlassView>
            </Pressable>
            <Pressable onPress={() => handlePress("6")}>
              <GlassView
                style={styles.pinButton}
                glassEffectStyle="regular"
                isInteractive
              >
                <Text style={styles.pinText}>6</Text>
              </GlassView>
            </Pressable>
          </GlassContainer>

          {/* Row 3: 7, 8, 9 */}
          <GlassContainer spacing={20} style={styles.rowContainer}>
            <Pressable onPress={() => handlePress("7")}>
              <GlassView
                style={styles.pinButton}
                glassEffectStyle="regular"
                isInteractive
              >
                <Text style={styles.pinText}>7</Text>
              </GlassView>
            </Pressable>
            <Pressable onPress={() => handlePress("8")}>
              <GlassView
                style={styles.pinButton}
                glassEffectStyle="regular"
                isInteractive
              >
                <Text style={styles.pinText}>8</Text>
              </GlassView>
            </Pressable>
            <Pressable onPress={() => handlePress("9")}>
              <GlassView
                style={styles.pinButton}
                glassEffectStyle="regular"
                isInteractive
              >
                <Text style={styles.pinText}>9</Text>
              </GlassView>
            </Pressable>
          </GlassContainer>

          {/* Row 4: *, 0, # */}
          <GlassContainer spacing={20} style={styles.rowContainer}>
            <Pressable onPress={() => handlePress("*")}>
              <GlassView
                style={styles.pinButton}
                glassEffectStyle="regular"
                isInteractive
              >
                <Text style={styles.pinText}>*</Text>
              </GlassView>
            </Pressable>
            <Pressable onPress={() => handlePress("0")}>
              <GlassView
                style={styles.pinButton}
                glassEffectStyle="regular"
                isInteractive
              >
                <Text style={styles.pinText}>0</Text>
              </GlassView>
            </Pressable>
            <Pressable onPress={() => handlePress("#")}>
              <GlassView
                style={styles.pinButton}
                glassEffectStyle="regular"
                isInteractive
              >
                <Text style={styles.pinText}>#</Text>
              </GlassView>
            </Pressable>
          </GlassContainer>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  mainContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    paddingTop: 80,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  pinButton: {
    width: 75,
    height: 75,
    borderRadius: 50,
    backgroundColor: "#ffffff15",
    justifyContent: "center",
    alignItems: "center",
  },
  pinText: {
    fontSize: 28,
    fontWeight: "600",
    color: "#ffffff",
  },
  displayContainer: {
    position: "absolute",
    top: 120,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  digitContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  digitText: {
    fontSize: 42,
    fontWeight: "300",
    color: "#ffffff",
    letterSpacing: 2,
  },
  placeholderText: {
    fontSize: 42,
    fontWeight: "300",
    color: "rgba(255, 255, 255, 0.5)",
    letterSpacing: 2,
  },
  backspaceButtonContainer: {
    position: "absolute",
    right: 20,
    top: 0,
  },
  backspaceButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  backspaceText: {
    fontSize: 20,
    color: "#ffffff",
  },
});
