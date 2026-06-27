import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Colors } from '../../../theme/colors';
import GlassInput from '../../../components/inputs/GlassInput';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import { signIn } from '../../../services/supabase';

interface LoginProps {
  onLoginSuccess: () => void;
  onNavigateToSignup: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess, onNavigateToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Validation Error', 'Please enter both your email and password.');
      return;
    }
    setLoading(true);
    try {
      await signIn(email.trim(), password);
      onLoginSuccess();
    } catch (err: any) {
      Alert.alert('Login Failed', err.message || 'An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Enter your details to log in to AI Hub</Text>
          
          <View style={styles.form}>
            <GlassInput
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              containerStyle={styles.inputContainer}
            />
            
            <GlassInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              containerStyle={styles.inputContainer}
            />
            
            <TouchableOpacity style={styles.forgotButton}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
            
            <PrimaryButton
              title="Sign In"
              onPress={handleLogin}
              style={styles.loginButton}
              loading={loading}
            />
          </View>
          
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={onNavigateToSignup}>
              <Text style={styles.signUpLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
    marginBottom: 40,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 16,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: 28,
    paddingVertical: 4,
  },
  forgotText: {
    color: Colors.secondary,
    fontSize: 13,
    fontWeight: '500',
  },
  loginButton: {
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
  },
  footerText: {
    color: Colors.textMuted,
    fontSize: 14,
  },
  signUpLink: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
});
export default Login;
