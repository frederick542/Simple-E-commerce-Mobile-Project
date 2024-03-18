import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import ListViewIcon from '../../assets/ListViewIcon';
import GridViewIcon from '../../assets/GridViewIcon';
import Items from './listItems';
import {ThemeContext} from '../../context/theme';

const HomeContainer = ({nav}) => {
  const {theme} = useContext(ThemeContext);
  const [isGridView, setGridView] = useState(true);
  const toggleView = () => {
    setGridView(prev => !prev);
  };

  const styles = StyleSheet.create({
    title: {
      fontSize: 23,
      fontWeight: 'bold',
      color: theme === 'light' ? 'black' : 'white',
      marginLeft: '10%',
    },
    titleContainer: {
      display: 'flex',
      width: '100%',
      marginTop: 35,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      display: 'flex',
      flexDirection: 'column',
      marginLeft: 'auto',
      marginRight: '10%',
      width: 50,
    },
    viewElement: {
      color: theme === 'light' ? 'black' : 'white',
    },
  });

  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Available Product</Text>
        <TouchableOpacity
          onPress={toggleView}
          style={styles.icon}
          activeOpacity={1}>
          {isGridView ? (
            <GridViewIcon color={theme === 'light' ? 'black' : 'white'} />
          ) : (
            <ListViewIcon color={theme === 'light' ? 'black' : 'white'} />
          )}
        </TouchableOpacity>
      </View>
      <Items displayType={isGridView} nav={nav} />
    </>
  );
};

export default HomeContainer;
