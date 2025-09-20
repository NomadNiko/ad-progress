import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { SPRITE_FRAMES } from "../../utils/spriteLoader";
import type { ButtonName, ArrowName } from "../../hooks/useGameController";

const AnimatedImage = Animated.createAnimatedComponent(Image);

type AnimationName = 'Idle' | 'Walking' | 'Kicking' | 'Shooting' | 'Sliding' | 'Throwing';

interface ElfCharacterProps {
  pressedButtons: Set<ButtonName>;
  pressedArrows: Set<ArrowName>;
}

const ANIMATION_CONFIG = {
  Idle: { fps: 12 },
  Walking: { fps: 16 },
  Kicking: { fps: 16 },
  Shooting: { fps: 16 },
  Sliding: { fps: 12 },
  Throwing: { fps: 24 }, // Faster for quick action
};

const MOVEMENT_SPEED = 3;

export const ElfCharacter: React.FC<ElfCharacterProps> = ({
  pressedButtons,
  pressedArrows,
}) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [currentAnimation, setCurrentAnimation] = useState<AnimationName>('Idle');
  const [facingRight, setFacingRight] = useState(true);
  
  const positionX = useSharedValue(0);
  const frameTimer = useRef<NodeJS.Timeout | null>(null);
  const actionTimer = useRef<NodeJS.Timeout | null>(null);
  const isActionPlaying = useRef(false);
  const frameIndexRef = useRef(0);
  const lastDesiredAnimation = useRef<AnimationName>('Idle');
  const currentAnimationRef = useRef<AnimationName>('Idle');
  
  // Start or restart animation
  const playAnimation = (name: AnimationName) => {
    // Don't restart if already playing this animation
    if (name === currentAnimationRef.current && frameTimer.current) {
      return;
    }
    
    // Clear existing timers
    if (frameTimer.current) {
      clearInterval(frameTimer.current);
      frameTimer.current = null;
    }
    if (actionTimer.current) {
      clearTimeout(actionTimer.current);
      actionTimer.current = null;
    }
    
    // Set new animation
    currentAnimationRef.current = name;
    setCurrentAnimation(name);
    frameIndexRef.current = 0;
    setCurrentFrame(0);
    
    const frames = SPRITE_FRAMES[name];
    const fps = ANIMATION_CONFIG[name].fps;
    const frameDuration = 1000 / fps;
    
    // Handle one-shot animations
    const isOneShot = ['Kicking', 'Shooting', 'Throwing'].includes(name);
    if (isOneShot) {
      isActionPlaying.current = true;
      
      // Set completion timer
      actionTimer.current = setTimeout(() => {
        isActionPlaying.current = false;
        lastDesiredAnimation.current = 'Idle';
        playAnimation('Idle');
      }, frames.length * frameDuration);
    } else {
      isActionPlaying.current = false;
    }
    
    // Start frame cycling
    frameTimer.current = setInterval(() => {
      frameIndexRef.current = (frameIndexRef.current + 1) % frames.length;
      setCurrentFrame(frameIndexRef.current);
    }, frameDuration);
  };
  
  // Handle input changes
  useEffect(() => {
    // If playing a one-shot, let it finish
    if (isActionPlaying.current) {
      return;
    }
    
    // Determine desired animation
    let desired: AnimationName = 'Idle';
    
    if (pressedButtons.has("x")) {
      desired = "Throwing";
    } else if (pressedButtons.has("circle")) {
      desired = "Kicking";
    } else if (pressedButtons.has("triangle")) {
      desired = "Shooting";
    } else if (pressedButtons.has("square")) {
      desired = "Sliding";
    } else if (pressedArrows.has("left") || pressedArrows.has("right")) {
      desired = "Walking";
    }
    
    // Only play if different from last desired
    if (desired !== lastDesiredAnimation.current) {
      lastDesiredAnimation.current = desired;
      playAnimation(desired);
    }
  }, [pressedButtons, pressedArrows]);
  
  // Handle movement
  useEffect(() => {
    const moveInterval = setInterval(() => {
      if (pressedArrows.has("left")) {
        setFacingRight(false);
        positionX.value = Math.max(positionX.value - MOVEMENT_SPEED, -150);
      } else if (pressedArrows.has("right")) {
        setFacingRight(true);
        positionX.value = Math.min(positionX.value + MOVEMENT_SPEED, 150);
      }
    }, 1000 / 30);
    
    return () => clearInterval(moveInterval);
  }, [pressedArrows, positionX]);
  
  // Initialize on mount
  useEffect(() => {
    playAnimation('Idle');
    
    return () => {
      if (frameTimer.current) clearInterval(frameTimer.current);
      if (actionTimer.current) clearTimeout(actionTimer.current);
    };
  }, []);
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: positionX.value },
      { scaleX: facingRight ? 1 : -1 },
    ],
  }));
  
  const frames = SPRITE_FRAMES[currentAnimationRef.current];
  const currentSprite = frames[currentFrame] || frames[0];
  
  return (
    <View style={styles.container}>
      <AnimatedImage
        source={currentSprite}
        style={[styles.sprite, animatedStyle]}
        contentFit="contain"
        cachePolicy="memory-disk"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "35%",
    left: "50%",
    marginLeft: -75,
    width: 150,
    height: 150,
    zIndex: 10,
  },
  sprite: {
    width: 150,
    height: 150,
  },
});