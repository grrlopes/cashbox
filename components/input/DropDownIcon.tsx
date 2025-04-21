import { FC, useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useQuery } from '@tanstack/react-query';
import { Icon } from '@/interfaces/icon';
import Colors from '@/constants/Colors';
import { globalStyles } from '@/helper/theme';
import { Vendor } from '@/interfaces/vendor';

interface Props {
  getValues(data: any): void;
  reset: boolean;
  listAllItem: () => Promise<Icon[] | Vendor[]>;
  query: string;
  placeholder: string;
}

const DropdownIcon: FC<Props> = (props: Props) => {
  const [value, setValue] = useState<Icon | Vendor | null>();
  const { data, isLoading, refetch } = useQuery<Array<Icon | Vendor>>({
    queryKey: [props.query],
    queryFn: () => props.listAllItem(),
  });

  const itemValues = (data: any): void => {
    switch (props.query) {
      case "icondropdown":
        props.getValues(data.id.toString())
        break;
      case "vendordropdown":
        props.getValues(data.vendor.toString())
        break;
    }
  }

  // Reset selection dropdown box
  useEffect(() => {
    setValue(null)
  }, [props.reset])

  if (isLoading) return <ActivityIndicator size="large" color="blue" />;

  return (
    <Dropdown
      activeColor={Colors.dark.lightGray}
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data!}
      search={true}
      maxHeight={400}
      labelField="name"
      valueField="id"
      placeholder={props.placeholder}
      searchPlaceholder="Search..."
      value={value}
      onChange={(item: any) => {
        setValue(item);
        itemValues(item);
      }}
      renderLeftIcon={() => (
        <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
      )}
      renderItem={(item: Icon) => {
        return (
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.container}>
              <View>
                <Image style={[styles.itemImage]}
                  source={{ uri: item.url }}
                />
              </View>
              <View style={styles.itemName}>
                <Text>{item.name}</Text>
              </View>
            </View>
          </ScrollView>
        )
      }}
    />
  );
};

export default DropdownIcon;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 5,
    paddingStart: 20,
    gap: 20,
  },
  itemName: {
    alignSelf: "center"
  },
  dropdown: {
    marginBottom: 5,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 14,
    fontFamily: globalStyles.text.fontFamily,
    fontWeight: "600"
  },
  selectedTextStyle: {
    fontSize: 14,
    fontFamily: globalStyles.text.fontFamily,
    fontWeight: "600"
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  itemImage: {
    height: Colors.dark.heigh,
    width: Colors.dark.weight,
  },
});
