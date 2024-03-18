import React from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useTheme} from '../../context/theme';

function EggDirrButton({nav}) {
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme === 'light' ? 'white' : '#35363a',
      borderRadius: 360,
      width: 50,
      height: 50,
      borderColor: theme === 'light' ? 'black' : '#6a5981',
      borderWidth: 0.6,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 20,
    },
    icon: {
      width: 30,
      height: 30,
      resizeMode: 'contain',
    },
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        nav.navigate('EggGame');
      }}
      activeOpacity={1}>
      <Image
        source={require('../../assets/egg-full.png')}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
}


export default EggDirrButton;
