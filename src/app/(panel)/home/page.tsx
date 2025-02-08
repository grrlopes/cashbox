import { SafeAreaView, StyleSheet, Text, View } from 'react-native'

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>fsdfsdf</Text>
      </View>
      <View>
        <Text>Home landing page</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
