import Colors from "@/constants/Colors";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { Stack, Tabs } from "expo-router";
import { Image, StyleSheet, View } from "react-native";

export default function Layout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "dark" }}>
      <Tabs.Screen name="index" options={{
        headerShown: false, title: "Icons",
        tabBarIcon: ({ focused, color, size }) => {
          if (focused) {
            return <FontAwesome name="list-ol" color={color} size={size} />
          }
          return <FontAwesome name="list-ol" color={color} size={size} />
        }
      }} />
      <Tabs.Screen name="createIcon/icons" options={{
        headerShown: false, title: "Create",
        tabBarIcon: ({ focused, color, size }) => {
          if (focused) {
            return <FontAwesome5 name="plus" color={color} size={size} />
          }
          return <FontAwesome5 name="plus" color={color} size={size} />
        }
      }} />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  itemImage: {
    height: 40,
    width: 40,
  },

})
