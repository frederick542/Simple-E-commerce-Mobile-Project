import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {BalanceContext} from '../../context/balance';
import {useTheme} from '../../context/theme';

const UserBalance = () => {
  const {theme} = useTheme();
  const styles = StyleSheet.create({
    container: {
      width: '35%',
      height: 85,
      backgroundColor: theme === 'light' ? '#f8f4f4' : '#35363a',
      marginRight: '5%',
      alignSelf: 'flex-start',
      marginTop: 5,
      elevation: 10,
      borderRadius: 10,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      width: '80%',
      height: 'auto',
      textAlign: 'right',
    },
    balance: {
      fontSize: 30,
      fontWeight: '800',
      color: theme === 'light' ? '#7e4bd1' : '#9a74d9',
    },
    label: {
      fontSize: 15,
      color: theme === 'light' ? 'gray' : '#c0c0c0',
    },
  });

  const {balance} = useContext(BalanceContext);
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.balance]}>{balance.toFixed(1)}</Text>
      <Text style={[styles.text, styles.label]}>My Coins</Text>
    </View>
  );
};

export default UserBalance;
