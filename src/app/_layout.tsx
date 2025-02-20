import { validToken } from '@/api/auth'
import { Stack, router } from 'expo-router'
import { useEffect } from 'react'

export default function RootLayout() {
  return (
    <MainLayout />
  )
}

const MainLayout = () => {
  useEffect(() => {
    const checkToken = async () => {
      const logged = await validToken();
      if (logged) {
        router.replace('/(panel)/home/page');
      } else {
        router.replace('/(auth)/signin/page');
      }
    };

    checkToken();
  }, [router]);

  return (
    <Stack screenOptions={{ statusBarStyle: 'auto', statusBarTranslucent: false }}>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='(auth)/signin/page' options={{ headerShown: false }} />
      <Stack.Screen name='(auth)/signup/page' options={{ headerShown: false }} />
      <Stack.Screen name='(panel)/profile/page' options={{ headerShown: true, headerTransparent: true, headerTitle: "" }} />
      <Stack.Screen name='(panel)/createExpense/expense' options={{ headerShown: true, headerTransparent: true, headerTitle: "" }} />
      <Stack.Screen name='(panel)/home/page' options={{ headerShown: false }} />
    </Stack >
  )
}
