import React from 'react';
import {StyleSheet, View} from 'react-native';
import Header from '../elements/eggPageElements/headerContainer';
import CointList from '../elements/eggPageElements/cointListContainer';
import Game from '../elements/eggPageElements/theEggGame';
import {useTheme} from '../context/theme';

function EggPage({navigation}: {navigation: any}): JSX.Element {
  const {theme} = useTheme();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme === 'light' ? '#f8f4f4' : '#35363a',
      height: '100%',
    },
  });
  return (
    <View style={styles.container}>
      <Header nav={navigation} />
      <CointList />
      <Game />
    </View>
  );
}

export default EggPage;
