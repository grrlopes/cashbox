import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Icon } from '@/interfaces/icon';
import { createIcon } from '@/api/icon';
import Colors from '@/constants/Colors';

const schema = z.object({
  name: z.string().min(1, 'Name is required').max(15, 'Limit of 15 characters'),
  url: z.string()//.url('Invalid URL'),
});

const IconsForm = () => {
  const client = useQueryClient();
  const { mutateAsync, isSuccess, reset } = useMutation({
    mutationFn: (iconCreate: Icon) => createIcon(iconCreate),
    onSuccess: () => {
      client.invalidateQueries();
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset: clearform,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: '', url: '' },
  });

  const onSubmit = async (data: any) => {
    await mutateAsync(data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logoText}>
          Create <Text style={{ color: Colors.dark.borderDark }}>Icons</Text>
        </Text>
      </View>

      <View style={styles.form}>
        <View>
          <Text style={styles.label}>Name</Text>
          <TextInput
            placeholder='Type icon name...'
            style={styles.input}
            onFocus={() => reset()}
            onChangeText={(text) => setValue('name', text)}
            {...register('name').onChange}
          />
        </View>
        {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

        <View>
          <Text style={styles.label}>Url</Text>
          <TextInput
            placeholder='Type url...'
            style={styles.input}
            onFocus={() => reset()}
            onChangeText={(text) => setValue('url', text)}
            {...register('url')}
          />
          {errors.url && <Text style={styles.error}>{errors.url.message}</Text>}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>
        {!isSuccess ? <View></View> : <View><Text>Successul created</Text></View>}
      </View>
    </View>
  )
}

export default IconsForm;

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
