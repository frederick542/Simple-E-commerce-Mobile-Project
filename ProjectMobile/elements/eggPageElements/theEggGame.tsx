import React, {useContext, useMemo, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Animated,
} from 'react-native';
import {ThemeContext} from '../../context/theme';
import {BalanceContext} from '../../context/balance';

const Game = () => {
  const {theme} = useContext(ThemeContext);
  const [coin, setCoin] = useState('silver');
  const {setBalance} = useContext(BalanceContext);
  const [getCoinText, setGetCoinText] = useState(
    'Clicked on the egg to get your prize!',
  );
  const jumpValue = useRef(new Animated.Value(0)).current;
  const [cracked, setCracked] = useState(false);
  const coins = ['gold', 'bronze', 'silver'];
  const handleEggPress = () => {
    const randomCoin = coins[Math.floor(Math.random() * coins.length)];
    setCoin(randomCoin);
    const sequence = Animated.sequence([
      Animated.spring(jumpValue, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
      Animated.spring(jumpValue, {
        toValue: 0,
        friction: 4,
        useNativeDriver: true,
      }),
    ]);
    sequence.start(({finished}) => {
      if (finished) {
        setCracked(true);
        setGetCoinText(`You got a ${randomCoin} coin!`);
        const totalProvit = () => {
          switch (randomCoin) {
            case 'gold':
              return 100;
            case 'silver':
              return 50;
            case 'bronze':
              return 20;
          }
        };
        setBalance(prevBalance => prevBalance + totalProvit());
      }
    });
  };

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    congratNotification: {
      fontWeight: 'bold',
      fontSize: 25,
      marginTop: '5%',
      color: 'transparent',
    },
    notificationDetail: {
      fontSize: 23,
      marginTop: '2%',
      color: theme === 'light' ? 'black' : 'white',
      width: '80%',
      textAlign: 'center',
    },
    egg: {
      display: cracked === false ? 'flex' : 'none',
      width: 270,
      height: 270,
      resizeMode: 'contain',
      transform: [
        {
          translateY: jumpValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -30],
          }),
        },
      ],
    },
    eggBroken: {
      display: cracked === true ? 'flex' : 'none',
      width: 270,
      height: 270,
      resizeMode: 'contain',
      transform: [
        {
          translateY: jumpValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -30],
          }),
        },
      ],
    },
    EggArea: {
      width: 280,
      height: 280,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    coin: {
      width: 65,
      height: 65,
      marginTop: 10,
    },

    makeItTransparent: {
      tintColor: 'transparent',
    },
    gotCoin: {
      display: cracked === true ? 'flex' : 'none',
      fontSize: 22,
      fontWeight: 'bold',
      marginTop: '2%',
      color: theme === 'light' ? 'black' : 'white',
      width: '80%',
      textAlign: 'center',
    },
  });

  const coinImageSource = useMemo(() => {
    switch (coin) {
      case 'silver':
        return require('../../assets/silver-coin.png');
      case 'gold':
        return require('../../assets/gold-coin.png');
      case 'bronze':
        return require('../../assets/bronze-coin.png');
      default:
        return null;
    }
  }, [coin]);
  const coinImageBalance = useMemo(() => {
    switch (coin) {
      case 'silver':
        return '50';
      case 'gold':
        return '100';
      case 'bronze':
        return '20';
      default:
        return null;
    }
  }, [coin]);
  return (
    <View style={styles.container}>
      <Text style={styles.congratNotification}>Congratulations</Text>
      <Text style={styles.notificationDetail}>{getCoinText}</Text>
      <Image
        style={[styles.coin, cracked ? null : styles.makeItTransparent]}
        source={coinImageSource}
      />
      <TouchableOpacity
        style={styles.EggArea}
        activeOpacity={1}
        onPress={cracked ? null : handleEggPress}>
        <Animated.Image
          style={styles.egg}
          source={require('../../assets/egg-full.png')}
        />
        <Animated.Image
          style={styles.eggBroken}
          source={require('../../assets/egg-broken.png')}
        />
      </TouchableOpacity>
      <Text style={styles.gotCoin}>
        {coinImageBalance} coins have been added to your balance
      </Text>
    </View>
  );
};

export default Game;
