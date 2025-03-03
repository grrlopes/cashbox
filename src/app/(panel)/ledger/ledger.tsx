import { ActivityIndicator, FlatList, RefreshControl, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { ExpenseOut } from '@/interfaces/expense';
import { listAllExpenses } from '@/api/listExpense';
import ListLedger from '@/components/ListLedger';

const ledger = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { data, isLoading, error, refetch } = useQuery<Array<ExpenseOut>>({
    queryKey: ['ledger'],
    queryFn: () => listAllExpenses(),
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
  }

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data}
      numColumns={2}
      renderItem={({ item }) => ListLedger(item)}
      keyExtractor={(item) => item.id.toString()}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    />
  )
}

export default ledger
