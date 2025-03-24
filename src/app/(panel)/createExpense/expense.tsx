import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Colors from '@/constants/Colors';
import { getIdByCurrentDate, partialCreate } from '@/api/expense';
import { ExpenseCreate } from '@/interfaces/expense';
import { StringRecordId } from 'surrealdb';
import DropdownIcon from '@/components/input/DropDownIcon';

const schema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required').max(15, 'Limit of 15 characters'),
  description: z.string(),
  total: z.string(),
  icon: z.string(),
});

type FormFields = {
  id: string,
  name: string,
  description: string,
  total: string,
  icon: string,
}

const CreateExpenses = () => {
  const client = useQueryClient();
  const { mutateAsync, isSuccess } = useMutation({
    mutationFn: (create: ExpenseCreate) => partialCreate(create),
    onSuccess: () => {
      client.invalidateQueries();
      reset();
    },
  });

  const {
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: { id: '', name: '', total: '', description: '', icon: '' },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data: any) => {
    const expenseId = await getIdByCurrentDate()
    data.id = new StringRecordId(expenseId);
    await mutateAsync(data);
  };

  const getDropDownValue = (data: string): void => {
    setValue('icon', data)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logoText}>
          Create <Text style={{ color: Colors.dark.borderDark }}>Expense</Text>
        </Text>
      </View>

      <View style={styles.form}>
        <DropdownIcon getValues={getDropDownValue} />

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Type name..."
            />
          )}
        />
        {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Type description..."
            />
          )}
        />
        {errors.description && <Text style={styles.error}>{errors.description.message}</Text>}

        <Controller
          control={control}
          name="total"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Type total..."
            />
          )}
        />
        {errors.total && <Text style={styles.error}>{errors.total.message}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          {isSubmitting ? <Text style={styles.buttonText}>Loading...</Text> : <Text style={styles.buttonText}>Create</Text>}
        </TouchableOpacity>
        {!isSuccess ? <View></View> : <View><Text>Successul created</Text></View>}
      </View>
    </View>
  )
}

export default CreateExpenses;

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

});
