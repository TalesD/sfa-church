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
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const handleQuickAction = (action: string) => {
    Alert.alert('Ação Rápida', `${action} executada com sucesso!`);
  };

  const navigateToScreen = (screenName: string) => {
    setShowMoreMenu(false);
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

  const MoreMenuItem = ({ 
    icon, 
    title, 
    onPress, 
    visible = true 
  }: {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    onPress: () => void;
    visible?: boolean;
  }) => {
    if (!visible) return null;
    
    return (
      <TouchableOpacity style={styles.moreMenuItem} onPress={onPress}>
        <Ionicons name={icon} size={20} color="#ffffff" />
        <Text style={styles.moreMenuItemText}>{title}</Text>
        <Ionicons name="chevron-forward" size={16} color="#ffffff" />
      </TouchableOpacity>
    );
  };

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
              <Text style={styles.welcomeText}>Bem-vindo,</Text>
              <Text style={styles.userName}>{user?.name || 'Visitante'}</Text>
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
          <Text style={styles.sectionTitle}>Ações Rápidas</Text>
          <View style={styles.quickActionsGrid}>
            <QuickActionButton
              icon="calendar-outline"
              title="Próximo Evento"
              subtitle="Domingo 10:00"
              onPress={() => handleQuickAction('Ver próximo evento')}
              color="#FF6B6B"
            />
            <QuickActionButton
              icon="people-outline"
              title="Meu Grupo"
              subtitle="Jovens"
              onPress={() => handleQuickAction('Ver meu grupo')}
              color="#4ECDC4"
            />
            <QuickActionButton
              icon="heart-outline"
              title="Devocional"
              subtitle="Hoje"
              onPress={() => navigateToScreen('Devotional')}
              color="#45B7D1"
            />
            <QuickActionButton
              icon="card-outline"
              title="Oferecer"
              subtitle="Dízimo & Ofertas"
              onPress={() => handleQuickAction('Fazer oferta')}
              color="#96CEB4"
            />
          </View>
        </View>

        {/* More Menu */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.moreButton}
            onPress={() => setShowMoreMenu(!showMoreMenu)}
          >
            <Text style={styles.moreButtonText}>Mais Opções</Text>
            <Ionicons
              name={showMoreMenu ? 'chevron-up' : 'chevron-down'}
              size={20}
              color="#ffffff"
            />
          </TouchableOpacity>

          {showMoreMenu && (
            <BlurView intensity={20} style={styles.moreMenu}>
                             <MoreMenuItem
                 icon="musical-notes"
                 title="Cronograma de Adoração"
                 onPress={() => navigateToScreen('Worship')}
                 visible={hasMinistryAccess(Ministry.WORSHIP)}
               />
               <MoreMenuItem
                 icon="school"
                 title="Ministério Infantil"
                 onPress={() => navigateToScreen('Kids')}
                 visible={hasMinistryAccess(Ministry.KIDS)}
               />
              <MoreMenuItem
                icon="book"
                title="Devocional Diário"
                onPress={() => navigateToScreen('Devotional')}
                visible={true}
              />
            </BlurView>
          )}
        </View>

        {/* Announcements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Anúncios</Text>
          <BlurView intensity={20} style={styles.announcementCard}>
            <Text style={styles.announcementTitle}>🎉 Celebração Especial</Text>
            <Text style={styles.announcementText}>
              Este domingo teremos uma celebração especial com louvor e adoração. 
              Não perca!
            </Text>
            <Text style={styles.announcementDate}>Domingo, 10:00</Text>
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
  moreButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 15,
  },
  moreButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  moreMenu: {
    marginTop: 10,
    borderRadius: 15,
    overflow: 'hidden',
  },
  moreMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  moreMenuItemText: {
    flex: 1,
    fontSize: 16,
    color: '#ffffff',
    marginLeft: 15,
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
