import { useEffect, useRef } from "react";
import { 
  useSharedValue, 
  cancelAnimation,
  runOnJS
} from "react-native-reanimated";

export type AnimationName = 'Idle' | 'Walking' | 'Kicking' | 'Shooting' | 'Sliding' | 'Throwing';

interface AnimationConfig {
  frameCount: number;
  fps: number;
  loop: boolean;
}

const ANIMATION_CONFIGS: Record<AnimationName, AnimationConfig> = {
  Idle: { frameCount: 18, fps: 12, loop: true },
  Walking: { frameCount: 24, fps: 16, loop: true },
  Kicking: { frameCount: 12, fps: 16, loop: false },
  Shooting: { frameCount: 9, fps: 16, loop: false },
  Sliding: { frameCount: 6, fps: 12, loop: false },
  Throwing: { frameCount: 12, fps: 16, loop: false },
};

export const useSpriteAnimation = (
  currentAnimation: AnimationName,
  onAnimationComplete?: () => void
) => {
  const frameIndex = useSharedValue(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const config = ANIMATION_CONFIGS[currentAnimation];
  const frameDuration = 1000 / config.fps;

  useEffect(() => {
    // Reset frame index
    frameIndex.value = 0;
    
    // Clear previous interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Start new animation interval
    intervalRef.current = setInterval(() => {
      frameIndex.value = (frameIndex.value + 1) % config.frameCount;
      
      // Handle non-looping animations
      if (!config.loop && frameIndex.value === config.frameCount - 1) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }
    }, frameDuration);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentAnimation, config.frameCount, config.loop, frameDuration, onAnimationComplete]);

  return {
    frameIndex,
    frameCount: config.frameCount,
  };
};