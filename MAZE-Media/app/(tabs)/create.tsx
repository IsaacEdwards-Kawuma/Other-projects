import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera, Image as ImageIcon, MapPin, Smile, X } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';

// Create Post Screen - Compose new posts with text, images, and location
// Includes rich media support and privacy controls

export default function CreateScreen() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [location, setLocation] = useState('');

  const handlePost = async () => {
    if (!content.trim()) {
      Alert.alert('Error', 'Please enter some content for your post.');
      return;
    }

    setIsPosting(true);
    
    // Simulate posting to API
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Reset form
    setContent('');
    setSelectedImages([]);
    setLocation('');
    setIsPosting(false);
    
    Alert.alert('Success', 'Your post has been published!', [
      { text: 'OK', onPress: () => router.navigate('/(tabs)/') }
    ]);
  };

  const handleImageSelection = () => {
    // In a real app, this would open image picker
    Alert.alert('Image Selection', 'Image picker would open here. For demo purposes, we\'ll add a sample image.', [
      { text: 'Cancel' },
      { 
        text: 'Add Sample', 
        onPress: () => setSelectedImages([...selectedImages, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800'])
      }
    ]);
  };

  const handleLocationSelection = () => {
    Alert.alert('Location', 'Location picker would open here.', [
      { text: 'Cancel' },
      { text: 'Add Location', onPress: () => setLocation('San Francisco, CA') }
    ]);
  };

  const removeImage = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
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
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    cancelButton: {
      padding: 5,
    },
    cancelText: {
      fontFamily: 'Inter-Medium',
      fontSize: 16,
      color: colors.textSecondary,
    },
    headerTitle: {
      fontFamily: 'Inter-Bold',
      fontSize: 18,
      color: colors.text,
    },
    postButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 20,
      paddingVertical: 8,
      borderRadius: 20,
      opacity: content.trim() ? 1 : 0.5,
    },
    postButtonText: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 16,
      color: colors.background,
    },
    content: {
      flex: 1,
      padding: 20,
    },
    userInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.surface,
      marginRight: 12,
    },
    userDetails: {
      flex: 1,
    },
    displayName: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 16,
      color: colors.text,
    },
    username: {
      fontFamily: 'Inter-Regular',
      fontSize: 14,
      color: colors.textSecondary,
    },
    textInput: {
      fontSize: 18,
      fontFamily: 'Inter-Regular',
      color: colors.text,
      textAlignVertical: 'top',
      minHeight: 120,
      marginBottom: 20,
    },
    imageContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 20,
    },
    imageItem: {
      width: 100,
      height: 100,
      borderRadius: 10,
      backgroundColor: colors.surface,
      marginRight: 10,
      marginBottom: 10,
      position: 'relative',
    },
    removeImageButton: {
      position: 'absolute',
      top: 5,
      right: 5,
      backgroundColor: colors.error,
      borderRadius: 12,
      width: 24,
      height: 24,
      alignItems: 'center',
      justifyContent: 'center',
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      padding: 10,
      borderRadius: 10,
      marginBottom: 20,
    },
    locationText: {
      fontFamily: 'Inter-Medium',
      fontSize: 14,
      color: colors.text,
      marginLeft: 8,
    },
    toolbar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    toolbarLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    toolbarButton: {
      padding: 10,
      marginRight: 15,
    },
    characterCount: {
      fontFamily: 'Inter-Regular',
      fontSize: 14,
      color: colors.textSecondary,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Post</Text>
          <TouchableOpacity 
            style={styles.postButton} 
            onPress={handlePost}
            disabled={!content.trim() || isPosting}
          >
            <Text style={styles.postButtonText}>
              {isPosting ? 'Posting...' : 'Post'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.userInfo}>
            <View style={styles.avatar} />
            <View style={styles.userDetails}>
              <Text style={styles.displayName}>{user?.displayName}</Text>
              <Text style={styles.username}>@{user?.username}</Text>
            </View>
          </View>

          <TextInput
            style={styles.textInput}
            placeholder="What's happening?"
            placeholderTextColor={colors.textSecondary}
            value={content}
            onChangeText={setContent}
            multiline
            maxLength={280}
          />

          {selectedImages.length > 0 && (
            <View style={styles.imageContainer}>
              {selectedImages.map((image, index) => (
                <View key={index} style={styles.imageItem}>
                  <TouchableOpacity
                    style={styles.removeImageButton}
                    onPress={() => removeImage(index)}
                  >
                    <X size={12} color={colors.background} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {location && (
            <View style={styles.locationContainer}>
              <MapPin size={16} color={colors.primary} />
              <Text style={styles.locationText}>{location}</Text>
              <TouchableOpacity 
                style={{ marginLeft: 'auto' }}
                onPress={() => setLocation('')}
              >
                <X size={16} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.toolbar}>
          <View style={styles.toolbarLeft}>
            <TouchableOpacity style={styles.toolbarButton} onPress={handleImageSelection}>
              <ImageIcon size={24} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.toolbarButton} onPress={() => {}}>
              <Camera size={24} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.toolbarButton} onPress={handleLocationSelection}>
              <MapPin size={24} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.toolbarButton} onPress={() => {}}>
              <Smile size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>
          <Text style={styles.characterCount}>
            {280 - content.length}
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}