import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Colors } from '../../theme/colors';

export const Subscription: React.FC = () => {
  const plans = [
    {
      name: 'Pro Account',
      price: '$19/mo',
      desc: 'Perfect for individual developers and power users',
      color: Colors.primary,
      features: [
        'Unlimited access to ChatGPT-4o & Claude 3.5',
        'High speed image generations',
        'Priority voice assist queues',
        'Developer API endpoint access',
      ],
      popular: true,
    },
    {
      name: 'Enterprise Plan',
      price: 'Custom',
      desc: 'Dedicated clusters for companies requiring compliance',
      color: Colors.secondary,
      features: [
        'Custom private endpoints for compliance',
        'Fine-tuning weights configuration',
        'SLA 99.99% speed guarantee',
        'Dedicated account representative support',
      ],
      popular: false,
    },
  ];

  const getPriceStyle = (color: string) => [styles.planPrice, { color }];
  const getCheckStyle = (color: string) => [styles.checkIcon, { color }];
  const getBuyBtnStyle = (popular: boolean, color: string) => [
    styles.buyBtn,
    {
      backgroundColor: popular ? Colors.primary : 'rgba(255, 255, 255, 0.05)',
      borderColor: color,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Subscription Plans</Text>
        <Text style={styles.subtitle}>Unlock high-speed models, custom endpoints and premium image outputs</Text>

        {plans.map((plan, index) => (
          <View key={index} style={[styles.planCard, plan.popular ? styles.popularCard : null]}>
            {plan.popular && (
              <View style={styles.popularBadge}>
                <Text style={styles.popularBadgeText}>MOST POPULAR</Text>
              </View>
            )}

            <Text style={styles.planName}>{plan.name}</Text>
            <Text style={getPriceStyle(plan.color)}>{plan.price}</Text>
            <Text style={styles.planDesc}>{plan.desc}</Text>

            <View style={styles.divider} />

            <View style={styles.featuresList}>
              {plan.features.map((feature, idx) => (
                <View key={idx} style={styles.featureRow}>
                  <Text style={getCheckStyle(plan.color)}>✓</Text>
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity
              style={getBuyBtnStyle(plan.popular, plan.color)}
              activeOpacity={0.8}
            >
              <Text style={styles.buyBtnText}>Subscribe Now</Text>
            </TouchableOpacity>
          </View>
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
    lineHeight: 20,
  },
  planCard: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.borderCard,
    padding: 24,
    marginBottom: 24,
    position: 'relative',
  },
  popularCard: {
    borderColor: Colors.primary,
    borderWidth: 1.5,
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    right: 24,
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  popularBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  planName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  planPrice: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 8,
  },
  planDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderCard,
    marginBottom: 20,
  },
  featuresList: {
    marginBottom: 24,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkIcon: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 10,
  },
  featureText: {
    fontSize: 13,
    color: Colors.textPrimary,
  },
  buyBtn: {
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  buyBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
export default Subscription;
