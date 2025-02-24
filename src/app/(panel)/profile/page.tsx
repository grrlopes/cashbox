import Colors from '@/constants/Colors'
import { removeUserToken } from '@/store/persistor'
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function Profile() {
  const handleLogoff = async () => {
    await removeUserToken();
    router.replace("/signin/page");
  }

  return (
    <View style={styles.container}>
      <Text>Profile paged</Text>
      <Text>Logoff</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogoff}>
        <Text style={styles.buttonText}>Logoff</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: Colors.dark.accentGreen,
    paddingTop: 14,
    paddingBottom: 14,
    alignItems: 'center',
    width: '100%',
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.dark.white,
    fontWeight: 'bold',
  },

})
