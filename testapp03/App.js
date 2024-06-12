import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import { TextInput, View, StyleSheet, Button } from 'react-native';
import { ClientLogin } from './screens/client/ClientLogin';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerRight: () => (
                <TextInput
                  style={{ marginRight: 10, height: 40, borderColor: 'gray', borderWidth: 1 }}
                  placeholder="Search"
                />
              ),
            }}
          />
          <Stack.Screen
          name='Login'
          component={ClientLogin}
          />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{
              title: 'Detail View',
              headerShown: false,
              gestureEnabled: false,
            }}
          />
        </Stack.Navigator>
  
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default App;
