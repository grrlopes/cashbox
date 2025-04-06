import iconUrl from "@/constants/IconUrl";
import { globalStyles } from "@/helper/theme";
import { AntDesign } from "@expo/vector-icons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, useRouter } from "expo-router";
import { Image, TouchableOpacity, View } from "react-native";

export default function Layout() {
  const router = useRouter();
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
          headerBackVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.dismissTo("/profile/page")}>
              <AntDesign
                name="arrowleft"
                size={24}
                style={{ marginRight: 30 }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View>
              <Image
                style={{ height: 50, width: 50 }}
                source={{ uri: iconUrl.icons }}
              />
            </View>
          )
        }} />
      </Stack>

    </QueryClientProvider>
  )
}
