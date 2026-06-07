import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Colors } from '../../theme/colors';
import GlassInput from '../../components/inputs/GlassInput';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import { imageService } from '../../services/image';

export const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedImg, setGeneratedImg] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setGeneratedImg(null);

    try {
      const resultAsset = await imageService.generateImage(prompt);
      setGeneratedImg(resultAsset);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>AI Image Generator</Text>
        <Text style={styles.subtitle}>Transform text prompts into stunning futuristic artwork</Text>

        {/* Input box */}
        <View style={styles.formCard}>
          <GlassInput
            placeholder="Describe what you want to generate (e.g. neon cyberpunk city, floating soundwave microphone...)"
            value={prompt}
            onChangeText={setPrompt}
            multiline
            style={styles.promptInput}
            containerStyle={styles.inputContainer}
          />
          <PrimaryButton
            title={loading ? 'Generating...' : 'Generate Image'}
            onPress={handleGenerate}
            style={styles.generateBtn}
          />
        </View>

        {/* Result Area */}
        <Text style={styles.sectionTitle}>Result Preview</Text>
        <View style={styles.previewContainer}>
          {loading && (
            <View style={styles.loadingBox}>
              <ActivityIndicator size="large" color={Colors.primary} />
              <Text style={styles.loadingText}>Synthesizing pixels...</Text>
            </View>
          )}

          {!loading && !generatedImg && (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>Your generated artwork will appear here</Text>
            </View>
          )}

          {!loading && generatedImg && (
            <View style={styles.imageCard}>
              <Image source={generatedImg} style={styles.resultImage} resizeMode="contain" />
              <View style={styles.infoBadge}>
                <Text style={styles.infoText}>Prompt: {prompt}</Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 110,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 24,
    lineHeight: 20,
  },
  formCard: {
    backgroundColor: Colors.backgroundCard,
    borderWidth: 1,
    borderColor: Colors.borderCard,
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
  },
  inputContainer: {
    height: 90,
    alignItems: 'flex-start',
    paddingVertical: 12,
  },
  promptInput: {
    height: '100%',
    textAlignVertical: 'top',
  },
  generateBtn: {
    marginTop: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 14,
  },
  previewContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: 1,
    borderColor: Colors.borderCard,
    borderRadius: 20,
    overflow: 'hidden',
  },
  loadingBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: Colors.textSecondary,
    fontSize: 14,
    marginTop: 16,
    letterSpacing: 0.5,
  },
  emptyBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    color: Colors.textMuted,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  imageCard: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultImage: {
    width: '100%',
    height: '100%',
  },
  infoBadge: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(11, 16, 32, 0.85)',
    padding: 12,
  },
  infoText: {
    color: Colors.textSecondary,
    fontSize: 12,
    lineHeight: 16,
  },
});
export default ImageGenerator;
