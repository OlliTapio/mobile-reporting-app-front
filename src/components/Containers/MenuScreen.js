import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class MenuScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Main menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});