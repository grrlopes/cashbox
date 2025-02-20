import { Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'

interface Props {
  activeBtn(): void;
}
const FloatBtn = (props: Props) => {
  const handlePress = () => {
    props.activeBtn();
  }

  return (
    <View style={styles.plusBtnContainer}>
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => pressed ? [styles.plusBtn, { transform: [{ scale: 0.8 }] }] : [styles.plusBtn]}>
        <Ionicons name='add-outline' size={40} color={'white'} />
      </Pressable>
    </View>

  )
}

export default FloatBtn

const styles = StyleSheet.create({
  plusBtnContainer: {
    position: 'absolute',
    bottom: 40,
    right: 20,
  },
  plusBtn: {
    width: 50,
    height: 50,
    backgroundColor: "black",
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
