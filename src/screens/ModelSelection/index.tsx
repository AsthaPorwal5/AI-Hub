import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Colors } from '../../theme/colors';

interface ModelSelectionProps {
  selectedModel: string;
  onSelectModel: (modelName: string) => void;
  onBack: () => void;
}

export const ModelSelection: React.FC<ModelSelectionProps> = ({
  selectedModel,
  onSelectModel,
  onBack,
}) => {
  const models = [
    { name: 'ChatGPT-4o', company: 'ChatGPT', subtitle: 'GPT-4o', color: Colors.success },
    { name: 'Gemini 1.5 Pro', company: 'Gemini', subtitle: 'Gemini 1.5 Pro', color: '#4285F4' },
    { name: 'Claude 3.5 Sonnet', company: 'Claude', subtitle: 'Claude 3.5 Sonnet', color: Colors.warning },
    { name: 'DeepSeek-V3', company: 'DeepSeek', subtitle: 'DeepSeek-V3', color: Colors.secondary },
    { name: 'Grok 1.5', company: 'Grok', subtitle: 'Grok 1.5', color: '#A855F7' },
    { name: 'Mistral Large 2', company: 'Mistral AI', subtitle: 'Mistral Large 2', color: '#F97316' },
    { name: 'Perplexity AI', company: 'Perplexity', subtitle: 'Perplexity AI', color: '#0EA5E9' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select AI Model</Text>
        <View style={styles.placeholder} />
      </View>

      {/* List */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContent}>
        {models.map((model) => {
          const isSelected = selectedModel === model.name;
          return (
            <TouchableOpacity
              key={model.name}
              style={styles.card}
              onPress={() => onSelectModel(model.name)}
              activeOpacity={0.7}
            >
              <View style={styles.modelInfo}>
                <View style={[styles.avatarBadge, { backgroundColor: model.color }]}>
                  <Text style={styles.avatarLetter}>{model.name[0]}</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.modelName}>{model.company}</Text>
                  <Text style={styles.modelDesc}>{model.subtitle}</Text>
                </View>
              </View>

              {/* Radio button indicators */}
              <View style={styles.radioOuter}>
                {isSelected && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 40,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 40,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.backgroundCard,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.borderCard,
    padding: 16,
    marginBottom: 12,
  },
  modelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarLetter: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textContainer: {
    justifyContent: 'center',
  },
  modelName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  modelDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
});
export default ModelSelection;
