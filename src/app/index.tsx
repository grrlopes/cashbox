import Colors from '@/constants/Colors'
import { Link, router } from 'expo-router'
import { useState } from 'react'
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

export default function Login() {
  const [email, setEmail] = useState<string>('');

  const handleSigin = () => {
    if (email === "Test") {
      router.replace('/(panel)/profile/page')
    } else {
      Alert.alert('There is something wrong with your credencial');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logoText}>
          Login<Text style={{ color: Colors.dark.borderDark }}>In</Text>
        </Text>

        <Text style={styles.sloganText}>The key to success is financial intelligence.</Text>
      </View>


      <View style={styles.form}>
        <View>
          <Text style={styles.label}> Email</Text>
          <TextInput
            placeholder='Digite email...'
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View>
          <Text style={styles.label}>Senha</Text>
          <TextInput placeholder='Digite a sua senha...' secureTextEntry style={styles.input} />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSigin}>
          <Text style={styles.buttonText}>Acessasr</Text>
        </TouchableOpacity>

        <Link href='/(auth)/signup/page'>
          <Text>Ainda nao cadastrado</Text>
        </Link>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 34,
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
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.dark.accentBlue,
    paddingBottom: 10,
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
  }
})
