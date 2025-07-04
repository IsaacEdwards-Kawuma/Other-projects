import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, Alert } from 'react-native';
import { Heart, MessageCircle, Share, Bookmark, MoveHorizontal as MoreHorizontal, CircleCheck as CheckCircle, Play } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface PostCardProps {
  post: {
    id: string;
    author: {
      id: string;
      username: string;
      displayName: string;
      avatar: string;
      verified: boolean;
    };
    content: string;
    images?: string[];
    timestamp: string;
    likes: number;
    comments: number;
    shares: number;
    isLiked: boolean;
    isBookmarked: boolean;
  };
  onLike: (postId: string) => void;
  onBookmark: (postId: string) => void;
}

const { width } = Dimensions.get('window');

export const PostCard: React.FC<PostCardProps> = ({ post, onLike, onBookmark }) => {
  const { colors } = useTheme();

  const handleComment = () => {
    Alert.alert('Comments', 'Comments feature would open here');
  };

  const handleShare = () => {
    Alert.alert('Share', 'Share options would appear here');
  };

  const handleMore = () => {
    Alert.alert('More Options', 'More options would appear here', [
      { text: 'Report', style: 'destructive' },
      { text: 'Hide', style: 'destructive' },
      { text: 'Copy Link' },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      padding: 15,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 12,
    },
    authorInfo: {
      flex: 1,
    },
    authorName: {
      flexDirection: 'row',
      alignItems: 'center',
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
    timestamp: {
      fontFamily: 'Inter-Regular',
      fontSize: 12,
      color: colors.textSecondary,
      marginLeft: 8,
    },
    moreButton: {
      padding: 5,
    },
    content: {
      marginBottom: 12,
    },
    contentText: {
      fontFamily: 'Inter-Regular',
      fontSize: 16,
      color: colors.text,
      lineHeight: 24,
    },
    imageContainer: {
      marginTop: 12,
      borderRadius: 12,
      overflow: 'hidden',
      position: 'relative',
    },
    postImage: {
      width: width - 30,
      height: 200,
      resizeMode: 'cover',
    },
    playButton: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: [{ translateX: -25 }, { translateY: -25 }],
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      borderRadius: 25,
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 12,
    },
    actionGroup: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 8,
      borderRadius: 20,
      marginRight: 20,
    },
    actionText: {
      fontFamily: 'Inter-Medium',
      fontSize: 14,
      color: colors.textSecondary,
      marginLeft: 6,
    },
    likedButton: {
      backgroundColor: colors.error + '20',
    },
    likedText: {
      color: colors.error,
    },
    bookmarkedButton: {
      backgroundColor: colors.primary + '20',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: post.author.avatar }} style={styles.avatar} />
        <View style={styles.authorInfo}>
          <View style={styles.authorName}>
            <Text style={styles.displayName}>{post.author.displayName}</Text>
            {post.author.verified && (
              <CheckCircle size={16} color={colors.primary} style={styles.verifiedIcon} />
            )}
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.username}>@{post.author.username}</Text>
            <Text style={styles.timestamp}>• {post.timestamp}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.moreButton} onPress={handleMore}>
          <MoreHorizontal size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.contentText}>{post.content}</Text>
        {post.images && post.images.length > 0 && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: post.images[0] }} style={styles.postImage} />
            {post.id === '4' && (
              <TouchableOpacity style={styles.playButton}>
                <Play size={20} color={colors.background} />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>

      <View style={styles.actions}>
        <View style={styles.actionGroup}>
          <TouchableOpacity
            style={[styles.actionButton, post.isLiked && styles.likedButton]}
            onPress={() => onLike(post.id)}
          >
            <Heart
              size={20}
              color={post.isLiked ? colors.error : colors.textSecondary}
              fill={post.isLiked ? colors.error : 'none'}
            />
            <Text style={[styles.actionText, post.isLiked && styles.likedText]}>
              {post.likes}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleComment}>
            <MessageCircle size={20} color={colors.textSecondary} />
            <Text style={styles.actionText}>{post.comments}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
            <Share size={20} color={colors.textSecondary} />
            <Text style={styles.actionText}>{post.shares}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.actionButton, post.isBookmarked && styles.bookmarkedButton]}
          onPress={() => onBookmark(post.id)}
        >
          <Bookmark
            size={20}
            color={post.isBookmarked ? colors.primary : colors.textSecondary}
            fill={post.isBookmarked ? colors.primary : 'none'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};