import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Colors } from '../../theme/colors';

export const History: React.FC = () => {
  const chatHistory = [
    { model: 'ChatGPT-4o', snippet: 'How do I center a div using CSS Flexbox?', date: 'Today, 2:14 PM' },
    { model: 'Claude 3.5 Sonnet', snippet: 'Write a typescript type guard for API results', date: 'Yesterday, 6:40 PM' },
    { model: 'Gemini 1.5 Pro', snippet: 'Summarize the financial highlights of this quarterly statement', date: 'June 4, 11:15 AM' },
  ];

  const imageHistory = [
    { prompt: 'Cyberpunk neon cat sitting on a hoverboard', date: 'Today, 1:05 PM' },
    { prompt: 'Majestic mountains with starry violet sky', date: 'June 3, 4:22 PM' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>History Log</Text>
        <Text style={styles.subtitle}>Review your past queries and generated AI creations</Text>

        {/* Chats History list */}
        <Text style={styles.sectionTitle}>Conversations</Text>
        {chatHistory.map((chat, idx) => (
          <TouchableOpacity key={idx} style={styles.itemCard} activeOpacity={0.7}>
            <View style={styles.headerRow}>
              <Text style={styles.modelName}>{chat.model}</Text>
              <Text style={styles.dateText}>{chat.date}</Text>
            </View>
            <Text style={styles.snippetText} numberOfLines={1}>"{chat.snippet}"</Text>
          </TouchableOpacity>
        ))}

        {/* Images History list */}
        <Text style={[styles.sectionTitle, styles.sectionTitleSpacing]}>Generated Images</Text>
        {imageHistory.map((img, idx) => (
          <TouchableOpacity key={idx} style={styles.itemCard} activeOpacity={0.7}>
            <View style={styles.headerRow}>
              <Text style={styles.imgLabel}>Image Generator</Text>
              <Text style={styles.dateText}>{img.date}</Text>
            </View>
            <Text style={styles.snippetText} numberOfLines={1}>"{img.prompt}"</Text>
          </TouchableOpacity>
        ))}
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
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  sectionTitleSpacing: {
    marginTop: 24,
  },
  itemCard: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.borderCard,
    padding: 16,
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  modelName: {
    color: Colors.secondary,
    fontSize: 12,
    fontWeight: '600',
  },
  imgLabel: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  dateText: {
    color: Colors.textMuted,
    fontSize: 11,
  },
  snippetText: {
    color: Colors.textPrimary,
    fontSize: 14,
  },
});
export default History;
