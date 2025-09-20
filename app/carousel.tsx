import { CAROUSEL_DATA, DATA_TYPE } from "@/constants/carousel";
import { GlassView } from "expo-glass-effect";
import { Image } from "expo-image";
import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  interpolate,
  runOnJS,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";

type RENDER_ITEM_TYPE = {
  item: DATA_TYPE;
  index: number;
  offsetX: SharedValue<number>;
};

const { width } = Dimensions.get("window");

const CARD_WIDTH = width * 0.85;
const CARD_HEIGHT = CARD_WIDTH * 1.618;

const RenderItem = ({ item, index, offsetX }: RENDER_ITEM_TYPE) => {
  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      offsetX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [-width * 0.5, 0, width * 0.5]
    );
    return {
      transform: [{ translateX: translateX }],
    };
  });

  return (
    <View style={styles.renderItemContainer}>
      <View style={styles.itemShadowContainer}>
        <Animated.View style={animatedStyle}>
          <Image
            source={{ uri: item.img }}
            placeholder={{ blurhash: item.blurHash }}
            contentFit={"cover"}
            style={styles.imageStyle}
          />
        </Animated.View>
      </View>
    </View>
  );
};

const CarouselScreen = () => {
  const offsetX = useSharedValue(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    offsetX.value = event.contentOffset.x;

    const index = Math.round(offsetX.value / width);
    runOnJS(setActiveIndex)(
      index < 1
        ? 0
        : index > CAROUSEL_DATA.length - 1
        ? CAROUSEL_DATA.length - 1
        : index
    );
  });

  const RenderText = () => {
    return (
      <GlassView
        glassEffectStyle="clear"
        style={styles.textContainer}
        isInteractive
      >
        <Animated.Text
          entering={ZoomIn}
          exiting={ZoomOut}
          style={styles.textStyle}
        >
          {CAROUSEL_DATA[activeIndex].label}
        </Animated.Text>
      </GlassView>
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://w0.peakpx.com/wallpaper/304/240/HD-wallpaper-blur-iphone-blurred-thumbnail.jpg",
        }}
        style={styles.backgroundImage}
        contentFit="cover"
      />
      <View style={styles.overlay}>
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={styles.textWrapper}
        >
          <RenderText />
        </Animated.View>
        <Animated.FlatList
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          pagingEnabled
          horizontal
          data={CAROUSEL_DATA}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <RenderItem item={item} index={index} offsetX={offsetX} />
          )}
          keyExtractor={(_, i) => i.toString()}
        />
      </View>
    </View>
  );
};

export default CarouselScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  textWrapper: {
    position: "absolute",
    top: 100,
    left: 0,
    right: 0,
    zIndex: 1,
    alignItems: "center",
  },
  textContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 16,
    width: 150,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  textStyle: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
  },
  renderItemContainer: {
    width,
    justifyContent: "center",
    alignItems: "center",
  },
  itemShadowContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  imageStyle: {
    width: CARD_WIDTH * 1.4,
    height: CARD_HEIGHT,
  },
});
