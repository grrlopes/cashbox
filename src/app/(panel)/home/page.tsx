import FloatBtn from '@/components/button/FloatBtn'
import { router } from 'expo-router'
import { Image, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ListExpenses from './listExpenses'
import { globalStyles } from '@/helper/theme'
import { getUserInfoByToken } from '@/store/persistor'
import { useEffect, useState } from 'react'
import { LogIn } from '@/interfaces/auth'
import iconUrl from '@/constants/IconUrl'
import Colors from '@/constants/Colors'

export default function Home() {
  const [auth, setAuth] = useState<LogIn | null>(null)
  const handleBtn = () => {
    router.push('/(panel)/createExpense/expense');
  };

  const handleLedger = () => {
    router.push('/(panel)/ledger/ledger');
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
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.status}>
        <TouchableOpacity onPress={handleLogoff}>
          <View style={styles.profileContainer}>
            <View>
              <Image
                style={styles.profileIcon}
                source={{ uri: iconUrl.userMenu }}
              />
            </View>
            <View style={styles.profile}>
              <Text style={styles.profileText}>Hi, {auth?.name}</Text>
              <Text style={styles.profileText}>Save Money</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View>
          <Pressable onPress={handleLedger}>
            <View>
              <Image
                style={styles.profileIcon}
                source={{ uri: iconUrl.ledger }}
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
    backgroundColor: Colors.dark.white,
  },
  status: {
    flexDirection: "row",
    margin: 5,
    justifyContent: "space-between",
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
});
