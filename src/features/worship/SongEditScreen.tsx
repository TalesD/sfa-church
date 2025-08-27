import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
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
  bpm: number;
  hasLyrics: boolean;
  hasChords: boolean;
  hasAudio: boolean;
  hasVideo: boolean;
  lyricsUrl?: string;
  chordsUrl?: string;
  audioUrl?: string;
  videoUrl?: string;
}

export default function SongEditScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [song, setSong] = useState<Song>({
    id: '1',
    title: 'I Surrender',
    artist: 'Hillsong',
    version: 'Original',
    genre: 'Worship',
    key: 'C',
    bpm: 153,
    hasLyrics: true,
    hasChords: true,
    hasAudio: true,
    hasVideo: true,
    lyricsUrl: 'https://www.letras.mus.br/hillsong-united/1981845',
    chordsUrl: 'https://www.cifraclub.com.br/hillsong-united/i-surrender/',
    audioUrl: 'https://www.youtube.com/watch?v=WVegVjHnm3s',
    videoUrl: 'https://www.youtube.com/watch?v=s7jXASBWwwI',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    Alert.alert('Success', 'Song information saved successfully!');
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original values
    setSong({
      id: '1',
      title: 'I Surrender',
      artist: 'Hillsong',
      version: 'Original',
      genre: 'Worship',
      key: 'C',
      bpm: 153,
      hasLyrics: true,
      hasChords: true,
      hasAudio: true,
      hasVideo: true,
      lyricsUrl: 'https://www.letras.mus.br/hillsong-united/1981845',
      chordsUrl: 'https://www.cifraclub.com.br/hillsong-united/i-surrender/',
      audioUrl: 'https://www.youtube.com/watch?v=WVegVjHnm3s',
      videoUrl: 'https://www.youtube.com/watch?v=s7jXASBWwwI',
    });
  };

  const handleAction = (action: string) => {
    switch (action) {
      case 'refresh':
        Alert.alert('Refresh', 'Refreshing song data...');
        break;
      case 'edit':
        setIsEditing(true);
        break;
      case 'delete':
        Alert.alert('Delete', 'Are you sure you want to delete this song?', [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Delete', style: 'destructive', onPress: () => navigation.goBack() },
        ]);
        break;
    }
  };

  const ReferenceItem = ({ icon, title, url, onPress }: { icon: string; title: string; url: string; onPress: () => void }) => (
    <TouchableOpacity style={styles.referenceItem} onPress={onPress}>
      <View style={styles.referenceIcon}>
        <Ionicons name={icon as any} size={20} color="#4CAF50" />
      </View>
      <View style={styles.referenceInfo}>
        <Text style={styles.referenceTitle}>{title}</Text>
        <Text style={styles.referenceUrl} numberOfLines={1}>{url}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#666" />
    </TouchableOpacity>
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
        
        <Text style={styles.headerTitle}>Music</Text>
        
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={() => handleAction('refresh')} style={styles.headerButton}>
            <Ionicons name="refresh" size={24} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleAction('edit')} style={styles.headerButton}>
            <Ionicons name="ellipsis-vertical" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </BlurView>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Song Information Card */}
        <BlurView intensity={20} style={styles.songCard}>
          <Text style={styles.songTitle}>{song.title}</Text>
          <Text style={styles.songArtist}>{song.artist}</Text>
        </BlurView>

        {/* Version Section */}
        <BlurView intensity={20} style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Version:</Text>
          {isEditing ? (
            <TextInput
              style={styles.versionInput}
              value={song.version}
              onChangeText={(text) => setSong({ ...song, version: text })}
              placeholder="Enter version"
              placeholderTextColor="#999"
            />
          ) : (
            <Text style={styles.versionText}>{song.version}</Text>
          )}
        </BlurView>

        {/* Classifications Section */}
        <BlurView intensity={20} style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Classifications</Text>
          
          <View style={styles.classificationRow}>
            <Text style={styles.classificationLabel}>Genre:</Text>
            {isEditing ? (
              <TextInput
                style={styles.classificationInput}
                value={song.genre}
                onChangeText={(text) => setSong({ ...song, genre: text })}
                placeholder="Enter genre"
                placeholderTextColor="#999"
              />
            ) : (
              <Text style={styles.classificationValue}>{song.genre}</Text>
            )}
          </View>

          <View style={styles.classificationRow}>
            <Text style={styles.classificationLabel}>Key:</Text>
            {isEditing ? (
              <TextInput
                style={styles.classificationInput}
                value={song.key}
                onChangeText={(text) => setSong({ ...song, key: text })}
                placeholder="Enter key"
                placeholderTextColor="#999"
              />
            ) : (
              <Text style={styles.classificationValue}>{song.key}</Text>
            )}
          </View>

          <View style={styles.classificationRow}>
            <Text style={styles.classificationLabel}>BPM:</Text>
            {isEditing ? (
              <TextInput
                style={styles.classificationInput}
                value={song.bpm.toString()}
                onChangeText={(text) => setSong({ ...song, bpm: parseInt(text) || 0 })}
                placeholder="Enter BPM"
                placeholderTextColor="#999"
                keyboardType="numeric"
              />
            ) : (
              <Text style={styles.classificationValue}>{song.bpm}</Text>
            )}
          </View>
        </BlurView>

        {/* References Section */}
        <BlurView intensity={20} style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>References</Text>
          
                     <ReferenceItem
             icon="document-text-outline"
             title="Lyrics"
             url={song.lyricsUrl || ''}
             onPress={() => song.lyricsUrl && Alert.alert('Lyrics', `Opening: ${song.lyricsUrl}`)}
           />
           
           <ReferenceItem
             icon="musical-notes-outline"
             title="Chords"
             url={song.chordsUrl || ''}
             onPress={() => song.chordsUrl && Alert.alert('Chords', `Opening: ${song.chordsUrl}`)}
           />
           
           <ReferenceItem
             icon="musical-notes"
             title="Audio"
             url={song.audioUrl || ''}
             onPress={() => song.audioUrl && Alert.alert('Audio', `Opening: ${song.audioUrl}`)}
           />
           
           <ReferenceItem
             icon="videocam-outline"
             title="Video"
             url={song.videoUrl || ''}
             onPress={() => song.videoUrl && Alert.alert('Video', `Opening: ${song.videoUrl}`)}
           />
        </BlurView>

        {/* Edit Actions */}
        {isEditing && (
          <View style={styles.editActions}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <LinearGradient
                colors={['#4CAF50', '#45B7D1']}
                style={styles.saveButtonGradient}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
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
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    padding: 5,
    marginLeft: 15,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  songCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  songTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 8,
    textAlign: 'center',
  },
  songArtist: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  sectionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  versionInput: {
    fontSize: 18,
    color: '#4CAF50',
    textDecorationLine: 'underline',
    borderBottomWidth: 2,
    borderBottomColor: '#4CAF50',
    paddingVertical: 5,
  },
  versionText: {
    fontSize: 18,
    color: '#4CAF50',
    textDecorationLine: 'underline',
    borderBottomWidth: 2,
    borderBottomColor: '#4CAF50',
    paddingVertical: 5,
  },
  classificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  classificationLabel: {
    fontSize: 16,
    color: '#666',
    width: 80,
    marginRight: 15,
  },
  classificationInput: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 5,
  },
  classificationValue: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    fontWeight: '500',
  },
  referenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  referenceIcon: {
    width: 40,
    alignItems: 'center',
    marginRight: 15,
  },
  referenceInfo: {
    flex: 1,
  },
  referenceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 3,
  },
  referenceUrl: {
    fontSize: 14,
    color: '#666',
  },
  editActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    marginRight: 10,
    paddingVertical: 15,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  saveButton: {
    flex: 1,
    marginLeft: 10,
    borderRadius: 15,
    overflow: 'hidden',
  },
  saveButtonGradient: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});
