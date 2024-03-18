import React, {useContext} from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';
import {ThemeContext} from '../../context/theme';

const Header = ({nav}) => {
  const {theme} = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'transparent',
      width: '100%',
      height: 70,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    Image: {
      width: 20,
      height: 20,
      tintColor: theme === 'light' ? 'grey' : 'white',
      transform: [{scaleX: -1}],
      marginLeft: 10,
      marginRight: 10,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 23,
      color: theme === 'light' ? 'black' : 'white',
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          nav.goBack();
        }}>
        <Image
          style={styles.Image}
          source={require('../../assets/arrow-point-right.png')}
        />
      </TouchableOpacity>
      <Text style={styles.title}>Minigame</Text>
    </View>
  );
};

export default Header;
