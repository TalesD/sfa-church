import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth, Ministry } from '../../contexts/AuthContext';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { user, hasMinistryAccess, hasRoleAccess } = useAuth();


  const handleQuickAction = (action: string) => {
    Alert.alert('Ação Rápida', `${action} executada com sucesso!`);
  };

  const navigateToScreen = (screenName: string) => {
    // @ts-ignore
    navigation.navigate(screenName);
  };

  const QuickActionButton = ({ 
    icon, 
    title, 
    subtitle, 
    onPress, 
    color = '#4CAF50' 
  }: {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    subtitle: string;
    onPress: () => void;
    color?: string;
  }) => (
    <TouchableOpacity style={styles.quickActionButton} onPress={onPress}>
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        <Ionicons name={icon} size={24} color="#ffffff" />
      </View>
      <View style={styles.quickActionText}>
        <Text style={styles.quickActionTitle}>{title}</Text>
        <Text style={styles.quickActionSubtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );



  return (
    <LinearGradient
      colors={['#1a1a2e', '#16213e', '#0f3460']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <BlurView intensity={20} style={styles.header}>
          <View style={styles.headerContent}>
            <View>
                             <Text style={styles.welcomeText}>Welcome,</Text>
               <Text style={styles.userName}>{user?.name || 'Guest'}</Text>
            </View>
            <TouchableOpacity
              style={styles.profileButton}
              onPress={() => navigateToScreen('Profile')}
            >
              <Ionicons name="person-circle" size={40} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </BlurView>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
                         <QuickActionButton
               icon="calendar-outline"
               title="Next Event"
               subtitle="Sunday 10:00"
               onPress={() => handleQuickAction('View next event')}
               color="#FF6B6B"
             />
             <QuickActionButton
               icon="people-outline"
               title="My Group"
               subtitle="Youth"
               onPress={() => handleQuickAction('View my group')}
               color="#4ECDC4"
             />
             <QuickActionButton
               icon="heart-outline"
               title="Devotional"
               subtitle="Today"
               onPress={() => navigateToScreen('Devotional')}
               color="#45B7D1"
             />
             <QuickActionButton
               icon="card-outline"
               title="Give"
               subtitle="Tithes & Offerings"
               onPress={() => handleQuickAction('Make offering')}
               color="#96CEB4"
             />
          </View>
        </View>

        {/* Announcements */}
        <View style={styles.section}>
                   <Text style={styles.sectionTitle}>Announcements</Text>
         <BlurView intensity={20} style={styles.announcementCard}>
           <Text style={styles.announcementTitle}>🎉 Special Celebration</Text>
           <Text style={styles.announcementText}>
             This Sunday we will have a special celebration with praise and worship. 
             Don't miss it!
           </Text>
           <Text style={styles.announcementDate}>Sunday, 10:00</Text>
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
    paddingTop: 60, // Add top padding to avoid status bar
    paddingBottom: 100, // Add bottom padding to avoid tab bar
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
    fontSize: 16,
    color: '#cccccc',
    marginBottom: 5,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  profileButton: {
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
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  quickActionText: {
    flex: 1,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  quickActionSubtitle: {
    fontSize: 12,
    color: '#cccccc',
  },

  announcementCard: {
    padding: 20,
    borderRadius: 15,
  },
  announcementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  announcementText: {
    fontSize: 14,
    color: '#cccccc',
    lineHeight: 20,
    marginBottom: 10,
  },
  announcementDate: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },
});
