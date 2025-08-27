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
import { useAuth } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  dayOfWeek: string;
  dayNumber: string;
  month: string;
  year: string;
  startTime: string;
  endTime: string;
  location: string;
  category: 'worship' | 'bible-study' | 'kids' | 'youth' | 'men' | 'women' | 'community' | 'other';
  imageUrl?: string;
  isRecurring: boolean;
  recurringPattern?: string;
  eventSeries?: string;
}

export default function EventsScreen() {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [selectedMonth, setSelectedMonth] = useState('August 2025');

  // Mock events data based on Shrewsbury AG Church calendar
  const events: Event[] = [
    {
      id: '1',
      title: 'Bible Class',
      description: 'Studying the bible is one of the most important things for a follower of Jesus because it helps us to grow in maturity and increase faith in our lives. Studying the bible brings us close to God and we understand his plans and promises. It\'s God\'s desire that we grow in grace but also in knowledge of his word.',
      date: '2025-08-31',
      dayOfWeek: 'SUN',
      dayNumber: '31',
      month: 'August',
      year: '2025',
      startTime: '8:45 AM',
      endTime: '9:30 AM',
      location: 'SFA Church',
      category: 'bible-study',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      isRecurring: true,
      recurringPattern: 'Weekly on Sundays',
      eventSeries: 'Sunday Classes',
    },
    {
      id: '2',
      title: 'Worship Service',
      description: 'Worship Service it\'s a time to seek God\'s Presence and be equipped to serve him. It is our hope that the songs we sing and the messages that are preached will help each person to experience the presence of God, the power of the Gospel, and spiritual growth.',
      date: '2025-08-31',
      dayOfWeek: 'SUN',
      dayNumber: '31',
      month: 'August',
      year: '2025',
      startTime: '10:00 AM',
      endTime: '11:45 AM',
      location: 'SFA Church, 220 Sycamore Ave, Shrewsbury, NJ, United States',
      category: 'worship',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      isRecurring: true,
      recurringPattern: 'Weekly on Sundays',
      eventSeries: 'Sunday Worship',
    },
    {
      id: '3',
      title: 'Men\'s Bible Study',
      description: 'Starting with a simple continental breakfast of bagels and coffee, each time the men meet they dig into the Scriptures with teaching and discussion. Join us in the church basement.',
      date: '2025-09-13',
      dayOfWeek: 'SAT',
      dayNumber: '13',
      month: 'September',
      year: '2025',
      startTime: '9:00 AM',
      endTime: '10:00 AM',
      location: 'SFA Church Basement',
      category: 'men',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      isRecurring: true,
      recurringPattern: 'Bi-weekly on Saturdays',
    },
    {
      id: '4',
      title: 'Kids Night',
      description: 'Kids\' Night is a free, fun-filled event for kids in Kindergarten through 5th grade, happening once a month! Your child will enjoy games, music, dancing, Bible lessons, and tasty snacks—all in a lively, faith-filled atmosphere.',
      date: '2025-09-14',
      dayOfWeek: 'SUN',
      dayNumber: '14',
      month: 'September',
      year: '2025',
      startTime: '5:30 PM',
      endTime: '7:00 PM',
      location: 'SFA Church',
      category: 'kids',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      isRecurring: true,
      recurringPattern: 'Monthly on Sundays',
    },
    {
      id: '5',
      title: 'SFA – Garage/Yard Sale',
      description: 'Bring your gently used items on Saturday, September 27th, at 8:00 am. All proceeds to benefit BGMC and Speed the Light. This fun event is a great opportunity to get rid of unused items in your home.',
      date: '2025-09-27',
      dayOfWeek: 'SAT',
      dayNumber: '27',
      month: 'September',
      year: '2025',
      startTime: '8:00 AM',
      endTime: '12:00 PM',
      location: 'SFA Church',
      category: 'community',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      isRecurring: false,
    },
  ];

  const isPastor = user?.role === 'Pastor' as any;

  // Group events by month
  const eventsByMonth = events.reduce((acc, event) => {
    const monthKey = `${event.month} ${event.year}`;
    if (!acc[monthKey]) {
      acc[monthKey] = [];
    }
    acc[monthKey].push(event);
    return acc;
  }, {} as Record<string, Event[]>);

  const getCategoryIcon = (category: Event['category']) => {
    switch (category) {
      case 'worship':
        return 'musical-notes';
      case 'bible-study':
        return 'book';
      case 'kids':
        return 'happy';
      case 'youth':
        return 'people';
      case 'men':
        return 'man';
      case 'women':
        return 'woman';
      case 'community':
        return 'people-circle';
      default:
        return 'calendar';
    }
  };

  const getCategoryColor = (category: Event['category']) => {
    switch (category) {
      case 'worship':
        return '#4CAF50';
      case 'bible-study':
        return '#2196F3';
      case 'kids':
        return '#FF9800';
      case 'youth':
        return '#9C27B0';
      case 'men':
        return '#3F51B5';
      case 'women':
        return '#E91E63';
      case 'community':
        return '#607D8B';
      default:
        return '#757575';
    }
  };

  const handleEventPress = (event: Event) => {
    // Navigate to full screen event details
    (navigation as any).navigate('EventDetails', { event });
  };

  const handleAddEvent = () => {
    if (!isPastor) {
      Alert.alert('Access Denied', 'Only pastors can add events.');
      return;
    }
    Alert.alert('Add Event', 'Event creation functionality will be implemented here.');
  };

  const EventItem = ({ event }: { event: Event }) => (
    <TouchableOpacity onPress={() => handleEventPress(event)}>
      <BlurView intensity={20} style={styles.eventItem}>
        {/* Date Marker */}
        <View style={styles.dateMarker}>
          <Text style={styles.dayOfWeek}>{event.dayOfWeek}</Text>
          <Text style={styles.dayNumber}>{event.dayNumber}</Text>
        </View>

        {/* Event Details */}
        <View style={styles.eventDetails}>
          <View style={styles.eventHeader}>
            
            <View style={styles.categoryBadge}>
              <Ionicons 
                name={getCategoryIcon(event.category) as any} 
                size={12} 
                color={getCategoryColor(event.category)} 
              />
              <Text style={[styles.categoryText, { color: getCategoryColor(event.category) }]}>
                {event.category.replace('-', ' ').toUpperCase()}
              </Text>
            </View>
          </View>

          <Text style={styles.eventTitle}>{event.title}</Text>
          
          {event.location && (
            <Text style={styles.eventLocation}>{event.location}</Text>
          )}


          {event.isRecurring && (
            <View style={styles.recurringBadge}>
              <Ionicons name="repeat" size={12} color="#666" />
              <Text style={styles.recurringText}>{event.recurringPattern}</Text>
            </View>
          )}
        </View>

        {/* Event Image */}
        <View style={styles.eventImageContainer}>
          <Image source={{ uri: event.imageUrl }} style={styles.eventImage} />
          <View style={styles.imageOverlay}>
            <Text style={styles.imageTitle}>{event.title}</Text>
          </View>
          <View style={[styles.categoryIndicator, { backgroundColor: getCategoryColor(event.category) }]}>
            <Text style={styles.categoryIndicatorText}>
              {event.category.charAt(0).toUpperCase()}
            </Text>
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
        <Text style={styles.headerTitle}>Coming Up / Events</Text>
        <Text style={styles.eventCount}>{events.length} events found</Text>
      </BlurView>

      {/* Date Filter */}
      <BlurView intensity={20} style={styles.dateFilter}>
        <View style={styles.dateFilterRow}>
          <TouchableOpacity style={styles.todayButton}>
            <Text style={styles.todayButtonText}>Today</Text>
          </TouchableOpacity>
          <View style={styles.dateDisplay}>
            <Text style={styles.dateText}>Now - {selectedMonth}</Text>
            <Ionicons name="chevron-down" size={16} color="#666" />
          </View>
        </View>
      </BlurView>

      {/* Events List by Month */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {Object.entries(eventsByMonth).map(([month, monthEvents]) => (
          <View key={month} style={styles.monthSection}>
            <Text style={styles.monthHeader}>{month}</Text>
            {monthEvents.map((event) => (
              <EventItem key={event.id} event={event} />
            ))}
          </View>
        ))}
      </ScrollView>

      {/* Floating Action Button (Pastor Only) */}
      {isPastor && (
        <TouchableOpacity style={styles.fab} onPress={handleAddEvent}>
          <LinearGradient
            colors={['#4CAF50', '#45B7D1']}
            style={styles.fabGradient}
          >
            <Ionicons name="add" size={24} color="#ffffff" />
          </LinearGradient>
        </TouchableOpacity>
      )}
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
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  eventCount: {
    fontSize: 16,
    color: '#cccccc',
  },
  dateFilter: {
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 15,
  },
  dateFilterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  todayButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  todayButtonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
  dateDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    color: '#f0f0f0',
    fontSize: 14,
    marginRight: 5,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  monthSection: {
    marginBottom: 30,
  },
  monthHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
    textAlign: 'center',
  },
  eventItem: {
    flexDirection: 'row',
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
  dateMarker: {
    alignItems: 'center',
    marginRight: 15,
    minWidth: 50,
  },
  dayOfWeek: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
    marginBottom: 5,
  },
  dayNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  eventDetails: {
    flex: 1,
    marginRight: 15,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventTime: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 4,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  eventLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  eventDescription: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 8,
  },
  recurringBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recurringText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  eventImageContainer: {
    position: 'relative',
    width: 120,
    height: 80,
    borderRadius: 10,
    overflow: 'hidden',
  },
  eventImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageTitle: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  categoryIndicator: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryIndicatorText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
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
