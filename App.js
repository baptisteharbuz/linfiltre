import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import RulesScreen from './src/screens/RulesScreen';
import PlayerSetupScreen from './src/screens/PlayerSetupScreen';
import SecretWordEntryScreen from './src/screens/SecretWordEntryScreen';
import PlayerFlowNavigator from './src/screens/PlayerFlowNavigator';  // Importez PlayerFlowNavigator
import GameCountdown from './src/screens/GameCountdownScreen';
import VoteScreen from './src/screens/VoteScreen';
import ResultScreen from './src/screens/ResultScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Rules" component={RulesScreen} />
        <Stack.Screen name="PlayerSetup" component={PlayerSetupScreen} />
        <Stack.Screen name="SecretWordEntry" component={SecretWordEntryScreen} />
        <Stack.Screen name="PlayerFlow" component={PlayerFlowNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="GameCountdown" component={GameCountdown} />
        <Stack.Screen name="Vote" component={VoteScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;