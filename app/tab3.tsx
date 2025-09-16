import { Host, Switch } from "@expo/ui/swift-ui";
import { GlassContainer, GlassView } from "expo-glass-effect";
import { ImageBackground } from "expo-image";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Tab3() {
  const image = require("../assets/images/bg_water.jpg");
  const [likesDogs, setLikesDogs] = useState<boolean>(true);
  const [likesCats, setLikesCats] = useState<boolean>(true);

  return (
    <View style={styles.pageContainer}>
      <ImageBackground source={image} style={styles.backgroundImage}>
        <View style={styles.columnContainer}>
          <GlassContainer spacing={10} style={styles.rowContainer}>
            <GlassView
              style={styles.glassView}
              glassEffectStyle="clear"
              isInteractive
            >
              <Text style={styles.header}>Toggles</Text>
              <Host style={{ width: 150, height: 50 }} matchContents>
                <Switch
                  value={likesDogs}
                  onValueChange={(value) => {
                    setLikesDogs(value);
                  }}
                  label="I like Dogs"
                  variant="switch"
                />
              </Host>
              <Host
                style={{ width: 150, height: 50, margin: 10 }}
                matchContents
              >
                <Switch
                  value={likesCats}
                  onValueChange={(value) => {
                    setLikesCats(value);
                  }}
                  label="I love Cats"
                  variant="switch"
                  color="blue"
                />
              </Host>
            </GlassView>
          </GlassContainer>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#ffffffff",
  },
  columnContainer: {
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
  glassView: {
    marginTop: 20,
    width: 300,
    height: 200,
    borderRadius: 60,
    backgroundColor: "#ff000036",
    justifyContent: "center",
    alignItems: "center",
  },
});
