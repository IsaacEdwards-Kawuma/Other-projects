import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TrendingUp } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

// TrendingCard Component - Displays trending hashtags and topics
// Shows post count and category for each trending item

interface TrendingCardProps {
  topic: {
    id: string;
    hashtag: string;
    posts: number;
    category: string;
  };
}

export const TrendingCard: React.FC<TrendingCardProps> = ({ topic }) => {
  const { colors } = useTheme();

  const formatPostCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
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
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 5,
    },
    category: {
      fontFamily: 'Inter-Regular',
      fontSize: 12,
      color: colors.textSecondary,
      textTransform: 'uppercase',
    },
    trendingIcon: {
      padding: 5,
    },
    hashtag: {
      fontFamily: 'Inter-Bold',
      fontSize: 18,
      color: colors.text,
      marginBottom: 5,
    },
    postCount: {
      fontFamily: 'Inter-Medium',
      fontSize: 14,
      color: colors.textSecondary,
    },
  });

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.category}>{topic.category}</Text>
        <View style={styles.trendingIcon}>
          <TrendingUp size={16} color={colors.primary} />
        </View>
      </View>
      <Text style={styles.hashtag}>{topic.hashtag}</Text>
      <Text style={styles.postCount}>
        {formatPostCount(topic.posts)} posts
      </Text>
    </TouchableOpacity>
  );
};