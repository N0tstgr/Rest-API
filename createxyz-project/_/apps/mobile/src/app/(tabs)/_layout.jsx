import { Tabs } from "expo-router";
import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Home,
  Users,
  Calendar,
  MapPin,
  User,
  Shield,
} from "lucide-react-native";

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "rgba(0, 0, 0, 0.1)",
          paddingBottom: insets.bottom,
          paddingTop: 12,
          height: 60 + insets.bottom,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "rgba(0, 0, 0, 0.7)",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused && { backgroundColor: "#007AFF" },
              ]}
            >
              <Home
                size={24}
                color={focused ? "#FFFFFF" : "rgba(0, 0, 0, 0.7)"}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="guides"
        options={{
          title: "Guides",
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused && { backgroundColor: "#007AFF" },
              ]}
            >
              <Users
                size={24}
                color={focused ? "#FFFFFF" : "rgba(0, 0, 0, 0.7)"}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="emergency"
        options={{
          title: "Emergency",
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused && { backgroundColor: "#FF3B30" },
              ]}
            >
              <Shield size={24} color={focused ? "#FFFFFF" : "#FF3B30"} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: "Bookings",
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused && { backgroundColor: "#007AFF" },
              ]}
            >
              <Calendar
                size={24}
                color={focused ? "#FFFFFF" : "rgba(0, 0, 0, 0.7)"}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused && { backgroundColor: "#007AFF" },
              ]}
            >
              <User
                size={24}
                color={focused ? "#FFFFFF" : "rgba(0, 0, 0, 0.7)"}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          href: null, // This hides the tab from the tab bar
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});
