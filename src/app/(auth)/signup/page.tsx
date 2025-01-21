import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Signup() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name='arrow-back' size={24} color={Colors.dark.white} />
          </TouchableOpacity>

          <Text style={styles.logoText}>
            New<Text style={{ color: Colors.dark.borderDark }}>Acess</Text>
          </Text>

          <Text style={styles.sloganText}>New account</Text>
        </View>


        <View style={styles.form}>
          <View>
            <Text style={styles.label}>Fist name</Text>
            <TextInput placeholder='Type name...' style={styles.input} />
          </View>

          <View>
            <Text style={styles.label}>Second name</Text>
            <TextInput placeholder='Type surname...' secureTextEntry style={styles.input} />
          </View>

          <View>
            <Text style={styles.label}>Email</Text>
            <TextInput placeholder='Type email...' secureTextEntry style={styles.input} />
          </View>

          <View>
            <Text style={styles.label}>Password</Text>
            <TextInput placeholder='Type password...' style={styles.input} />
          </View>

          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </Pressable>

        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    backgroundColor: Colors.dark.background,
  },
  header: {
    paddingLeft: 14,
    paddingRight: 14,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.dark.textPrimary,
    marginBottom: 8,
  },
  sloganText: {
    fontSize: 34,
    color: Colors.dark.accentBlue,
  },
  form: {
    flex: 1,
    backgroundColor: Colors.dark.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 34,
    paddingLeft: 14,
    paddingRight: 14,
  },
  label: {
    color: Colors.dark.lightGray,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.dark.lightGray,
    borderRadius: 8,
    marginBottom: 16,
    padding: 12,
    paddingTop: 14,
    paddingBottom: 14,
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
  backButton: {
    backgroundColor: Colors.dark.buttonBackground,
    alignSelf: 'flex-start',
    padding: 3,
    borderRadius: 8,
    marginBottom: 8,
  }
})
