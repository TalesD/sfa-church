import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

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

export default function EventDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const event = route.params?.event as Event;

  if (!event) {
    return (
      <LinearGradient
        colors={['#1a1a2e', '#16213e', '#0f3460']}
        style={styles.container}
      >
        <Text style={styles.errorText}>Event not found</Text>
      </LinearGradient>
    );
  }

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

  const handleAddToCalendar = () => {
    // This would integrate with device calendar
    // For now, just show an alert
    alert('Add to calendar functionality will be implemented here');
  };

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
        <Text style={styles.headerTitle}>Event Details</Text>
        <View style={{ width: 24 }} />
      </BlurView>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Event Image */}
        <View style={styles.eventImageContainer}>
          <Image source={{ uri: event.imageUrl }} style={styles.eventImage} />
          <View style={styles.imageOverlay}>
          </View>
          <View style={[styles.categoryIndicator, { backgroundColor: getCategoryColor(event.category) }]}>
            <Text style={styles.categoryIndicatorText}>
              {event.category.charAt(0).toUpperCase()}
            </Text>
          </View>
        </View>

        {/* Event Info */}
        <View style={styles.eventInfo}>
          <Text style={styles.eventTitle}>{event.title}</Text>
          <Text style={styles.eventDescription}>{event.description}</Text>
          
          {/* Add to Calendar Button */}
          <TouchableOpacity style={styles.addToCalendarButton} onPress={handleAddToCalendar}>
            <Ionicons name="calendar-outline" size={20} color="#2196F3" />
            <Text style={styles.addToCalendarText}>Add to calendar</Text>
            <Ionicons name="chevron-down" size={16} color="#2196F3" />
          </TouchableOpacity>

          {/* Details Section */}
          <View style={styles.detailsSection}>
            <Text style={styles.detailsTitle}>DETAILS</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Date:</Text>
              <Text style={styles.detailValue}>{event.month} {event.dayNumber}.</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Time:</Text>
              <Text style={styles.detailValue}>{event.startTime} - {event.endTime}</Text>
            </View>
            {event.location && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Location:</Text>
                <Text style={styles.detailValue}>{event.location}</Text>
              </View>
            )}
            {event.eventSeries && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Series:</Text>
                <Text style={[styles.detailValue, styles.linkText]}>{event.eventSeries}</Text>
              </View>
            )}
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Category:</Text>
              <Text style={[styles.detailValue, styles.linkText]}>
                {event.category.replace('-', ' ').charAt(0).toUpperCase() + event.category.replace('-', ' ').slice(1)}
              </Text>
            </View>
            {event.isRecurring && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Recurring:</Text>
                <Text style={styles.detailValue}>{event.recurringPattern}</Text>
              </View>
            )}
          </View>

          {/* Related Events */}
          <View style={styles.relatedEventsSection}>
            <Text style={styles.relatedEventsTitle}>Related Events</Text>
            <View style={styles.relatedEventsPlaceholder}>
              <Text style={styles.placeholderText}>No related events found</Text>
            </View>
          </View>
        </View>
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
  errorText: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 100,
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  eventImageContainer: {
    position: 'relative',
    height: 250,
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
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  categoryIndicator: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryIndicatorText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventInfo: {
    padding: 20,
  },
  eventTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f0f0f0',
    marginBottom: 15,
    textAlign: 'center',
  },
  eventDescription: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  addToCalendarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#2196F3',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginBottom: 30,
    backgroundColor: 'rgba(33, 150, 243, 0.1)',
  },
  addToCalendarText: {
    color: '#2196F3',
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 10,
  },
  detailsSection: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 20,
    marginBottom: 30,
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f0f0f0',
    marginBottom: 20,
    textAlign: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  detailLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    width: 100,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 16,
    color: '#f0f0f0',
    flex: 1,
    fontWeight: '400',
  },
  linkText: {
    color: '#2196F3',
    textDecorationLine: 'underline',
  },
  relatedEventsSection: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 20,
  },
  relatedEventsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  relatedEventsPlaceholder: {
    height: 80,
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    borderWidth: 2,
    borderColor: '#e9ecef',
    borderStyle: 'dashed',
  },
  placeholderText: {
    color: '#6c757d',
    fontSize: 14,
    fontStyle: 'italic',
  },
});
