import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity,
  Alert,
  Linking,
  Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

export default function GiveScreen() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: '',
    type: 'tithe' // 'tithe' or 'offering'
  });

  const handleSubmit = async () => {
    // Validate form
    if (!formData.name.trim() || !formData.email.trim() || !formData.amount.trim()) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    // Validate amount
    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Error', 'Please enter a valid amount.');
      return;
    }

    try {
      // Open Tithe.ly with form data
      const titheLyUrl = `https://give.tithe.ly/?formId=7a81626d-6864-11ee-90fc-1260ab546d11`;
      await Linking.openURL(titheLyUrl);
    } catch (error) {
      Alert.alert('Error', 'Unable to open the giving page. Please try again.');
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
            <Ionicons name="heart" size={40} color="#FF6B6B" />
          </View>
          <Text style={styles.title}>💝 Give</Text>
          <Text style={styles.subtitle}>Tithes and Offerings</Text>
        </BlurView>*/}

        {/* Form Card */}
        <BlurView intensity={20} style={styles.formCard}>
          <Text style={styles.formTitle}>Donation Information</Text>
          
          {/* Name Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Full Name *</Text>
            <TextInput
              style={styles.textInput}
              value={formData.name}
              onChangeText={(value) => updateFormData('name', value)}
              placeholder="Enter your full name"
              placeholderTextColor="#999"
              autoCapitalize="words"
            />
          </View>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email *</Text>
            <TextInput
              style={styles.textInput}
              value={formData.email}
              onChangeText={(value) => updateFormData('email', value)}
              placeholder="Enter your email"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Amount Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Amount ($) *</Text>
            <TextInput
              style={styles.textInput}
              value={formData.amount}
              onChangeText={(value) => updateFormData('amount', value)}
              placeholder="0.00"
              placeholderTextColor="#999"
              keyboardType="numeric"
            />
          </View>

          {/* Type Selection */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Donation Type</Text>
            <View style={styles.typeContainer}>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  formData.type === 'tithe' && styles.typeButtonActive
                ]}
                onPress={() => updateFormData('type', 'tithe')}
              >
                <Ionicons 
                  name="calculator" 
                  size={20} 
                  color={formData.type === 'tithe' ? '#fff' : '#666'} 
                />
                                 <Text style={[
                   styles.typeButtonText,
                   formData.type === 'tithe' && styles.typeButtonTextActive
                 ]}>
                   Tithe
                 </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  formData.type === 'offering' && styles.typeButtonActive
                ]}
                onPress={() => updateFormData('type', 'offering')}
              >
                <Ionicons 
                  name="gift" 
                  size={20} 
                  color={formData.type === 'offering' ? '#fff' : '#666'} 
                />
                                 <Text style={[
                   styles.typeButtonText,
                   formData.type === 'offering' && styles.typeButtonTextActive
                 ]}>
                   Offering
                 </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <LinearGradient
              colors={['#4CAF50', '#45B7D1']}
              style={styles.submitButtonGradient}
            >
              <Ionicons name="send" size={20} color="#fff" />
                             <Text style={styles.submitButtonText}>Submit</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Info Text */}
          <Text style={styles.infoText}>
            By clicking "Submit", you will be redirected to our secure payment platform.
          </Text>
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
    borderBottomColor: '#333',
  },
  iconContainer: {
    backgroundColor: '#FF6B6B',
    borderRadius: 20,
    padding: 10,
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
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    color: '#cccccc',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  textInput: {
    backgroundColor: '#2a2a40',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    color: '#ffffff',
    borderWidth: 1,
    borderColor: '#333',
  },
  typeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  typeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#666',
  },
  typeButtonActive: {
    borderColor: '#FF6B6B',
    borderWidth: 2,
  },
  typeButtonText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  typeButtonTextActive: {
    color: '#FF6B6B',
  },
  submitButton: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  submitButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    width: '100%',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  infoText: {
    marginTop: 20,
    fontSize: 14,
    color: '#cccccc',
    textAlign: 'center',
  },
});
