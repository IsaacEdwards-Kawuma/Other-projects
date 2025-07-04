import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Camera, User, Mail, MapPin, Link, Calendar } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';

export default function EditProfileScreen() {
  const { colors } = useTheme();
  const { user, updateProfile } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [location, setLocation] = useState('San Francisco, CA');
  const [website, setWebsite] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    updateProfile({
      displayName,
      username,
      email,
      bio,
    });
    
    setIsLoading(false);
    Alert.alert('Success', 'Profile updated successfully!', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  const handleChangePhoto = () => {
    Alert.alert('Change Photo', 'Choose photo source', [
      { text: 'Camera', onPress: () => Alert.alert('Camera', 'Camera would open here') },
      { text: 'Gallery', onPress: () => Alert.alert('Gallery', 'Gallery would open here') },
      { text: 'Cancel', style: 'cancel' },
    ]);
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
      paddingTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    backButton: {
      padding: 8,
      marginRight: 10,
    },
    headerTitle: {
      fontFamily: 'Inter-Bold',
      fontSize: 18,
      color: colors.text,
    },
    saveButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 20,
      paddingVertical: 8,
      borderRadius: 20,
    },
    saveButtonText: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 14,
      color: colors.background,
    },
    content: {
      flex: 1,
      padding: 20,
    },
    avatarSection: {
      alignItems: 'center',
      marginBottom: 30,
    },
    avatarContainer: {
      position: 'relative',
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: colors.surface,
    },
    changePhotoButton: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      backgroundColor: colors.primary,
      borderRadius: 20,
      padding: 8,
      borderWidth: 3,
      borderColor: colors.background,
    },
    inputContainer: {
      marginBottom: 20,
    },
    label: {
      fontFamily: 'Inter-Medium',
      fontSize: 14,
      color: colors.text,
      marginBottom: 8,
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    inputIcon: {
      padding: 15,
    },
    input: {
      flex: 1,
      paddingVertical: 15,
      paddingRight: 15,
      fontFamily: 'Inter-Regular',
      fontSize: 16,
      color: colors.text,
    },
    textArea: {
      height: 100,
      textAlignVertical: 'top',
    },
    characterCount: {
      alignSelf: 'flex-end',
      marginTop: 5,
      fontFamily: 'Inter-Regular',
      fontSize: 12,
      color: colors.textSecondary,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
        </View>
        <TouchableOpacity 
          style={styles.saveButton} 
          onPress={handleSave}
          disabled={isLoading}
        >
          <Text style={styles.saveButtonText}>
            {isLoading ? 'Saving...' : 'Save'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: user?.avatar }} 
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.changePhotoButton} onPress={handleChangePhoto}>
              <Camera size={16} color={colors.background} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Display Name</Text>
          <View style={styles.inputWrapper}>
            <View style={styles.inputIcon}>
              <User size={20} color={colors.textSecondary} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter your display name"
              placeholderTextColor={colors.textSecondary}
              value={displayName}
              onChangeText={setDisplayName}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <View style={styles.inputWrapper}>
            <View style={styles.inputIcon}>
              <User size={20} color={colors.textSecondary} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter your username"
              placeholderTextColor={colors.textSecondary}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWrapper}>
            <View style={styles.inputIcon}>
              <Mail size={20} color={colors.textSecondary} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor={colors.textSecondary}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Bio</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Tell us about yourself..."
              placeholderTextColor={colors.textSecondary}
              value={bio}
              onChangeText={setBio}
              multiline
              maxLength={160}
            />
          </View>
          <Text style={styles.characterCount}>{bio.length}/160</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Location</Text>
          <View style={styles.inputWrapper}>
            <View style={styles.inputIcon}>
              <MapPin size={20} color={colors.textSecondary} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter your location"
              placeholderTextColor={colors.textSecondary}
              value={location}
              onChangeText={setLocation}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Website</Text>
          <View style={styles.inputWrapper}>
            <View style={styles.inputIcon}>
              <Link size={20} color={colors.textSecondary} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter your website"
              placeholderTextColor={colors.textSecondary}
              value={website}
              onChangeText={setWebsite}
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Birth Date</Text>
          <View style={styles.inputWrapper}>
            <View style={styles.inputIcon}>
              <Calendar size={20} color={colors.textSecondary} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="MM/DD/YYYY"
              placeholderTextColor={colors.textSecondary}
              value={birthDate}
              onChangeText={setBirthDate}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}