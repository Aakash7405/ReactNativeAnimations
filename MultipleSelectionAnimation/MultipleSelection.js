import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Option from './Option';

const items = [
  {
    id: 0,
    name: 'Italy',
  },
  {
    id: 1,
    name: 'Mexico',
  },
  {
    id: 2,
    name: 'Japan',
  },
  {
    id: 3,
    name: 'Canada',
  },
  {
    id: 4,
    name: 'USA',
  },
  {
    id: 5,
    name: 'India',
  },
  {
    id: 6,
    name: 'China',
  },
  {
    id: 7,
    name: 'Pakistan',
  },
  {
    id: 8,
    name: 'Nepal',
  },
  {
    id: 9,
    name: 'Sri Lanka',
  },
  {
    id: 10,
    name: 'Bhutan',
  },
  {
    id: 11,
    name: 'Africa',
  },
  {
    id: 12,
    name: 'DenMark',
  },
  {
    id: 13,
    name: 'Swedan',
  },
  {
    id: 14,
    name: 'Australia',
  },
];

export default function MultipleSelection() {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.text}>which countries have you visited ?</Text>
      <View style={styles.itemsContainer}>
        {items.map(item => {
          return <Option key={item.id} name={item.name} />;
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
    textAlign:'center',
    marginTop: 50,
  },
  itemsContainer: {
    marginTop: 30,
    marginLeft: 10,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent:'center',
    gap: 6,
  },
});
