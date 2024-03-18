import React, {useContext} from 'react';
import {TouchableOpacity, StyleSheet, Image} from 'react-native';
import {ThemeContext} from '../../context/theme';

const ThemeIcon = () => {
  const {theme, setTheme} = useContext(ThemeContext);

  const changeTheme = () => {
    setTheme();
  };
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      width: 47,
      height: '100%',
      justifyContent: 'center',
      marginRight: '5%',
    },
    image: {
      width: '100%',
      height: '100%',
      marginBottom: 10,
      tintColor: 'white',
    },
  });

  return (
    <TouchableOpacity
      onPress={changeTheme}
      style={styles.container}
      activeOpacity={1}>
      {theme === 'light' ? (
        <Image
          source={require('../../assets/sun_icon.png')}
          style={styles.image}
        />
      ) : (
        <Image
          source={require('../../assets/moon_icon.png')}
          style={styles.image}
        />
      )}
    </TouchableOpacity>
  );
};

export default ThemeIcon;
