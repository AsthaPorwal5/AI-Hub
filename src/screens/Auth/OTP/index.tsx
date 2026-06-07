import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { Colors } from '../../../theme/colors';
import GlassInput from '../../../components/inputs/GlassInput';
import PrimaryButton from '../../../components/buttons/PrimaryButton';

interface OTPProps {
  onOTPSuccess: () => void;
  onNavigateBack: () => void;
}

export const OTP: React.FC<OTPProps> = ({ onOTPSuccess, onNavigateBack }) => {
  const [otpCode, setOtpCode] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          <TouchableOpacity style={styles.backButton} onPress={onNavigateBack}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Verification Code</Text>
          <Text style={styles.subtitle}>We have sent a 6-digit confirmation code to your email</Text>
          
          <View style={styles.form}>
            <GlassInput
              placeholder="Enter 6-Digit Code"
              value={otpCode}
              onChangeText={setOtpCode}
              keyboardType="number-pad"
              maxLength={6}
              containerStyle={styles.inputContainer}
              style={styles.otpInput}
            />
            
            <PrimaryButton
              title="Verify & Create Account"
              onPress={onOTPSuccess}
              style={styles.verifyButton}
            />
            
            <TouchableOpacity style={styles.resendButton}>
              <Text style={styles.resendText}>Resend Code</Text>
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
  backButton: {
    position: 'absolute',
    top: 50,
    left: 24,
    padding: 8,
  },
  backText: {
    fontSize: 15,
    color: Colors.secondary,
    fontWeight: '600',
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
    alignItems: 'center',
  },
  inputContainer: {
    marginBottom: 24,
  },
  otpInput: {
    textAlign: 'center',
    fontSize: 22,
    letterSpacing: 8,
    fontWeight: 'bold',
  },
  verifyButton: {
    marginTop: 8,
  },
  resendButton: {
    marginTop: 24,
    paddingVertical: 4,
  },
  resendText: {
    color: Colors.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },
});
export default OTP;
