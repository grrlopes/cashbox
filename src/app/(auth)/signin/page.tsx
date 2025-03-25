import { doLogin, validToken } from '@/api/auth';
import Colors from '@/constants/Colors'
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router } from 'expo-router'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { TextInput as TxtInput } from 'react-native-paper';
import TextInput from '@/components/input/TextInput';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Valid email is required'),
  password: z.string().min(3, 'Password is required'),
});

type FormFields = z.infer<typeof schema>;

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, dirtyFields },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
    try {
      await doLogin({ email: data.email, password: data.password });
      const logged = await validToken()
      if (logged) {
        router.replace('/(panel)/home/page')
      }
    } catch (e) {
      Alert.alert('There is something wrong with your credencial');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logoText}>
          Login<Text style={{ color: Colors.dark.borderDark }}>In</Text>
        </Text>

        <Text style={styles.sloganText}>The key to success is financial intelligence.</Text>
      </View>

      <View style={styles.form}>

        <Text style={styles.label}>Email</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Type email..."
              returnKeyType="next"
            />
          )}
        />
        {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

        <Text style={styles.label}>Password</Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              returnKeyType="done"
              value={value}
              placeholder="Type password..."
              secureTextEntry={!passwordVisible}
              right={
                <TxtInput.Icon
                  icon={passwordVisible ? 'eye-off' : 'eye'}
                  onPress={togglePasswordVisibility}
                />
              }
              style={styles.input}
            />
          )}
        />
        {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

        <TouchableOpacity style={dirtyFields.email! && dirtyFields.password! ? styles.button : styles.button_disabled}
          onPress={handleSubmit(onSubmit)} disabled={!(dirtyFields.email && dirtyFields.password)}>
          {isSubmitting ? (<Text style={styles.buttonText}>Loading...</Text>) : (<Text style={styles.buttonText}>Log In</Text>)}
        </TouchableOpacity>

        <Text>Don't have an account?
          <Link href='/(auth)/signup/page'>
            <Text style={styles.signing}> Sign up</Text>
          </Link>
        </Text>
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
    marginBottom: 6,
    padding: 10,
    paddingTop: 1,
    paddingBottom: 1,
  },
  button_disabled: {
    backgroundColor: Colors.dark.accentGreen,
    paddingTop: 14,
    paddingBottom: 14,
    alignItems: 'center',
    width: '100%',
    borderRadius: 8,
  },
  button: {
    backgroundColor: Colors.dark.success,
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
  signing: {
    fontWeight: 'bold',
    color: Colors.dark.accentIndigo,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },

})
