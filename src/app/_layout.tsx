import { validToken } from '@/api/auth'
import Header from '@/components/Header'
import { Ionicons } from '@expo/vector-icons'
import { Stack, router } from 'expo-router'
import { useEffect } from 'react'
import { TouchableOpacity } from 'react-native'

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

  const userProfile = () => {
    router.push('/(panel)/profile/page')
  }

  return (
    <Stack screenOptions={{ statusBarStyle: 'auto', statusBarTranslucent: false }}>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='(auth)/signin/page' options={{ headerShown: false }} />
      <Stack.Screen name='(auth)/signup/page' options={{ headerShown: false }} />
      <Stack.Screen name='(panel)/profile/page' options={{ headerShown: true, headerTransparent: true, headerTitle: "" }} />
      <Stack.Screen name='(panel)/home/page' options={{
        headerShown: true,
        headerTransparent: true,
        headerTitle: "",
        headerLeft: () => (
          <TouchableOpacity onPress={() => { userProfile() }} style={{ marginLeft: 0 }}>
            <Ionicons name='person-circle' size={30} color={'grey'} />
          </TouchableOpacity>
        )
      }} />
    </Stack>
  )
}
