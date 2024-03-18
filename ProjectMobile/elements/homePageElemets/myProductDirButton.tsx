import React from 'react';
import {TouchableOpacity, StyleSheet, Text, Image} from 'react-native';
import {useTheme} from '../../context/theme';

const myProductButton = ({nav}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {theme} = useTheme();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme === 'light' ? '#f8f4f4' : '#35363a',
      width: '40%',
      height: 50,
      minHeight: 50,
      maxHeight: 50,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'flex-start',
      flexDirection: 'row',
      marginLeft: '5%',
      marginRight: 'auto',
      marginTop: 5,
      borderRadius: 10,
      marginBottom: 10,
    },
    icon: {
      width: 20,
      height: 20,
      tintColor: theme === 'light' ? 'black' : 'white',
      marginLeft: 'auto',
      marginRight: '10%',
    },
    text: {
      color: theme === 'light' ? 'black' : 'white',
      fontWeight: '500',
      letterSpacing: 1,
      fontSize: 16,
      marginLeft: '10%',
    },
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        nav.navigate('MyProducts');
      }}
      activeOpacity={1}>
      <Text style={styles.text}>My Products</Text>
      <Image
        source={require('../../assets/arrow-point-right.png')}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
};
export default myProductButton;
