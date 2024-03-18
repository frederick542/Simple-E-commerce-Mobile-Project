import React, {useContext, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import Header from '../elements/myProducts/headerContainer';
import {UserItemContext} from '../context/userItems';
import {StyleSheet} from 'react-native';
import {useTheme} from '../context/theme';

function MyProduct({navigation}: {navigation: any}): JSX.Element {
  const {userItems} = useContext(UserItemContext);
  const [products, setProducts] = useState([]);
  const {theme} = useTheme();
  useEffect(() => {
    const fetchData = async id => {
      try {
        const apiUrl = `https://fakestoreapi.com/products/${id}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network request failed');
        }
        const result = await response.json();
        return result;
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    const fetchAllData = async () => {
      const data = await Promise.all(userItems.map(id => fetchData(id)));
      setProducts(data);
    };

    fetchAllData();
  }, [userItems]);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme === 'light' ? '#f8f4f4' : '#35363a',
    },
    ImageList: {
      width: 100,
      height: 100,
      resizeMode: 'contain',
      borderRadius: 6,
      marginLeft: 10,
    },
    ProductNameList: {
      fontSize: 17,
      color: theme === 'light' ? 'black' : 'white',
      fontWeight: 'bold',
      marginTop: 8,
    },
    priceList: {
      fontSize: 13,
      color: theme === 'light' ? 'black' : 'white',
      marginTop: 4,
    },
    columnViewContainer: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    columnItem: {
      width: '90%',
      height: 150,
      backgroundColor: theme === 'light' ? 'white' : '#555555',
      marginVertical: 10,
      elevation: 4,
      borderRadius: 6,
      flexDirection: 'row',
      alignItems: 'center',
    },
    touchableContainer: {
      display: 'flex',
      flexDirection: 'row',
    },
    contentContainerList: {
      display: 'flex',
      flexDirection: 'column',
      marginLeft: 10,
    },
    separator: {
      height: 100,
    },
  });
  const renderColumnItem = (item, i) => (
    <View key={i} style={styles.columnItem}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => goToDetail(item, i)}
        style={styles.touchableContainer}>
        <Image source={{uri: item.image}} style={styles.ImageList} />
        <View style={styles.contentContainerList}>
          <Text style={styles.ProductNameList}>
            {item.title.length > 15
              ? item.title.slice(0, 25) + '...'
              : item.title}
          </Text>
          <Text style={styles.priceList}>{item.price} Coins</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const goToDetail = (item, index) => {
    navigation.navigate('ItemDetail', {item, buy: false, index: index});
  };

  return (
    <View style={styles.container}>
      <Header nav={navigation} />
      <ScrollView contentContainerStyle={styles.columnViewContainer}>
        {products.map((obj, i) => {
          return renderColumnItem(obj, i);
        })}
        <View style={styles.separator} />
      </ScrollView>
    </View>
  );
}

export default MyProduct;
