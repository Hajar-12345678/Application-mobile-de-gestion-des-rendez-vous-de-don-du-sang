import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 

import Connexion from './Connexion';
import Inscription from './Inscription';
import Accueil from './Accueil';
import Listecentres from './Listecentres';
import creneaurdv from './creneaurdv';
import Listerdv from './Listerdv';
import ModifierRdv from './ModifierRdv';
import Home from './Home';
import InfoRdv from './InfoRdv';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Accueil" component={Accueil} />
        <Stack.Screen name="Connexion" component={Connexion} />
        <Stack.Screen name="Inscription" component={Inscription} />
        <Stack.Screen name="Listecentres" component={Listecentres} />
        <Stack.Screen name="creneaurdv" component={creneaurdv} />
        <Stack.Screen name="Listerdv" component={Listerdv} />
        <Stack.Screen name="ModifierRdv" component={ModifierRdv} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="InfoRdv" component={InfoRdv} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
