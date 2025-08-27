import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity,
  Alert,
  Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

export default function CheckInScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isCheckingIn, setIsCheckingIn] = useState(false);

  const handleCheckIn = async () => {
    // Validate phone number
    if (!phoneNumber.trim()) {
      Alert.alert('Error', 'Please enter your phone number.');
      return;
    }

    // Basic phone number validation (allows various formats)
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = phoneNumber.replace(/[\s\-\(\)]/g, '');
    
    if (!phoneRegex.test(cleanPhone)) {
      Alert.alert('Error', 'Please enter a valid phone number.');
      return;
    }

    setIsCheckingIn(true);

    try {
      // Simulate check-in process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success message
      Alert.alert(
        'Check-in Successful! ✅',
        `Welcome! You have been checked in successfully.\nPhone: ${phoneNumber}`,
        [
          {
            text: 'OK',
            onPress: () => {
              setPhoneNumber('');
              setIsCheckingIn(false);
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Check-in failed. Please try again.');
      setIsCheckingIn(false);
    }
  };

  const handleQRCodeScan = () => {
    Alert.alert(
      'QR Code Scanner',
      'QR Code scanning functionality will be implemented here.',
      [{ text: 'OK' }]
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
          <View style={styles.iconContainer}>
            <Ionicons name="checkmark-circle" size={40} color="#4CAF50" />
          </View>
          <Text style={styles.title}>✅ Check-in</Text>
          <Text style={styles.subtitle}>Attendance Control</Text>
        </BlurView>*/}

        {/* Check-in Form */}
        <BlurView intensity={20} style={styles.formCard}>
          <Text style={styles.formTitle}>Quick Check-in</Text>
          
          {/* Phone Number Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Phone Number *</Text>
            <TextInput
              style={styles.textInput}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Enter your phone number"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              autoCapitalize="none"
              maxLength={20}
            />
            <Text style={styles.inputHint}>
              Enter your phone number to check in for today's service
            </Text>
          </View>

          {/* Check-in Button */}
          <TouchableOpacity 
            style={styles.checkInButton} 
            onPress={handleCheckIn}
            disabled={isCheckingIn}
          >
            <LinearGradient
              colors={['#4CAF50', '#45B7D1']}
              style={styles.checkInButtonGradient}
            >
              {isCheckingIn ? (
                <>
                  <Ionicons name="hourglass" size={20} color="#fff" />
                  <Text style={styles.checkInButtonText}>Checking In...</Text>
                </>
              ) : (
                <>
                  <Ionicons name="checkmark" size={20} color="#fff" />
                  <Text style={styles.checkInButtonText}>Check In</Text>
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* QR Code Button */}
          <TouchableOpacity style={styles.qrButton} onPress={handleQRCodeScan}>
            <LinearGradient
              colors={['#FF6B6B', '#FF8E53']}
              style={styles.qrButtonGradient}
            >
              <Ionicons name="qr-code" size={20} color="#fff" />
              <Text style={styles.qrButtonText}>Scan QR Code</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Info Text */}
          <Text style={styles.infoText}>
            Check-in helps us track attendance and provide better service to our community.
          </Text>
        </BlurView>

        {/* Recent Check-ins */}
        <BlurView intensity={20} style={styles.recentCard}>
          <Text style={styles.recentTitle}>Recent Check-ins</Text>
          <View style={styles.recentItem}>
            <Ionicons name="person-circle" size={24} color="#4CAF50" />
            <Text style={styles.recentText}>Today's service: 127 people checked in</Text>
          </View>
          <View style={styles.recentItem}>
            <Ionicons name="time" size={24} color="#FF9800" />
            <Text style={styles.recentText}>Last check-in: 2 minutes ago</Text>
          </View>
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
  header: {
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)',
  },
  iconContainer: {
    marginBottom: 10,
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
  formCard: {
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: '#cccccc',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  textInput: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    paddingHorizontal: 15,
    color: '#ffffff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  inputHint: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
  checkInButton: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkInButtonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  checkInButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    width: '100%',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  dividerText: {
    color: '#cccccc',
    fontSize: 16,
    marginHorizontal: 10,
  },
  qrButton: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  qrButtonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  qrButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#cccccc',
    textAlign: 'center',
    lineHeight: 20,
  },
  recentCard: {
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  recentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
    textAlign: 'center',
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  recentText: {
    fontSize: 16,
    color: '#cccccc',
    marginLeft: 10,
  },
});
