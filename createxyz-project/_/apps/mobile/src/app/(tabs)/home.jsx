import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import {
  Bell,
  Search,
  MapPin,
  Shield,
  Users,
  Calendar,
  Star,
  ChevronRight,
  AlertTriangle,
} from "lucide-react-native";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import * as Location from "expo-location";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [location, setLocation] = useState(null);
  const [currentCity, setCurrentCity] = useState("Loading...");

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
  });

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setCurrentCity("Location not available");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);

      // Reverse geocode to get city name
      const [address] = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      if (address) {
        setCurrentCity(address.city || address.region || "Unknown location");
      }
    } catch (error) {
      setCurrentCity("Location error");
    }
  };

  const handleNotificationPress = () => {
    Alert.alert("Notifications", "No new notifications");
  };

  const handleSearchPress = () => {
    router.push("/(tabs)/guides");
  };

  const handleEmergencyPress = () => {
    router.push("/(tabs)/emergency");
  };

  const handleGuidesPress = () => {
    router.push("/(tabs)/guides");
  };

  const handleBookingsPress = () => {
    router.push("/(tabs)/bookings");
  };

  if (!fontsLoaded) {
    return null;
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFFFFF",
    },
    header: {
      paddingHorizontal: 24,
      paddingBottom: 20,
    },
    headerTop: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },
    locationContainer: {
      flex: 1,
    },
    locationLabel: {
      fontFamily: "Inter_400Regular",
      fontSize: 12,
      color: "rgba(0, 0, 0, 0.5)",
      marginBottom: 4,
    },
    locationText: {
      fontFamily: "Inter_600SemiBold",
      fontSize: 18,
      color: "#000000",
    },
    notificationButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: "#F5F5F5",
      justifyContent: "center",
      alignItems: "center",
    },
    greeting: {
      fontFamily: "Inter_600SemiBold",
      fontSize: 28,
      color: "#000000",
      marginBottom: 8,
    },
    subtitle: {
      fontFamily: "Inter_400Regular",
      fontSize: 16,
      color: "rgba(0, 0, 0, 0.7)",
    },
    searchBar: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#F5F5F5",
      borderRadius: 16,
      paddingHorizontal: 16,
      paddingVertical: 14,
      marginHorizontal: 24,
      marginBottom: 32,
    },
    searchText: {
      fontFamily: "Inter_400Regular",
      fontSize: 16,
      color: "rgba(0, 0, 0, 0.5)",
      marginLeft: 12,
    },
    emergencyBanner: {
      backgroundColor: "#FF3B30",
      marginHorizontal: 24,
      borderRadius: 16,
      padding: 20,
      marginBottom: 32,
    },
    emergencyHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
    },
    emergencyTitle: {
      fontFamily: "Inter_600SemiBold",
      fontSize: 16,
      color: "white",
      marginLeft: 12,
    },
    emergencyText: {
      fontFamily: "Inter_400Regular",
      fontSize: 14,
      color: "rgba(255, 255, 255, 0.9)",
      marginBottom: 16,
    },
    emergencyButton: {
      backgroundColor: "white",
      borderRadius: 12,
      paddingVertical: 12,
      alignItems: "center",
    },
    emergencyButtonText: {
      fontFamily: "Inter_600SemiBold",
      fontSize: 14,
      color: "#FF3B30",
    },
    section: {
      marginBottom: 32,
    },
    sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 24,
      marginBottom: 16,
    },
    sectionTitle: {
      fontFamily: "Inter_600SemiBold",
      fontSize: 20,
      color: "#000000",
    },
    viewAllText: {
      fontFamily: "Inter_400Regular",
      fontSize: 14,
      color: "#007AFF",
    },
    quickActions: {
      paddingHorizontal: 24,
    },
    actionsGrid: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    actionCard: {
      backgroundColor: "#F5F5F5",
      borderRadius: 16,
      padding: 20,
      width: (screenWidth - 72) / 2,
      alignItems: "center",
    },
    actionIcon: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: "#007AFF",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 12,
    },
    actionTitle: {
      fontFamily: "Inter_600SemiBold",
      fontSize: 14,
      color: "#000000",
      marginBottom: 4,
    },
    actionSubtitle: {
      fontFamily: "Inter_400Regular",
      fontSize: 12,
      color: "rgba(0, 0, 0, 0.7)",
      textAlign: "center",
    },
    featuredGuides: {
      paddingLeft: 24,
    },
    guideCard: {
      backgroundColor: "#FFFFFF",
      borderRadius: 16,
      marginRight: 16,
      width: 200,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    guideImage: {
      width: "100%",
      height: 120,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
    },
    guideInfo: {
      padding: 16,
    },
    guideName: {
      fontFamily: "Inter_600SemiBold",
      fontSize: 16,
      color: "#000000",
      marginBottom: 4,
    },
    guideSpecialty: {
      fontFamily: "Inter_400Regular",
      fontSize: 12,
      color: "rgba(0, 0, 0, 0.7)",
      marginBottom: 8,
    },
    guideRating: {
      flexDirection: "row",
      alignItems: "center",
    },
    ratingText: {
      fontFamily: "Inter_400Regular",
      fontSize: 12,
      color: "#000000",
      marginLeft: 4,
    },
    safetyTips: {
      paddingHorizontal: 24,
    },
    tipCard: {
      backgroundColor: "#F0F9FF",
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
        <View style={styles.headerTop}>
          <View style={styles.locationContainer}>
            <Text style={styles.locationLabel}>Current location</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MapPin size={16} color="#007AFF" />
              <Text style={styles.locationText}> {currentCity}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={handleNotificationPress}
          >
            <Bell size={20} color="#000000" />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.greeting}>Welcome to WanderWave</Text>
        <Text style={styles.subtitle}>Discover amazing places with local guides</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
      >
        {/* Search Bar */}
        <TouchableOpacity style={styles.searchBar} onPress={handleSearchPress}>
          <Search size={20} color="rgba(0, 0, 0, 0.5)" />
          <Text style={styles.searchText}>Search for guides or destinations...</Text>
        </TouchableOpacity>

        {/* Emergency Banner */}
        <View style={styles.emergencyBanner}>
          <View style={styles.emergencyHeader}>
            <Shield size={24} color="white" />
            <Text style={styles.emergencyTitle}>Emergency SOS</Text>
          </View>
          <Text style={styles.emergencyText}>
            Stay safe while traveling. Quick access to emergency services and location sharing.
          </Text>
          <TouchableOpacity
            style={styles.emergencyButton}
            onPress={handleEmergencyPress}
          >
            <Text style={styles.emergencyButtonText}>Access Emergency Features</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
          </View>
          <View style={styles.quickActions}>
            <View style={styles.actionsGrid}>
              <TouchableOpacity style={styles.actionCard} onPress={handleGuidesPress}>
                <View style={styles.actionIcon}>
                  <Users size={24} color="white" />
                </View>
                <Text style={styles.actionTitle}>Find Guides</Text>
                <Text style={styles.actionSubtitle}>Browse verified local guides</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionCard} onPress={handleBookingsPress}>
                <View style={styles.actionIcon}>
                  <Calendar size={24} color="white" />
                </View>
                <Text style={styles.actionTitle}>My Bookings</Text>
                <Text style={styles.actionSubtitle}>View your upcoming trips</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Featured Guides */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Guides</Text>
            <TouchableOpacity onPress={handleGuidesPress}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredGuides}
          >
            <View style={styles.guideCard}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=120&fit=crop&crop=face",
                }}
                style={styles.guideImage}
                contentFit="cover"
              />
              <View style={styles.guideInfo}>
                <Text style={styles.guideName}>Marco Silva</Text>
                <Text style={styles.guideSpecialty}>City Tours • Food</Text>
                <View style={styles.guideRating}>
                  <Star size={12} color="#FFD700" fill="#FFD700" />
                  <Text style={styles.ratingText}>4.9 (127 reviews)</Text>
                </View>
              </View>
            </View>

            <View style={styles.guideCard}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1494790108755-2616b4f04e31?w=200&h=120&fit=crop&crop=face",
                }}
                style={styles.guideImage}
                contentFit="cover"
              />
              <View style={styles.guideInfo}>
                <Text style={styles.guideName}>Ana Rodriguez</Text>
                <Text style={styles.guideSpecialty}>Adventure • Nature</Text>
                <View style={styles.guideRating}>
                  <Star size={12} color="#FFD700" fill="#FFD700" />
                  <Text style={styles.ratingText}>4.8 (89 reviews)</Text>
                </View>
              </View>
            </View>

            <View style={styles.guideCard}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=120&fit=crop&crop=face",
                }}
                style={styles.guideImage}
                contentFit="cover"
              />
              <View style={styles.guideInfo}>
                <Text style={styles.guideName}>David Chen</Text>
                <Text style={styles.guideSpecialty}>Culture • History</Text>
                <View style={styles.guideRating}>
                  <Star size={12} color="#FFD700" fill="#FFD700" />
                  <Text style={styles.ratingText}>4.7 (156 reviews)</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>

        {/* Safety Tips */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Safety Tips</Text>
          </View>
          <View style={styles.safetyTips}>
            <View style={styles.tipCard}>
              <Text style={styles.tipTitle}>Share Your Location</Text>
              <Text style={styles.tipText}>
                Always share your itinerary and location with trusted contacts when traveling.
              </Text>
            </View>
            <View style={styles.tipCard}>
              <Text style={styles.tipTitle}>Emergency Contacts</Text>
              <Text style={styles.tipText}>
                Save local emergency numbers and embassy contacts in your phone.
              </Text>
            </View>
            <View style={styles.tipCard}>
              <Text style={styles.tipTitle}>Trust Verified Guides</Text>
              <Text style={styles.tipText}>
                Only book with guides who have verified badges and positive reviews.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}