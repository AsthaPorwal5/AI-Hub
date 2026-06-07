import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { Colors } from '../../theme/colors';

interface HomeProps {
  onSelectModel: (modelName: string) => void;
  onNavigateToTab: (tabName: string) => void;
  onViewAllModels: () => void;
  onReset: () => void;
}

export const Home: React.FC<HomeProps> = ({
  onSelectModel,
  onNavigateToTab,
  onViewAllModels,
  onReset,
}) => {
  const chooseModels = [
    { name: 'ChatGPT-4o', company: 'ChatGPT', subtitle: 'GPT-4o', color: Colors.success },
    { name: 'Gemini 1.5 Pro', company: 'Gemini', subtitle: 'Gemini 1.5 Pro', color: '#4285F4' },
    { name: 'Claude 3.5 Sonnet', company: 'Claude', subtitle: 'Claude 3.5 Sonnet', color: Colors.warning },
    { name: 'DeepSeek-V3', company: 'DeepSeek', subtitle: 'DeepSeek-V3', color: Colors.secondary },
    { name: 'Grok 1.5', company: 'Grok', subtitle: 'Grok 1.5', color: '#A855F7' },
    { name: 'More Models', company: 'More', subtitle: 'All Models', color: 'rgba(255, 255, 255, 0.1)', isMore: true },
  ];

  const popularTools = [
    { title: 'AI Image', desc: 'Generate', icon: '🎨', tab: 'imageGenerator', color: '#3B82F6' },
    { title: 'Code', desc: 'Assistant', icon: '💻', tab: 'tools', color: '#10B981' },
    { title: 'Translate', desc: 'Language', icon: '🌐', tab: 'tools', color: '#0EA5E9' },
    { title: 'Summarize', desc: 'Text', icon: '📝', tab: 'tools', color: '#F59E0B' },
  ];

  const getModelBadgeStyle = (color: string) => [styles.modelBadge, { backgroundColor: color }];
  const getToolIconInnerStyle = (color: string) => [styles.toolIconInner, { backgroundColor: `${color}15` }];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, Developer! 👋</Text>
          <Text style={styles.subGreeting}>What do you want to do today?</Text>
        </View>
        <TouchableOpacity style={styles.resetBtn} onPress={onReset}>
          <Text style={styles.resetText}>↺ Reset</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Search Input bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search or ask anything..."
            placeholderTextColor={Colors.textMuted}
            editable={false} // Click acts as navigates to chat
          />
        </View>

        {/* Choose AI Model header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Choose AI Model</Text>
          <TouchableOpacity onPress={onViewAllModels}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* Grid AI Models */}
        <View style={styles.gridContainer}>
          {chooseModels.map((model, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.modelCard}
                onPress={() => {
                  if (model.isMore) {
                    onViewAllModels();
                  } else {
                    onSelectModel(model.name);
                  }
                }}
                activeOpacity={0.8}
              >
                <View style={getModelBadgeStyle(model.color)}>
                  <Text style={styles.badgeText}>{model.company[0]}</Text>
                </View>
                <View style={styles.modelTexts}>
                  <Text style={styles.modelTitle}>{model.company}</Text>
                  <Text style={styles.modelSubtitle}>{model.subtitle}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Popular Tools */}
        <View style={[styles.sectionHeader, styles.sectionHeaderSpacing]}>
          <Text style={styles.sectionTitle}>Popular Tools</Text>
          <TouchableOpacity onPress={() => onNavigateToTab('tools')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.toolsRow}>
          {popularTools.map((tool, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.toolItem}
                onPress={() => onNavigateToTab(tool.tab)}
                activeOpacity={0.8}
              >
                <View style={styles.toolIconOuter}>
                  <View style={getToolIconInnerStyle(tool.color)}>
                    <Text style={styles.toolEmoji}>{tool.icon}</Text>
                  </View>
                </View>
                <Text style={styles.toolTitle}>{tool.title}</Text>
                <Text style={styles.toolDesc}>{tool.desc}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Upgrade Pro Promo Banner */}
        <View style={styles.promoCard}>
          <View style={styles.promoTextContainer}>
            <Text style={styles.promoTitle}>Upgrade to Pro ✨</Text>
            <Text style={styles.promoDesc}>
              Unlock unlimited chats, priority access & more powerful features.
            </Text>
          </View>
          <TouchableOpacity style={styles.promoBtn} activeOpacity={0.8}>
            <Text style={styles.promoBtnText}>Upgrade Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 8,
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subGreeting: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  resetBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  resetText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 110,
  },
  searchContainer: {
    marginTop: 20,
    marginBottom: 24,
  },
  searchInput: {
    width: '100%',
    height: 48,
    backgroundColor: Colors.inputBackground,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    paddingHorizontal: 16,
    color: '#FFFFFF',
    fontSize: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionHeaderSpacing: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  viewAllText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '600',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  modelCard: {
    width: '48%',
    backgroundColor: Colors.backgroundCard,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.borderCard,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modelBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  modelTexts: {
    flex: 1,
  },
  modelTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 1,
  },
  modelSubtitle: {
    fontSize: 10,
    color: Colors.textSecondary,
  },
  toolsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  toolItem: {
    width: '22%',
    alignItems: 'center',
  },
  toolIconOuter: {
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  toolIconInner: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toolEmoji: {
    fontSize: 20,
  },
  toolTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  toolDesc: {
    fontSize: 10,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 1,
  },
  promoCard: {
    marginTop: 28,
    backgroundColor: '#1C1635', // Match the visual theme in mockup
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.primary,
    padding: 20,
    alignItems: 'center',
  },
  promoTextContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  promoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  promoDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
    textAlign: 'center',
  },
  promoBtn: {
    width: '100%',
    height: 44,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  promoBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
export default Home;
