import { GlassContainer, GlassView } from "expo-glass-effect";
import { ImageBackground } from "expo-image";
import { StyleSheet, View } from "react-native";

export default function Tab3() {
  const image = require("../assets/images/bg_light.jpg");

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.backgroundImage}>
        <View style={styles.mainContainer}>
          {/* Row 1: Clear glass shapes */}
          <GlassContainer spacing={10} style={styles.rowContainer}>
            <GlassView
              style={styles.glass1}
              glassEffectStyle="clear"
              isInteractive
            />
            <GlassView style={styles.glass2} glassEffectStyle="clear" />
            <GlassView
              style={styles.glass3}
              glassEffectStyle="clear"
              isInteractive
            />
          </GlassContainer>

          {/* Row 2: Regular glass shapes */}
          <GlassContainer spacing={10} style={styles.rowContainer}>
            <GlassView
              style={styles.glass1}
              glassEffectStyle="regular"
              isInteractive
            />
            <GlassView style={styles.glass2} glassEffectStyle="regular" />
            <GlassView
              style={styles.glass3}
              glassEffectStyle="regular"
              isInteractive
            />
          </GlassContainer>

          {/* Row 3: Mixed glass shapes */}
          <GlassContainer spacing={10} style={styles.rowContainer}>
            <GlassView
              style={styles.glass1}
              glassEffectStyle="clear"
              isInteractive
            />
            <GlassView style={styles.glass2} glassEffectStyle="regular" />
            <GlassView
              style={styles.glass3}
              glassEffectStyle="clear"
              isInteractive
            />
          </GlassContainer>

          {/* Row 4: Mixed glass shapes */}
          <GlassContainer spacing={10} style={styles.rowContainer}>
            <GlassView
              style={styles.glass1}
              glassEffectStyle="regular"
              isInteractive
            />
            <GlassView style={styles.glass2} glassEffectStyle="clear" />
            <GlassView
              style={styles.glass3}
              glassEffectStyle="regular"
              isInteractive
            />
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
    gap: 20,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  glass1: {
    marginRight: 20,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#ff000036",
  },
  glass2: {
    position: "absolute",
    width: 90,
    height: 30,
    borderRadius: 25,
  },
  glass3: {
    marginLeft: 20,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#0011ff36",
  },
});
