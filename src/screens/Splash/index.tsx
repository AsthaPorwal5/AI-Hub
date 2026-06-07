import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  SafeAreaView,
} from 'react-native';
import { Colors } from '../../theme/colors';

interface SplashProps {
  onFinish: () => void;
}

export const Splash: React.FC<SplashProps> = ({ onFinish }) => {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  // Float animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -12,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [floatAnim]);

  // Loading progress
  useEffect(() => {
    progressAnim.setValue(0);
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 2500, // 2.5 seconds loading
      useNativeDriver: false,
    }).start(() => {
      onFinish();
    });
  }, [progressAnim, onFinish]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Central Logo */}
        <Animated.View style={[styles.logoContainer, { transform: [{ translateY: floatAnim }] }]}>
          <Image
            source={require('../../assets/images/splash_logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>

        {/* Brand Text */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>AI Hub</Text>
          <Text style={styles.subtitle}>All AI Models. One App.</Text>
        </View>

        {/* Loading Progress */}
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
          <View style={styles.progressBarBackground}>
            <Animated.View style={[styles.progressBarFill, { width: progressWidth }]} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 34,
    fontWeight: '900',
    color: Colors.textPrimary,
    letterSpacing: 2,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    letterSpacing: 1,
  },
  loadingContainer: {
    width: '80%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 80,
  },
  loadingText: {
    fontSize: 13,
    color: Colors.textMuted,
    marginBottom: 10,
    letterSpacing: 1.5,
  },
  progressBarBackground: {
    width: '100%',
    height: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2.5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 2.5,
  },
});
export default Splash;
