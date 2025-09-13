import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  Search,
  Filter,
  MapPin,
  Star,
  Badge,
  Clock,
  DollarSign,
} from "lucide-react-native";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import * as Location from "expo-location";

const { width: screenWidth } = Dimensions.get("window");

const GUIDE_CATEGORIES = [
  "All",
  "City Tours",
  "Food & Drink",
  "Adventure",
  "Culture",
  "Nature",
  "History",
];

export default function GuidesScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
  });

  useEffect(() => {
    getCurrentLocation();
    loadGuides();
  }, []);

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

  const loadGuides = async () => {
    try {
      setLoading(true);
      
      // Mock data for now - will replace with API call
      const mockGuides = [
        {
          id: 1,
          name: "Marco Silva",
          specialties: ["City Tours", "Food & Drink"],
          rating: 4.9,
          reviewCount: 127,
          hourlyRate: 25,
          verified: true,
          responseTime: 15,
          distance: 1.2,
          bio: "Professional tour guide with 8+ years experience in local culture and cuisine",
          languages: ["English", "Spanish", "Portuguese"],
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
        },
        {
          id: 2,
          name: "Ana Rodriguez",
          specialties: ["Adventure", "Nature"],
          rating: 4.8,
          reviewCount: 89,
          hourlyRate: 35,
          verified: true,
          responseTime: 30,
          distance: 2.8,
          bio: "Mountain climbing expert and nature enthusiast. Certified wilderness guide.",
          languages: ["English", "Spanish"],
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b4f04e31?w=200&h=200&fit=crop&crop=face",
        },
        {
          id: 3,
          name: "David Chen",
          specialties: ["Culture", "History"],
          rating: 4.7,
          reviewCount: 156,
          hourlyRate: 30,
          verified: true,
          responseTime: 20,
          distance: 0.8,
          bio: "Art history professor turned tour guide. Expert in local museums and cultural sites.",
          languages: ["English", "Mandarin", "Spanish"],
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
        },
        {
          id: 4,
          name: "Sofia Martinez",
          specialties: ["Food & Drink", "Culture"],
          rating: 4.9,
          reviewCount: 203,
          hourlyRate: 28,
          verified: false,
          responseTime: 45,
          distance: 3.2,
          bio: "Chef and food blogger specializing in authentic local cuisine experiences.",
          languages: ["English", "Spanish", "French"],
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
        },
      ];
      
      setGuides(mockGuides);
    } catch (error) {
      console.error("Error loading guides:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredGuides = guides.filter((guide) => {
    const matchesSearch = guide.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.specialties.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || 
      guide.specialties.includes(selectedCategory);
    
    return matchesSearch && matchesCategory;
  });

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
      marginBottom: 24,
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#F5F5F5",
      borderRadius: 16,
      paddingHorizontal: 16,
      marginBottom: 20,
    },
    searchInput: {
      flex: 1,
      fontFamily: "Inter_400Regular",
      fontSize: 16,
      paddingVertical: 14,
      marginLeft: 12,
      color: "#000000",
    },
    filterButton: {
      backgroundColor: "#007AFF",
      padding: 12,
      borderRadius: 12,
      marginLeft: 12,
    },
    categoriesContainer: {
      paddingHorizontal: 24,
      marginBottom: 24,
    },
    categoryScroll: {
      paddingRight: 24,
    },
    categoryButton: {
      backgroundColor: "#F5F5F5",
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 20,
      marginRight: 12,
    },
    categoryButtonActive: {
      backgroundColor: "#007AFF",
    },
    categoryText: {
      fontFamily: "Inter_600SemiBold",
      fontSize: 14,
      color: "rgba(0, 0, 0, 0.7)",
    },
    categoryTextActive: {
      color: "#FFFFFF",
    },
    guidesContainer: {
      flex: 1,
      paddingHorizontal: 24,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    guideCard: {
      backgroundColor: "#FFFFFF",
      borderRadius: 16,
      marginBottom: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
      padding: 16,
    },
    guideHeader: {
      flexDirection: "row",
      marginBottom: 12,
    },
    guideAvatar: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginRight: 16,
    },
    guideInfo: {
      flex: 1,
    },
    guideNameRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 4,
    },
    guideName: {
      fontFamily: "Inter_600SemiBold",
      fontSize: 18,
      color: "#000000",
      marginRight: 8,
    },
    verifiedBadge: {
      backgroundColor: "#00C851",
      borderRadius: 10,
      paddingHorizontal: 6,
      paddingVertical: 2,
    },
    verifiedText: {
      fontFamily: "Inter_600SemiBold",
      fontSize: 10,
      color: "white",
    },
    guideSpecialties: {
      fontFamily: "Inter_400Regular",
      fontSize: 14,
      color: "rgba(0, 0, 0, 0.7)",
      marginBottom: 8,
    },
    guideRating: {
      flexDirection: "row",
      alignItems: "center",
    },
    ratingText: {
      fontFamily: "Inter_400Regular",
      fontSize: 14,
      color: "#000000",
      marginLeft: 4,
      marginRight: 12,
    },
    guideBio: {
      fontFamily: "Inter_400Regular",
      fontSize: 14,
      color: "rgba(0, 0, 0, 0.8)",
      lineHeight: 20,
      marginBottom: 12,
    },
    guideStats: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
    },
    statItem: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: 16,
    },
    statText: {
      fontFamily: "Inter_400Regular",
      fontSize: 12,
      color: "rgba(0, 0, 0, 0.7)",
      marginLeft: 4,
    },
    guideLanguages: {
      fontFamily: "Inter_400Regular",
      fontSize: 12,
      color: "rgba(0, 0, 0, 0.7)",
      marginBottom: 16,
    },
    guideActions: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    viewProfileButton: {
      flex: 1,
      backgroundColor: "#F5F5F5",
      paddingVertical: 12,
      borderRadius: 12,
      alignItems: "center",
      marginRight: 8,
    },
    viewProfileText: {
      fontFamily: "Inter_600SemiBold",
      fontSize: 14,
      color: "#000000",
    },
    bookButton: {
      flex: 1,
      backgroundColor: "#007AFF",
      paddingVertical: 12,
      borderRadius: 12,
      alignItems: "center",
      marginLeft: 8,
    },
    bookButtonText: {
      fontFamily: "Inter_600SemiBold",
      fontSize: 14,
      color: "white",
    },
    noResultsContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 40,
    },
    noResultsText: {
      fontFamily: "Inter_400Regular",
      fontSize: 16,
      color: "rgba(0, 0, 0, 0.5)",
      textAlign: "center",
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <Text style={styles.headerTitle}>Local Guides</Text>
        <Text style={styles.headerSubtitle}>Find verified guides in your area</Text>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={20} color="rgba(0, 0, 0, 0.5)" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search guides or specialties..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
          />
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {GUIDE_CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Guides List */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={[styles.noResultsText, { marginTop: 16 }]}>
            Loading guides...
          </Text>
        </View>
      ) : (
        <ScrollView
          style={styles.guidesContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        >
          {filteredGuides.length === 0 ? (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>
                No guides found matching your search criteria.{"\n"}
                Try adjusting your filters or search terms.
              </Text>
            </View>
          ) : (
            filteredGuides.map((guide) => (
              <View key={guide.id} style={styles.guideCard}>
                <View style={styles.guideHeader}>
                  <Image
                    source={{ uri: guide.avatar }}
                    style={styles.guideAvatar}
                    contentFit="cover"
                  />
                  <View style={styles.guideInfo}>
                    <View style={styles.guideNameRow}>
                      <Text style={styles.guideName}>{guide.name}</Text>
                      {guide.verified && (
                        <View style={styles.verifiedBadge}>
                          <Text style={styles.verifiedText}>VERIFIED</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.guideSpecialties}>
                      {guide.specialties.join(" • ")}
                    </Text>
                    <View style={styles.guideRating}>
                      <Star size={14} color="#FFD700" fill="#FFD700" />
                      <Text style={styles.ratingText}>
                        {guide.rating} ({guide.reviewCount} reviews)
                      </Text>
                    </View>
                  </View>
                </View>

                <Text style={styles.guideBio}>{guide.bio}</Text>

                <View style={styles.guideStats}>
                  <View style={styles.statItem}>
                    <DollarSign size={14} color="rgba(0, 0, 0, 0.7)" />
                    <Text style={styles.statText}>${guide.hourlyRate}/hour</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Clock size={14} color="rgba(0, 0, 0, 0.7)" />
                    <Text style={styles.statText}>~{guide.responseTime}min response</Text>
                  </View>
                  <View style={styles.statItem}>
                    <MapPin size={14} color="rgba(0, 0, 0, 0.7)" />
                    <Text style={styles.statText}>{guide.distance}km away</Text>
                  </View>
                </View>

                <Text style={styles.guideLanguages}>
                  Languages: {guide.languages.join(", ")}
                </Text>

                <View style={styles.guideActions}>
                  <TouchableOpacity style={styles.viewProfileButton}>
                    <Text style={styles.viewProfileText}>View Profile</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.bookButton}>
                    <Text style={styles.bookButtonText}>Book Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
}