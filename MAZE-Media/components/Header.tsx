import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Bell, MessageCircle } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';

// Header Component - Top navigation bar with app branding and quick actions
// Displays notifications and messages shortcuts

export const Header: React.FC = () => {
  const { colors } = useTheme();
  const { user } = useAuth();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 15,
      backgroundColor: colors.background,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    left: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    logo: {
      fontFamily: 'Inter-Bold',
      fontSize: 24,
      color: colors.primary,
    },
    greeting: {
      fontFamily: 'Inter-Medium',
      fontSize: 16,
      color: colors.text,
      marginLeft: 15,
    },
    actions: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    actionButton: {
      padding: 8,
      marginLeft: 10,
      position: 'relative',
    },
    notificationBadge: {
      position: 'absolute',
      top: 2,
      right: 2,
      backgroundColor: colors.error,
      borderRadius: 6,
      width: 12,
      height: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    badgeText: {
      fontSize: 8,
      color: colors.background,
      fontFamily: 'Inter-Bold',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.logo}>Social</Text>
        <Text style={styles.greeting}>Hello, {user?.displayName?.split(' ')[0] || 'User'}!</Text>
      </View>
      
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <Bell size={24} color={colors.text} />
          <View style={styles.notificationBadge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <MessageCircle size={24} color={colors.text} />
          <View style={styles.notificationBadge}>
            <Text style={styles.badgeText}>2</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};