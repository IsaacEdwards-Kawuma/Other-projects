import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mail, ArrowLeft } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { router } from 'expo-router';

export default function ForgotPasswordScreen() {
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);

    Alert.alert(
      'Reset Link Sent',
      'We have sent a password reset link to your email address.',
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

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
    },
    backButton: {
      padding: 8,
      marginRight: 10,
    },
    headerTitle: {
      fontFamily: 'Inter-Bold',
      fontSize: 20,
      color: colors.text,
    },
    content: {
      flex: 1,
      padding: 20,
    },
    title: {
      fontFamily: 'Inter-Bold',
      fontSize: 32,
      color: colors.text,
      marginBottom: 10,
    },
    subtitle: {
      fontFamily: 'Inter-Regular',
      fontSize: 16,
      color: colors.textSecondary,
      marginBottom: 40,
      lineHeight: 24,
    },
    inputContainer: {
      marginBottom: 30,
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
    resetButton: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      paddingVertical: 16,
      alignItems: 'center',
      marginBottom: 30,
    },
    resetButtonText: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 16,
      color: colors.background,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reset Password</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.subtitle}>
          Don't worry! It happens. Please enter the email address associated with your account.
        </Text>

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

        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleResetPassword}
          disabled={isLoading}
        >
          <Text style={styles.resetButtonText}>
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}