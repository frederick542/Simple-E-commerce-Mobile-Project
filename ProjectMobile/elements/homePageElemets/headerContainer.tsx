import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import SearchBarContainer from './searchBar'; // Corrected spelling
import ProductButton from './myProductDirButton';
import UserBalance from './userBalance';
import {ThemeContext} from '../../context/theme';

const Header = ({nav}) => {
  const {theme} = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: `${theme === 'light' ? '#8875a9' : '#6a5981'}`,
      width: '100%',
      height: 140,
      minHeight: 140,
      maxHeight: 140,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'visible',
      borderBottomWidth: theme === 'dark' ? 1 : 0,
      borderBottomColor: 'black',
    },
    myProductAndBalance: {
      display: 'flex',
      flexDirection: 'row',
      overflow: 'visible',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: 40,
    },
  });

  return (
    <View style={styles.container}>
      <SearchBarContainer />
      <View style={styles.myProductAndBalance}>
        <ProductButton nav={nav} />
        <UserBalance />
      </View>
    </View>
  );
};

export default Header;
