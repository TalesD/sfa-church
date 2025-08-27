import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <LinearGradient
      colors={['#1a1a2e', '#16213e', '#0f3460']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <BlurView intensity={20} style={styles.card}>
          <Text style={styles.title}>👤 Profile</Text>
          <Text style={styles.subtitle}>Account Management</Text>
          
          {/* User Info */}
          <View style={styles.userInfo}>
            <View style={styles.avatarContainer}>
              <Ionicons name="person-circle" size={60} color="#4CAF50" />
            </View>
            <Text style={styles.userName}>{user?.name || 'Guest'}</Text>
            <Text style={styles.userEmail}>{user?.email || 'guest@church.com'}</Text>
            <Text style={styles.userRole}>Role: {user?.role || 'Member'}</Text>
          </View>

          {/* Ministries */}
          {user?.ministries && user.ministries.length > 0 && (
            <View style={styles.ministriesSection}>
              <Text style={styles.ministriesTitle}>Ministries:</Text>
              {user.ministries.map((ministry, index) => (
                <Text key={index} style={styles.ministryItem}>
                  • {ministry}
                </Text>
              ))}
            </View>
          )}

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="#ffffff" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </BlurView>
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
    flexGrow: 1,
    justifyContent: 'center',
  },
  card: {
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#cccccc',
    marginBottom: 20,
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarContainer: {
    marginBottom: 15,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  userEmail: {
    fontSize: 16,
    color: '#cccccc',
    marginBottom: 8,
  },
  userRole: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  ministriesSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  ministriesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  ministryItem: {
    fontSize: 16,
    color: '#cccccc',
    marginBottom: 5,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 10,
  },
});
