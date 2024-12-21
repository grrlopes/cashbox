import { Stack, router } from 'expo-router'
import { useEffect } from 'react'

export default function RootLayout() {
  return (
    <MainLayout />
  )
}

const MainLayout = () => {
  useEffect(() => {
    if ('test' == 'test') {
      router.replace('/(panel)/profile/page')
      return;
    }
    router.replace('/')

  }, [])

  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='(auth)/signup/page' options={{ headerShown: false }} />
      <Stack.Screen name='(panel)/profile/page' options={{ headerShown: false }} />
    </Stack>
  )
}
