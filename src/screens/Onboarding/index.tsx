import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Colors } from '../../theme/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface OnboardingProps {
  onFinish: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onFinish }) => {
  const [step, setStep] = useState(1);
  const floatAnim = useRef(new Animated.Value(0)).current;

  // Float animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -15,
          duration: 2200,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2200,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [floatAnim]);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onFinish();
    }
  };

  const onboardingSteps = [
    {
      title: 'Multiple AI Models',
      description: 'Access ChatGPT, Gemini, Claude, DeepSeek and more from one powerful platform.',
      image: require('../../assets/images/onboarding_models.png'),
    },
    {
      title: 'Generate Anything',
      description: 'Create stunning images, artwork, designs and content with AI.',
      image: require('../../assets/images/onboarding_generate.png'),
    },
    {
      title: 'Voice & Productivity',
      description: 'Use voice commands, translate, summarize and boost productivity with AI.',
      image: require('../../assets/images/onboarding_voice.png'),
    },
  ];

  const currentStep = onboardingSteps[step - 1];

  return (
    <SafeAreaView style={styles.container}>
      {/* Skip Button */}
      <TouchableOpacity style={styles.skipButton} onPress={onFinish}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        {/* Illustration */}
        <Animated.View style={[styles.imageContainer, { transform: [{ translateY: floatAnim }] }]}>
          <Image source={currentStep.image} style={styles.image} resizeMode="contain" />
        </Animated.View>

        {/* Text Details Card */}
        <View style={styles.glassCard}>
          <Text style={styles.title}>{currentStep.title}</Text>
          <Text style={styles.description}>{currentStep.description}</Text>
        </View>
      </View>

      {/* Bottom Controls */}
      <View style={styles.bottomRow}>
        {/* Pagination Dots */}
        <View style={styles.dotsContainer}>
          {[1, 2, 3].map((s) => (
            <View
              key={s}
              style={[
                styles.dot,
                s === step ? styles.dotActive : null,
              ]}
            />
          ))}
        </View>

        {/* Next/Done Circular Button */}
        <TouchableOpacity style={styles.nextButton} onPress={handleNext} activeOpacity={0.8}>
          <Text style={step === 3 ? styles.checkText : styles.arrowText}>
            {step === 3 ? '✓' : '→'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 24,
    zIndex: 10,
    padding: 8,
  },
  skipText: {
    fontSize: 15,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 40,
  },
  imageContainer: {
    width: SCREEN_WIDTH * 0.82,
    height: SCREEN_WIDTH * 0.82,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  glassCard: {
    width: '100%',
    backgroundColor: Colors.backgroundCard,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.borderCard,
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 22,
    textAlign: 'center',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingBottom: 40,
  },
  dotsContainer: {
    flexDirection: 'row',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.dotInactive,
    marginHorizontal: 4,
  },
  dotActive: {
    width: 18,
    backgroundColor: Colors.primary,
  },
  nextButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  arrowText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  checkText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
export default Onboarding;
