import Animated from "react-native-reanimated";

export function HelloWave() {
  return (
    <Animated.Text
      style={{
        fontSize: 28,
        lineHeight: 32,
        marginTop: -6,
        animationName: {
          "50%": { transform: [{ rotate: "25deg" }] },
        },
        animationIterationCount: 100,
        animationDuration: "30000ms",
      }}
    >
      👋
    </Animated.Text>
  );
}
