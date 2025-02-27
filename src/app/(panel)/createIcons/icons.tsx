import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView } from 'react-native';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  name: z.string().min(1, 'Name is required').max(15, 'Limit of 15 characters'),
  url: z.string().url('Invalid URL'),
});

const IconsForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log('Form submitted:', data);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setValue('name', text)}
          {...register('name')}
        />
        {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

        <Text style={styles.label}>URL</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setValue('url', text)}
          {...register('url')}
        />
        {errors.url && <Text style={styles.error}>{errors.url.message}</Text>}

        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      </View>
    </SafeAreaView>
  );
};

export default IconsForm;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: '70%',
  },
  container: {
    padding: 20,
    height: '70%'
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

