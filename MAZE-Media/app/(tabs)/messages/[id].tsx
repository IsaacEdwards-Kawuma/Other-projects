import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Send, Phone, Video, Camera, Mic, Smile, Paperclip, MoveVertical as MoreVertical } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { router, useLocalSearchParams } from 'expo-router';

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isSent: boolean;
  type: 'text' | 'image' | 'audio' | 'video';
  status: 'sent' | 'delivered' | 'read';
}

export default function ChatScreen() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const { id } = useLocalSearchParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const chatUser = {
    id: id as string,
    username: 'sarah_dev',
    displayName: 'Sarah Johnson',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    isOnline: true,
    lastSeen: 'Online',
  };

  useEffect(() => {
    // Simulate loading chat messages
    setMessages([
      {
        id: '1',
        text: 'Hey! How are you doing?',
        timestamp: '10:30 AM',
        isSent: false,
        type: 'text',
        status: 'read',
      },
      {
        id: '2',
        text: 'I\'m doing great! Just working on some new features for the app.',
        timestamp: '10:32 AM',
        isSent: true,
        type: 'text',
        status: 'read',
      },
      {
        id: '3',
        text: 'That sounds exciting! Can\'t wait to see what you\'ve been building.',
        timestamp: '10:35 AM',
        isSent: false,
        type: 'text',
        status: 'read',
      },
      {
        id: '4',
        text: 'Thanks for the help with the React Native issue earlier!',
        timestamp: '10:40 AM',
        isSent: false,
        type: 'text',
        status: 'delivered',
      },
    ]);
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSent: true,
      type: 'text',
      status: 'sent',
    };

    setMessages([...messages, newMessage]);
    setMessage('');
    
    // Auto-scroll to bottom
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleVoiceCall = () => {
    if (Platform.OS === 'web') {
      Alert.alert('Voice Call', 'Voice calling would be implemented with WebRTC for web platform');
    } else {
      Alert.alert('Voice Call', 'Voice calling would be implemented here');
    }
  };

  const handleVideoCall = () => {
    if (Platform.OS === 'web') {
      Alert.alert('Video Call', 'Video calling would be implemented with WebRTC for web platform');
    } else {
      Alert.alert('Video Call', 'Video calling would be implemented here');
    }
  };

  const handleAttachment = () => {
    Alert.alert('Attachments', 'Choose attachment type', [
      { text: 'Camera', onPress: () => Alert.alert('Camera', 'Camera functionality would open here') },
      { text: 'Gallery', onPress: () => Alert.alert('Gallery', 'Gallery picker would open here') },
      { text: 'Document', onPress: () => Alert.alert('Document', 'Document picker would open here') },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      Alert.alert('Recording', 'Voice recording started');
    } else {
      Alert.alert('Recording', 'Voice recording stopped and sent');
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 15,
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    backButton: {
      padding: 5,
      marginRight: 10,
    },
    userInfo: {
      flex: 1,
    },
    userName: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 16,
      color: colors.text,
    },
    userStatus: {
      fontFamily: 'Inter-Regular',
      fontSize: 12,
      color: colors.primary,
    },
    headerActions: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerButton: {
      padding: 8,
      marginLeft: 5,
    },
    messagesContainer: {
      flex: 1,
      padding: 15,
    },
    messageWrapper: {
      marginBottom: 15,
    },
    sentMessage: {
      alignSelf: 'flex-end',
      backgroundColor: colors.primary,
      borderRadius: 18,
      borderBottomRightRadius: 4,
      paddingHorizontal: 15,
      paddingVertical: 10,
      maxWidth: '80%',
    },
    receivedMessage: {
      alignSelf: 'flex-start',
      backgroundColor: colors.surface,
      borderRadius: 18,
      borderBottomLeftRadius: 4,
      paddingHorizontal: 15,
      paddingVertical: 10,
      maxWidth: '80%',
    },
    messageText: {
      fontFamily: 'Inter-Regular',
      fontSize: 16,
      lineHeight: 22,
    },
    sentMessageText: {
      color: colors.background,
    },
    receivedMessageText: {
      color: colors.text,
    },
    messageTime: {
      fontFamily: 'Inter-Regular',
      fontSize: 11,
      marginTop: 5,
      opacity: 0.7,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      backgroundColor: colors.surface,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    inputWrapper: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background,
      borderRadius: 25,
      paddingHorizontal: 15,
      marginRight: 10,
    },
    textInput: {
      flex: 1,
      paddingVertical: 12,
      fontFamily: 'Inter-Regular',
      fontSize: 16,
      color: colors.text,
      maxHeight: 100,
    },
    inputButton: {
      padding: 8,
    },
    sendButton: {
      backgroundColor: colors.primary,
      borderRadius: 25,
      padding: 12,
    },
    recordingButton: {
      backgroundColor: colors.error,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{chatUser.displayName}</Text>
            <Text style={styles.userStatus}>{chatUser.lastSeen}</Text>
          </View>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton} onPress={handleVoiceCall}>
            <Phone size={22} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={handleVideoCall}>
            <Video size={22} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <MoreVertical size={22} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((msg) => (
          <View key={msg.id} style={styles.messageWrapper}>
            <View style={msg.isSent ? styles.sentMessage : styles.receivedMessage}>
              <Text style={[styles.messageText, msg.isSent ? styles.sentMessageText : styles.receivedMessageText]}>
                {msg.text}
              </Text>
              <Text style={[styles.messageTime, msg.isSent ? styles.sentMessageText : styles.receivedMessageText]}>
                {msg.timestamp}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TouchableOpacity style={styles.inputButton} onPress={handleAttachment}>
            <Paperclip size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message..."
            placeholderTextColor={colors.textSecondary}
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <TouchableOpacity style={styles.inputButton}>
            <Smile size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
        {message.trim() ? (
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Send size={20} color={colors.background} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.sendButton, isRecording && styles.recordingButton]}
            onPress={handleVoiceRecord}
          >
            <Mic size={20} color={colors.background} />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}