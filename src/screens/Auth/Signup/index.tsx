import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Colors } from '../../../theme/colors';
import GlassInput from '../../../components/inputs/GlassInput';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import { signUp } from '../../../services/supabase';

interface SignupProps {
  onSignupSuccess: (email: string) => void;
  onNavigateToLogin: () => void;
}

export const Signup: React.FC<SignupProps> = ({ onSignupSuccess, onNavigateToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }
    setLoading(true);
    console.log("name :", name.trim());
    console.log("email :", email.trim());
    console.log("password :", password);
    try {
      await signUp(email.trim(), password, name.trim());
      onSignupSuccess(email.trim());
    } catch (err: any) {
      Alert.alert('Signup Failed', err.message || 'An error occurred during signup.');
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
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join AI Hub and unleash multiple AI brains</Text>
          
          <View style={styles.form}>
            <GlassInput
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              containerStyle={styles.inputContainer}
            />

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
            
            <PrimaryButton
              title="Continue to Verify"
              onPress={handleSignup}
              style={styles.signupButton}
              loading={loading}
            />
          </View>
          
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={onNavigateToLogin}>
              <Text style={styles.loginLink}>Log In</Text>
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
    marginBottom: 36,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 16,
  },
  signupButton: {
    marginTop: 16,
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
  loginLink: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
});
export default Signup;
