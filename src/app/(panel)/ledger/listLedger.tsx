import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { ExpenseOut } from '@/interfaces/expense'
import { globalStyles } from '@/helper/theme'
import Colors from '@/constants/Colors'
import { router } from 'expo-router'

type Props = { item: Omit<ExpenseOut, "user" | "items">, count: number }

const onDetailLedger = (id: string) => {
  router.push(`/ledger/${id}`)
}

const ListLedger: FC<Props> = (props: Props) => {
  return (
    <View style={[styles.itemContainer, props.count % 2 === 0 ? styles.evenRow : styles.oddRow]} key={props.item.id}>
      <TouchableOpacity onPress={() => { onDetailLedger(props.item.id) }}>
        <View style={styles.itemDates}>
          <View style={{ flex: 1, alignItems: "flex-start" }}>
            <Text style={styles.headerDateText}>{new Date(props.item.time.created_at.toString()).toLocaleDateString('en-us', { month: "long" })}</Text>
          </View>

          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <Text style={styles.headerDateText}>{new Date(props.item.time.created_at.toString()).getFullYear()}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default ListLedger

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  headerDateText: {
    fontFamily: globalStyles.text.fontFamily,
    fontWeight: "900",
    fontSize: 15,
    color: Colors.dark.titlebackground,
  },
  itemText: {
    flex: 1,
    alignSelf: "flex-end"
  },
  itemContainer: {
  },
  itemDates: {
    flex: 1,
    flexDirection: "row",
    padding: 15,
    marginEnd: 80,
    marginStart: 80,
  },
  evenRow: {
    backgroundColor: Colors.dark.lightGray, // Light gray
  },
  oddRow: {
    backgroundColor: Colors.dark.lighterGray, // Slightly darker gray
  },

})
