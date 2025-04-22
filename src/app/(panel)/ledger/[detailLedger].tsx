import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import { ExpenseDatailLedgerOut } from '@/interfaces/expense';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getExpenseById } from '@/api/expense';
import { StringRecordId } from 'surrealdb';
import HistoryLedger from './historyLedger';

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

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data!}
      numColumns={2}
      horizontal={false}
      keyExtractor={(item) => item.vendor}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      renderItem={({ item, index }) => <HistoryLedger item={item} count={index + 1} />}
    />
  )
};

export default DetailLedger;
