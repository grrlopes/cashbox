import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";

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
            return <FontAwesome name="plus" color={color} size={size} />
          }
          return <FontAwesome name="plus" color={color} size={size} />
        }
      }} />
    </Tabs>
  )
}
