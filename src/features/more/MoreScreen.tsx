import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth, Ministry } from '../../contexts/AuthContext';

export default function MoreScreen() {
  const navigation = useNavigation();
  const { user, hasMinistryAccess, hasRoleAccess } = useAuth();

  const navigateToScreen = (screenName: string) => {
    // @ts-ignore
    navigation.navigate(screenName);
  };

  const MenuItem = ({ 
    icon, 
    title, 
    subtitle,
    onPress, 
    visible = true,
    color = '#4CAF50'
  }: {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    subtitle?: string;
    onPress: () => void;
    visible?: boolean;
    color?: string;
  }) => {
    if (!visible) return null;
    
    return (
      <TouchableOpacity style={styles.menuItem} onPress={onPress}>
        <View style={[styles.iconContainer, { backgroundColor: color }]}>
          <Ionicons name={icon} size={24} color="#ffffff" />
        </View>
        <View style={styles.menuItemText}>
          <Text style={styles.menuItemTitle}>{title}</Text>
          {subtitle && (
            <Text style={styles.menuItemSubtitle}>{subtitle}</Text>
          )}
        </View>
        <Ionicons name="chevron-forward" size={20} color="#cccccc" />
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient
      colors={['#1a1a2e', '#16213e', '#0f3460']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header 
        <BlurView intensity={20} style={styles.header}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.welcomeText}>More Options</Text>
              <Text style={styles.subtitleText}>Access additional features</Text>
            </View>
            <View style={styles.headerIcon}>
              <Ionicons name="ellipsis-horizontal" size={40} color="#ffffff" />
            </View>
          </View>
        </BlurView> */}

        {/* Menu Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          
          <BlurView intensity={20} style={styles.menuContainer}>
            <MenuItem
              icon="book"
              title="Daily Devotional"
              subtitle="Read daily spiritual messages"
              onPress={() => navigateToScreen('Devotional')}
              visible={true}
              color="#45B7D1"
            />
            
            <MenuItem
              icon="people"
              title="Groups"
              subtitle="Join small groups and ministries"
              onPress={() => navigateToScreen('Groups')}
              visible={true}
              color="#4ECDC4"
            />
            
            <MenuItem
              icon="musical-notes"
              title="Worship Schedule"
              subtitle="View songs and rehearsal materials"
              onPress={() => navigateToScreen('Worship')}
              visible={hasMinistryAccess(Ministry.WORSHIP)}
              color="#FF6B6B"
            />
            
            <MenuItem
              icon="school"
              title="Kids Ministry"
              subtitle="Teaching schedules and materials"
              onPress={() => navigateToScreen('Kids')}
              visible={hasMinistryAccess(Ministry.KIDS)}
              color="#96CEB4"
            />
          </BlurView>
        </View>

        {/* Coming Soon */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Coming Soon</Text>
          <BlurView intensity={20} style={styles.comingSoonCard}>
            <Ionicons name="rocket" size={40} color="#FFD93D" />
            <Text style={styles.comingSoonTitle}>New Features</Text>
            <Text style={styles.comingSoonText}>
              We're working on exciting new features to enhance your church experience.
            </Text>
          </BlurView>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 100,
  },
  header: {
    borderRadius: 20,
    marginBottom: 30,
    overflow: 'hidden',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  subtitleText: {
    fontSize: 16,
    color: '#cccccc',
  },
  headerIcon: {
    padding: 5,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  menuContainer: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuItemText: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  menuItemSubtitle: {
    fontSize: 14,
    color: '#cccccc',
  },
  comingSoonCard: {
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
  },
  comingSoonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 15,
    marginBottom: 10,
  },
  comingSoonText: {
    fontSize: 14,
    color: '#cccccc',
    textAlign: 'center',
    lineHeight: 20,
  },
});
