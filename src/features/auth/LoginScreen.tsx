import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Alert,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setIsLoading(true);
    
    try {
      // Mock login delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      await login(email, password);
      Alert.alert('Success', 'Login successful!');
    } catch (error) {
      Alert.alert('Error', 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setIsLoading(true);
    
    try {
      // Mock login delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      await login('guest@church.com', 'guest123');
      Alert.alert('Success', 'Logged in as Guest!');
    } catch (error) {
      Alert.alert('Error', 'Guest login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <LinearGradient
      colors={['#1a1a2e', '#16213e', '#0f3460']}
      style={styles.container}
    >
      {/* Header Icon */}
      <View style={styles.headerContainer}>
        <BlurView intensity={20} style={styles.headerIcon}>
          <LinearGradient
            colors={['#4CAF50', '#45B7D1']}
            style={styles.iconGradient}
          >
            <Ionicons name="home" size={60} color="#ffffff" />
          </LinearGradient>
        </BlurView>
        <Text style={styles.appTitle}>Church Management</Text>
        <Text style={styles.appSubtitle}>Choose your access level</Text>
      </View>

             {/* Login Form */}
       <View style={styles.loginContainer}>
         <BlurView intensity={20} style={styles.loginCard}>
           <Text style={styles.sectionTitle}>Login</Text>
           
           {/* Email Field */}
           <View style={styles.inputContainer}>
             <Ionicons name="mail-outline" size={20} color="#cccccc" style={styles.inputIcon} />
             <TextInput
               style={styles.textInput}
               placeholder="Email"
               placeholderTextColor="#999999"
               value={email}
               onChangeText={setEmail}
               keyboardType="email-address"
               autoCapitalize="none"
             />
           </View>
           
           {/* Password Field */}
           <View style={styles.inputContainer}>
             <Ionicons name="lock-closed-outline" size={20} color="#cccccc" style={styles.inputIcon} />
             <TextInput
               style={styles.textInput}
               placeholder="Password"
               placeholderTextColor="#999999"
               value={password}
               onChangeText={setPassword}
               secureTextEntry
               autoCapitalize="none"
             />
           </View>
           
           {/* Login Button */}
           <TouchableOpacity
             style={styles.loginButton}
             onPress={handleLogin}
             disabled={isLoading}
             activeOpacity={0.8}
           >
             <LinearGradient
               colors={['#4CAF50', '#45B7D1']}
               style={styles.loginButtonGradient}
             >
               <Ionicons name="log-in-outline" size={24} color="#ffffff" />
               <Text style={styles.loginButtonText}>Login</Text>
             </LinearGradient>
           </TouchableOpacity>
           
           {/* Guest Button */}
           <TouchableOpacity
             style={styles.guestButton}
             onPress={handleGuestLogin}
             disabled={isLoading}
             activeOpacity={0.8}
           >
             <LinearGradient
               colors={['#96CEB4', '#4ECDC4']}
               style={styles.guestButtonGradient}
             >
               <Ionicons name="person-outline" size={24} color="#ffffff" />
               <Text style={styles.guestButtonText}>Continue as Guest</Text>
             </LinearGradient>
           </TouchableOpacity>
           
           {/* Quick Access Info */}
           <View style={styles.quickAccessInfo}>
             <Text style={styles.quickAccessTitle}>Quick Access:</Text>
             <Text style={styles.quickAccessText}>• kids@church.com (Kids Ministry)</Text>
             <Text style={styles.quickAccessText}>• worship@church.com (Worship Ministry)</Text>
             <Text style={styles.quickAccessText}>• pastor@church.com (Pastor Access)</Text>
           </View>
         </BlurView>
       </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          All data is currently mocked for demonstration
        </Text>
        <Text style={styles.footerSubtext}>
          Firebase authentication will be implemented later
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 40,
  },
  headerContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerIcon: {
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  iconGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  appSubtitle: {
    fontSize: 16,
    color: '#cccccc',
    textAlign: 'center',
  },
  loginContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  loginCard: {
    borderRadius: 20,
    padding: 20,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  inputIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
  },
  loginButton: {
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  loginButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 10,
  },
  guestButton: {
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },
  guestButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
  },
  guestButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 10,
  },
  quickAccessInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 15,
    padding: 15,
    marginTop: 10,
  },
  quickAccessTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
  },
  quickAccessText: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 5,
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#cccccc',
    textAlign: 'center',
    marginBottom: 5,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'center',
  },
});
