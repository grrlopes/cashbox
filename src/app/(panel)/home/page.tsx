import FloatBtn from '@/components/button/FloatBtn'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'

export default function Home() {
  const handleBtn = () => {
    router.push('/(panel)/profile/page');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.status}>
        <View style={styles.profileContainer}>
          <View>
            <Pressable onPress={handleBtn}>
              <Ionicons name='person-add' size={30} />
            </Pressable>
          </View>
          <View style={styles.profile}>
            <Text>Good Night</Text>
            <Text>Name</Text>
          </View>
        </View>
        <View>
          <Pressable onPress={handleBtn}>
            <Ionicons name='link' size={30} />
          </Pressable>
        </View>
      </View>
      <FloatBtn activeBtn={handleBtn} />
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  status: {
    flexDirection: "row",
    marginTop: 2,
    justifyContent: "space-between"
  },
  profileContainer: {
    flexDirection: "row",
    gap: 3
  },
  profile: {
    flexDirection: "column",
    backgroundColor: "red",
  },
})
