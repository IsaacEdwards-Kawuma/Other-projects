import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { CircleCheck as CheckCircle, MapPin, Calendar, Link } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

// ProfileHeader Component - User profile information and stats
// Shows avatar, bio, follower count, and verification status

interface ProfileHeaderProps {
  user: {
    id: string;
    username: string;
    displayName: string;
    avatar: string;
    bio: string;
    followers: number;
    following: number;
    verified: boolean;
    createdAt: string;
  } | null;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  const { colors } = useTheme();

  if (!user) return null;

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  const styles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: colors.background,
    },
    avatarContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 15,
    },
    nameContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 5,
    },
    displayName: {
      fontFamily: 'Inter-Bold',
      fontSize: 24,
      color: colors.text,
    },
    verifiedIcon: {
      marginLeft: 8,
    },
    username: {
      fontFamily: 'Inter-Regular',
      fontSize: 16,
      color: colors.textSecondary,
      marginBottom: 15,
    },
    bio: {
      fontFamily: 'Inter-Regular',
      fontSize: 16,
      color: colors.text,
      textAlign: 'center',
      lineHeight: 24,
      marginBottom: 15,
    },
    metaInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    metaItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 10,
    },
    metaText: {
      fontFamily: 'Inter-Regular',
      fontSize: 14,
      color: colors.textSecondary,
      marginLeft: 5,
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 20,
      marginBottom: 20,
    },
    statItem: {
      alignItems: 'center',
    },
    statNumber: {
      fontFamily: 'Inter-Bold',
      fontSize: 20,
      color: colors.text,
    },
    statLabel: {
      fontFamily: 'Inter-Regular',
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 4,
    },
    actionButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    actionButton: {
      flex: 1,
      backgroundColor: colors.primary,
      paddingVertical: 12,
      borderRadius: 25,
      alignItems: 'center',
      marginHorizontal: 5,
    },
    secondaryButton: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
    actionButtonText: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 16,
      color: colors.background,
    },
    secondaryButtonText: {
      color: colors.text,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <View style={styles.nameContainer}>
          <Text style={styles.displayName}>{user.displayName}</Text>
          {user.verified && (
            <CheckCircle size={24} color={colors.primary} style={styles.verifiedIcon} />
          )}
        </View>
        <Text style={styles.username}>@{user.username}</Text>
      </View>

      <Text style={styles.bio}>{user.bio}</Text>

      <View style={styles.metaInfo}>
        <View style={styles.metaItem}>
          <MapPin size={16} color={colors.textSecondary} />
          <Text style={styles.metaText}>San Francisco, CA</Text>
        </View>
        <View style={styles.metaItem}>
          <Calendar size={16} color={colors.textSecondary} />
          <Text style={styles.metaText}>Joined {formatDate(user.createdAt)}</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <TouchableOpacity style={styles.statItem}>
          <Text style={styles.statNumber}>{formatNumber(user.followers)}</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statItem}>
          <Text style={styles.statNumber}>{formatNumber(user.following)}</Text>
          <Text style={styles.statLabel}>Following</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statItem}>
          <Text style={styles.statNumber}>42</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]}>
          <Text style={[styles.actionButtonText, styles.secondaryButtonText]}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};