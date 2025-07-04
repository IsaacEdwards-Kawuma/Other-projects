import React from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, Text, Image, Alert } from 'react-native';
import { Plus, Camera } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';

interface Story {
  id: string;
  user: {
    username: string;
    displayName: string;
    avatar: string;
  };
  hasNew: boolean;
  isViewed: boolean;
}

export const StoryBar: React.FC = () => {
  const { colors } = useTheme();
  const { user } = useAuth();

  const stories: Story[] = [
    {
      id: '1',
      user: {
        username: 'sarah_dev',
        displayName: 'Sarah',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      hasNew: true,
      isViewed: false,
    },
    {
      id: '2',
      user: {
        username: 'mike_photographer',
        displayName: 'Mike',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      hasNew: true,
      isViewed: false,
    },
    {
      id: '3',
      user: {
        username: 'lisa_fitness',
        displayName: 'Lisa',
        avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      hasNew: false,
      isViewed: true,
    },
    {
      id: '4',
      user: {
        username: 'chef_antonio',
        displayName: 'Antonio',
        avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
      },
      hasNew: true,
      isViewed: false,
    },
  ];

  const handleCreateStory = () => {
    router.push('/(tabs)/create/story');
  };

  const handleViewStory = (story: Story) => {
    Alert.alert('View Story', `Viewing ${story.user.displayName}'s story`);
  };

  const styles = StyleSheet.create({
    container: {
      paddingVertical: 15,
      paddingLeft: 15,
      backgroundColor: colors.background,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    storyItem: {
      alignItems: 'center',
      marginRight: 15,
    },
    addStoryButton: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: colors.border,
      borderStyle: 'dashed',
    },
    storyAvatar: {
      width: 60,
      height: 60,
      borderRadius: 30,
      borderWidth: 2,
      borderColor: colors.border,
    },
    newStoryAvatar: {
      borderColor: colors.primary,
      borderWidth: 3,
    },
    viewedStoryAvatar: {
      borderColor: colors.textSecondary,
      opacity: 0.6,
    },
    storyName: {
      fontFamily: 'Inter-Medium',
      fontSize: 12,
      color: colors.text,
      marginTop: 5,
      textAlign: 'center',
    },
    addStoryText: {
      fontFamily: 'Inter-Medium',
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 5,
      textAlign: 'center',
    },
    liveIndicator: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: colors.error,
      borderRadius: 8,
      paddingVertical: 2,
      paddingHorizontal: 4,
    },
    liveText: {
      fontFamily: 'Inter-Bold',
      fontSize: 8,
      color: colors.background,
      textAlign: 'center',
    },
  });

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      <TouchableOpacity style={styles.storyItem} onPress={handleCreateStory}>
        <View style={styles.addStoryButton}>
          <Plus size={24} color={colors.textSecondary} />
        </View>
        <Text style={styles.addStoryText}>Your Story</Text>
      </TouchableOpacity>

      {stories.map((story) => (
        <TouchableOpacity 
          key={story.id} 
          style={styles.storyItem}
          onPress={() => handleViewStory(story)}
        >
          <View style={{ position: 'relative' }}>
            <Image
              source={{ uri: story.user.avatar }}
              style={[
                styles.storyAvatar,
                story.hasNew && !story.isViewed && styles.newStoryAvatar,
                story.isViewed && styles.viewedStoryAvatar,
              ]}
            />
            {story.id === '2' && (
              <View style={styles.liveIndicator}>
                <Text style={styles.liveText}>LIVE</Text>
              </View>
            )}
          </View>
          <Text style={styles.storyName}>{story.user.displayName}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};