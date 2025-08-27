import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '../store/AuthContext';
import { COLORS, SHADOWS, LAYOUT, SIZES } from '../constants/theme';

// Import icons from react-native-vector-icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

interface TabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

const CustomTabBar: React.FC<TabBarProps> = ({ state, descriptors, navigation }) => {
  const [isMoreExpanded, setIsMoreExpanded] = useState(false);
  const { hasPermission, isInMinistry } = useAuth();
  const route = useRoute();

  const handleTabPress = (routeName: string) => {
    navigation.navigate(routeName);
  };

  const handleMorePress = () => {
    setIsMoreExpanded(!isMoreExpanded);
  };

  const renderTabIcon = (routeName: string, isFocused: boolean) => {
    const iconColor = isFocused ? COLORS.primary : COLORS.textSecondary;
    const iconSize = SIZES.iconMd;

    switch (routeName) {
      case 'Home':
        return <Icon name="home" size={iconSize} color={iconColor} />;
      case 'Give':
        return <Icon name="heart" size={iconSize} color={iconColor} />;
      case 'Events':
        return <Icon name="calendar" size={iconSize} color={iconColor} />;
      case 'Groups':
        return <Icon name="account-group" size={iconSize} color={iconColor} />;
      case 'CheckIn':
        return <Icon name="check-circle" size={iconSize} color={iconColor} />;
      default:
        return null;
    }
  };

  const renderMoreOptions = () => {
    if (!isMoreExpanded) return null;

    return (
      <Animated.View style={[styles.moreOptionsContainer, { opacity: isMoreExpanded ? 1 : 0 }]}>
        <BlurView intensity={20} style={styles.moreOptionsBlur}>
          <LinearGradient
            colors={[COLORS.glass, COLORS.glassDark]}
            style={styles.moreOptionsGradient}
          >
            {/* Worship Schedule - Only visible to worship ministry */}
            {isInMinistry('worship') && (
              <TouchableOpacity
                style={styles.moreOption}
                onPress={() => {
                  navigation.navigate('Worship');
                  setIsMoreExpanded(false);
                }}
              >
                <Icon name="music" size={SIZES.iconSm} color={COLORS.text} />
              </TouchableOpacity>
            )}

            {/* Kids Ministry - Only visible to kids ministry */}
            {isInMinistry('kids') && (
              <TouchableOpacity
                style={styles.moreOption}
                onPress={() => {
                  navigation.navigate('Kids');
                  setIsMoreExpanded(false);
                }}
              >
                <Icon name="baby-face" size={SIZES.iconSm} color={COLORS.text} />
              </TouchableOpacity>
            )}

            {/* Devotional - Visible to everyone */}
            <TouchableOpacity
              style={styles.moreOption}
              onPress={() => {
                navigation.navigate('Devotional');
                setIsMoreExpanded(false);
              }}
            >
                              <Icon name="book-open" size={SIZES.iconSm} color={COLORS.text} />
            </TouchableOpacity>
          </LinearGradient>
        </BlurView>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Main Tab Bar */}
      <BlurView intensity={20} style={styles.tabBarBlur}>
        <LinearGradient
          colors={[COLORS.glass, COLORS.glassDark]}
          style={styles.tabBarGradient}
        >
          {state.routes.map((route: any, index: number) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;

            return (
              <TouchableOpacity
                key={route.key}
                style={[styles.tab, isFocused && styles.tabFocused]}
                onPress={() => handleTabPress(route.name)}
                activeOpacity={0.7}
              >
                {renderTabIcon(route.name, isFocused)}
              </TouchableOpacity>
            );
          })}
        </LinearGradient>
      </BlurView>

      {/* More Button */}
      <TouchableOpacity
        style={styles.moreButton}
        onPress={handleMorePress}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={[COLORS.primary, COLORS.secondary]}
          style={styles.moreButtonGradient}
        >
          <Icon name="plus" size={SIZES.iconMd} color={COLORS.text} />
        </LinearGradient>
      </TouchableOpacity>

      {/* More Options */}
      {renderMoreOptions()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: 100,
    paddingBottom: 20,
  },
  tabBarBlur: {
    position: 'absolute',
    bottom: 0,
    left: 20,
    right: 20,
    borderRadius: LAYOUT.glassBorderRadius,
    overflow: 'hidden',
  },
  tabBarGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: LAYOUT.screenPadding,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: SIZES.md,
  },
  tabFocused: {
    backgroundColor: COLORS.glassLight,
  },
  moreButton: {
    position: 'absolute',
    bottom: 60,
    alignSelf: 'center',
    borderRadius: 30,
    ...SHADOWS.glass,
  },
  moreButtonGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.borderLight,
  },
  moreOptionsContainer: {
    position: 'absolute',
    bottom: 130,
    alignSelf: 'center',
    borderRadius: LAYOUT.glassBorderRadius,
    overflow: 'hidden',
    ...SHADOWS.glass,
  },
  moreOptionsBlur: {
    borderRadius: LAYOUT.glassBorderRadius,
    overflow: 'hidden',
  },
  moreOptionsGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  moreOption: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 8,
    borderRadius: SIZES.md,
    backgroundColor: COLORS.glassLight,
  },
});

export default CustomTabBar;
