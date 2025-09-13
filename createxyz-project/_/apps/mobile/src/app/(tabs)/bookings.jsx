import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  RefreshControl,
} from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  Calendar,
  Clock,
  MapPin,
  Star,
  MessageCircle,
  Phone,
  ChevronRight,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react-native";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";

const { width: screenWidth } = Dimensions.get("window");

const BOOKING_STATUSES = {
  pending: { color: "#FF8C00", icon: AlertCircle, label: "Pending" },
  confirmed: { color: "#00C851", icon: CheckCircle, label: "Confirmed" },
  cancelled: { color: "#FF3B30", icon: XCircle, label: "Cancelled" },
  completed: { color: "#6C757D", icon: CheckCircle, label: "Completed" },
};

export default function BookingsScreen() {
  const insets = useSafeAreaInsets();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("upcoming");

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
  });

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      setLoading(true);
      
      // Mock data for now - will replace with API call
      const mockBookings = [
        {
          id: 1,
          guide: {
            name: "Marco Silva",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
            rating: 4.9,
            verified: true,
          },
          date: "2025-09-15",
          startTime: "09:00",
          endTime: "17:00",
          duration: 8,
          price: 200,
          status: "confirmed",
          specialty: "City Tours & Food",
          meetingLocation: "Central Plaza, Downtown",
          specialRequests: "Vegetarian food options preferred",
          createdAt: "2025-09-08",
        },
        {
          id: 2,
          guide: {
            name: "Ana Rodriguez",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b4f04e31?w=200&h=200&fit=crop&crop=face",
            rating: 4.8,
            verified: true,
          },
          date: "2025-09-20",
          startTime: "06:00",
          endTime: "14:00",
          duration: 8,
          price: 280,
          status: "pending",
          specialty: "Adventure & Nature",
          meetingLocation: "Mountain Trail Entrance",
          specialRequests: "Early morning mountain hiking",
          createdAt: "2025-09-07",
        },
        {
          id: 3,
          guide: {
            name: "David Chen",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
            rating: 4.7,
            verified: true,
          },
          date: "2025-08-25",
          startTime: "10:00",
          endTime: "16:00",
          duration: 6,
          price: 180,
          status: "completed",
          specialty: "Culture & History",
          meetingLocation: "Museum District Entrance",
          specialRequests: "Focus on local art history",
          createdAt: "2025-08-20",
        },
        {
          id: 4,
          guide: {
            name: "Sofia Martinez",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
            rating: 4.9,
            verified: false,
          },
          date: "2025-08-10",
          startTime: "11:00",
          endTime: "15:00",
          duration: 4,
          price: 112,
          status: "cancelled",
          specialty: "Food & Culture",
          meetingLocation: "Local Market Square",
          specialRequests: "Traditional cooking experience",
          createdAt: "2025-08-05",
        },
      ];
      
      setBookings(mockBookings);
    } catch (error) {
      console.error("Error loading bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const isUpcoming = (booking) => {
    const bookingDate = new Date(booking.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return bookingDate >= today && (booking.status === "confirmed" || booking.status === "pending");
  };

  const isPast = (booking) => {
    const bookingDate = new Date(booking.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return bookingDate < today || booking.status === "completed" || booking.status === "cancelled";
  };

  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === "upcoming") {
      return isUpcoming(booking);
    } else {
      return isPast(booking);
    }
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
    tabContainer: {
      flexDirection: "row",
      backgroundColor: "#F5F5F5",
      borderRadius: 12,
      padding: 4,
    },
    tab: {
      flex: 1,
      paddingVertical: 12,
      alignItems: "center",
      borderRadius: 8,
    },
    activeTab: {
      backgroundColor: "#FFFFFF",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    tabText: {
      fontFamily: "Inter_600SemiBold",
      fontSize: 14,
      color: "rgba(0, 0, 0, 0.7)",
    },
    activeTabText: {
      color: "#000000",
    },
    bookingsContainer: {
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 24,
    },
    bookingCard: {
      backgroundColor: "#FFFFFF",
      borderRadius: 16,
      marginBottom: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
      overflow: "hidden",
    },
    bookingHeader: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: "#F5F5F5",
    },
    statusBadge: {
      alignSelf: "flex-start",
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
      marginBottom: 12,
    },
    statusText: {
      fontFamily: "Inter_600SemiBold",
      fontSize: 12,
      color: "white",
    },
    guideInfo: {
      flexDirection: "row",
      alignItems: "center",
    },
    guideAvatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 12,
    },
    guideDetails: {
      flex: 1,
    },
    guideName: {
      fontFamily: "Inter_600SemiBold",
      fontSize: 16,
      color: "#000000",
      marginBottom: 2,
    },
    guideSpecialty: {
      fontFamily: "Inter_400Regular",
      fontSize: 14,
      color: "rgba(0, 0, 0, 0.7)",
      marginBottom: 4,
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
    bookingBody: {
      padding: 16,
    },
    bookingRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
    },
    bookingRowText: {
      fontFamily: "Inter_400Regular",
      fontSize: 14,
      color: "rgba(0, 0, 0, 0.8)",
      marginLeft: 12,
      flex: 1,
    },
    bookingRowLabel: {
      fontFamily: "Inter_600SemiBold",
      fontSize: 14,
      color: "#000000",
      marginLeft: 12,
      flex: 1,
    },
    priceContainer: {
      backgroundColor: "#F0F9FF",
      padding: 12,
      borderRadius: 12,
      marginBottom: 16,
    },
    priceText: {
      fontFamily: "Inter_600SemiBold",
      fontSize: 18,
      color: "#007AFF",
      textAlign: "center",
    },
    bookingActions: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    actionButton: {
      flex: 1,
      backgroundColor: "#F5F5F5",
      paddingVertical: 12,
      borderRadius: 12,
      alignItems: "center",
      marginHorizontal: 4,
      flexDirection: "row",
      justifyContent: "center",
    },
    primaryAction: {
      backgroundColor: "#007AFF",
    },
    actionButtonText: {
      fontFamily: "Inter_600SemiBold",
      fontSize: 14,
      color: "#000000",
      marginLeft: 8,
    },
    primaryActionText: {
      color: "white",
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 60,
    },
    emptyText: {
      fontFamily: "Inter_400Regular",
      fontSize: 16,
      color: "rgba(0, 0, 0, 0.5)",
      textAlign: "center",
      marginTop: 16,
    },
    emptySubtext: {
      fontFamily: "Inter_400Regular",
      fontSize: 14,
      color: "rgba(0, 0, 0, 0.4)",
      textAlign: "center",
      marginTop: 8,
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <Text style={styles.headerTitle}>My Bookings</Text>
        <Text style={styles.headerSubtitle}>
          Manage your guide bookings and trips
        </Text>
        
        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "upcoming" && styles.activeTab]}
            onPress={() => setActiveTab("upcoming")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "upcoming" && styles.activeTabText,
              ]}
            >
              Upcoming
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "past" && styles.activeTab]}
            onPress={() => setActiveTab("past")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "past" && styles.activeTabText,
              ]}
            >
              Past
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bookings List */}
      <ScrollView
        style={styles.bookingsContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={loadBookings} />
        }
      >
        {filteredBookings.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Calendar size={48} color="rgba(0, 0, 0, 0.3)" />
            <Text style={styles.emptyText}>
              {activeTab === "upcoming"
                ? "No upcoming bookings"
                : "No past bookings"}
            </Text>
            <Text style={styles.emptySubtext}>
              {activeTab === "upcoming"
                ? "Book a guide to start your adventure"
                : "Your completed trips will appear here"}
            </Text>
          </View>
        ) : (
          filteredBookings.map((booking) => {
            const statusConfig = BOOKING_STATUSES[booking.status];
            const StatusIcon = statusConfig.icon;

            return (
              <View key={booking.id} style={styles.bookingCard}>
                {/* Header */}
                <View style={styles.bookingHeader}>
                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: statusConfig.color },
                    ]}
                  >
                    <Text style={styles.statusText}>
                      {statusConfig.label.toUpperCase()}
                    </Text>
                  </View>

                  <View style={styles.guideInfo}>
                    <Image
                      source={{ uri: booking.guide.avatar }}
                      style={styles.guideAvatar}
                      contentFit="cover"
                    />
                    <View style={styles.guideDetails}>
                      <Text style={styles.guideName}>{booking.guide.name}</Text>
                      <Text style={styles.guideSpecialty}>
                        {booking.specialty}
                      </Text>
                      <View style={styles.guideRating}>
                        <Star size={12} color="#FFD700" fill="#FFD700" />
                        <Text style={styles.ratingText}>
                          {booking.guide.rating}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* Body */}
                <View style={styles.bookingBody}>
                  <View style={styles.bookingRow}>
                    <Calendar size={16} color="rgba(0, 0, 0, 0.7)" />
                    <Text style={styles.bookingRowLabel}>
                      {formatDate(booking.date)}
                    </Text>
                  </View>

                  <View style={styles.bookingRow}>
                    <Clock size={16} color="rgba(0, 0, 0, 0.7)" />
                    <Text style={styles.bookingRowText}>
                      {formatTime(booking.startTime)} - {formatTime(booking.endTime)} ({booking.duration}h)
                    </Text>
                  </View>

                  <View style={styles.bookingRow}>
                    <MapPin size={16} color="rgba(0, 0, 0, 0.7)" />
                    <Text style={styles.bookingRowText}>
                      {booking.meetingLocation}
                    </Text>
                  </View>

                  {booking.specialRequests && (
                    <View style={styles.bookingRow}>
                      <MessageCircle size={16} color="rgba(0, 0, 0, 0.7)" />
                      <Text style={styles.bookingRowText}>
                        {booking.specialRequests}
                      </Text>
                    </View>
                  )}

                  <View style={styles.priceContainer}>
                    <Text style={styles.priceText}>
                      Total: ${booking.price}
                    </Text>
                  </View>

                  {/* Actions */}
                  <View style={styles.bookingActions}>
                    {booking.status === "confirmed" && (
                      <>
                        <TouchableOpacity style={styles.actionButton}>
                          <MessageCircle size={16} color="#000000" />
                          <Text style={styles.actionButtonText}>Message</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton}>
                          <Phone size={16} color="#000000" />
                          <Text style={styles.actionButtonText}>Call</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.actionButton, styles.primaryAction]}>
                          <ChevronRight size={16} color="white" />
                          <Text style={[styles.actionButtonText, styles.primaryActionText]}>
                            Details
                          </Text>
                        </TouchableOpacity>
                      </>
                    )}

                    {booking.status === "pending" && (
                      <>
                        <TouchableOpacity style={styles.actionButton}>
                          <XCircle size={16} color="#FF3B30" />
                          <Text style={[styles.actionButtonText, { color: "#FF3B30" }]}>
                            Cancel
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.actionButton, styles.primaryAction]}>
                          <ChevronRight size={16} color="white" />
                          <Text style={[styles.actionButtonText, styles.primaryActionText]}>
                            Details
                          </Text>
                        </TouchableOpacity>
                      </>
                    )}

                    {booking.status === "completed" && (
                      <>
                        <TouchableOpacity style={styles.actionButton}>
                          <Star size={16} color="#FFD700" />
                          <Text style={styles.actionButtonText}>Review</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.actionButton, styles.primaryAction]}>
                          <ChevronRight size={16} color="white" />
                          <Text style={[styles.actionButtonText, styles.primaryActionText]}>
                            Details
                          </Text>
                        </TouchableOpacity>
                      </>
                    )}

                    {booking.status === "cancelled" && (
                      <TouchableOpacity style={[styles.actionButton, styles.primaryAction]}>
                        <ChevronRight size={16} color="white" />
                        <Text style={[styles.actionButtonText, styles.primaryActionText]}>
                          View Details
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}