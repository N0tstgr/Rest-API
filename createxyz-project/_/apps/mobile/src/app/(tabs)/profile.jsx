import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Switch,
} from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  User,
  Settings,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  Edit,
  Star,
  MapPin,
  Phone,
  Mail,
  Calendar,
  ChevronRight,
  Badge,
  Camera,
} from "lucide-react-native";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const [user, setUser] = useState(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
  });

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      // Mock user data for now - will replace with API call
      const mockUser = {
        id: 1,
        name: "Sarah Johnson",
        email: "sarah.johnson@example.com",
        phone: "+1 (555) 123-4567",
        role: "tourist",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b4f04e31?w=200&h=200&fit=crop&crop=face",
        joinedDate: "2024-03-15",
        totalTrips: 12,
        totalReviews: 8,
        averageRating: 4.8,
        verified: true,
        location: "San Francisco, CA",
        bio: "Travel enthusiast who loves discovering new cultures and cuisines around the world.",
      };
      
      setUser(mockUser);
    } catch (error) {
      console.error("Error loading user profile:", error);
    }
  };

  const handleEditProfile = () => {
    Alert.alert("Edit Profile", "Profile editing feature coming soon!");
  };

  const handleChangePhoto = () => {
    Alert.alert(
      "Change Photo",
      "Choose a photo source",
      [
        { text: "Camera", onPress: () => console.log("Camera selected") },
        { text: "Gallery", onPress: () => console.log("Gallery selected") },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  const handleBecomeGuide = () => {
    Alert.alert(
      "Become a Guide",
      "Join our community of verified local guides and share your passion for travel with others.",
      [
        { text: "Learn More", onPress: () => console.log("Learn more about becoming a guide") },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Sign Out", style: "destructive", onPress: () => console.log("User signed out") },
      ]
    );
  };

  if (!fontsLoaded || !user) {
    return null;
  }

  const formatJoinDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

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
    profileSection: {
      paddingHorizontal: 24,
      paddingBottom: 32,
    },
    profileCard: {
      backgroundColor: "#FFFFFF",
      borderRadius: 20,
      padding: 24,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 8,
      alignItems: "center",
    },
    avatarContainer: {
      position: "relative",
      marginBottom: 16,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      borderWidth: 4,
      borderColor: "#FFFFFF",
    },
    cameraButton: {
      position: "absolute",
      bottom: 0,
      right: 0,
      backgroundColor: "#007AFF",
      borderRadius: 18,
      width: 36,
      height: 36,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 3,
      borderColor: "#FFFFFF",
    },
    verifiedBadge: {
      position: "absolute",
      top: -4,
      right: -4,
      backgroundColor: "#00C851",
      borderRadius: 12,
      width: 24,
      height: 24,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 2,
      borderColor: "#FFFFFF",
    },
    userName: {
      fontFamily: "Inter_600SemiBold",
      fontSize: 24,
      color: "#000000",
      marginBottom: 4,
    },
    userRole: {
      fontFamily: "Inter_400Regular",
      fontSize: 14,
      color: "#007AFF",
      marginBottom: 8,
      textTransform: "capitalize",
    },
    userBio: {
      fontFamily: "Inter_400Regular",
      fontSize: 14,
      color: "rgba(0, 0, 0, 0.7)",
      textAlign: "center",
      marginBottom: 16,
    },
    editButton: {
      backgroundColor: "#F5F5F5",
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 20,
      flexDirection: "row",
      alignItems: "center",
    },
    editButtonText: {
      fontFamily: "Inter_600SemiBold",
      fontSize: 14,
      color: "#000000",
      marginLeft: 6,
    },
    statsContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      paddingHorizontal: 24,
      marginBottom: 32,
    },
    statItem: {
      alignItems: "center",
      flex: 1,
    },
    statNumber: {
      fontFamily: "Inter_600SemiBold",
      fontSize: 20,
      color: "#000000",
      marginBottom: 4,
    },
    statLabel: {
      fontFamily: "Inter_400Regular",
      fontSize: 12,
      color: "rgba(0, 0, 0, 0.7)",
      textAlign: "center",
    },
    infoSection: {
      paddingHorizontal: 24,
      marginBottom: 32,
    },
    sectionTitle: {
      fontFamily: "Inter_600SemiBold",
      fontSize: 18,
      color: "#000000",
      marginBottom: 16,
    },
    infoItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: "#F5F5F5",
    },
    infoText: {
      fontFamily: "Inter_400Regular",
      fontSize: 14,
      color: "rgba(0, 0, 0, 0.8)",
      marginLeft: 16,
      flex: 1,
    },
    menuSection: {
      paddingHorizontal: 24,
    },
    menuItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 16,
      paddingHorizontal: 16,
      backgroundColor: "#FFFFFF",
      borderRadius: 12,
      marginBottom: 8,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    menuItemText: {
      fontFamily: "Inter_400Regular",
      fontSize: 16,
      color: "#000000",
      marginLeft: 16,
      flex: 1,
    },
    menuItemSubtext: {
      fontFamily: "Inter_400Regular",
      fontSize: 12,
      color: "rgba(0, 0, 0, 0.5)",
      marginLeft: 16,
      flex: 1,
    },
    switchContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 16,
      paddingHorizontal: 16,
      backgroundColor: "#FFFFFF",
      borderRadius: 12,
      marginBottom: 8,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    switchLeft: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },
    switchText: {
      fontFamily: "Inter_400Regular",
      fontSize: 16,
      color: "#000000",
      marginLeft: 16,
    },
    becomeGuideCard: {
      backgroundColor: "#007AFF",
      borderRadius: 16,
      padding: 20,
      marginHorizontal: 24,
      marginBottom: 32,
    },
    becomeGuideTitle: {
      fontFamily: "Inter_600SemiBold",
      fontSize: 18,
      color: "white",
      marginBottom: 8,
    },
    becomeGuideText: {
      fontFamily: "Inter_400Regular",
      fontSize: 14,
      color: "rgba(255, 255, 255, 0.9)",
      marginBottom: 16,
    },
    becomeGuideButton: {
      backgroundColor: "white",
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 12,
      alignSelf: "flex-start",
    },
    becomeGuideButtonText: {
      fontFamily: "Inter_600SemiBold",
      fontSize: 14,
      color: "#007AFF",
    },
    logoutButton: {
      backgroundColor: "#FF3B30",
    },
    logoutText: {
      color: "white",
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      >
        {/* Profile Card */}
        <View style={styles.profileSection}>
          <View style={styles.profileCard}>
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: user.avatar }}
                style={styles.avatar}
                contentFit="cover"
              />
              <TouchableOpacity style={styles.cameraButton} onPress={handleChangePhoto}>
                <Camera size={16} color="white" />
              </TouchableOpacity>
              {user.verified && (
                <View style={styles.verifiedBadge}>
                  <Badge size={12} color="white" />
                </View>
              )}
            </View>
            
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userRole}>{user.role}</Text>
            <Text style={styles.userBio}>{user.bio}</Text>
            
            <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
              <Edit size={16} color="#000000" />
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.totalTrips}</Text>
            <Text style={styles.statLabel}>Total Trips</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.totalReviews}</Text>
            <Text style={styles.statLabel}>Reviews Given</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.averageRating}</Text>
            <Text style={styles.statLabel}>Average Rating</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{formatJoinDate(user.joinedDate)}</Text>
            <Text style={styles.statLabel}>Member Since</Text>
          </View>
        </View>

        {/* Personal Information */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <View style={styles.infoItem}>
            <Mail size={20} color="rgba(0, 0, 0, 0.7)" />
            <Text style={styles.infoText}>{user.email}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Phone size={20} color="rgba(0, 0, 0, 0.7)" />
            <Text style={styles.infoText}>{user.phone}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <MapPin size={20} color="rgba(0, 0, 0, 0.7)" />
            <Text style={styles.infoText}>{user.location}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Calendar size={20} color="rgba(0, 0, 0, 0.7)" />
            <Text style={styles.infoText}>Joined {formatJoinDate(user.joinedDate)}</Text>
          </View>
        </View>

        {/* Become a Guide (only show for tourists) */}
        {user.role === "tourist" && (
          <View style={styles.becomeGuideCard}>
            <Text style={styles.becomeGuideTitle}>Become a Guide</Text>
            <Text style={styles.becomeGuideText}>
              Share your local expertise and earn money by guiding travelers in your area.
            </Text>
            <TouchableOpacity style={styles.becomeGuideButton} onPress={handleBecomeGuide}>
              <Text style={styles.becomeGuideButtonText}>Learn More</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Settings Menu */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          {/* Notifications Toggle */}
          <View style={styles.switchContainer}>
            <View style={styles.switchLeft}>
              <Bell size={20} color="rgba(0, 0, 0, 0.7)" />
              <Text style={styles.switchText}>Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: "#E5E7EB", true: "#007AFF" }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* Location Toggle */}
          <View style={styles.switchContainer}>
            <View style={styles.switchLeft}>
              <MapPin size={20} color="rgba(0, 0, 0, 0.7)" />
              <Text style={styles.switchText}>Location Services</Text>
            </View>
            <Switch
              value={locationEnabled}
              onValueChange={setLocationEnabled}
              trackColor={{ false: "#E5E7EB", true: "#007AFF" }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* Menu Items */}
          <TouchableOpacity style={styles.menuItem}>
            <Settings size={20} color="rgba(0, 0, 0, 0.7)" />
            <Text style={styles.menuItemText}>Account Settings</Text>
            <ChevronRight size={20} color="rgba(0, 0, 0, 0.3)" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Shield size={20} color="rgba(0, 0, 0, 0.7)" />
            <Text style={styles.menuItemText}>Privacy & Security</Text>
            <ChevronRight size={20} color="rgba(0, 0, 0, 0.3)" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <HelpCircle size={20} color="rgba(0, 0, 0, 0.7)" />
            <Text style={styles.menuItemText}>Help & Support</Text>
            <ChevronRight size={20} color="rgba(0, 0, 0, 0.3)" />
          </TouchableOpacity>

          {/* Logout Button */}
          <TouchableOpacity 
            style={[styles.menuItem, styles.logoutButton]} 
            onPress={handleLogout}
          >
            <LogOut size={20} color="white" />
            <Text style={[styles.menuItemText, styles.logoutText]}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}