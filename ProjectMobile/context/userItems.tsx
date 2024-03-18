import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserItemContext = createContext({
  userItems: [],
  setUserItems: (() => {}) as React.Dispatch<React.SetStateAction<number[]>>,
});

const BALANCE_KEY = 'ProjectUserItems';

const UserItemProvider = ({children}) => {
  const [userItems, setUserItems] = useState<number[]>([]);

  useEffect(() => {
    const loadUserItemsFromStorage = async () => {
      try {
        const userItemsData = await AsyncStorage.getItem(BALANCE_KEY);
        if (userItemsData !== null) {
          setUserItems(JSON.parse(userItemsData));
        }
      } catch (error) {
        console.error('Error loading user items : ', error);
      }
    };

    loadUserItemsFromStorage();
  }, []);

  useEffect(() => {
    const saveUserItemsToStorage = async () => {
      try {
        await AsyncStorage.setItem(BALANCE_KEY, JSON.stringify(userItems));
      } catch (error) {
        console.error('Error saving user items to storage: ', error);
      }
    };

    saveUserItemsToStorage();
  }, [userItems]);

  return (
    <UserItemContext.Provider value={{userItems, setUserItems}}>
      {children}
    </UserItemContext.Provider>
  );
};

export default UserItemProvider;
