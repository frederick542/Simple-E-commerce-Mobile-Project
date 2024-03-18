import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import SearchIcon from './searchIcon';
import {SearchContext} from '../../context/searcheItem';
import ThemeIcon from './themeIcon';
import {useTheme} from '../../context/theme';

const SearchBarContainer = () => {
  const {theme} = useTheme();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme === 'light' ? 'white' : '#35363a',
      width: '77%',
      height: '100%',
      marginLeft: '5%',
      borderRadius: 7,
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'row',
      marginBottom: 10,
      marginRight: 'auto',
    },
    flex_kesamping: {
      display: 'flex',
      height: '30%',
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  const InputtedStyles = StyleSheet.create({
    input: {
      height: '100%',
      width: '85%',
      color: theme === 'light' ? 'black' : 'white',
      fontSize: 13,
      marginLeft: 10,
    },
  });

  const [text, setText] = useState('');
  const {setSearch} = useContext(SearchContext);
  useEffect(() => {
    if (text === '') {
      setSearch('');
    }
  }, [text, setSearch]);

  return (
    <View style={styles.flex_kesamping}>
      <View style={styles.container}>
        <SearchIcon text={text} />
        <TextInput
          style={InputtedStyles.input}
          onChangeText={inputText => setText(inputText)}
          value={text}
          underlineColorAndroid="transparent"
          placeholder="Search Product..."
          placeholderTextColor={theme === 'light' ? 'black' : 'white'}
          onSubmitEditing={() => {
            setSearch(text);
          }}
        />
      </View>
      <ThemeIcon />
    </View>
  );
};

export default SearchBarContainer;
