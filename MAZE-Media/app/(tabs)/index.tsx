import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { PostCard } from '@/components/PostCard';
import { StoryBar } from '@/components/StoryBar';
import { Header } from '@/components/Header';

// Home Feed Screen - Main timeline where users see posts from people they follow
// This is the primary engagement screen with infinite scroll and pull-to-refresh

interface Post {
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
}

export default function HomeScreen() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Simulate fetching posts from API
  const fetchPosts = async (refresh = false) => {
    if (refresh) setRefreshing(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockPosts: Post[] = [
      {
        id: '1',
        author: {
          id: '2',
          username: 'sarah_dev',
          displayName: 'Sarah Johnson',
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
          verified: true,
        },
        content: 'Just launched my new React Native app! 🚀 The development process was challenging but incredibly rewarding. Special thanks to the amazing developer community for all the support and resources.',
        images: ['https://images.pexels.com/photos/392018/pexels-photo-392018.jpeg?auto=compress&cs=tinysrgb&w=800'],
        timestamp: '2h',
        likes: 245,
        comments: 18,
        shares: 12,
        isLiked: false,
        isBookmarked: false,
      },
      {
        id: '2',
        author: {
          id: '3',
          username: 'mike_photographer',
          displayName: 'Mike Wilson',
          avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
          verified: false,
        },
        content: 'Golden hour at the beach never gets old. Nature has this incredible way of reminding us to slow down and appreciate the simple moments. 🌅',
        images: ['https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=800'],
        timestamp: '4h',
        likes: 892,
        comments: 45,
        shares: 23,
        isLiked: true,
        isBookmarked: true,
      },
      {
        id: '3',
        author: {
          id: '4',
          username: 'lisa_fitness',
          displayName: 'Lisa Chen',
          avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
          verified: true,
        },
        content: 'Completed my first marathon today! 26.2 miles of pure determination. The training was tough, but crossing that finish line made every early morning run worth it. #MarathonFinisher #NeverGiveUp',
        timestamp: '6h',
        likes: 156,
        comments: 32,
        shares: 8,
        isLiked: false,
        isBookmarked: false,
      },
      {
        id: '4',
        author: {
          id: '5',
          username: 'chef_antonio',
          displayName: 'Antonio Rodriguez',
          avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
          verified: false,
        },
        content: 'Experimenting with fusion cuisine tonight! Asian-Italian fusion is becoming my new passion. This spicy ramen carbonara is a game changer 🍜🇮🇹',
        images: ['https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800'],
        timestamp: '8h',
        likes: 324,
        comments: 28,
        shares: 15,
        isLiked: true,
        isBookmarked: false,
      },
    ];

    setPosts(refresh ? mockPosts : [...posts, ...mockPosts]);
    setRefreshing(false);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked, 
            likes: post.isLiked ? post.likes - 1 : post.likes + 1 
          }
        : post
    ));
  };

  const handleBookmark = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isBookmarked: !post.isBookmarked }
        : post
    ));
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
    loadingText: {
      fontFamily: 'Inter-Medium',
      fontSize: 16,
      color: colors.textSecondary,
      marginTop: 10,
    },
  });

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading your feed...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => fetchPosts(true)} />
        }
        showsVerticalScrollIndicator={false}
      >
        <StoryBar />
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onLike={handleLike}
            onBookmark={handleBookmark}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}