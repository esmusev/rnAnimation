import * as React from 'react';
import {Animated, Button, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  HeaderStyleInterpolators,
  StackCardInterpolationProps,
  StackNavigationOptions,
  TransitionSpecs,
} from '@react-navigation/stack';

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home!</Text>
      <Button
        onPress={() => {
          navigation.navigate('Screen1');
        }}
        title={'Go Screen1'}
      />
      <Button
        onPress={() => {
          navigation.navigate('Screen2');
        }}
        title={'Go Screen2'}
      />
    </View>
  );
}

function Screen2({navigation}) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'magenta',
      }}>
      <Text>Screen2</Text>
      <Button
        onPress={() => {
          navigation.goBack();
        }}
        title={'Go home'}
      />
    </View>
  );
}

function Screen1({navigation}) {
  return (
    <Animated.View
      style={[
        {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'cyan',
        },
      ]}>
      <Text>Settings!</Text>
      <Button
        onPress={() => {
          navigation.goBack();
        }}
        title={'Go home'}
      />
    </Animated.View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Screen2"
          component={Screen2}
          options={optionsScreen2}
        />
        <Stack.Screen
          name="Screen1"
          component={Screen1}
          options={settingsAnimation}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const optionsScreen2: StackNavigationOptions = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  cardStyleInterpolator: ({
    current,
    layouts,
    closing,
  }: StackCardInterpolationProps) => {
    return {
      cardStyle: {
        transform: [
          {
            translateY: Animated.add(closing, current.progress).interpolate({
              inputRange: [0, 1],
              outputRange: [-layouts.screen.height, 0],
              extrapolate: 'clamp',
            }),
          },
          {
            scale: Animated.add(
              (closing, current.progress).interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0],
              }),
              current.progress,
            ),
          },
        ],
      },
    };
  },
};

const settingsAnimation: StackNavigationOptions = {
  cardStyleInterpolator: ({
    current,
    layouts,
    closing,
  }: StackCardInterpolationProps) => {
    return {
      cardStyle: {
        opacity: Animated.add(
          closing.interpolate({inputRange: [0, 1], outputRange: [1, 0]}),
          current.progress,
        ),
        transform: [
          {
            translateX: Animated.add(closing, current.progress).interpolate({
              inputRange: [0, 1],
              outputRange: [-layouts.screen.width, 0],
              extrapolate: 'clamp',
            }),
          },
        ],
      },
    };
  },
};
