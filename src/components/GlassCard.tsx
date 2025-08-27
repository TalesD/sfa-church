import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SHADOWS, LAYOUT } from '../constants/theme';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'elevated' | 'subtle';
  padding?: number;
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  style, 
  variant = 'default',
  padding = LAYOUT.cardPadding 
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'elevated':
        return {
          shadow: SHADOWS.glass,
          borderColor: COLORS.borderLight,
        };
      case 'subtle':
        return {
          shadow: SHADOWS.glassLight,
          borderColor: COLORS.borderDark,
        };
      default:
        return {
          shadow: SHADOWS.glass,
          borderColor: COLORS.border,
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <View style={[styles.container, variantStyles.shadow, style]}>
      <BlurView intensity={20} style={styles.blurContainer}>
        <LinearGradient
          colors={[COLORS.glass, COLORS.glassDark]}
          style={[
            styles.gradient,
            { padding, borderColor: variantStyles.borderColor }
          ]}
        >
          {children}
        </LinearGradient>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: LAYOUT.glassBorderRadius,
    overflow: 'hidden',
  },
  blurContainer: {
    borderRadius: LAYOUT.glassBorderRadius,
    overflow: 'hidden',
  },
  gradient: {
    borderWidth: 1,
    borderRadius: LAYOUT.glassBorderRadius,
  },
});

export default GlassCard;
