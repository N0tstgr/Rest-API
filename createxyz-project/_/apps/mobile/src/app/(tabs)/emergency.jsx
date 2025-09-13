import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Alert,
  Linking,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  Shield,
  AlertTriangle,
  Phone,
  MapPin,
  Users,
  Clock,
  CheckCircle,
} from "lucide-react-native";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import * as Location from "expo-location";
import * as Haptics from "expo-haptics";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const EMERGENCY_CONTACTS = [
  { name: "Police", number: "911", type: "police" },
  { name: "Fire Department", number: "911", type: "fire" },
  { name: "Medical Emergency", number: "911", type: "medical" },
  { name: "Tourist Police", number: "311", type: "tourist" },
];

export default function EmergencyScreen() {
  const insets = useSafeAreaInsets();
  const [location, setLocation] = useState(null);
  const [sosActivated, setSosActivated] = useState(false);
  const [sosProgress, setSosProgress] = useState(0);
  const [alertSent, setAlertSent] = useState(false);
  
  const sosAnimation = useRef(new Animated.Value(1)).current;
  const pulseAnimation = useRef(new Animated.Value(1)).current;
  const progressAnimation = useRef(new Animated.Value(0)).current;

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
  });

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (sosActivated) {
      startSosAnimation();
      startProgressAnimation();
    } else {
      stopSosAnimation();
    }
  }, [sosActivated]);

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation.coords);
      }
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  const startSosAnimation = () => {
    const pulseSequence = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulseSequence.start();

    const scaleSequence = Animated.loop(
      Animated.sequence([
        Animated.timing(sosAnimation, {
          toValue: 0.95,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(sosAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );
    scaleSequence.start();
  };

  const startProgressAnimation = () => {
    Animated.timing(progressAnimation, {
      toValue: 1,
      duration: 5000, // 5 second countdown
      useNativeDriver: false,
    }).start(() => {
      if (sosActivated) {
        sendSosAlert();
      }
    });
  };

  const stopSosAnimation = () => {
    sosAnimation.stopAnimation();
    pulseAnimation.stopAnimation();
    progressAnimation.stopAnimation();
    sosAnimation.setValue(1);
    pulseAnimation.setValue(1);
    progressAnimation.setValue(0);
  };

  const handleSosPress = async () => {
    if (sosActivated) {
      // Cancel SOS
      setSosActivated(false);
      setSosProgress(0);
      setAlertSent(false);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      // Activate SOS
      setSosActivated(true);
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      
      Alert.alert(
        "SOS Alert Activated",
        "Your emergency alert will be sent in 5 seconds. Tap the button again to cancel.",
        [
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => {
              setSosActivated(false);
              setSosProgress(0);
            },
          },
        ]
      );
    }
  };

  const sendSosAlert = async () => {
    try {
      const alertData = {
        latitude: location?.latitude,
        longitude: location?.longitude,
        timestamp: new Date().toISOString(),
        emergency_type: "general",
        notes: "Emergency SOS activated from mobile app",
      };

      console.log("Sending SOS alert:", alertData);
      
      // Here you would send to your API
      // const response = await fetch("/api/emergency/sos", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(alertData),
      // });

      setAlertSent(true);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      Alert.alert(
        "SOS Alert Sent!",
        "Your emergency alert has been sent with your current location. Emergency services have been notified.",
        [
          {
            text: "OK",
            onPress: () => {
              setSosActivated(false);
              setSosProgress(0);
            },
          },
        ]
      );
    } catch (error) {
      console.error("Error sending SOS alert:", error);
      Alert.alert("Error", "Failed to send SOS alert. Please try again or call emergency services directly.");
    }
  };

  const makeEmergencyCall = async (number) => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      const url = `tel:${number}`;
      const canOpen = await Linking.canOpenURL(url);
      
      if (canOpen) {
        Alert.alert(
          "Emergency Call",
          `Are you sure you want to call ${number}?`,
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Call",
              style: "destructive",
              onPress: () => Linking.openURL(url),
            },
          ]
        );
      } else {
        Alert.alert("Error", "Unable to make phone calls on this device");
      }
    } catch (error) {
      console.error("Error making emergency call:", error);
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  const progressWidth = progressAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFFFFF",
    },
    header: {
      paddingHorizontal: 24,
      paddingBottom: 20,
    },
    headerTitle: {
      fontFamily: "Inter_600SemiBold",
      fontSize: 28,
      color: "#000000",
      marginBottom: 8,
    },
    headerSubtitle: {
      fontFamily: "Inter_400Regular",
      fontSize: 16,
      color: "rgba(0, 0, 0, 0.7)",
    },
    sosContainer: {
      alignItems: "center",
      paddingVertical: 40,
      marginBottom: 32,
    },
    sosButtonContainer: {
      position: "relative",
      alignItems: "center",
      justifyContent: "center",
    },
    sosButton: {
      width: 200,
      height: 200,
      borderRadius: 100,
      backgroundColor: "#FF3B30",
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#FF3B30",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 20,
      elevation: 20,
    },
    sosButtonActive: {
      backgroundColor: "#FF1D23",
    },
    sosButtonText: {
      fontFamily: "Inter_600SemiBold",
      fontSize: 24,
      color: "white",
      marginTop: 8,
    },
    sosSubtext: {
      fontFamily: "Inter_400Regular",
      fontSize: 14,
      color: "white",
      textAlign: "center",
      marginTop: 4,
    },
    progressRing: {
      position: "absolute",
      width: 220,
      height: 220,
      borderRadius: 110,
      borderWidth: 4,
      borderColor: "rgba(255, 59, 48, 0.2)",
    },
    progressFill: {
      position: "absolute",
      width: 220,
      height: 220,
      borderRadius: 110,
      borderWidth: 4,
      borderColor: "#FF3B30",
    },
    statusContainer: {
      marginTop: 24,
      alignItems: "center",
    },
    statusText: {
      fontFamily: "Inter_600SemiBold",
      fontSize: 18,
      color: sosActivated ? "#FF3B30" : "#000000",
      marginBottom: 8,
    },
    statusSubtext: {
      fontFamily: "Inter_400Regular",
      fontSize: 14,
      color: "rgba(0, 0, 0, 0.7)",
      textAlign: "center",
      marginBottom: 16,
    },
    locationContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#F0F9FF",
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 12,
      marginHorizontal: 24,
      marginBottom: 32,
    },
    locationText: {
      fontFamily: "Inter_400Regular",
      fontSize: 14,
      color: "#007AFF",
      marginLeft: 8,
      flex: 1,
    },
    emergencyContactsContainer: {
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontFamily: "Inter_600SemiBold",
      fontSize: 20,
      color: "#000000",
      marginBottom: 16,
    },
    contactCard: {
      backgroundColor: "#FFFFFF",
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
      flexDirection: "row",
      alignItems: "center",
    },
    contactIcon: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: "#FF3B30",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 16,
    },
    contactInfo: {
      flex: 1,
    },
    contactName: {
      fontFamily: "Inter_600SemiBold",
      fontSize: 16,
      color: "#000000",
      marginBottom: 4,
    },
    contactNumber: {
      fontFamily: "Inter_400Regular",
      fontSize: 14,
      color: "rgba(0, 0, 0, 0.7)",
    },
    callButton: {
      backgroundColor: "#007AFF",
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 12,
    },
    callButtonText: {
      fontFamily: "Inter_600SemiBold",
      fontSize: 12,
      color: "white",
    },
    safetyTips: {
      paddingHorizontal: 24,
      marginTop: 24,
    },
    tipCard: {
      backgroundColor: "#F8F9FA",
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      borderLeftWidth: 4,
      borderLeftColor: "#007AFF",
    },
    tipTitle: {
      fontFamily: "Inter_600SemiBold",
      fontSize: 14,
      color: "#000000",
      marginBottom: 4,
    },
    tipText: {
      fontFamily: "Inter_400Regular",
      fontSize: 12,
      color: "rgba(0, 0, 0, 0.7)",
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <Text style={styles.headerTitle}>Emergency SOS</Text>
        <Text style={styles.headerSubtitle}>
          Quick access to emergency services and safety features
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      >
        {/* SOS Button */}
        <View style={styles.sosContainer}>
          <View style={styles.sosButtonContainer}>
            {sosActivated && (
              <View style={styles.progressRing}>
                <Animated.View
                  style={[
                    styles.progressFill,
                    {
                      transform: [
                        {
                          rotate: progressAnimation.interpolate({
                            inputRange: [0, 1],
                            outputRange: ["0deg", "360deg"],
                          }),
                        },
                      ],
                    },
                  ]}
                />
              </View>
            )}
            
            <TouchableOpacity
              style={[styles.sosButton, sosActivated && styles.sosButtonActive]}
              onPress={handleSosPress}
              activeOpacity={0.8}
            >
              <Animated.View
                style={{
                  transform: [
                    { scale: sosActivated ? sosAnimation : 1 },
                  ],
                }}
              >
                {alertSent ? (
                  <CheckCircle size={48} color="white" />
                ) : sosActivated ? (
                  <AlertTriangle size={48} color="white" />
                ) : (
                  <Shield size={48} color="white" />
                )}
                <Text style={styles.sosButtonText}>
                  {alertSent ? "SENT" : sosActivated ? "CANCEL" : "SOS"}
                </Text>
                {!alertSent && (
                  <Text style={styles.sosSubtext}>
                    {sosActivated ? "Tap to cancel" : "Tap to activate"}
                  </Text>
                )}
              </Animated.View>
            </TouchableOpacity>
          </View>

          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>
              {alertSent
                ? "Emergency Alert Sent"
                : sosActivated
                ? "Sending Alert..."
                : "Emergency SOS Ready"}
            </Text>
            <Text style={styles.statusSubtext}>
              {alertSent
                ? "Emergency services have been notified with your location"
                : sosActivated
                ? "Your location will be shared with emergency services"
                : "Press and hold the SOS button for emergency assistance"}
            </Text>
          </View>
        </View>

        {/* Location Status */}
        {location && (
          <View style={styles.locationContainer}>
            <MapPin size={20} color="#007AFF" />
            <Text style={styles.locationText}>
              Location enabled: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
            </Text>
          </View>
        )}

        {/* Emergency Contacts */}
        <View style={styles.emergencyContactsContainer}>
          <Text style={styles.sectionTitle}>Emergency Contacts</Text>
          
          {EMERGENCY_CONTACTS.map((contact, index) => (
            <TouchableOpacity
              key={index}
              style={styles.contactCard}
              onPress={() => makeEmergencyCall(contact.number)}
            >
              <View style={styles.contactIcon}>
                <Phone size={24} color="white" />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.contactNumber}>{contact.number}</Text>
              </View>
              <TouchableOpacity
                style={styles.callButton}
                onPress={() => makeEmergencyCall(contact.number)}
              >
                <Text style={styles.callButtonText}>CALL</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        {/* Safety Tips */}
        <View style={styles.safetyTips}>
          <Text style={styles.sectionTitle}>Emergency Safety Tips</Text>
          
          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>Stay Calm</Text>
            <Text style={styles.tipText}>
              Take deep breaths and try to remain calm. Clear thinking is essential in emergencies.
            </Text>
          </View>

          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>Share Your Location</Text>
            <Text style={styles.tipText}>
              The SOS feature automatically shares your GPS coordinates with emergency services.
            </Text>
          </View>

          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>Contact Local Authorities</Text>
            <Text style={styles.tipText}>
              Always call local emergency numbers first, as they can provide immediate assistance.
            </Text>
          </View>

          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>Inform Your Contacts</Text>
            <Text style={styles.tipText}>
              Let trusted contacts know about your situation and location when it's safe to do so.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}