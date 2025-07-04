import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { ArrowLeft, RotateCcw, Zap, ZapOff, Circle, Square } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function CreateStoryScreen() {
  const { colors } = useTheme();
  const [facing, setFacing] = useState<CameraType>('back');
  const [flash, setFlash] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionText}>We need your permission to show the camera</Text>
          <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const toggleFlash = () => {
    setFlash(!flash);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        if (Platform.OS === 'web') {
          Alert.alert('Photo Captured', 'Photo capture functionality would be implemented here for web');
        } else {
          const photo = await cameraRef.current.takePictureAsync();
          Alert.alert('Photo Captured', 'Photo saved successfully!');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to take picture');
      }
    }
  };

  const startRecording = async () => {
    if (cameraRef.current && !isRecording) {
      try {
        setIsRecording(true);
        if (Platform.OS === 'web') {
          Alert.alert('Recording Started', 'Video recording would be implemented here for web');
        } else {
          const video = await cameraRef.current.recordAsync();
          Alert.alert('Video Recorded', 'Video saved successfully!');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to start recording');
      } finally {
        setIsRecording(false);
      }
    }
  };

  const stopRecording = () => {
    if (cameraRef.current && isRecording) {
      cameraRef.current.stopRecording();
      setIsRecording(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    permissionContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    permissionText: {
      fontFamily: 'Inter-Medium',
      fontSize: 16,
      color: colors.text,
      textAlign: 'center',
      marginBottom: 20,
    },
    permissionButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 25,
    },
    permissionButtonText: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 16,
      color: colors.background,
    },
    camera: {
      flex: 1,
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    topControls: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 60,
      paddingHorizontal: 20,
    },
    controlButton: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderRadius: 25,
      padding: 12,
    },
    bottomControls: {
      position: 'absolute',
      bottom: 50,
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingHorizontal: 40,
    },
    captureButton: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      borderWidth: 4,
      borderColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    recordingButton: {
      backgroundColor: colors.error,
    },
    sideButton: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderRadius: 25,
      padding: 15,
    },
    recordingIndicator: {
      position: 'absolute',
      top: 80,
      left: 20,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.error,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 15,
    },
    recordingDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.background,
      marginRight: 8,
    },
    recordingText: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 12,
      color: colors.background,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
        flash={flash ? 'on' : 'off'}
      >
        <View style={styles.overlay}>
          <View style={styles.topControls}>
            <TouchableOpacity style={styles.controlButton} onPress={() => router.back()}>
              <ArrowLeft size={24} color={colors.background} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlButton} onPress={toggleFlash}>
              {flash ? (
                <Zap size={24} color={colors.background} />
              ) : (
                <ZapOff size={24} color={colors.background} />
              )}
            </TouchableOpacity>
          </View>

          {isRecording && (
            <View style={styles.recordingIndicator}>
              <View style={styles.recordingDot} />
              <Text style={styles.recordingText}>REC</Text>
            </View>
          )}

          <View style={styles.bottomControls}>
            <View style={{ width: 50 }} />
            
            <TouchableOpacity
              style={[styles.captureButton, isRecording && styles.recordingButton]}
              onPress={isRecording ? stopRecording : takePicture}
              onLongPress={startRecording}
            >
              {isRecording ? (
                <Square size={30} color={colors.background} />
              ) : (
                <Circle size={30} color={colors.background} />
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.sideButton} onPress={toggleCameraFacing}>
              <RotateCcw size={24} color={colors.background} />
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </SafeAreaView>
  );
}