import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'

const Header = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Header</Text>
      </View>
    </SafeAreaView>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.darkGray,
  }
})
