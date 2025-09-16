# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Expo React Native application called "AdProgress" that demonstrates glass morphism UI effects using experimental native UI components. The app uses Expo Router for navigation with native tabs and showcases various glass effect styles and interactive controls.

## Development Commands

### Core Commands

We will not run any commands on the project other than lint checks. Only production admins will interact with the running expo instance.

- `npm run lint` - Run ESLint checks (using eslint-config-expo)

### Build Commands

## Architecture & Structure

### Navigation

The app uses Expo Router's experimental native tabs (`expo-router/unstable-native-tabs`) with four main tabs defined in `app/_layout.tsx`. Each tab uses SF Symbols icons with custom colors.

### Key UI Libraries

- **@expo/ui/swift-ui**: Provides native SwiftUI components (Button, Picker, Slider, ColorPicker, ContextMenu, Switch)
- **expo-glass-effect**: Core glass morphism effects with `GlassView` and `GlassContainer` components
- **expo-image**: Optimized image loading with background support
- **react-native-reanimated**: Animation engine for smooth 60fps animations

### State Management

Components use local React state with hooks. No global state management is implemented.

### Styling Approach

- Uses React Native StyleSheet for all styling
- Glass effects are achieved through combination of:
  - `backgroundColor` with alpha channel for transparency
  - `glassEffectStyle` prop ("regular" or "clear")
  - Dynamic color/opacity manipulation via hex color strings

### Custom Hooks

- `useRotateObject`: Creates infinite rotation animations with configurable duration and easing
- `useClockRotate`: Specialized hook for animating clock hands with proper timing relationships

## TypeScript Configuration

Strict mode is enabled. Path alias `@/*` maps to root directory. All `.ts` and `.tsx` files are included in compilation.

## Platform-Specific Features

### iOS

- Native tab bar with custom SF Symbols
- Glass effect blur rendering
- Bundle identifier: `com.devnomad.adprogress`

### Android

- Adaptive icons with monochrome support
- Edge-to-edge rendering enabled
- Package name: `com.devnomad.adprogress`

### Web

- Static output mode
- Limited glass effect support (fallback to semi-transparent backgrounds)

## Google Mobile Ads Integration

The app is configured for Google Mobile Ads with:

- App ID: `ca-app-pub-8406679264944836~3201500839` (same for iOS and Android)
- Plugin configured in `app.json`

## Testing Approach

No test framework is currently configured. The project structure suggests manual testing through the Expo development client.

## Performance Considerations

- Images use `expo-image` with caching policies (`memory-disk`) and recycling keys
- Animations run on UI thread using Reanimated worklets
- Components use `React.memo` for optimization
- Glass views marked as `isInteractive` for touch handling

## Important Notes

- The app uses experimental React 19.1.0 features
- React Compiler is enabled in experiments
- New Architecture is enabled (`newArchEnabled: true`)
- Predictive back gesture is disabled on Android
