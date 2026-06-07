import React from 'react';
import { StyleSheet, TextInput, View, TextInputProps, ViewStyle } from 'react-native';
import { Colors } from '../../theme/colors';

interface GlassInputProps extends TextInputProps {
  containerStyle?: ViewStyle;
}

export const GlassInput: React.FC<GlassInputProps> = ({
  containerStyle,
  style,
  placeholderTextColor = Colors.textMuted,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor={placeholderTextColor}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 52,
    backgroundColor: Colors.inputBackground,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  input: {
    color: Colors.textPrimary,
    fontSize: 15,
    height: '100%',
    padding: 0, // Reset default Android padding
  },
});
export default GlassInput;
