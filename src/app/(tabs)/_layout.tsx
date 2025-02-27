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
          headerRight: () => (
            <View>
              <Image
                style={{ height: 50, width: 50 }}
                source={{ uri: 'https://img.icons8.com/plasticine/100/medium-icons.png' }}
              />
            </View>
          )
        }} />
      </Stack>

    </QueryClientProvider>
  )
}
