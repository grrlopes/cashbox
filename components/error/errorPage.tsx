import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

interface Props {
  message: string;
  backgroundColor: string,
}

const ErrorPage = ({ message, backgroundColor }: Props) => {
  return (
    <View style={styles(backgroundColor).container}>
      <View style={styles().card}>
        <Text style={styles().errorIcon}>⚠️</Text>
        <Text style={styles().message}>{message}</Text>
      </View>
    </View>
  );
};

export default ErrorPage;

const styles = (props?: any) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: props?.backgroundColor,
  },
  card: {
    width: '90%',
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  errorIcon: {
    fontSize: 60,
    marginBottom: 16,
    color: '#d9534f',
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 24,
    color: '#333333',
  },
});
