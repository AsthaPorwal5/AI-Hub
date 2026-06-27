import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { Colors } from '../../theme/colors';
import { getCurrentUser, signOut } from '../../services/supabase';

interface ProfileProps {
  onSignOut: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ onSignOut }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        console.error('Error fetching user:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      onSignOut();
    } catch (err: any) {
      Alert.alert('Sign Out Failed', err.message || 'An error occurred during sign out.');
    }
  };

  const emailDisplay = user?.email || 'Not Signed In';
  const nameDisplay = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'AI Hub User';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* User Card */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarLarge} />
          <Text style={styles.userName}>{loading ? 'Loading...' : nameDisplay}</Text>
          <Text style={styles.userEmail}>{loading ? '...' : emailDisplay}</Text>
          <View style={styles.badgePremium}>
            <Text style={styles.badgeText}>PRO PLAN ACTIVE</Text>
          </View>
        </View>

        {/* Options list */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account settings</Text>
          {[
            { label: 'Edit Profile', value: 'Details, Password' },
            { label: 'API Configurations', value: 'Configure API keys' },
            { label: 'App Settings', value: 'Theme, Notification defaults' },
          ].map((item, idx) => (
            <TouchableOpacity key={idx} style={styles.optionCard} activeOpacity={0.7}>
              <Text style={styles.optionLabel}>{item.label}</Text>
              <Text style={styles.optionValue}>{item.value} ➔</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support & Legal</Text>
          {[
            { label: 'Help Center & Documentation' },
            { label: 'Terms of Service & Privacy Policy' },
          ].map((item, idx) => (
            <TouchableOpacity key={idx} style={styles.optionCard} activeOpacity={0.7}>
              <Text style={styles.optionLabel}>{item.label}</Text>
              <Text style={styles.optionValue}>➔</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut} activeOpacity={0.8}>
          <Text style={styles.signOutText}>Sign Out from Account</Text>
        </TouchableOpacity>
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
    paddingTop: 30,
    paddingBottom: 110,
    alignItems: 'center',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarLarge: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: Colors.primary,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    marginBottom: 16,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  badgePremium: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(124, 77, 255, 0.2)',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  badgeText: {
    fontSize: 10,
    color: Colors.primary,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  section: {
    width: '100%',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textMuted,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  optionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.backgroundCard,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.borderCard,
    padding: 16,
    marginBottom: 8,
  },
  optionLabel: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  optionValue: {
    color: Colors.textSecondary,
    fontSize: 12,
  },
  signOutBtn: {
    width: '100%',
    height: 50,
    borderRadius: 14,
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  signOutText: {
    color: '#EF4444',
    fontSize: 15,
    fontWeight: '700',
  },
});
export default Profile;
