import { ActivityIndicator, StyleSheet, View } from 'react-native'
import Colors from '@/constants/Colors'

export default function Index() {

  return (
    <View style={styles.container}>
      <ActivityIndicator size={40} color={Colors.dark.accentGreen} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
