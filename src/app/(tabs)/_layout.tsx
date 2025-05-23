import iconUrl from "@/constants/IconUrl";
import { globalStyles } from "@/helper/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { Image, View } from "react-native";

export default function Layout() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 2
      }
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="icons" options={{
          headerTransparent: false,
          headerTitleStyle: { fontFamily: globalStyles.text.fontFamily, fontWeight: 600, fontSize: 14 },
          headerBackVisible: true,
          headerRight: () => (
            <View>
              <Image
                style={{ height: 50, width: 50 }}
                source={{ uri: iconUrl.icons }}
              />
            </View>
          )
        }} />

        <Stack.Screen name="vendors" options={{
          headerTransparent: false,
          headerTitleStyle: { fontFamily: globalStyles.text.fontFamily, fontWeight: 600, fontSize: 14 },
          headerBackVisible: true,
          headerRight: () => (
            <View>
              <Image
                style={{ height: 50, width: 50 }}
                source={{ uri: iconUrl.vendor }}
              />
            </View>
          )
        }} />

      </Stack>

    </QueryClientProvider>
  )
}
