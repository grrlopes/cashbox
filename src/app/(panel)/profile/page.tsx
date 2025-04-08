import Colors from '@/constants/Colors'
import iconUrl from '@/constants/IconUrl';
import { globalStyles } from '@/helper/theme';
import { removeUserToken } from '@/store/persistor'
import { router } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function Profile() {
  const handleLogoff = async () => {
    await removeUserToken();
    router.replace("/signin/page");
  };

  const handleNewIcon = async () => {
    router.replace("/icons");
  };

  const handleNewStoreName = async () => {
    router.replace("/vendors");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.profileImg}
          source={{ uri: iconUrl.user }}
        />
      </View>

      <View style={styles.content}>
        <View style={styles.account}>
          <Text style={styles.headrSection}>My Account</Text>
        </View>
        <View style={styles.sections}>
          <Text style={styles.edit_password}>Edit Profile</Text>
          <Text style={styles.edit_password}>Change Password</Text>
        </View>

        <View style={styles.account}>
          <Text style={styles.headrSection}>Settings</Text>
        </View>
        <View style={styles.sections}>
          <TouchableOpacity onPress={handleNewIcon}>
            <Text style={styles.edit_password}>New icons</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.sections}>
          <TouchableOpacity onPress={handleNewStoreName}>
            <Text style={styles.edit_password}>New vendors</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.logout}>
        <TouchableOpacity onPress={handleLogoff}>
          <Text style={styles.push_logout}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: Colors.dark.background,
  },
  header: {
    alignSelf: "center",
    paddingBottom: 10
  },
  content: {
    flex: 1,
    backgroundColor: Colors.dark.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 10,
  },
  account: {
    borderWidth: 0.1,
    backgroundColor: Colors.dark.lightGray,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 10,
  },
  sections: {
    backgroundColor: Colors.dark.lighterGray,
    padding: 15,
    gap: 15,
  },
  headrSection: {
    fontFamily: globalStyles.text.fontFamily,
    fontWeight: "600",
    fontSize: 14,
  },
  edit_password: {
    fontFamily: globalStyles.text.fontFamily,
    fontWeight: "500",
    fontSize: 15,
  },
  profileImg: {
    height: 100,
    width: 100,
    backgroundColor: Colors.dark.lighterGray,
    borderRadius: 50,
  },
  logout: {
    backgroundColor: Colors.dark.lightGray,
    alignItems: "center",
    padding: 20,
  },
  push_logout: {
    fontFamily: globalStyles.text.fontFamily,
    fontWeight: "500",
    fontSize: 15,
  }
})
