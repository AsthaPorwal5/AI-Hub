import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Colors } from '../../theme/colors';
import { AIModel } from '../../types';

interface ModelCardProps {
  model: AIModel;
  onPress: () => void;
}

export const ModelCard: React.FC<ModelCardProps> = ({ model, onPress }) => {
  return (
    <View style={styles.card}>
      <View style={[styles.badge, { backgroundColor: model.color }]} />
      <Text style={styles.name}>{model.name}</Text>
      <Text style={styles.company}>{model.company}</Text>
      <Text style={styles.desc} numberOfLines={2}>{model.desc}</Text>
      <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.7}>
        <Text style={styles.buttonText}>Launch Model</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: Colors.backgroundCard,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.borderCard,
  },
  badge: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 12,
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  company: {
    fontSize: 11,
    color: Colors.primary,
    marginBottom: 8,
    fontWeight: '600',
  },
  desc: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 16,
    marginBottom: 12,
    height: 32,
  },
  button: {
    width: '100%',
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.inputBorder,
  },
  buttonText: {
    fontSize: 11,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
});
export default ModelCard;
