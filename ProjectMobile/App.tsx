import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './pages/homePage';
import MyProducts from './pages/myProductsPage';
import EggGame from './pages/eggGamePage';
import ItemDetail from './pages/itemDetailPage';
import BalanceProvider from './context/balance';
import ThemeProvider from './context/theme';
import SearchProvider from './context/searcheItem';
import UserItemProvider from './context/userItems';
import QuitConfirmationModal from './elements/quitConfirmation';
const Stack = createStackNavigator();

function App() {
  return (
    <UserItemProvider>
      <SearchProvider>
        <ThemeProvider>
          <BalanceProvider>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                  name="Home"
                  component={HomeScreen}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="MyProducts"
                  component={MyProducts}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="EggGame"
                  component={EggGame}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="ItemDetail"
                  component={ItemDetail}
                  options={{headerShown: false}}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </BalanceProvider>
        </ThemeProvider>
      </SearchProvider>
    </UserItemProvider>
  );
}

export default App;
