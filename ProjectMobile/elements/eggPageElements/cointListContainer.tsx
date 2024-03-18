import React from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';
import {useTheme} from '../../context/theme';

function CointList() {
  const {theme} = useTheme();
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: 100,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    coinContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      width: 40,
      height: 40,
    },
    text: {
      color: theme === 'light' ? 'black' : 'white',
      fontSize: 16,
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.coinContainer}>
        <Image
          style={styles.icon}
          source={require('../../assets/gold-coin.png')}
        />
        <Text style={styles.text}>100</Text>
      </View>
      <View style={styles.coinContainer}>
        <Image
          style={styles.icon}
          source={require('../../assets/silver-coin.png')}
        />
        <Text style={styles.text}>50</Text>
      </View>
      <View style={styles.coinContainer}>
        <Image
          style={styles.icon}
          source={require('../../assets/bronze-coin.png')}
        />
        <Text style={styles.text}>20</Text>
      </View>
    </View>
  );
}

export default CointList;
