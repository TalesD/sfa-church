import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

interface Song {
  id: string;
  title: string;
  artist: string;
  version: string;
  genre: string;
  key: string;
  hasLyrics: boolean;
  hasAudio: boolean;
  hasVideo: boolean;
}

interface Participant {
  id: string;
  name: string;
  avatar: string;
  role: string;
  isConfirmed: boolean;
}

interface ScheduleDetail {
  id: string;
  title: string;
  dayOfWeek: string;
  time: string;
  date: string;
  daysAgo: string;
  confirmedCount: number;
  totalParticipants: number;
  songs: Song[];
  participants: Participant[];
}

export default function ScheduleDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [activeTab, setActiveTab] = useState<'songs' | 'participants'>('songs');
  const [showMenu, setShowMenu] = useState(false);

  // Mock data for the schedule
  const schedule: ScheduleDetail = {
    id: '1',
    title: 'Night Service',
    dayOfWeek: 'Sunday',
    time: '18:30',
    date: '11/06/2023',
    daysAgo: '2 days ago',
    confirmedCount: 3,
    totalParticipants: 4,
    songs: [
      {
        id: '1',
        title: 'I Surrender',
        artist: 'Leonardo Gonçalves',
        version: 'Original Version',
        genre: 'Praise',
        key: 'C',
        hasLyrics: true,
        hasAudio: true,
        hasVideo: true,
      },
      {
        id: '2',
        title: 'In Your Presence',
        artist: 'Nivea Soares',
        version: 'Original Version',
        genre: 'Praise',
        key: 'G',
        hasLyrics: true,
        hasAudio: true,
        hasVideo: true,
      },
      {
        id: '3',
        title: 'Be Exalted',
        artist: 'Sozo',
        version: 'Original Version',
        genre: 'Contemplation, Worship',
        key: 'A',
        hasLyrics: true,
        hasAudio: true,
        hasVideo: true,
      },
      {
        id: '4',
        title: 'Agnus Dei / Can Live Here',
        artist: 'Projeto Vida Music',
        version: 'Original Version',
        genre: 'Worship',
        key: 'D',
        hasLyrics: true,
        hasAudio: true,
        hasVideo: true,
      },
    ],
    participants: [
      {
        id: '1',
        name: 'John',
        avatar: 'https://i.pravatar.cc/150?img=1',
        role: 'Vocal',
        isConfirmed: true,
      },
      {
        id: '2',
        name: 'Mary',
        avatar: 'https://i.pravatar.cc/150?img=2',
        role: 'Guitar',
        isConfirmed: true,
      },
      {
        id: '3',
        name: 'Peter',
        avatar: 'https://i.pravatar.cc/150?img=3',
        role: 'Drums',
        isConfirmed: true,
      },
      {
        id: '4',
        name: 'Anna',
        avatar: 'https://i.pravatar.cc/150?img=4',
        role: 'Keyboard',
        isConfirmed: false,
      },
    ],
  };

  const handleAction = (action: string) => {
    setShowMenu(false);
    switch (action) {
      case 'share':
        Alert.alert('Share', 'Sharing schedule...');
        break;
      case 'edit':
        Alert.alert('Edit', 'Editing schedule...');
        break;
      case 'clone':
        Alert.alert('Clone', 'Cloning schedule...');
        break;
      case 'delete':
        Alert.alert('Delete', 'Are you sure you want to delete this schedule?', [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Delete', style: 'destructive', onPress: () => navigation.goBack() },
        ]);
        break;
    }
  };

  const SongItem = ({ song, index }: { song: Song; index: number }) => (
    <BlurView intensity={20} style={styles.songItem}>
      <View style={styles.songNumber}>
        <Text style={styles.songNumberText}>{index + 1}ª</Text>
      </View>
      
      <View style={styles.songInfo}>
        <Text style={styles.songTitle}>{song.title}</Text>
        <Text style={styles.songArtist}>{song.artist}</Text>
        <Text style={styles.songDetails}>
          {song.version} • {song.genre} • Key: {song.key}
        </Text>
      </View>
      
      <View style={styles.songActions}>
        <TouchableOpacity style={[styles.actionIcon, song.hasLyrics && styles.actionIconActive]}>
          <Text style={styles.actionIconText}>A</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionIcon, song.hasAudio && styles.actionIconActive]}>
          <Ionicons name="musical-notes" size={16} color={song.hasAudio ? '#4CAF50' : '#ccc'} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionIcon, song.hasVideo && styles.actionIconActive]}>
          <Ionicons name="videocam" size={16} color={song.hasVideo ? '#FF6B6B' : '#ccc'} />
        </TouchableOpacity>
      </View>
    </BlurView>
  );

  const ParticipantItem = ({ participant }: { participant: Participant }) => (
    <BlurView intensity={20} style={styles.participantItem}>
      <Image source={{ uri: participant.avatar }} style={styles.participantAvatar} />
      <View style={styles.participantInfo}>
        <Text style={styles.participantName}>{participant.name}</Text>
        <Text style={styles.participantRole}>{participant.role}</Text>
      </View>
      <View style={styles.participantStatus}>
        {participant.isConfirmed ? (
          <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
        ) : (
          <Ionicons name="time" size={24} color="#FFA500" />
        )}
      </View>
    </BlurView>
  );

  return (
    <LinearGradient
      colors={['#1a1a2e', '#16213e', '#0f3460']}
      style={styles.container}
    >
      {/* Header */}
      <BlurView intensity={20} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Schedule</Text>
        
        <TouchableOpacity onPress={() => setShowMenu(!showMenu)} style={styles.menuButton}>
          <Ionicons name="ellipsis-vertical" size={24} color="#ffffff" />
        </TouchableOpacity>
      </BlurView>

      {/* Action Menu */}
      {showMenu && (
        <View style={styles.actionMenu}>
          <TouchableOpacity style={styles.menuItem} onPress={() => handleAction('share')}>
            <Ionicons name="share-outline" size={20} color="#666" />
            <Text style={styles.menuItemText}>Share</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} onPress={() => handleAction('edit')}>
            <Ionicons name="create-outline" size={20} color="#666" />
            <Text style={styles.menuItemText}>Edit</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} onPress={() => handleAction('clone')}>
            <Ionicons name="copy-outline" size={20} color="#666" />
            <Text style={styles.menuItemText}>Clone</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} onPress={() => handleAction('delete')}>
            <Ionicons name="trash-outline" size={20} color="#FF6B6B" />
            <Text style={[styles.menuItemText, { color: '#FF6B6B' }]}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Service Title */}
        <Text style={styles.serviceTitle}>{schedule.title}</Text>

        {/* Service Details Card */}
        <BlurView intensity={20} style={styles.detailsCard}>
          <View style={styles.detailsRow}>
            <View style={styles.detailItem}>
              <Ionicons name="moon-outline" size={20} color="#4CAF50" />
              <Text style={styles.detailText}>{schedule.dayOfWeek}</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="time-outline" size={20} color="#4CAF50" />
              <Text style={styles.detailText}>{schedule.time}</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="thumbs-up" size={20} color="#4CAF50" />
              <Text style={styles.detailText}>
                {schedule.confirmedCount}/{schedule.totalParticipants} Confirmed
              </Text>
            </View>
          </View>
          
          <View style={styles.detailsRow}>
            <View style={styles.detailItem}>
              <Ionicons name="calendar-outline" size={20} color="#666" />
              <Text style={styles.detailText}>{schedule.date}</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="hourglass-outline" size={20} color="#666" />
              <Text style={styles.detailText}>{schedule.daysAgo}</Text>
            </View>
          </View>
        </BlurView>

        {/* Content Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'songs' && styles.activeTab]}
            onPress={() => setActiveTab('songs')}
          >
            <Text style={[styles.tabText, activeTab === 'songs' && styles.activeTabText]}>
              Songs ({schedule.songs.length})
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tab, activeTab === 'participants' && styles.activeTab]}
            onPress={() => setActiveTab('participants')}
          >
            <Text style={[styles.tabText, activeTab === 'participants' && styles.activeTabText]}>
              Participants ({schedule.participants.length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {activeTab === 'songs' ? (
          <View style={styles.tabContent}>
            {schedule.songs.map((song, index) => (
              <SongItem key={song.id} song={song} index={index} />
            ))}
          </View>
        ) : (
          <View style={styles.tabContent}>
            {schedule.participants.map((participant) => (
              <ParticipantItem key={participant.id} participant={participant} />
            ))}
          </View>
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <LinearGradient
          colors={['#FF6B6B', '#FF8E8E']}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  menuButton: {
    padding: 5,
  },
  actionMenu: {
    position: 'absolute',
    top: 100,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1000,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
    fontWeight: '500',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  serviceTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  detailsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
    fontWeight: '500',
  },
  tabContainer: {
    flexDirection: 'row',
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
  tabContent: {
    marginBottom: 20,
  },
  songItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  songNumber: {
    width: 40,
    alignItems: 'center',
    marginRight: 15,
  },
  songNumberText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  songArtist: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  songDetails: {
    fontSize: 14,
    color: '#999',
  },
  songActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  actionIconActive: {
    backgroundColor: '#e8f5e8',
  },
  actionIconText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  participantItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  participantAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  participantInfo: {
    flex: 1,
  },
  participantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  participantRole: {
    fontSize: 16,
    color: '#666',
  },
  participantStatus: {
    marginLeft: 15,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    borderRadius: 30,
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
