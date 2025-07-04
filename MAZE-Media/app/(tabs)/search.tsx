import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search as SearchIcon, TrendingUp, Hash, MapPin } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { TrendingCard } from '@/components/TrendingCard';
import { UserCard } from '@/components/UserCard';

// Search Screen - Discover new content, users, and trending topics
// Features trending topics, user discovery, and real-time search

interface TrendingTopic {
  id: string;
  hashtag: string;
  posts: number;
  category: string;
}

interface SuggestedUser {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  verified: boolean;
  followers: number;
  bio: string;
}

export default function SearchScreen() {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'trending' | 'users' | 'places'>('trending');
  const [trending, setTrending] = useState<TrendingTopic[]>([]);
  const [suggestedUsers, setSuggestedUsers] = useState<SuggestedUser[]>([]);

  useEffect(() => {
    // Simulate fetching trending topics
    setTrending([
      { id: '1', hashtag: '#ReactNative', posts: 12500, category: 'Technology' },
      { id: '2', hashtag: '#Photography', posts: 8900, category: 'Arts' },
      { id: '3', hashtag: '#Fitness', posts: 7200, category: 'Health' },
      { id: '4', hashtag: '#Travel', posts: 15600, category: 'Lifestyle' },
      { id: '5', hashtag: '#Cooking', posts: 5400, category: 'Food' },
    ]);

    // Simulate fetching suggested users
    setSuggestedUsers([
      {
        id: '1',
        username: 'alex_designer',
        displayName: 'Alex Thompson',
        avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
        verified: true,
        followers: 45200,
        bio: 'UI/UX Designer & Digital Artist',
      },
      {
        id: '2',
        username: 'emma_writer',
        displayName: 'Emma Davis',
        avatar: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=400',
        verified: false,
        followers: 12800,
        bio: 'Travel writer & storyteller',
      },
      {
        id: '3',
        username: 'david_tech',
        displayName: 'David Kim',
        avatar: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=400',
        verified: true,
        followers: 89300,
        bio: 'Tech entrepreneur & investor',
      },
    ]);
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      padding: 20,
      paddingTop: 10,
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
    tabContainer: {
      flexDirection: 'row',
      backgroundColor: colors.surface,
      borderRadius: 25,
      padding: 4,
    },
    tab: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 20,
    },
    activeTab: {
      backgroundColor: colors.primary,
    },
    tabText: {
      fontFamily: 'Inter-Medium',
      fontSize: 14,
      color: colors.textSecondary,
      marginLeft: 6,
    },
    activeTabText: {
      color: colors.background,
    },
    content: {
      flex: 1,
      padding: 20,
    },
    sectionTitle: {
      fontFamily: 'Inter-Bold',
      fontSize: 20,
      color: colors.text,
      marginBottom: 15,
    },
  });

  const renderContent = () => {
    switch (activeTab) {
      case 'trending':
        return (
          <View>
            <Text style={styles.sectionTitle}>Trending Now</Text>
            {trending.map((topic) => (
              <TrendingCard key={topic.id} topic={topic} />
            ))}
          </View>
        );
      case 'users':
        return (
          <View>
            <Text style={styles.sectionTitle}>Suggested for You</Text>
            {suggestedUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </View>
        );
      case 'places':
        return (
          <View>
            <Text style={styles.sectionTitle}>Popular Places</Text>
            <Text style={[styles.sectionTitle, { fontSize: 16, color: colors.textSecondary }]}>
              Coming soon...
            </Text>
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <SearchIcon size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for people, posts, or topics..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'trending' && styles.activeTab]}
            onPress={() => setActiveTab('trending')}
          >
            <TrendingUp size={16} color={activeTab === 'trending' ? colors.background : colors.textSecondary} />
            <Text style={[styles.tabText, activeTab === 'trending' && styles.activeTabText]}>
              Trending
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'users' && styles.activeTab]}
            onPress={() => setActiveTab('users')}
          >
            <Hash size={16} color={activeTab === 'users' ? colors.background : colors.textSecondary} />
            <Text style={[styles.tabText, activeTab === 'users' && styles.activeTabText]}>
              Users
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'places' && styles.activeTab]}
            onPress={() => setActiveTab('places')}
          >
            <MapPin size={16} color={activeTab === 'places' ? colors.background : colors.textSecondary} />
            <Text style={[styles.tabText, activeTab === 'places' && styles.activeTabText]}>
              Places
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderContent()}
      </ScrollView>
    </SafeAreaView>
  );
}