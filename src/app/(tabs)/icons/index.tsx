import { ActivityIndicator, Alert, FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Icon } from '@/interfaces/icon';
import { ListAllIcon, deleteIcon } from '@/api/icon';
import Colors from '@/constants/Colors';
import { globalStyles } from '@/helper/theme';
import { FontAwesome } from '@expo/vector-icons';
import { RecordId } from 'surrealdb';


const Index = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { data, isLoading, error, refetch } = useQuery<Array<Icon>>({
    queryKey: ['Icon'],
    queryFn: () => ListAllIcon(),
    staleTime: 0, // Ensures fresh data is fetched when tab is revisited
  });

  useEffect(() => {
  }, [refetch()])


  const { mutateAsync } = useMutation({
    mutationFn: (iconDelete: RecordId) => deleteIcon(iconDelete),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['Icon'],
        refetchType: 'all',
      },
      );
    },
    onError: (error: any) => {
      console.error("Error deleting icon:", error);
    },
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

  const handleDeleteIcon = (data: RecordId) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this item?",
      [
        { text: "Cancel   ", style: "cancel" },
        { text: "   Delete", style: "destructive", onPress: () => mutateAsync(data) },
      ]
    );
  }

  if (isLoading) {
    return <ActivityIndicator
      size={"large"}
      color={"#000000"}
      style={{ flex: 1, alignItems: "center", backgroundColor: "#E0E0E0" }}
    />;
  }

  const _renderItem = (item: Icon, id: number) => (
    <View style={{ flex: 1 }}>
      <View style={styles.Container}>
        <View style={[styles.itemContainer, id % 2 === 0 ? styles.evenRow : styles.oddRow]} key={item.id.id.toString()}>
          <View style={styles.itemDescription}>
            <View >
              <Image style={[styles.itemImage]}
                source={{ uri: item.url }}
              />
            </View>
            <View style={styles.items}>
              <Text style={styles.itemsTextName}>{item.name}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.itemImageDelete} onPress={() => handleDeleteIcon(item.id)}>
            <FontAwesome name="trash" color={id % 2 === 0 ? "gray" : "lightgray"} size={32} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data}
      renderItem={({ item, index }) => _renderItem(item, index)}
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

export default Index

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
  itemImageDelete: {
    alignSelf: "center",
    marginRight: 25,
    padding: 12,
  }
})
