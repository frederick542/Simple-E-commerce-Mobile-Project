import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const BalanceContext = createContext({
  balance: 0,
  setBalance: (() => {}) as React.Dispatch<React.SetStateAction<number>>,
});

const BALANCE_KEY = 'ProjectBalance';

const BalanceProvider = ({children}) => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const loadBalanceFromStorage = async () => {
      try {
        const balanceData = await AsyncStorage.getItem(BALANCE_KEY);
        if (balanceData !== null) {
          setBalance(JSON.parse(balanceData));
        }
      } catch (error) {
        console.error('Error: ', error);
      }
    };

    loadBalanceFromStorage();
  }, []);

  useEffect(() => {
    const saveBalanceToStorage = async () => {
      try {
        await AsyncStorage.setItem(BALANCE_KEY, balance.toString());
      } catch (error) {
        console.error('Error saving balance to storage: ', error);
      }
    };
    saveBalanceToStorage();
  }, [balance]);

  return (
    <BalanceContext.Provider value={{balance, setBalance}}>
      {children}
    </BalanceContext.Provider>
  );
};

export default BalanceProvider;
