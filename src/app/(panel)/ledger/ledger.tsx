import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { ExpenseOut } from '@/interfaces/expense';
import { listAllExpenses } from '@/api/expense';
import ListLedger from './listLedger';
import Colors from '@/constants/Colors';

const ledger = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { data, isLoading, refetch } = useQuery<Array<ExpenseOut>>({
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
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        numColumns={1}
        horizontal={false}
        renderItem={({ item, index }) => <ListLedger item={item} count={index} />}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </View>
  )
}

export default ledger

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    backgroundColor: Colors.dark.lighterGray,
  },
})
