import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { ArrowRight, MapPin, Shield, Users } from "lucide-react-native";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function OnboardingScreen() {
  const insets = useSafeAreaInsets();

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleGetStarted = () => {
    router.replace("/(tabs)");
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#000",
    },
    backgroundImage: {
      ...StyleSheet.absoluteFillObject,
    },
    gradient: {
      ...StyleSheet.absoluteFillObject,
    },
    contentContainer: {
      flex: 1,
      justifyContent: "space-between",
      paddingHorizontal: 24,
    },
    progressContainer: {
      alignItems: "flex-start",
      paddingTop: screenHeight * 0.4,
    },
    progressPill: {
      backgroundColor: "rgba(64, 64, 64, 0.35)",
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 6,
    },
    progressText: {
      fontFamily: "Inter_600SemiBold",
      fontSize: 12,
      color: "white",
    },
    mainContent: {
      paddingTop: 20,
    },
    headline: {
      fontFamily: "Inter_600SemiBold",
      fontSize: 36,
      color: "white",
      lineHeight: 42,
      marginBottom: 16,
    },
    supportingText: {
      fontFamily: "Inter_400Regular",
      fontSize: 16,
      color: "rgba(255, 255, 255, 0.85)",
      lineHeight: 24,
      marginBottom: 32,
    },
    featuresContainer: {
      marginBottom: 32,
    },
    featureItem: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
    },
    featureIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 16,
    },
    featureText: {
      flex: 1,
    },
    featureTitle: {
      fontFamily: "Inter_600SemiBold",
      fontSize: 16,
      color: "white",
      marginBottom: 4,
    },
    featureDescription: {
      fontFamily: "Inter_400Regular",
      fontSize: 14,
      color: "rgba(255, 255, 255, 0.7)",
    },
    navigationRow: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      paddingTop: 24,
    },
    getStartedButton: {
      backgroundColor: "#007AFF",
      paddingHorizontal: 32,
      paddingVertical: 16,
      borderRadius: 30,
      flexDirection: "row",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
    getStartedText: {
      fontFamily: "Inter_600SemiBold",
      fontSize: 16,
      color: "white",
      marginRight: 8,
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Background Image */}
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=1600&fit=crop",
        }}
        style={styles.backgroundImage}
        contentFit="cover"
        transition={100}
        pointerEvents="none"
      />

      {/* Gradient Overlay */}
      <LinearGradient
        colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.6)", "rgba(0,0,0,0.9)"]}
        locations={[0, 0.5, 1]}
        style={styles.gradient}
      />

      {/* Content Container */}
      <View style={[styles.contentContainer, { paddingTop: insets.top }]}>
        {/* Progress Pill */}
        <View style={styles.progressContainer}>
          <View style={styles.progressPill}>
            <Text style={styles.progressText}>Welcome</Text>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Headline */}
          <Text style={styles.headline}>Your Adventure{"\n"}Starts Here</Text>

          {/* Supporting Copy */}
          <Text style={styles.supportingText}>
            Connect with verified local guides, plan amazing trips, and stay
            safe with emergency features designed for travelers.
          </Text>

          {/* Features */}
          <View style={styles.featuresContainer}>
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Users size={20} color="white" />
              </View>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>Find Local Guides</Text>
                <Text style={styles.featureDescription}>
                  Connect with verified guides in your destination
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Shield size={20} color="white" />
              </View>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>Emergency SOS</Text>
                <Text style={styles.featureDescription}>
                  One-tap emergency alerts with location sharing
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <MapPin size={20} color="white" />
              </View>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>Smart Itinerary</Text>
                <Text style={styles.featureDescription}>
                  Plan and organize your perfect trip
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Navigation Row */}
        <View
          style={[styles.navigationRow, { paddingBottom: insets.bottom + 24 }]}
        >
          {/* Get Started Button */}
          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={handleGetStarted}
            activeOpacity={0.9}
          >
            <Text style={styles.getStartedText}>Get Started</Text>
            <ArrowRight size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
