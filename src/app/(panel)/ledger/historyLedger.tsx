import { StyleSheet, Text, View } from 'react-native'
import { ExpenseDatail } from '@/interfaces/expense';
import { FC } from 'react';
import { formatCurrency } from '@/helper/currency';

type Props = {
  item: ExpenseDatail,
  count: number,
}

const HistoryLedger: FC<Props> = (props: Props) => {
  const dateparse = new Date()
  return (
    <View style={styles().container}>
      <View style={styles(true).cardCount}>
        <Text>{props.count}</Text>
      </View>
      <View style={styles().cardName}>
        <Text style={{ fontWeight: "600" }}>{props.item.name}</Text>
      </View>
      <View style={styles().cardTime}>
        <Text>
          {props.item.time.created_at.getHours()}:{props.item.time.created_at.getMinutes()}
          {dateparse.getHours() < 12 ? " am" : " pm"}
        </Text>
      </View>
      <View style={styles().cardPrice}>
        <Text>{formatCurrency(props.item.total.toString())}</Text>
      </View>
      <View style={styles().cardDesc}>
        <Text numberOfLines={4}>{props.item.description}</Text>
      </View>
    </View>
  );
};

export default HistoryLedger;

const styles = (done?: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    height: 140,
    margin: 6,
    backgroundColor: "#ffffff",
    padding: 5,
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
  cardName: {
    alignItems: "center",
  },
  cardPrice: {
    paddingTop: 1,
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
  cardDesc: {
    paddingTop: 5
  }
});
