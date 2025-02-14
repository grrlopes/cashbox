import { Ionicons } from '@expo/vector-icons'
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'

export default function Home() {
  const handlePress = () => {
  }

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
      <View style={styles.plusBtnContainer}>
        <Pressable
          onPress={handlePress}
          style={({ pressed }) => pressed ? [styles.plusBtn, { transform: [{ scale: 0.8 }] }] : [styles.plusBtn]}>
          <Ionicons name='add-outline' size={40} color={'white'} />
        </Pressable>
      </View>
    </SafeAreaView >
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
  },
  plusBtnContainer: {
    position: 'absolute',
    bottom: 40,
    right: 20,
  },
  plusBtn: {
    width: 50,
    height: 50,
    backgroundColor: "black",
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
