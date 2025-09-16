import { GlassContainer, GlassView } from "expo-glass-effect";
import { ImageBackground } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

export default function Tab4() {
  const image = require("../assets/images/bg_dark.jpg");

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.backgroundImage}>
        <View style={styles.mainContainer}>
          {/* Row 1: 1, 2, 3 */}
          <GlassContainer spacing={20} style={styles.rowContainer}>
            <GlassView
              style={styles.pinButton}
              glassEffectStyle="regular"
              isInteractive
            >
              <Text style={styles.pinText}>1</Text>
            </GlassView>
            <GlassView
              style={styles.pinButton}
              glassEffectStyle="regular"
              isInteractive
            >
              <Text style={styles.pinText}>2</Text>
            </GlassView>
            <GlassView
              style={styles.pinButton}
              glassEffectStyle="regular"
              isInteractive
            >
              <Text style={styles.pinText}>3</Text>
            </GlassView>
          </GlassContainer>

          {/* Row 2: 4, 5, 6 */}
          <GlassContainer spacing={20} style={styles.rowContainer}>
            <GlassView
              style={styles.pinButton}
              glassEffectStyle="regular"
              isInteractive
            >
              <Text style={styles.pinText}>4</Text>
            </GlassView>
            <GlassView
              style={styles.pinButton}
              glassEffectStyle="regular"
              isInteractive
            >
              <Text style={styles.pinText}>5</Text>
            </GlassView>
            <GlassView
              style={styles.pinButton}
              glassEffectStyle="regular"
              isInteractive
            >
              <Text style={styles.pinText}>6</Text>
            </GlassView>
          </GlassContainer>

          {/* Row 3: 7, 8, 9 */}
          <GlassContainer spacing={20} style={styles.rowContainer}>
            <GlassView
              style={styles.pinButton}
              glassEffectStyle="regular"
              isInteractive
            >
              <Text style={styles.pinText}>7</Text>
            </GlassView>
            <GlassView
              style={styles.pinButton}
              glassEffectStyle="regular"
              isInteractive
            >
              <Text style={styles.pinText}>8</Text>
            </GlassView>
            <GlassView
              style={styles.pinButton}
              glassEffectStyle="regular"
              isInteractive
            >
              <Text style={styles.pinText}>9</Text>
            </GlassView>
          </GlassContainer>

          {/* Row 4: *, 0, # */}
          <GlassContainer spacing={20} style={styles.rowContainer}>
            <GlassView
              style={styles.pinButton}
              glassEffectStyle="regular"
              isInteractive
            >
              <Text style={styles.pinText}>*</Text>
            </GlassView>
            <GlassView
              style={styles.pinButton}
              glassEffectStyle="regular"
              isInteractive
            >
              <Text style={styles.pinText}>0</Text>
            </GlassView>
            <GlassView
              style={styles.pinButton}
              glassEffectStyle="regular"
              isInteractive
            >
              <Text style={styles.pinText}>#</Text>
            </GlassView>
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
});
