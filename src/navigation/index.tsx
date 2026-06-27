import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Animated,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Colors } from '../theme/colors';
import { ScreenState } from '../types';
import { supabase } from '../services/supabase';

// Screen Imports
import Splash from '../screens/Splash';
import Onboarding from '../screens/Onboarding';
import Login from '../screens/Auth/Login';
import Signup from '../screens/Auth/Signup';
import OTP from '../screens/Auth/OTP';
import Home from '../screens/Home';
import Chat from '../screens/Chat';
import ImageGenerator from '../screens/ImageGenerator';
import Tools from '../screens/Tools';
import History from '../screens/History';
import Profile from '../screens/Profile';
import Subscription from '../screens/Subscription';
import ModelSelection from '../screens/ModelSelection';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const RootNavigator: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('splash');
  const [selectedModel, setSelectedModel] = useState<string>('ChatGPT-4o');
  const [tempEmail, setTempEmail] = useState<string>('');
  
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const transitionTo = useCallback((nextScreen: ScreenState) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 180,
      useNativeDriver: true,
    }).start(() => {
      setCurrentScreen(nextScreen);
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }).start();
    });
  }, [fadeAnim]);

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setCurrentScreen('home');
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        // If we are already logged in and on a dashboard screen, do nothing
        setCurrentScreen((prev) => {
          const authenticatedScreens = ['home', 'chat', 'imageGenerator', 'tools', 'history', 'profile', 'subscription'];
          if (!authenticatedScreens.includes(prev)) {
            // Trigger transition to home asynchronously to avoid state-update warnings
            setTimeout(() => transitionTo('home'), 0);
          }
          return prev;
        });
      } else {
        // If logged out and not already on auth/onboarding screens, redirect to login
        setCurrentScreen((prev) => {
          const authOnboardingScreens = ['splash', 'onboarding1', 'onboarding2', 'onboarding3', 'login', 'signup', 'otp'];
          if (!authOnboardingScreens.includes(prev)) {
            setTimeout(() => transitionTo('login'), 0);
          }
          return prev;
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [transitionTo]);

  const handleSelectModel = (modelName: string) => {
    setSelectedModel(modelName);
    transitionTo('chat');
  };

  const handleResetFlow = () => {
    transitionTo('splash');
  };

  // Helper to determine if the screen is a tab screen (shows bottom tab bar)
  const isTabScreen = (screen: ScreenState) => {
    const tabs: ScreenState[] = [
      'home',
      'chat',
      'imageGenerator',
      'tools',
      'history',
      'profile',
      'subscription',
    ];
    return tabs.includes(screen);
  };

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <Splash onFinish={() => transitionTo('onboarding1')} />;
      case 'onboarding1':
      case 'onboarding2':
      case 'onboarding3':
        return <Onboarding onFinish={() => transitionTo('login')} />;
      case 'login':
        return (
          <Login 
            onLoginSuccess={() => transitionTo('home')} 
            onNavigateToSignup={() => transitionTo('signup')}
          />
        );
      case 'signup':
        return (
          <Signup 
            onSignupSuccess={(email) => {
              setTempEmail(email);
              transitionTo('otp');
            }} 
            onNavigateToLogin={() => transitionTo('login')}
          />
        );
      case 'otp':
        return (
          <OTP 
            email={tempEmail}
            onOTPSuccess={() => transitionTo('home')} 
            onNavigateBack={() => transitionTo('signup')}
          />
        );
      case 'home':
        return (
          <Home 
            onSelectModel={handleSelectModel}
            onNavigateToTab={(tab) => transitionTo(tab as ScreenState)}
            onViewAllModels={() => transitionTo('modelSelection' as any)}
            onReset={handleResetFlow}
          />
        );
      case 'modelSelection':
        return (
          <ModelSelection
            selectedModel={selectedModel}
            onSelectModel={(modelName) => {
              setSelectedModel(modelName);
              transitionTo('chat');
            }}
            onBack={() => transitionTo('home')}
          />
        );
      case 'chat':
        return <Chat initialModel={selectedModel} onBack={() => transitionTo('home')} />;
      case 'imageGenerator':
        return <ImageGenerator />;
      case 'tools':
        return (
          <Tools 
            onNavigateToTab={(tab) => transitionTo(tab as ScreenState)}
            onBack={() => transitionTo('home')}
          />
        );
      case 'history':
        return <History />;
      case 'profile':
        return <Profile onSignOut={handleResetFlow} />;
      case 'subscription':
        return <Subscription />;
      default:
        return <Splash onFinish={() => transitionTo('onboarding1')} />;
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/background_gradient.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <Animated.View style={[styles.screenWrapper, { opacity: fadeAnim }]}>
          {renderActiveScreen()}
        </Animated.View>

        {isTabScreen(currentScreen) && (
          <View style={styles.tabBar}>
            {[
              { route: 'home', label: 'Home', icon: '🏠' },
              { route: 'chat', label: 'Chat', icon: '💬' },
              { route: 'tools', label: 'Tools', icon: '🛠️' },
              { route: 'history', label: 'History', icon: '📜' },
              { route: 'profile', label: 'Profile', icon: '👤' },
            ].map((tab) => {
              const isActive = currentScreen === tab.route;
              return (
                <TouchableOpacity
                  key={tab.route}
                  style={styles.tabItem}
                  onPress={() => transitionTo(tab.route as ScreenState)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.tabIcon, isActive ? styles.tabIconActive : null]}>
                    {tab.icon}
                  </Text>
                  <Text style={[styles.tabText, isActive ? styles.tabTextActive : null]}>
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  backgroundImage: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  screenWrapper: {
    flex: 1,
  },
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 72,
    backgroundColor: '#0E1322',
    borderTopWidth: 1,
    borderTopColor: Colors.borderCard,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 12,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  tabIcon: {
    fontSize: 18,
    opacity: 0.4,
    marginBottom: 4,
  },
  tabIconActive: {
    opacity: 1,
  },
  tabText: {
    color: Colors.textMuted,
    fontSize: 10,
    fontWeight: '600',
  },
  tabTextActive: {
    color: Colors.primary,
  },
});
export default RootNavigator;
