import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

// Import context
import { AuthProvider } from './src/contexts/AuthContext';
import NavigationWrapper from './src/components/NavigationWrapper';

// Main App
export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <LinearGradient
          colors={['#1a1a2e', '#16213e', '#0f3460']}
          style={{ flex: 1 }}
        >
          <NavigationWrapper />
          <StatusBar style="light" />
        </LinearGradient>
      </NavigationContainer>
    </AuthProvider>
  );
}


