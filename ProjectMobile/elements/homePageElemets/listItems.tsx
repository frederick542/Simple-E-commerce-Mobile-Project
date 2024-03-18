import React, {useEffect, useState, useContext} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {SearchContext} from '../../context/searcheItem';
import {useTheme} from '../../context/theme';
const Items = ({displayType, nav}) => {
  const [rawData, setRawData] = useState(null);
  const [data, setData] = useState(null);
  const {theme} = useTheme();
  const {search} = useContext(SearchContext);
  const styles = StyleSheet.create({
    gridViewContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: 8,
      justifyContent: 'center',
    },
    gridItem: {
      width: '44%',
      height: 200,
      backgroundColor: theme === 'light' ? 'white' : '#555555',
      margin: 8,
      elevation: 4,
      borderRadius: 6,
    },
    Image: {
      width: '100%',
      height: 120,
      resizeMode: 'contain',
      borderRadius: 6,
    },
    ImageList: {
      width: 100,
      height: 100,
      marginLeft : 10,
      resizeMode: 'contain',
      borderRadius: 6,
    },
    ProductName: {
      fontSize: 15,
      color: theme === 'light' ? 'black' : 'white',
      fontWeight: 'bold',
      marginTop: 8,
    },
    ProductNameList: {
      fontSize: 17,
      color: theme === 'light' ? 'black' : 'white',
      fontWeight: 'bold',
      marginTop: 8,
    },
    contentContainer: {
      padding: 8,
    },
    price: {
      fontSize: 12,
      color: theme === 'light' ? 'black' : 'white',
      marginTop: 4,
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
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = 'https://fakestoreapi.com/products';
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network request failed');
        }
        const result = await response.json();
        setRawData(result);
        setData(result);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    if (search !== '') {
      setData(
        rawData.filter(item =>
          item.title.toLowerCase().includes(search.toLowerCase()),
        ),
      );
    } else {
      setData(rawData);
    }
  }, [search, rawData]);
  const renderGridItem = item => (
    <View key={item.id} style={styles.gridItem}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => goToDetail(item)}>
        <View style={styles.contentContainer}>
          <Image source={{uri: item.image}} style={styles.Image} />
          <Text style={styles.ProductName}>
            {item.title.length > 15
              ? item.title.slice(0, 15) + '...'
              : item.title}
          </Text>
          <Text style={styles.price}>{item.price} Coins</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderColumnItem = item => (
    <View key={item.id} style={styles.columnItem}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => goToDetail(item)}
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

  const goToDetail = item => {
    nav.navigate('ItemDetail', {item, buy: true});
  };

  return displayType ? (
    <ScrollView contentContainerStyle={styles.gridViewContainer}>
      {data && data.map(renderGridItem)}
    </ScrollView>
  ) : (
    <ScrollView contentContainerStyle={styles.columnViewContainer}>
      {data && data.map(renderColumnItem)}
    </ScrollView>
  );
};

export default Items;
