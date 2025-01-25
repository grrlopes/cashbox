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
        router.replace('/(panel)/profile/page');
      } else {
        router.replace('/(auth)/signin/page');
      }
    };

    checkToken();
  }, [router]);

  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='(auth)/signin/page' options={{ headerShown: false }} />
      <Stack.Screen name='(auth)/signup/page' options={{ headerShown: false }} />
      <Stack.Screen name='(panel)/profile/page' options={{ headerShown: false }} />
    </Stack>
  )
}
