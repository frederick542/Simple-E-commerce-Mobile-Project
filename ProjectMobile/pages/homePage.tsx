import React, {useContext, useEffect} from 'react';
import {StyleSheet, View, BackHandler, Alert} from 'react-native';
import Header from '../elements/homePageElemets/headerContainer';
import HomeContainer from '../elements/homePageElemets/homeContent';
import EggDirrButton from '../elements/homePageElemets/eggDirButton';
import {ThemeContext} from '../context/theme';

function HomePage({navigation}: {navigation: any}): JSX.Element {
  const {theme} = useContext(ThemeContext);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    return () => {
      backHandler.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBackPress = () => {
    Alert.alert(
      'Exit App',
      'Are you sure you want to exit?',
      [
        {text: 'Cancel', onPress: () => null, style: 'cancel'},
        {text: 'OK', onPress: () => handleExit()},
      ],
      {cancelable: false},
    );
    return true;
  };

  const handleExit = () => {
    BackHandler.exitApp();
  };

  const styles = StyleSheet.create({
    egg: {
      position: 'absolute',
      bottom: 20,
      right: 20,
    },
    container: {
      flex: 1,
      backgroundColor: theme === 'light' ? '#f8f4f4' : '#35363a',
    },
  });

  return (
    <View style={styles.container}>
      <Header nav={navigation} />
      <HomeContainer nav={navigation} />
      <View style={styles.egg}>
        <EggDirrButton nav={navigation} />
      </View>
    </View>
  );
}

export default HomePage;
