/* eslint-disable prettier/prettier */
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export const showLoading = () => {

    return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#D22D13" />
        </View>
      );
    };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
    },
});

