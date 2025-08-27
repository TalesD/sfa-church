import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';

interface WorshipSchedule {
  id: string;
  title: string;
  date: string;
  month: string;
  dayOfWeek: string;
  time: string;
  daysFromNow: string;
  participants: Participant[];
  songsCount: number;
  peopleCount: number;
  notificationsCount: number;
}

interface Participant {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

export default function WorshipScreen() {
  const { user, hasMinistryAccess, hasRoleAccess } = useAuth();
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'previous'>('upcoming');

  // Mock data for worship schedules
  const upcomingSchedules: WorshipSchedule[] = [
    {
      id: '1',
      title: 'Night Service',
      date: '18',
      month: 'JUN',
      dayOfWeek: 'Sunday',
      daysFromNow: 'in 5 days',
      time: '18:30',
      participants: [
        { id: '1', name: 'John', avatar: 'https://i.pravatar.cc/150?img=1', role: 'Vocal' },
        { id: '2', name: 'Mary', avatar: 'https://i.pravatar.cc/150?img=2', role: 'Guitar' },
        { id: '3', name: 'Peter', avatar: 'https://i.pravatar.cc/150?img=3', role: 'Drums' },
        { id: '4', name: 'Anna', avatar: 'https://i.pravatar.cc/150?img=4', role: 'Keyboard' },
      ],
      songsCount: 0,
      peopleCount: 4,
      notificationsCount: 0,
    },
    {
      id: '2',
      title: 'Night Service',
      date: '25',
      month: 'JUN',
      dayOfWeek: 'Sunday',
      daysFromNow: 'in 1 week',
      time: '18:30',
      participants: [
        { id: '5', name: 'Carlos', avatar: 'https://i.pravatar.cc/150?img=5', role: 'Vocal' },
      ],
      songsCount: 0,
      peopleCount: 1,
      notificationsCount: 0,
    },
  ];

  const previousSchedules: WorshipSchedule[] = [
    {
      id: '3',
      title: 'Night Service',
      date: '11',
      month: 'JUN',
      dayOfWeek: 'Sunday',
      daysFromNow: '2 days ago',
      time: '18:30',
      participants: [
        { id: '1', name: 'John', avatar: 'https://i.pravatar.cc/150?img=1', role: 'Vocal' },
        { id: '2', name: 'Mary', avatar: 'https://i.pravatar.cc/150?img=2', role: 'Guitar' },
      ],
      songsCount: 5,
      peopleCount: 2,
      notificationsCount: 1,
    },
  ];

  const ScheduleCard = ({ schedule }: { schedule: WorshipSchedule }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ScheduleDetail', { scheduleId: schedule.id })}>
      <BlurView intensity={20} style={styles.scheduleCard}>
        
        
        <View style={styles.scheduleContent}>
          <Text style={styles.scheduleTitle}>{schedule.title}</Text>
          
          <View style={styles.participantsContainer}>
            {schedule.participants.map((participant, index) => (
              <View key={participant.id} style={styles.avatarContainer}>
                <Image source={{ uri: participant.avatar }} style={styles.avatar} />
                {index < 3 && (
                  <View style={styles.avatarOverlay}>
                    <Text style={styles.avatarText}>{participant.name.charAt(0)}</Text>
                  </View>
                )}
              </View>
            ))}
            {schedule.participants.length > 4 && (
              <View style={styles.moreAvatars}>
                <Text style={styles.moreAvatarsText}>+{schedule.participants.length - 4}</Text>
              </View>
            )}
          </View>
          
          <View style={styles.scheduleTime}>
            <Ionicons name="time-outline" size={16} color="#666" />
            <Text style={styles.timeText}>{schedule.time}</Text>
          </View>
          
          <View style={styles.scheduleMetrics}>
            <View style={styles.metric}>
              <Ionicons name="musical-notes" size={16} color="#666" />
              <Text style={styles.metricText}>{schedule.songsCount}</Text>
            </View>
            <View style={styles.metric}>
              <Ionicons name="people" size={16} color="#666" />
              <Text style={styles.metricText}>{schedule.peopleCount}</Text>
            </View>
            <View style={styles.metric}>
              <Ionicons name="notifications" size={16} color="#FF6B6B" />
              <Text style={styles.metricText}>{schedule.notificationsCount}</Text>
            </View>
          </View>
        </View>
      </BlurView>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={['#1a1a2e', '#16213e', '#0f3460']}
      style={styles.container}
    >
      {/* Header */}
      <BlurView intensity={20} style={styles.header}>
        <Text style={styles.title}>🎵 Worship Ministry</Text>
        <Text style={styles.subtitle}>Manage worship schedules and songs</Text>
      </BlurView>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
          onPress={() => setActiveTab('upcoming')}
        >
                  <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>
          Upcoming
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'previous' && styles.activeTab]}
        onPress={() => setActiveTab('previous')}
      >
        <Text style={[styles.tabText, activeTab === 'previous' && styles.activeTabText]}>
          Previous
        </Text>
        </TouchableOpacity>
      </View>

      {/* Timeline */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.timelineContainer}>
          {activeTab === 'upcoming' ? (
            upcomingSchedules.map((schedule, index) => (
              <View key={schedule.id} style={styles.timelineItem}>
                <View style={styles.dateMarker}>
                  <Text style={styles.dayNumber}>{schedule.date}</Text>
                  <Text style={styles.dayInfo}>{schedule.dayOfWeek} • {schedule.daysFromNow}</Text>
                  <Text style={styles.monthText}>{schedule.month}</Text>
                  {index < upcomingSchedules.length - 1 && <View style={styles.timelineLine} />}
                </View>
                <View style={styles.scheduleWrapper}>
                  <ScheduleCard schedule={schedule} />
                </View>
              </View>
            ))
          ) : (
            previousSchedules.map((schedule, index) => (
              <View key={schedule.id} style={styles.timelineItem}>
                <View style={styles.dateMarker}>
                  <Text style={styles.dayNumber}>{schedule.date}</Text>
                  <Text style={styles.dayInfo}>{schedule.dayOfWeek} • {schedule.daysFromNow}</Text>
                  <Text style={styles.monthText}>{schedule.month}</Text>
                  {index < previousSchedules.length - 1 && <View style={styles.timelineLine} />}
                </View>
                <View style={styles.scheduleWrapper}>
                  <ScheduleCard schedule={schedule} />
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <LinearGradient
          colors={['#4CAF50', '#45B7D1']}
          style={styles.fabGradient}
        >
          <Ionicons name="add" size={24} color="#ffffff" />
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: 'center',
    marginBottom: 10
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#cccccc',
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#4CAF50',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  activeTabText: {
    color: '#ffffff',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  timelineContainer: {
    paddingLeft: 60,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 30,
    position: 'relative',
  },
  dateMarker: {
    position: 'absolute',
    left: -60,
    top: 0,
    width: 50,
    alignItems: 'center',
  },
  dayNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  dayInfo: {
    fontSize: 12,
    color: '#cccccc',
    textAlign: 'center',
    marginBottom: 3,
  },
  monthText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
    marginBottom: 10,
  },
  timelineLine: {
    width: 2,
    height: 40,
    backgroundColor: '#4CAF50',
    opacity: 0.3,
    marginTop: 5,
  },
  scheduleWrapper: {
    flex: 1,
    marginLeft: 20,
  },
  scheduleCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scheduleHeader: {
    marginBottom: 15,
  },
  scheduleDayInfo: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  scheduleContent: {
    alignItems: 'center',
  },
  scheduleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 15,
  },
  participantsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarContainer: {
    marginHorizontal: 2,
    position: 'relative',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  avatarOverlay: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  moreAvatars: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  moreAvatarsText: {
    color: '#666',
    fontSize: 12,
    fontWeight: 'bold',
  },
  scheduleTime: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  timeText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 5,
  },
  scheduleMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  metric: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    borderRadius: 15,
    overflow: 'hidden',
  },
  fabGradient: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
