import FloatBtn from '@/components/button/FloatBtn'
import { router } from 'expo-router'
import { Image, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ListExpenses from './listExpenses'
import { globalStyles } from '@/helper/theme'
import { getUserInfoByToken } from '@/store/persistor'
import { useEffect, useState } from 'react'
import { LogIn } from '@/interfaces/auth'

export default function Home() {
  const [auth, setAuth] = useState<LogIn | null>(null)
  const handleBtn = () => {
    router.push('/(panel)/createExpense/expense');
  };

  const handleLogoff = () => {
    router.push('/(panel)/profile/page');
  }

  useEffect(() => {
    const userInfo = async () => {
      const info = await getUserInfoByToken();
      setAuth(info)
    }
    userInfo();
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.status}>
        <TouchableOpacity onPress={handleLogoff}>
          <View style={styles.profileContainer}>
            <View>
              <Image
                style={styles.profileIcon}
                source={{ uri: 'https://img.icons8.com/plasticine/100/user-menu-male.png' }}
              />
            </View>
            <View style={styles.profile}>
              <Text style={styles.profileText}>Hi, {auth?.name}</Text>
              <Text style={styles.profileText}>Save Money</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View>
          <Pressable onPress={handleBtn}>
            <View>
              <Image
                style={styles.profileIcon}
                source={{ uri: 'https://img.icons8.com/plasticine/100/general-ledger.png' }}
              />
            </View>
          </Pressable>
        </View>
      </View>
      <View style={styles.headerTitle}>
        <Text style={styles.headerText}>Home</Text>
        <Text style={styles.headerText}>{new Date().toLocaleDateString('en-us', { month: "long" })}</Text>
      </View>
      <ListExpenses />
      <FloatBtn activeBtn={handleBtn} />
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  status: {
    flexDirection: "row",
    margin: 5,
    justifyContent: "space-between"
  },
  profileContainer: {
    flexDirection: "row",
    gap: 3
  },
  profile: {
    flexDirection: "column",
  },
  profileIcon: {
    width: 55,
    height: 35,
  },
  profileText: {
    fontFamily: globalStyles.text.fontFamily,
    fontWeight: "600",
    fontSize: 13,
  },
  headerTitle: {
    flexDirection: "column",
    margin: 5,
    alignItems: "center",
    rowGap: 7,
  },
  headerText: {
    fontFamily: globalStyles.text.fontFamily,
    fontWeight: "600",
    fontSize: 14,
  },

})
