import { validToken } from '@/api/auth'
import { globalStyles } from '@/helper/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, router } from 'expo-router'
import { useEffect } from 'react'

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontsError] = useFonts({
    "SpaceMono-Regular": require('../../assets/fonts/SpaceMono-Regular.ttf'),
    "Roboto-Regular": require('../../assets/fonts/Roboto_Condensed-ExtraBold.ttf'),
    "Ubuntu-Regular": require('../../assets/fonts/Ubuntu-Regular.ttf'),
    "Ubuntu-BoldItalic": require('../../assets/fonts/Ubuntu-BoldItalic.ttf'),
    "Ubuntu-Medium": require('../../assets/fonts/Ubuntu-Medium.ttf'),
    "Ubuntu-Light": require('../../assets/fonts/Ubuntu-Light.ttf'),
  });

  useEffect(() => {
    if (fontsError) {
      console.error('Error loading fonts', fontsError);
    }
  }, [fontsError]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Return null or a splash screen while fonts are loading
  }

  return (
    <MainLayout />
  )
}

const MainLayout = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 2
      }
    }
  })
  useEffect(() => {
    const checkToken = async () => {
      const logged = await validToken();
      if (logged) {
        router.replace('/(panel)/home/page');
        // router.replace('/(panel)/ledger/ledger');
      } else {
        router.replace('/(auth)/signin/page');
      }
    };

    checkToken();
  }, [router]);

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ statusBarStyle: 'auto', statusBarTranslucent: false }}>
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen name='(auth)/signin/page' options={{ headerShown: false }} />
        <Stack.Screen name='(auth)/signup/page' options={{ headerShown: false }} />
        <Stack.Screen name='(panel)/profile/page' options={{ headerShown: true, headerTransparent: false, headerTitle: "" }} />
        <Stack.Screen name='(panel)/createExpense/expense' options={{ headerShown: true, headerTransparent: true, headerTitle: "" }} />
        <Stack.Screen name='(panel)/createIcons/icons' options={{
          headerShown: true,
          headerTransparent: false,
          headerTitle: "New icons",
          headerTitleStyle: { fontFamily: globalStyles.text.fontFamily, fontSize: 14, fontWeight: 600 }
        }} />
        <Stack.Screen name='(panel)/home/page' options={{ headerShown: false }} />
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen name='(panel)/ledger/ledger' options={{ headerShown: true, headerTransparent: false, headerTitle: "" }} />
      </Stack >
    </QueryClientProvider>
  )
}
