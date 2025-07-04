import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { CircleCheck as CheckCircle } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface MessageItemProps {
  conversation: {
    id: string;
    user: {
      id: string;
      username: string;
      displayName: string;
      avatar: string;
      verified: boolean;
    };
    lastMessage: {
      text: string;
      timestamp: string;
      isRead: boolean;
      isSent: boolean;
    };
    unreadCount: number;
  };
  onPress?: () => void;
}

export const MessageItem: React.FC<MessageItemProps> = ({ conversation, onPress }) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      backgroundColor: colors.background,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 12,
    },
    content: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 4,
    },
    nameContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    displayName: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 16,
      color: colors.text,
    },
    verifiedIcon: {
      marginLeft: 4,
    },
    timestamp: {
      fontFamily: 'Inter-Regular',
      fontSize: 12,
      color: colors.textSecondary,
    },
    lastMessage: {
      fontFamily: 'Inter-Regular',
      fontSize: 14,
      color: conversation.lastMessage.isRead ? colors.textSecondary : colors.text,
      marginBottom: 2,
    },
    unreadMessage: {
      fontFamily: 'Inter-Medium',
      color: colors.text,
    },
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    username: {
      fontFamily: 'Inter-Regular',
      fontSize: 12,
      color: colors.textSecondary,
    },
    unreadBadge: {
      backgroundColor: colors.primary,
      borderRadius: 10,
      paddingHorizontal: 6,
      paddingVertical: 2,
      minWidth: 20,
      alignItems: 'center',
    },
    unreadText: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 12,
      color: colors.background,
    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: conversation.user.avatar }} style={styles.avatar} />
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.nameContainer}>
            <Text style={styles.displayName}>{conversation.user.displayName}</Text>
            {conversation.user.verified && (
              <CheckCircle size={14} color={colors.primary} style={styles.verifiedIcon} />
            )}
          </View>
          <Text style={styles.timestamp}>{conversation.lastMessage.timestamp}</Text>
        </View>
        <Text style={[
          styles.lastMessage,
          !conversation.lastMessage.isRead && styles.unreadMessage
        ]}>
          {conversation.lastMessage.isSent ? 'You: ' : ''}{conversation.lastMessage.text}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.username}>@{conversation.user.username}</Text>
          {conversation.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{conversation.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};