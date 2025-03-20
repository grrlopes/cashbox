import { ActivityIndicator, FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { ExpenseDatailLedgerOut, ExpenseItemOut } from '@/interfaces/expense';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getExpenseById } from '@/api/expense';
import { StringRecordId } from 'surrealdb';
import ListLedger from '@/components/ListLedger';

const DetailLedger = () => {
  const { detailLedger } = useLocalSearchParams();
  const dateparse = new Date()
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { data, isLoading, refetch } = useQuery<ExpenseDatailLedgerOut[]>({
    queryKey: ['detailLedger'],
    queryFn: () => getExpenseById(new StringRecordId(detailLedger.toString())),
  });

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch();
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  if (isLoading) {
    return <ActivityIndicator
      size={"large"}
      color={"#000000"}
      style={{ flex: 1, alignItems: "center", backgroundColor: "#E0E0E0" }}
    />;
  };

  const render = (data: any, count: number) => (
    <View style={styles().container} key={count}>
      <View style={styles(true).cardCount}>
        <Text>{count + 1}</Text>
      </View>
      <View style={styles().cardSize}>
        <Text style={{ fontWeight: "600" }}>{}</Text>
      </View>
      <View style={styles().cardTime}>
        <Text>
          {dateparse.getHours()}:{dateparse.getMinutes()}
          {dateparse.getHours() < 12 ? " am" : " pm"}
        </Text>
      </View>
      <View style={styles().cardUser}>
        <Text>{}</Text>
      </View>
      <View style={styles().cardTrayid}>
        <Text numberOfLines={10}>{'fsdfds'}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data!}
      numColumns={2}
      horizontal={false}
      keyExtractor={(item) => item.name}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      renderItem={({ item, index }) => <ListLedger item={item} count={index + 1} />}
    />
  )
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
