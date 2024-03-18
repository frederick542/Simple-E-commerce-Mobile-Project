import React, {useContext} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from '../../assets/SearchIcon';
import { SearchContext } from '../../context/searcheItem';
import {useTheme} from '../../context/theme';

const SearchIcon = ({ text }) => {
  const {theme} = useTheme();
  const {setSearch} = useContext(SearchContext);
  return (
    <TouchableOpacity
      onPress={() => {
        setSearch(text);
      }}
      style={styles.container}>
      <Icon color={theme === 'light' ? 'black' : 'white'} props={undefined} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchIcon;
