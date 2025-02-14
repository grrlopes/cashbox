import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.status}>
        <View style={styles.profile}>
          <Text>Good Night</Text>
          <Text>Name</Text>
        </View>
        <View>
          <Ionicons name='link' size={30} />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  status: {
    flexDirection: "row",
    marginLeft: 45,
    marginTop: 10,
    justifyContent: "space-between"
  },
  profile: {
    flexDirection: "column",
    backgroundColor: "red",
  }
})
