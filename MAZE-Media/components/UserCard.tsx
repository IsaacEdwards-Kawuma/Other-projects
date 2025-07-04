import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { CircleCheck as CheckCircle, UserPlus, UserCheck } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

// UserCard Component - Displays user suggestions with follow functionality
// Shows user info, verification status, and follow button

interface UserCardProps {
  user: {
    id: string;
    username: string;
    displayName: string;
    avatar: string;
    verified: boolean;
    followers: number;
    bio: string;
  };
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const { colors } = useTheme();
  const [isFollowing, setIsFollowing] = useState(false);

  const formatFollowers = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 15,
      marginBottom: 10,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 12,
    },
    userInfo: {
      flex: 1,
    },
    nameContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 2,
    },
    displayName: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 16,
      color: colors.text,
    },
    verifiedIcon: {
      marginLeft: 4,
    },
    username: {
      fontFamily: 'Inter-Regular',
      fontSize: 14,
      color: colors.textSecondary,
    },
    followButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    followingButton: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
    followButtonText: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 14,
      color: colors.background,
      marginLeft: 4,
    },
    followingButtonText: {
      color: colors.text,
    },
    bio: {
      fontFamily: 'Inter-Regular',
      fontSize: 14,
      color: colors.text,
      marginBottom: 8,
    },
    followersCount: {
      fontFamily: 'Inter-Medium',
      fontSize: 12,
      color: colors.textSecondary,
    },
  });

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <View style={styles.nameContainer}>
            <Text style={styles.displayName}>{user.displayName}</Text>
            {user.verified && (
              <CheckCircle size={16} color={colors.primary} style={styles.verifiedIcon} />
            )}
          </View>
          <Text style={styles.username}>@{user.username}</Text>
        </View>
        <TouchableOpacity
          style={[styles.followButton, isFollowing && styles.followingButton]}
          onPress={handleFollowToggle}
        >
          {isFollowing ? (
            <UserCheck size={16} color={colors.text} />
          ) : (
            <UserPlus size={16} color={colors.background} />
          )}
          <Text style={[styles.followButtonText, isFollowing && styles.followingButtonText]}>
            {isFollowing ? 'Following' : 'Follow'}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.bio}>{user.bio}</Text>
      <Text style={styles.followersCount}>
        {formatFollowers(user.followers)} followers
      </Text>
    </TouchableOpacity>
  );
};