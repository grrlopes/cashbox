import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput as Input, TextInputProps } from 'react-native-paper';
import Colors from '@/constants/Colors';

interface TextInputPropsExtended extends TextInputProps {
  errorText?: string;
  description?: string;
}

const TextInput: React.FC<TextInputPropsExtended> = ({ errorText, description, ...props }) => {
  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        underlineColor="transparent"
        mode="outlined"
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    backgroundColor: Colors.dark.primary,
  },
  description: {
    fontSize: 13,
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: Colors.dark.primary,
    paddingTop: 8,
  },
});

export default TextInput;
