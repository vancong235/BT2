// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllNote from './AllNote';
import DetailNote from './DetailNote';
import AddNote from './AddNote';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="AllNote" component={AllNote} options={{ headerShown: false }}/>
        <Stack.Screen name="AddNote" component={AddNote} options={{ headerShown: false }}/>
        <Stack.Screen name="DetailNote" component={DetailNote} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;