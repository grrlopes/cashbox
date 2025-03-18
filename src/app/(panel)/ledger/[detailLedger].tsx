import { StyleSheet, Text, View } from 'react-native'
import { ExpenseOut } from '@/interfaces/expense';
import { useLocalSearchParams } from 'expo-router';

type Props = Omit<ExpenseOut, "user" | "id">

const DetailLedger = () => {
  const { detailLedger } = useLocalSearchParams();
  const dateparse = new Date()
  return (
    <View style={styles().container}>
      <View style={styles(true).cardCount}>
        <Text>{2 + 2}</Text>
      </View>
      <View style={styles().cardSize}>
        <Text style={{ fontWeight: "600" }}>{"fdsfsd"}</Text>
      </View>
      <View style={styles().cardTime}>
        <Text>
          {dateparse.getHours()}:{dateparse.getMinutes()}
          {dateparse.getHours() < 12 ? " am" : " pm"}
        </Text>
      </View>
    </View>
  );
};

export default DetailLedger;

const styles = (done?: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    height: 140,
    margin: 16,
    backgroundColor: "#ffffff",
    padding: 5,
    marginVertical: 16,
    borderRadius: 16,

    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    elevation: 5,
  },
  cardContainer: {
    flex: 1,
  },
  cardTime: {
    alignItems: "center"
  },
  cardSize: {
    alignItems: "center",
  },
  cardUser: {
    paddingTop: 10
  },
  cardCount: {
    position: "absolute",
    top: -3,
    left: -3,
    width: 23,
    alignItems: "center",
    backgroundColor: done ? "lightgrey" : "orange",
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
  cardTrayid: {
    paddingTop: 10
  }
});
