import React, {useState, useContext} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import Header from '../elements/itemDetailElements/headerContainer';
import {BalanceContext} from '../context/balance';
import { UserItemContext } from '../context/userItems';
import { ThemeContext } from '../context/theme';

function ProductDetail({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}): JSX.Element {
  const {theme} = useContext(ThemeContext);
  const {balance, setBalance} = useContext(BalanceContext);
  const [displayModel, setDisplayModel] = useState(false);
  const [displayTransaction, setDisplayTransaction] = useState(false);
  const {item, buy, index} = route.params;
  const {userItems, setUserItems} = useContext(UserItemContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'light' ? '#f8f4f4' : '#35363a',
    },
    image: {
      width: '100%',
      height: 350,
      resizeMode: 'contain',
    },
    imageModal: {
      width: '90%',
      height: '90%',
      resizeMode: 'contain',
      marginTop: 'auto',
      marginBottom: 'auto',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    model: {
      display: `${displayModel === false ? 'none' : 'flex'}`,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: theme === 'light' ? 'black' : 'white',
      opacity: 0.94,
      zIndex: 999,
    },
    cancelModal: {
      position: 'absolute',
      top: 15,
      left: 7,
      tintColor: theme === 'light' ? 'black' : 'white',
      width: 40,
      height: 40,
    },
    imageContainer: {
      width: '93%',
      alignSelf: 'center',
      paddingBottom: 10,
      borderBottomWidth: 2,
      borderBottomColor: 'grey',
    },
    itemDetailContainer: {
      width: '93%',
      height: '45%',
      alignSelf: 'center',
      marginTop: 10,
    },
    itemName: {
      fontWeight: 'bold',
      fontSize: 22,
      color: theme === 'light' ? 'black' : 'white',
    },
    itemDetailTitle: {
      fontWeight: '500',
      fontSize: 17,
      color: theme === 'light' ? 'black' : 'white',
      marginTop: '2%',
      marginBottom: '2%',
    },
    itemDetailDescription: {
      fontSize: 15,
      color: theme === 'light' ? 'black' : 'white',
    },
    BuyButton: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: `${
        buy === true ? '#9074ac' : theme === 'light' ? 'white' : '#f0f0f0'
      }`,
      borderWidth: 1,
      borderColor: `${buy === true ? 'transparent' : '#d8d8d8'}`,
      elevation: 5,
      width: '100%',
      height: 50,
      borderRadius: 5,
      marginTop: 'auto',
    },
    buttonTitle: {
      fontWeight: 'bold',
      fontSize: 20,
      color: `${buy === true ? 'white' : '#9074ac'}`,
    },
    buyModal: {
      display: `${displayTransaction === false ? 'none' : 'flex'}`,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      opacity: 1,
      zIndex: 999,
    },
    TransactionDetailContainer: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'white',
      width: '90%',
      height: 200,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 'auto',
      marginBottom: 'auto',
      elevation: 5,
    },
    transactionResult: {
      fontWeight: 'bold',
      color: 'black',
      fontSize: 23,
      marginLeft: 20,
      marginTop: 20,
    },
    transactionResultDetail: {
      color: 'black',
      fontSize: 15,
      marginLeft: 20,
      marginTop: 5,
      marginRight: 10,
    },
    ButtonContainer: {
      position: 'absolute',
      width: '100%',
      height: '100%',
    },
    OkButton: {
      fontWeight: 'bold',
      color: 'purple',
      fontSize: 17,
      marginLeft: 'auto',
      marginTop: 'auto',
      marginRight: 15,
      marginBottom: 15,
    },
  });
  const toggleModel = () => {
    displayModel === false ? setDisplayModel(true) : setDisplayModel(false);
  };

  const displayTransactionModal = () => {
    setDisplayTransaction(true);
  };

  const hideTransactionModal = type => {
    setDisplayTransaction(false);
    if (balance >= item.price && type === 'buy') {
      setBalance(prevBalance => prevBalance - item.price);
      setUserItems(prev => [...prev, item.id]);
    } else {
      navigation.goBack();
    }
  };

  const buyItem = () => {
    displayTransactionModal();
  };

  const sellItem = () => {
    displayTransactionModal();
    setBalance(item.price + balance);
     const updatedUserItems = [
       ...userItems.slice(0, index),
       ...userItems.slice(index + 1),
     ];

     setUserItems(updatedUserItems);
    setUserItems(updatedUserItems);
  };

  return (
    <View style={styles.container}>
      <Header nav={navigation} itemName={item.title} />
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={toggleModel}
        style={styles.imageContainer}>
        <Image source={{uri: item.image}} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.model}>
        <TouchableOpacity activeOpacity={0.9} onPress={toggleModel}>
          <Image
            source={require('../assets/cancel.png')}
            style={styles.cancelModal}
          />
        </TouchableOpacity>
        <Image source={{uri: item.image}} style={styles.imageModal} />
      </View>
      <View style={styles.buyModal}>
        <View style={styles.TransactionDetailContainer}>
          <Text style={styles.transactionResult}>
            {buy === true
              ? balance >= item.price
                ? 'Success!'
                : 'Failure!'
              : 'Success!'}
          </Text>
          <Text style={styles.transactionResultDetail}>
            {buy === true
              ? balance >= item.price
                ? `${
                    item.title
                  } was bought successfully!\nYour current balance is ${(
                    balance - item.price
                  ).toFixed(1)}`
                : `${item.title} was failed to buy!\nYour current balance is not enough`
              : `${
                  item.title
                } was sold successfully!\nYour current balance is ${balance.toFixed(
                  1,
                )}`}
          </Text>
          <TouchableOpacity
            onPress={() => {
              buy === true
                ? hideTransactionModal('buy')
                : hideTransactionModal('sell');
            }}
            style={styles.ButtonContainer}>
            <Text style={styles.OkButton}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.itemDetailContainer}>
        <Text style={styles.itemName}>{item.title}</Text>
        <Text style={styles.itemDetailTitle}>Price</Text>
        <Text style={styles.itemDetailDescription}>{item.price} Coins</Text>
        <Text style={styles.itemDetailTitle}>Description</Text>
        <ScrollView>
          <Text style={styles.itemDetailDescription}>{item.description}</Text>
        </ScrollView>
        <TouchableOpacity
          style={styles.BuyButton}
          activeOpacity={0.7}
          onPress={buy === true ? buyItem : sellItem}>
          <Text style={styles.buttonTitle}>
            {buy === true ? 'Buy' : 'Sell'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ProductDetail;
