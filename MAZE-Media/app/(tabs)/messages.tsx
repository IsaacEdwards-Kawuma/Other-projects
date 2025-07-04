import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, MessageCircle, Video, Phone } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { MessageItem } from '@/components/MessageItem';

// Messages Screen - Direct messaging with other users
// Shows conversation list and handles real-time messaging

interface Conversation {
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
}

export default function MessagesScreen() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Simulate fetching conversations
    setConversations([
      {
        id: '1',
        user: {
          id: '2',
          username: 'sarah_dev',
          displayName: 'Sarah Johnson',
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
          verified: true,
        },
        lastMessage: {
          text: 'Thanks for the help with the React Native issue!',
          timestamp: '2m',
          isRead: false,
          isSent: false,
        },
        unreadCount: 2,
      },
      {
        id: '2',
        user: {
          id: '3',
          username: 'mike_photographer',
          displayName: 'Mike Wilson',
          avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
          verified: false,
        },
        lastMessage: {
          text: 'Those photos turned out amazing! 📸',
          timestamp: '1h',
          isRead: true,
          isSent: true,
        },
        unreadCount: 0,
      },
      {
        id: '3',
        user: {
          id: '4',
          username: 'lisa_fitness',
          displayName: 'Lisa Chen',
          avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
          verified: true,
        },
        lastMessage: {
          text: 'Great job on the marathon! How are you feeling?',
          timestamp: '3h',
          isRead: true,
          isSent: true,
        },
        unreadCount: 0,
      },
      {
        id: '4',
        user: {
          id: '5',
          username: 'chef_antonio',
          displayName: 'Antonio Rodriguez',
          avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
          verified: false,
        },
        lastMessage: {
          text: 'I have to try that fusion recipe!',
          timestamp: '1d',
          isRead: true,
          isSent: false,
        },
        unreadCount: 0,
      },
    ]);
  }, []);

  const filteredConversations = conversations.filter(conv =>
    conv.user.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      padding: 20,
      paddingTop: 10,
    },
    title: {
      fontFamily: 'Inter-Bold',
      fontSize: 24,
      color: colors.text,
      marginBottom: 20,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: 25,
      paddingHorizontal: 15,
      marginBottom: 20,
    },
    searchInput: {
      flex: 1,
      paddingVertical: 12,
      paddingLeft: 10,
      fontFamily: 'Inter-Regular',
      fontSize: 16,
      color: colors.text,
    },
    quickActions: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 20,
    },
    quickAction: {
      alignItems: 'center',
      padding: 15,
      backgroundColor: colors.surface,
      borderRadius: 20,
      minWidth: 80,
    },
    quickActionText: {
      fontFamily: 'Inter-Medium',
      fontSize: 12,
      color: colors.text,
      marginTop: 8,
    },
    conversationsList: {
      flex: 1,
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 40,
    },
    emptyStateText: {
      fontFamily: 'Inter-Medium',
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: 20,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        
        <View style={styles.searchContainer}>
          <Search size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search messages..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickAction}>
            <MessageCircle size={24} color={colors.primary} />
            <Text style={styles.quickActionText}>New Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction}>
            <Video size={24} color={colors.primary} />
            <Text style={styles.quickActionText}>Video Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction}>
            <Phone size={24} color={colors.primary} />
            <Text style={styles.quickActionText}>Voice Call</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.conversationsList} showsVerticalScrollIndicator={false}>
        {filteredConversations.length > 0 ? (
          filteredConversations.map((conversation) => (
            <MessageItem key={conversation.id} conversation={conversation} />
          ))
        ) : (
          <View style={styles.emptyState}>
            <MessageCircle size={48} color={colors.textSecondary} />
            <Text style={styles.emptyStateText}>
              {searchQuery ? 'No messages found' : 'No messages yet\nStart a conversation!'}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}