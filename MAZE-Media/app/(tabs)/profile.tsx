import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, CreditCard as Edit, Share, Moon, Sun, Shield, LogOut } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { ProfileHeader } from '@/components/ProfileHeader';
import { PostCard } from '@/components/PostCard';

// Profile Screen - User's personal profile with posts and settings
// Includes profile editing, theme toggle, and privacy controls

export default function ProfileScreen() {
  const { colors, isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'posts' | 'media' | 'likes'>('posts');

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: logout }
      ]
    );
  };

  const handleShare = () => {
    Alert.alert('Share Profile', 'Profile sharing functionality would be implemented here.');
  };

  const handleEdit = () => {
    Alert.alert('Edit Profile', 'Profile editing functionality would be implemented here.');
  };

  const userPosts = [
    {
      id: '1',
      author: {
        id: '1',
        username: user?.username || 'john_doe',
        displayName: user?.displayName || 'John Doe',
        avatar: user?.avatar || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
        verified: user?.verified || false,
      },
      content: 'Just finished building an amazing React Native app! The development process was both challenging and rewarding. Excited to share it with the community soon. 🚀',
      images: ['https://images.pexels.com/photos/392018/pexels-photo-392018.jpeg?auto=compress&cs=tinysrgb&w=800'],
      timestamp: '1d',
      likes: 89,
      comments: 12,
      shares: 5,
      isLiked: false,
      isBookmarked: true,
    },
    {
      id: '2',
      author: {
        id: '1',
        username: user?.username || 'john_doe',
        displayName: user?.displayName || 'John Doe',
        avatar: user?.avatar || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
        verified: user?.verified || false,
      },
      content: 'Beautiful sunset today! Sometimes you just need to take a moment to appreciate the simple things in life. 🌅',
      images: ['https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=800'],
      timestamp: '3d',
      likes: 156,
      comments: 8,
      shares: 3,
      isLiked: true,
      isBookmarked: false,
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      paddingTop: 10,
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerTitle: {
      fontFamily: 'Inter-Bold',
      fontSize: 20,
      color: colors.text,
      marginLeft: 15,
    },
    headerActions: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerButton: {
      padding: 8,
      marginLeft: 8,
    },
    tabContainer: {
      flexDirection: 'row',
      backgroundColor: colors.surface,
      marginHorizontal: 20,
      borderRadius: 25,
      padding: 4,
      marginBottom: 20,
    },
    tab: {
      flex: 1,
      paddingVertical: 10,
      alignItems: 'center',
      borderRadius: 20,
    },
    activeTab: {
      backgroundColor: colors.primary,
    },
    tabText: {
      fontFamily: 'Inter-Medium',
      fontSize: 14,
      color: colors.textSecondary,
    },
    activeTabText: {
      color: colors.background,
    },
    settingsContainer: {
      padding: 20,
    },
    settingsSection: {
      marginBottom: 30,
    },
    sectionTitle: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 16,
      color: colors.text,
      marginBottom: 15,
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 15,
      paddingHorizontal: 20,
      backgroundColor: colors.surface,
      borderRadius: 12,
      marginBottom: 10,
    },
    settingText: {
      fontFamily: 'Inter-Regular',
      fontSize: 16,
      color: colors.text,
      marginLeft: 15,
      flex: 1,
    },
    logoutButton: {
      backgroundColor: colors.error,
    },
    logoutText: {
      color: colors.background,
    },
    postsContainer: {
      flex: 1,
    },
  });

  const renderTabContent = () => {
    switch (activeTab) {
      case 'posts':
        return (
          <ScrollView style={styles.postsContainer} showsVerticalScrollIndicator={false}>
            {userPosts.map((post) => (
              <PostCard 
                key={post.id} 
                post={post} 
                onLike={() => {}} 
                onBookmark={() => {}}
              />
            ))}
          </ScrollView>
        );
      case 'media':
        return (
          <View style={styles.postsContainer}>
            <Text style={[styles.sectionTitle, { textAlign: 'center', marginTop: 50 }]}>
              Media posts coming soon...
            </Text>
          </View>
        );
      case 'likes':
        return (
          <View style={styles.postsContainer}>
            <Text style={[styles.sectionTitle, { textAlign: 'center', marginTop: 50 }]}>
              Liked posts coming soon...
            </Text>
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton} onPress={handleShare}>
            <Share size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={handleEdit}>
            <Edit size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Settings size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader user={user} />
        
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'posts' && styles.activeTab]}
            onPress={() => setActiveTab('posts')}
          >
            <Text style={[styles.tabText, activeTab === 'posts' && styles.activeTabText]}>
              Posts
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'media' && styles.activeTab]}
            onPress={() => setActiveTab('media')}
          >
            <Text style={[styles.tabText, activeTab === 'media' && styles.activeTabText]}>
              Media
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'likes' && styles.activeTab]}
            onPress={() => setActiveTab('likes')}
          >
            <Text style={[styles.tabText, activeTab === 'likes' && styles.activeTabText]}>
              Likes
            </Text>
          </TouchableOpacity>
        </View>

        {renderTabContent()}

        <View style={styles.settingsContainer}>
          <View style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            <TouchableOpacity style={styles.settingItem} onPress={toggleTheme}>
              {isDark ? <Sun size={20} color={colors.text} /> : <Moon size={20} color={colors.text} />}
              <Text style={styles.settingText}>
                {isDark ? 'Light Mode' : 'Dark Mode'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.settingItem}>
              <Shield size={20} color={colors.text} />
              <Text style={styles.settingText}>Privacy Settings</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.settingItem, styles.logoutButton]} 
            onPress={handleLogout}
          >
            <LogOut size={20} color={colors.background} />
            <Text style={[styles.settingText, styles.logoutText]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}