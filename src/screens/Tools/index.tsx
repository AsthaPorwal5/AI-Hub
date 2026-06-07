import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Colors } from '../../theme/colors';

interface ToolsProps {
  onNavigateToTab?: (tabName: string) => void;
  onBack?: () => void;
}

export const Tools: React.FC<ToolsProps> = ({ onNavigateToTab, onBack }) => {
  const toolsList = [
    {
      title: 'AI Image Generator',
      desc: 'Generate stunning images from text',
      icon: '🎨',
      color: '#3B82F6', // Blue
      tab: 'imageGenerator'
    },
    {
      title: 'Code Assistant',
      desc: 'Write, explain and debug code instantly',
      icon: '💻',
      color: '#10B981', // Green
      tab: 'chat'
    },
    {
      title: 'Translator',
      desc: 'Translate text into multiple languages',
      icon: '🌐',
      color: '#3B82F6', // Blue
      tab: 'chat'
    },
    {
      title: 'Summarizer',
      desc: 'Summarize long articles or documents',
      icon: '📝',
      color: '#F59E0B', // Orange
      tab: 'chat'
    },
    {
      title: 'Grammar Checker',
      desc: 'Check grammar and improve writing',
      icon: '✍️',
      color: '#14B8A6', // Teal
      tab: 'chat'
    },
    {
      title: 'Text to Speech',
      desc: 'Convert text to natural voice',
      icon: '🔊',
      color: '#EC4899', // Pink
      tab: 'chat'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Tools</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.list}>
          {toolsList.map((tool, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.card}
                onPress={() => onNavigateToTab && onNavigateToTab(tool.tab)}
                activeOpacity={0.7}
              >
                <View style={styles.row}>
                  <View style={[styles.iconContainer, { backgroundColor: tool.color }]}>
                    <Text style={styles.icon}>{tool.icon}</Text>
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.cardTitle}>{tool.title}</Text>
                    <Text style={styles.cardDesc}>{tool.desc}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
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
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 110,
  },
  list: {
    width: '100%',
  },
  card: {
    backgroundColor: Colors.backgroundCard,
    borderWidth: 1,
    borderColor: Colors.borderCard,
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  icon: {
    fontSize: 22,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
});
export default Tools;
