import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Shield, Bell, Moon, Sun, Globe, CircleHelp as HelpCircle, FileText, LogOut, ChevronRight, Lock, Eye, UserCheck, MessageSquare } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';

export default function SettingsScreen() {
  const { colors, isDark, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [privateAccount, setPrivateAccount] = useState(false);
  const [readReceipts, setReadReceipts] = useState(true);
  const [onlineStatus, setOnlineStatus] = useState(true);

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

  const SettingItem = ({ 
    icon, 
    title, 
    subtitle, 
    onPress, 
    showArrow = true, 
    rightComponent 
  }: {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    showArrow?: boolean;
    rightComponent?: React.ReactNode;
  }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingIcon}>{icon}</View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {rightComponent || (showArrow && (
        <ChevronRight size={20} color={colors.textSecondary} />
      ))}
    </TouchableOpacity>
  );

  const SectionHeader = ({ title }: { title: string }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      paddingTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
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
    content: {
      flex: 1,
    },
    sectionHeader: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 16,
      color: colors.text,
      marginTop: 30,
      marginBottom: 15,
      marginHorizontal: 20,
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 15,
      paddingHorizontal: 20,
      backgroundColor: colors.background,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    settingIcon: {
      marginRight: 15,
    },
    settingContent: {
      flex: 1,
    },
    settingTitle: {
      fontFamily: 'Inter-Medium',
      fontSize: 16,
      color: colors.text,
    },
    settingSubtitle: {
      fontFamily: 'Inter-Regular',
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 2,
    },
    logoutButton: {
      backgroundColor: colors.error,
      marginHorizontal: 20,
      marginVertical: 30,
      borderRadius: 12,
    },
    logoutText: {
      color: colors.background,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <SectionHeader title="Account" />
        <SettingItem
          icon={<Shield size={20} color={colors.text} />}
          title="Privacy and Security"
          subtitle="Control who can see your content"
          onPress={() => Alert.alert('Privacy', 'Privacy settings would open here')}
        />
        <SettingItem
          icon={<Lock size={20} color={colors.text} />}
          title="Private Account"
          subtitle="Only approved followers can see your posts"
          showArrow={false}
          rightComponent={
            <Switch
              value={privateAccount}
              onValueChange={setPrivateAccount}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.background}
            />
          }
        />
        <SettingItem
          icon={<UserCheck size={20} color={colors.text} />}
          title="Blocked Users"
          subtitle="Manage blocked accounts"
          onPress={() => Alert.alert('Blocked Users', 'Blocked users list would open here')}
        />

        <SectionHeader title="Notifications" />
        <SettingItem
          icon={<Bell size={20} color={colors.text} />}
          title="Push Notifications"
          subtitle="Receive notifications on this device"
          showArrow={false}
          rightComponent={
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.background}
            />
          }
        />
        <SettingItem
          icon={<MessageSquare size={20} color={colors.text} />}
          title="Message Notifications"
          subtitle="Get notified about new messages"
          onPress={() => Alert.alert('Message Notifications', 'Message notification settings would open here')}
        />

        <SectionHeader title="Privacy" />
        <SettingItem
          icon={<Eye size={20} color={colors.text} />}
          title="Read Receipts"
          subtitle="Let others know when you've read their messages"
          showArrow={false}
          rightComponent={
            <Switch
              value={readReceipts}
              onValueChange={setReadReceipts}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.background}
            />
          }
        />
        <SettingItem
          icon={<Globe size={20} color={colors.text} />}
          title="Online Status"
          subtitle="Show when you're active"
          showArrow={false}
          rightComponent={
            <Switch
              value={onlineStatus}
              onValueChange={setOnlineStatus}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.background}
            />
          }
        />

        <SectionHeader title="Preferences" />
        <SettingItem
          icon={isDark ? <Sun size={20} color={colors.text} /> : <Moon size={20} color={colors.text} />}
          title="Theme"
          subtitle={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          onPress={toggleTheme}
          showArrow={false}
        />
        <SettingItem
          icon={<Globe size={20} color={colors.text} />}
          title="Language"
          subtitle="English"
          onPress={() => Alert.alert('Language', 'Language settings would open here')}
        />

        <SectionHeader title="Support" />
        <SettingItem
          icon={<HelpCircle size={20} color={colors.text} />}
          title="Help Center"
          subtitle="Get help and support"
          onPress={() => Alert.alert('Help', 'Help center would open here')}
        />
        <SettingItem
          icon={<FileText size={20} color={colors.text} />}
          title="Terms of Service"
          onPress={() => Alert.alert('Terms', 'Terms of service would open here')}
        />
        <SettingItem
          icon={<FileText size={20} color={colors.text} />}
          title="Privacy Policy"
          onPress={() => Alert.alert('Privacy Policy', 'Privacy policy would open here')}
        />

        <TouchableOpacity style={[styles.settingItem, styles.logoutButton]} onPress={handleLogout}>
          <View style={styles.settingIcon}>
            <LogOut size={20} color={colors.background} />
          </View>
          <Text style={[styles.settingTitle, styles.logoutText]}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}