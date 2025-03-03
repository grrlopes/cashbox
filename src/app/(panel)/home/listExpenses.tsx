import { ActivityIndicator, FlatList, Image, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { listAllExpenses } from '@/api/listExpense';
import { Expense, ExpenseOut } from '@/interfaces/expense';
import Colors from '@/constants/Colors';
import { globalStyles } from '@/helper/theme';

const ListExpenses = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { data, isLoading, error, refetch } = useQuery<Array<ExpenseOut>>({
    queryKey: ['expense'],
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

  const _renderItem = (item: ExpenseOut) => (
    <View style={{ flex: 1 }}>
      <View style={styles.Container}>
        <View style={styles.headerDate}>
          <View style={{ flexDirection: "row", alignSelf: "center", gap: 4 }}>
            <Text style={styles.headerDateText}>{new Date(item.time.created_at.toString()).toLocaleDateString('en-us', { weekday: "long" })},</Text>
            <Text style={styles.headerDateText}>{new Date(item.time.created_at.toString()).toLocaleDateString('en-us', { month: "long" })}</Text>
            <Text style={styles.headerDateText}>{new Date(item.time.created_at.toString()).toLocaleDateString('en-us', { day: "numeric" })},</Text>
            <Text style={styles.headerDateText}>{new Date(item.time.created_at.toString()).getFullYear()}</Text>
          </View>
        </View>
        {item.items.map((item, id) => {
          return (
            <View style={[styles.itemContainer, id % 2 === 0 ? styles.evenRow : styles.oddRow]} key={id}>
              <View style={styles.itemDescription}>
                <View >
                  <Image style={[styles.itemImage]}
                    source={{ uri: item.icon?.url }}
                  />
                </View>
                <View style={styles.items}>
                  <Text style={styles.itemsTextDesc}>{item.description}</Text>
                  <Text style={styles.itemsTextName}>{item.name}</Text>
                </View>
              </View>
              <View style={styles.itemsTotal}>
                <Text style={styles.itemsTextTotal}>{item.total}</Text>
              </View>
            </View>
          )
        })}
      </View>
    </View>
  );

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data}
      renderItem={({ item }) => _renderItem(item)}
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

export default ListExpenses

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  // Render styles
  headerDate: {
    backgroundColor: Colors.dark.lightGray,
    padding: 10,

    marginRight: 5,
    marginLeft: 5,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 15,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    elevation: 5,
  },
  headerDateText: {
    fontFamily: globalStyles.text.fontFamily,
    fontWeight: "900",
    fontSize: 15,
    color: Colors.dark.titlebackground,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  items: {
    alignSelf: "center",
    rowGap: 6,
    borderColor: Colors.dark.borderDark,
  },
  itemsTextDesc: {
    fontFamily: globalStyles.text.fontFamily,
    fontWeight: 700,
    fontSize: 14,
  },
  itemsTextName: {
    fontFamily: globalStyles.text.fontFamily,
    fontWeight: 600,
    fontSize: 13,
    color: Colors.dark.darkGray
  },
  itemsTextTotal: {
    fontFamily: globalStyles.text.fontFamily,
    fontWeight: 700,
    fontSize: 14,
  },
  itemsTotal: {
    alignSelf: "center",
    margin: 10,
  },
  itemDescription: {
    flexDirection: "row",
  },
  itemImage: {
    height: Colors.dark.heigh,
    width: Colors.dark.weight,
  },
  evenRow: {
    backgroundColor: Colors.dark.white, // Light gray
  },
  oddRow: {
    backgroundColor: Colors.dark.lighterGray, // Slightly darker gray
  },
})
